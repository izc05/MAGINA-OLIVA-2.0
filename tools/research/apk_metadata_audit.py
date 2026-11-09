#!/usr/bin/env python3
"""Inventario estático reproducible de APK o ZIP con split APK.

Uso: python tools/research/apk_metadata_audit.py archivo.zip --output reporte.json
Solo cuenta tamaños, hashes, bibliotecas y clases DEX; nunca ejecuta, descompila
o extrae código, fuentes, cadenas, endpoints, secretos ni datos personales.
No publicar el APK de terceros ni el informe bruto si incluye metadatos privados.
"""
import argparse
import collections
import hashlib
import io
import json
from pathlib import Path
import struct
import zipfile

PREFIXES = {
    "netinfo": "Lcom/reactnativecommunity/netinfo/",
    "asyncstorage": "Lcom/reactnativecommunity/asyncstorage/",
    "expo_sqlite": "Lexpo/modules/sqlite/",
    "android_room": "Landroidx/room/",
    "maplibre": "Lorg/maplibre/",
    "expo_location": "Lexpo/modules/location/",
    "expo_notifications": "Lexpo/modules/notifications/",
    "expo_securestore": "Lexpo/modules/securestore/",
    "expo_taskmanager": "Lexpo/modules/taskManager/",
    "mlkit_document_scanner": "Lcom/google/mlkit/vision/documentscanner/",
    "mlkit_text_recognition": "Lcom/google/mlkit/vision/text/",
    "mlkit_barcode": "Lcom/google/mlkit/vision/barcode/",
    "revenuecat": "Lcom/revenuecat/",
    "sentry": "Lio/sentry/",
}
MAX_APK = 600 * 1024 * 1024
MAX_EXPANDED = 1024 * 1024 * 1024

def dex_class_descriptors(data):
    if not data.startswith(b"dex"):
        return []
    ns, so = struct.unpack_from("<II", data, 0x38)
    nt, to = struct.unpack_from("<II", data, 0x40)
    nc, co = struct.unpack_from("<II", data, 0x60)
    if ns > 10_000_000 or nt > 1_000_000 or nc > 1_000_000:
        raise ValueError("Tablas DEX demasiado grandes")
    offsets = struct.unpack_from("<"+"I"*ns, data, so)
    types = struct.unpack_from("<"+"I"*nt, data, to)
    cache, result = {}, []
    for i in range(nc):
        ti = struct.unpack_from("<I", data, co + 32*i)[0]
        idx = types[ti]
        if idx not in cache:
            pos = offsets[idx]
            for _ in range(5):
                high = data[pos] >= 128
                pos += 1
                if not high: break
            end = data.find(b"\0", pos)
            if end < 0: raise ValueError("Cadena DEX inválida")
            cache[idx] = data[pos:end].decode("utf8","replace")
        result.append(cache[idx])
    return result

def inspect(name, data):
    result = {"name":name, "size_bytes":len(data), "sha256":hashlib.sha256(data).hexdigest()}
    with zipfile.ZipFile(io.BytesIO(data)) as apk:
        infos = apk.infolist()
        if sum(i.file_size for i in infos) > MAX_EXPANDED:
            raise ValueError("Contenido expandido excesivo")
        metrics, classes, libraries = collections.Counter(), [], []
        for entry in infos:
            n = entry.filename
            if n.endswith(".dex"):
                metrics["dex_files"] += 1
                metrics["dex_bytes"] += entry.file_size
                classes.extend(dex_class_descriptors(apk.read(entry)))
            elif n.startswith("lib/") and n.endswith(".so"):
                metrics["so_bytes"] += entry.file_size
                libraries.append({"name":n.rsplit("/",1)[-1],"bytes":entry.file_size})
            elif n == "assets/index.android.bundle":
                metrics["hermes_bundle_bytes"] += entry.file_size
            elif n.endswith(".tflite"):
                metrics["tflite_count"] += 1
                metrics["tflite_bytes"] += entry.file_size
            elif n.startswith("res/"):
                metrics["resources_bytes"] += entry.file_size
        result["entries"], result["metrics"] = len(infos), dict(metrics)
        result["dex_class_count"] = len(classes)
        result["class_prefix_counts"] = {
            key:sum(c.startswith(prefix) for c in classes)
            for key,prefix in PREFIXES.items()
        }
        result["native_libraries"] = sorted(libraries,key=lambda x:x["name"])
        if "assets/app.config" in apk.namelist():
            try:
                d=json.loads(apk.read("assets/app.config"))
                result["expo_allowlist"]={
                    "version":d.get("version"),"sdkVersion":d.get("sdkVersion"),
                    "platforms":d.get("platforms"),"orientation":d.get("orientation"),
                    "plugin_names":[x[0] if isinstance(x,list) else x for x in d.get("plugins",[])],
                    "blocked_permissions":d.get("android",{}).get("blockedPermissions",[])
                }
            except (ValueError,UnicodeDecodeError):
                pass
    return result

def main():
    p=argparse.ArgumentParser(description=__doc__)
    p.add_argument("archive",type=Path)
    p.add_argument("--output",type=Path,required=True)
    args=p.parse_args()
    with args.archive.open("rb") as f:
        source_hash=hashlib.file_digest(f,"sha256").hexdigest()
    out={"warning":"Metadatos estáticos; no prueba funcionamiento ni seguridad",
         "name":args.archive.name,"bytes":args.archive.stat().st_size,
         "sha256":source_hash,"packages":[]}
    if args.archive.suffix.lower()==".apk":
        if args.archive.stat().st_size>MAX_APK: raise ValueError("APK demasiado grande")
        out["packages"].append(inspect(args.archive.name,args.archive.read_bytes()))
    else:
        with zipfile.ZipFile(args.archive) as archive:
            names=sorted(n for n in archive.namelist() if n.lower().endswith(".apk"))
            if not names: raise ValueError("ZIP sin paquetes APK")
            if sum(archive.getinfo(n).file_size for n in names)>MAX_EXPANDED:
                raise ValueError("ZIP expandido demasiado grande")
            for n in names:
                if archive.getinfo(n).file_size>MAX_APK: raise ValueError("APK demasiado grande")
                out["packages"].append(inspect(n,archive.read(n)))
    args.output.write_text(json.dumps(out,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
    print("Generado:",args.output,"Paquetes:",len(out["packages"]))

if __name__=="__main__":
    main()

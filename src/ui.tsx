import { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import { color, radius, space } from './theme';

export function Button({ label, onPress, ghost, disabled }: { label: string; onPress: () => void; ghost?: boolean; disabled?: boolean }) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={[s.button, ghost && s.ghost, disabled && s.disabled]}
    >
      <Text style={[s.buttonText, ghost && s.ghostText]}>{label}</Text>
    </Pressable>
  );
}

export function Field({ label, error, ...props }: TextInputProps & { label: string; error?: string }) {
  return (
    <View style={s.field}>
      <Text style={s.label}>{label}</Text>
      <TextInput accessibilityLabel={label} placeholderTextColor={color.muted} style={[s.input, !!error && s.inputError]} {...props} />
      {!!error && <Text style={s.error}>{error}</Text>}
    </View>
  );
}

export function Card({ children }: { children: ReactNode }) {
  return <View style={s.card}>{children}</View>;
}

const s = StyleSheet.create({
  button: { backgroundColor: color.accent, paddingVertical: 12, paddingHorizontal: space.m, borderRadius: radius, alignItems: 'center' },
  ghost: { backgroundColor: 'transparent', borderWidth: 1, borderColor: color.line },
  disabled: { opacity: 0.45 },
  buttonText: { color: color.accentInk, fontWeight: '700', fontSize: 15 },
  ghostText: { color: color.ink },
  field: { gap: 6 },
  label: { color: color.ink, fontWeight: '600', fontSize: 14 },
  input: { backgroundColor: color.surface, borderWidth: 1, borderColor: color.line, borderRadius: radius, padding: 12, fontSize: 16, color: color.ink },
  inputError: { borderColor: color.danger },
  error: { color: color.danger, fontSize: 13 },
  card: { backgroundColor: color.surface, borderWidth: 1, borderColor: color.line, borderRadius: radius, padding: space.m, gap: space.s },
});

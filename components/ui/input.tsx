import React from 'react';
import { TextInput, TextInputProps, StyleSheet } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { lightTheme, darkTheme } from '../../styles/theme';

export interface InputProps extends TextInputProps {
  // Add any additional props here
}

export const Input: React.FC<InputProps> = ({ style, ...props }) => {
  const { theme } = useTheme();
  const colors = theme === 'light' ? lightTheme : darkTheme;

  return (
    <TextInput
      style={[
        styles.input,
        { 
          backgroundColor: colors.card,
          color: colors.text,
          borderColor: colors.border,
        },
        style
      ]}
      placeholderTextColor={colors.text}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});


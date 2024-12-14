import React from 'react';
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { lightTheme, darkTheme } from '../../styles/theme';

interface ButtonProps extends TouchableOpacityProps {
  children: React.ReactNode;
  variant?: 'default' | 'outline';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'default', 
  style, 
  ...props 
}) => {
  const { theme } = useTheme();
  const colors = theme === 'light' ? lightTheme : darkTheme;

  const buttonStyles = [
    styles.button,
    variant === 'default' ? { backgroundColor: colors.primary } : { backgroundColor: 'transparent', borderColor: colors.primary, borderWidth: 1 },
    style,
  ];

  const textColor = variant === 'default' ? colors.background : colors.primary;

  return (
    <TouchableOpacity style={buttonStyles} {...props}>
      <Text style={[styles.text, { color: textColor }]}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});


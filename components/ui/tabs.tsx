import React, { createContext, useContext, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { lightTheme, darkTheme } from '../../styles/theme';

interface TabsContextType {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

export const Tabs: React.FC<{ defaultValue: string; children: React.ReactNode }> = ({ defaultValue, children }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <View>{children}</View>
    </TabsContext.Provider>
  );
};

export const TabsList: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme } = useTheme();
  const colors = theme === 'light' ? lightTheme : darkTheme;

  return (
    <View style={[styles.tabsList, { backgroundColor: colors.card }]}>
      {children}
    </View>
  );
};

export const TabsTrigger: React.FC<{ value: string; children: React.ReactNode }> = ({ value, children }) => {
  const { activeTab, setActiveTab } = useContext(TabsContext)!;
  const { theme } = useTheme();
  const colors = theme === 'light' ? lightTheme : darkTheme;

  const isActive = activeTab === value;

  return (
    <TouchableOpacity
      onPress={() => setActiveTab(value)}
      style={[
        styles.tabsTrigger,
        { 
          backgroundColor: isActive ? colors.primary : 'transparent',
          borderColor: isActive ? colors.primary : colors.border,
        },
      ]}
    >
      <Text style={[styles.tabsTriggerText, { color: isActive ? colors.background : colors.text }]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export const TabsContent: React.FC<{ value: string; children: React.ReactNode }> = ({ value, children }) => {
  const { activeTab } = useContext(TabsContext)!;

  if (activeTab !== value) return null;

  return <View>{children}</View>;
};

const styles = StyleSheet.create({
  tabsList: {
    flexDirection: 'row',
    borderRadius: 8,
    marginBottom: 16,
  },
  tabsTrigger: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabsTriggerText: {
    fontSize: 14,
    fontWeight: '500',
  },
});


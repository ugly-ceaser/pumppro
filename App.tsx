import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Calculator } from 'lucide-react-native';
import { UserProvider, useUser } from './contexts/UserContext';
import { StationProvider } from './contexts/StationContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { TouchableOpacity } from 'react-native';
import { useTheme } from './contexts/ThemeContext';
import ProtectedRoute from './components/ProtectedRoute';

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import MapScreen from './screens/MapScreen';
import StationListScreen from './screens/StationListScreen';
import StationDetailScreen from './screens/StationDetailScreen';
import AdminDashboardScreen from './screens/AdminDashboardScreen';
import AddStationScreen from './screens/AddStationScreen';
import ManageUsersScreen from './screens/ManageUsersScreen';
import FuelConsumptionScreen from './screens/FuelConsumptionScreen';
import UpdateStationPricesScreen from './screens/UpdateStationPricesScreen';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <TouchableOpacity onPress={toggleTheme} style={{ marginRight: 15 }}>
      <Ionicons
        name={theme === 'light' ? 'moon-outline' : 'sunny-outline'}
        size={24}
        color={theme === 'light' ? '#000' : '#FFF'}
      />
    </TouchableOpacity>
  );
}

function UserTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Map') {
            iconName = focused ? 'map' : 'map-outline';
          } else if (route.name === 'Stations') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'Fuel Calculator') {
            return <Calculator size={size} color={color} />;
          }

          return <Ionicons name={iconName!} size={size} color={color} />;
        },
        headerRight: () => <ThemeToggle />,
      })}
    >
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Stations" component={StationListScreen} />
      <Tab.Screen name="Fuel Calculator" component={FuelConsumptionScreen} />
    </Tab.Navigator>
  );
}

function AdminTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Dashboard') {
            iconName = focused ? 'speedometer' : 'speedometer-outline';
          } else if (route.name === 'Add Station') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          } else if (route.name === 'Manage Users') {
            iconName = focused ? 'people' : 'people-outline';
          }

          return <Ionicons name={iconName!} size={size} color={color} />;
        },
        headerRight: () => <ThemeToggle />,
      })}
    >
      <Tab.Screen name="Dashboard" component={AdminDashboardScreen} />
      <Tab.Screen name="Add Station" component={AddStationScreen} />
      <Tab.Screen name="Manage Users" component={ManageUsersScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <UserProvider>
      <ThemeProvider>
        <StationProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
              <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Home" component={UserTabs} options={{ headerShown: false }} />
              <Stack.Screen name="StationDetail" component={StationDetailScreen} />
              <Stack.Screen name="UpdatePrices" component={UpdateStationPricesScreen} />
              <Stack.Screen name="AdminHome" component={AdminDashboardScreen} />
              <Stack.Screen name="UserHome" component={StationListScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </StationProvider>
      </ThemeProvider>
    </UserProvider>
  );
}


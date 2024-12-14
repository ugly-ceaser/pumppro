import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';

// Mock user data (in a real app, this would come from a backend)
const mockUsers = [
  { id: '1', email: 'user1@example.com', isAdmin: false },
  { id: '2', email: 'user2@example.com', isAdmin: false },
  { id: '3', email: 'admin@example.com', isAdmin: true },
];

interface User {
  id: string;
  email: string;
  isAdmin: boolean;
}

export default function ManageUsersScreen() {
  const [users, setUsers] = useState(mockUsers);

  const toggleAdminStatus = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, isAdmin: !user.isAdmin } : user
    ));
  };

  const renderItem = ({ item }: { item: User }) => (
    <View style={styles.item}>
      <Text>{item.email}</Text>
      <Text>Admin: {item.isAdmin ? 'Yes' : 'No'}</Text>
      <Button
        title={item.isAdmin ? 'Remove Admin' : 'Make Admin'}
        onPress={() => toggleAdminStatus(item.id)}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Manage Users</Text>
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
  },
});


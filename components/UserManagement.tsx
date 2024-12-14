'use client'

import { useState, useEffect } from 'react'
import { View, Text, FlatList, StyleSheet, Button } from 'react-native'
import { User } from '../type/type'

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    // Fetch users from API
    const fetchUsers = async () => {
      // Replace with actual API call
      const response = await fetch('/api/users')
      const data = await response.json()
      setUsers(data)
    }

    fetchUsers()
  }, [])

  const renderItem = ({ item: user }: { item: User }) => (
    <View style={styles.listItem}>
      <Text style={styles.emailText}>{user.email}</Text>
      <Text style={styles.roleText}>Role: {user.role}</Text>
      <Button onPress={() => {}} title="Edit" />
    </View>
  )

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Management</Text>
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={(user) => user.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 16,
  },
  listContainer: {
    gap: 16,
  },
  listItem: {
    borderWidth: 1,
    borderColor: '#e5e5e5',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  emailText: {
    fontWeight: '500',
    fontSize: 16,
  },
  roleText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
})


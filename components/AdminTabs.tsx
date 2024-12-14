import React from 'react';
import { View } from 'react-native';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import StationManagement from './StationManagement';
import UserManagement from './UserManagement';

export default function AdminTabs() {
  return (
    <Tabs defaultValue="stations">
      <TabsList>
        <TabsTrigger value="stations">Stations</TabsTrigger>
        <TabsTrigger value="users">Users</TabsTrigger>
      </TabsList>
      <TabsContent value="stations">
        <StationManagement />
      </TabsContent>
      <TabsContent value="users">
        <UserManagement />
      </TabsContent>
    </Tabs>
  );
}


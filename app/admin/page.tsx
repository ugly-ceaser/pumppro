'use client'

import AdminTabs from '@/components/admin-tabs'

export default function AdminPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <AdminTabs />
    </div>
  )
}


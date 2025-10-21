"use client"

import { useState, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { Card } from "@/components/ui/card"
import { Spinner } from "@/components/ui/spinner"
import { StatCard } from "./stat-card"
import { RecentUsersTable } from "./recent-users-table"
import { adminAPI } from "@/services/api"
import { useDashboardStats } from "@/hooks/useAdmin"

export interface DashboardStats {
  totalUsers: number
  totalProperties: number
  pendingVerifications: number
  pendingComplaints: number
  recentUsers: Array<{
    id: string
    name: string
    email: string
    joinDate: string
    status: "active" | "pending" | "inactive"
  }>
}

export function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalProperties: 0,
    pendingVerifications: 0,
    pendingComplaints: 0,
    recentUsers: [],
  })

  const {
    data: dashboardData,
    isLoading,
    error,
  } = useDashboardStats()
  useEffect(() => {
    if (dashboardData?.data) {
      setStats(dashboardData.data)
    }
  }, [dashboardData])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="rounded-lg bg-destructive/10 p-4 text-destructive">
          <p className="font-semibold">Error loading dashboard</p>
          <p className="text-sm">Failed to fetch dashboard statistics. Please try again later.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="p-6 md:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="mt-2 text-muted-foreground">{`Welcome back! Here's your system overview`}</p>
        </div>

        {/* Stats Grid */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Total Users" value={stats.totalUsers} icon="👥"
           />
          <StatCard
            title="Total Properties"
            value={stats.totalProperties}
            icon="🏠"
            // trend={{ value: 8, isPositive: true }}
          />
          <StatCard
            title="Pending Verifications"
            value={stats.pendingVerifications}
            icon="⏳"
            // trend={{ value: 3, isPositive: false }}
          />
          <StatCard
            title="Pending Complaints"
            value={stats.pendingComplaints}
            icon="⚠️"
            // trend={{ value: 2, isPositive: false }}
          />
        </div>

        {/* Recent Users Section */}
        <Card className="border border-border bg-card">
          <div className="border-b border-border p-6">
            <h2 className="text-xl font-semibold text-card-foreground">Recent Users</h2>
            <p className="mt-1 text-sm text-muted-foreground">Latest user registrations and activity</p>
          </div>
          <div className="p-6">
            <RecentUsersTable users={stats.recentUsers} />
          </div>
        </Card>
      </div>
    </div>
  )
}

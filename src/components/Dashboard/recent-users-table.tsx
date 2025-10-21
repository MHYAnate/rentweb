"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badgw"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"

interface User {
  id: string
  firstName: string
  lastName: string
  joinDate: string
  role: "ADMIN" | "AGENT" | "LANDLORD"
}

interface RecentUsersTableProps {
  users: any[]
}

export function RecentUsersTable({ users }: RecentUsersTableProps) {
  const getStatusColor = (status: User["role"]) => {
    switch (status) {
      case "ADMIN":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "AGENT":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "LANDLORD":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  if (users.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-muted-foreground">No users found</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            <TableHead className="text-muted-foreground">First Name</TableHead>
            <TableHead className="text-muted-foreground">Last Name</TableHead>
            <TableHead className="text-muted-foreground">Join Date</TableHead>
            <TableHead className="text-muted-foreground">Role</TableHead>
            <TableHead className="w-10 text-muted-foreground">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id} className="border-border hover:bg-muted/50">
              <TableCell className="font-medium text-card-foreground">{user.firstName}</TableCell>
              <TableCell className="text-muted-foreground">{user.lastName}</TableCell>
              <TableCell className="text-muted-foreground">{formatDate(user.joinDate)}</TableCell>
              <TableCell>
                <Badge className={`${getStatusColor(user.role)} capitalize`}>{user.role}</Badge>
              </TableCell>
              <TableCell>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" aria-label="More options">
                    X
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

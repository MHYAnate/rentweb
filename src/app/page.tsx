"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState<{ id: string; email: string; firstName: string; lastName: string; role: string; isEmailVerified: boolean; verificationStatus: string; createdAt: string; updatedAt: string; }[] | null>(null);

  useEffect(() => {
    fetch('https://rent-neon.vercel.app')
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.error('Error fetching data:', err));
  }, []);
  
  return (
    <div className="font-sans bg-gray-50 min-h-screen flex flex-col items-center justify-center px-6 py-12 sm:px-12">
    {data ? (
      <div className="grid gap-8 w-full max-w-6xl">
        {data.map((user: any) => (
          <div
            key={user.id}
            className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 transition hover:shadow-md"
          >
            <h2 className="text-lg font-semibold text-gray-800 mb-4">User Profile</h2>
            <div className="space-y-2 text-sm text-gray-700">
              <p><span className="font-medium text-gray-600">ID:</span> {user.id}</p>
              <p><span className="font-medium text-gray-600">Email:</span> {user.email}</p>
              <p><span className="font-medium text-gray-600">First Name:</span> {user.firstName}</p>
              <p><span className="font-medium text-gray-600">Last Name:</span> {user.lastName}</p>
              <p><span className="font-medium text-gray-600">Role:</span> {user.role}</p>
              <p><span className="font-medium text-gray-600">Email Verified:</span> {user.isEmailVerified ? "Yes" : "No"}</p>
              <p><span className="font-medium text-gray-600">Verification Status:</span> {user.verificationStatus}</p>
              <p><span className="font-medium text-gray-600">Created At:</span> {new Date(user.createdAt).toLocaleString()}</p>
              <p><span className="font-medium text-gray-600">Updated At:</span> {new Date(user.updatedAt).toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-gray-500 text-lg">Loading user data...</p>
    )}
  </div>
  );
}

import React, { Suspense } from 'react';
import LoginForm from './LoginForm';

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="text-center py-20">Loading login form...</div>}>
      <LoginForm />
    </Suspense>
  );
}
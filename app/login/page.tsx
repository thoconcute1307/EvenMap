'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';

import { api } from '@/lib/api';
import { setToken, setUser } from '@/lib/auth';

import AuthLayout from '@/components/auth/AuthLayout';
import TextInput from '@/components/auth/TextInput';
import PasswordInput from '@/components/auth/PasswordInput';
import AuthButton from '@/components/auth/AuthButton';
import AuthFooter from '@/components/auth/AuthFooter';

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const response = await api.post<{
      token: string;
      refreshToken: string;
      user: any;
    }>('/api/auth/login', {
      email,
      password,
    });

    setLoading(false);

    if (response.error) {
      toast.error(response.error);
      return;
    }

    if (response.data) {
      setToken(response.data.token);
      setUser(response.data.user);
      toast.success('Login successful!');

      // redirect theo role
      if (response.data.user.role === 'ADMIN') {
        router.push('/admin');
      } else if (response.data.user.role === 'EVENT_CREATOR') {
        router.push('/creator');
      } else {
        router.push('/home');
      }
    }
  };

  return (
    <AuthLayout
      title="Welcome back!"
      subtitle="Enter your credentials to access your account"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <TextInput
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <PasswordInput
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Forgot password */}
        <div className="text-right">
          <Link
            href="/forgot-password"
            className="text-sm text-blue-600 hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <AuthButton loading={loading}>
          Login
        </AuthButton>
      </form>

      <AuthFooter
        text="Don't have an account?"
        linkText="Sign Up"
        href="/register/role"
      />
    </AuthLayout>
  );
}

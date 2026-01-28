'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { api } from '@/lib/api';
import { setToken, setUser } from '@/lib/auth';

// ✅ ảnh trong project bạn: app/img/event_map_logo.jpeg
import eventMapLogo from '../img/event_map_logo.jpeg';

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    try {
      const res = await api.post('/api/auth/login', { email, password });

      const { token, user } = res.data as { token: string; user: any };
      if (!token || !user) throw new Error('Invalid response from server');

      setToken(token);
      setUser(user);

      toast.success('Login successful');

      if (user.role === 'ADMIN') router.push('/admin');
      else router.push('/login'); // vì bản tách chưa có /home
    } catch (err: any) {
      console.error('Login error:', err);
      toast.error(err?.response?.data?.error || err?.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
        {/* LEFT: Form */}
        <div className="flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            <h1 className="text-4xl font-bold">Welcome back!</h1>
            <p className="mt-2 text-gray-600">Enter your Credentials to access your account</p>

            <form onSubmit={handleLogin} className="mt-8 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700">Email address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-2 w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-2 w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-gray-500"
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-gray-600">
                  <input type="checkbox" className="h-4 w-4" />
                  Remember for 30 days
                </label>
                <a href="/forgot-password" className="text-blue-600 hover:underline">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-md bg-green-800 py-3 font-medium text-white hover:bg-green-900 disabled:opacity-50"
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>

              <p className="text-center text-sm text-gray-600">
                Don&apos;t have an account?{' '}
                <a href="/register/user" className="text-blue-600 hover:underline">
                  Sign Up
                </a>
              </p>
            </form>
          </div>
        </div>

        {/* RIGHT: Image */}
        <div className="relative hidden lg:block">
          <Image
            src={eventMapLogo}
            alt="Event Map"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </div>
  );
}

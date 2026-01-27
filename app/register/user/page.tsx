'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
<<<<<<< HEAD
import Link from 'next/link';
import { api } from '@/lib/api';
import toast from 'react-hot-toast';
import Image from 'next/image';
import logoMap from '../../img/event_map_logo.jpeg'

export default function RegisterUserPage() {
  const router = useRouter();
=======
import toast from 'react-hot-toast';

import { api } from '@/lib/api';
import AuthLayout from '@/components/auth/AuthLayout';
import TextInput from '@/components/auth/TextInput';
import PasswordInput from '@/components/auth/PasswordInput';
import AuthButton from '@/components/auth/AuthButton';
import AuthFooter from '@/components/auth/AuthFooter';

export default function RegisterUserPage() {
  const router = useRouter();

>>>>>>> QuocDo2
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    password: '',
    reEnterPassword: '',
  });
<<<<<<< HEAD
  const [agreeToTerms, setAgreeToTerms] = useState(false);
=======

>>>>>>> QuocDo2
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
<<<<<<< HEAD
    setLoading(true);

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      setLoading(false);
=======

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
>>>>>>> QuocDo2
      return;
    }

    if (formData.password !== formData.reEnterPassword) {
      toast.error('Passwords do not match');
<<<<<<< HEAD
      setLoading(false);
      return;
    }

    if (!agreeToTerms) {
      toast.error('Please agree to the terms & policy');
      setLoading(false);
      return;
    }

    const response = await api.post('/api/auth/register', {
      ...formData,
=======
      return;
    }

    setLoading(true);

    const response = await api.post('/api/auth/register', {
      name: formData.name,
      company: formData.company,
      email: formData.email,
      password: formData.password,
>>>>>>> QuocDo2
      role: 'USER',
    });

    setLoading(false);

    if (response.error) {
      toast.error(response.error);
    } else {
<<<<<<< HEAD
      toast.success('Registration successful! Please check your email for verification code.');
      router.push(`/verify?email=${encodeURIComponent(formData.email)}&type=EMAIL_VERIFICATION`);
=======
      toast.success('Registration successful! Please check your email.');
      router.push(
        `/verify?email=${encodeURIComponent(formData.email)}&type=EMAIL_VERIFICATION`
      );
>>>>>>> QuocDo2
    }
  };

  return (
<<<<<<< HEAD
    <div className="min-h-screen flex">
      <div className="flex-1 flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Get Started Now</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your name"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Your email address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter your email"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Enter your password"
                required
                minLength={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                onCopy={(e) => e.preventDefault()}
                onPaste={(e) => e.preventDefault()}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Re-enter Password</label>
              <input
                type="password"
                value={formData.reEnterPassword}
                onChange={(e) => setFormData({ ...formData, reEnterPassword: e.target.value })}
                placeholder="Enter your password"
                required
                minLength={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                onCopy={(e) => e.preventDefault()}
                onPaste={(e) => e.preventDefault()}
              />
            </div>

            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={agreeToTerms}
                  onChange={(e) => setAgreeToTerms(e.target.checked)}
                  className="mr-2"
                  required
                />
                <span className="text-sm">
                  I agree to the{' '}
                  <Link href="/terms" className="text-blue-600 hover:underline">
                    terms & policy
                  </Link>
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-light disabled:opacity-50"
            >
              {loading ? 'Signing up...' : 'Signup'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Have an account?{' '}
              <Link href="/login" className="text-blue-600 hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="relative flex-1 hidden lg:flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/80 via-indigo-400/80 to-purple-500/80" />
        <Image
        src={logoMap}
        alt="Event map Logo"
        fill
        priority
        className="object-contain"
        />
      </div>
    </div>
=======
    <AuthLayout split>
      <h1 className="text-3xl font-bold text-gray-700 mb-6">
        Get Started Now
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <TextInput
          placeholder="Name"
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
          required
        />

        <TextInput
          placeholder="Company name"
          value={formData.company}
          onChange={(e) =>
            setFormData({ ...formData, company: e.target.value })
          }
          required
        />

        <TextInput
          type="email"
          placeholder="Email address"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
          required
        />

        <PasswordInput
          placeholder="Password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          required
        />

        <PasswordInput
          placeholder="Re-enter password"
          value={formData.reEnterPassword}
          onChange={(e) =>
            setFormData({
              ...formData,
              reEnterPassword: e.target.value,
            })
          }
          required
        />

        <AuthButton loading={loading}>
          Signup
        </AuthButton>
      </form>

      <AuthFooter
        text="Have an account?"
        linkText="Sign In"
        href="/login"
      />
    </AuthLayout>
>>>>>>> QuocDo2
  );
}

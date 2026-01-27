'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/lib/api';
import toast from 'react-hot-toast';
import AuthLayout from '@/components/auth/AuthLayout';
import TextInput from '@/components/auth/TextInput';
import AuthButton from '@/components/auth/AuthButton';
import AuthFooter from '@/components/auth/AuthFooter';



export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const response = await api.post('/api/auth/forgot-password', { email });
    setLoading(false);

    if (response.error) {
      toast.error(response.error);
    } else {
      toast.success('Password reset code sent to your email');
      router.push(`/verify?email=${encodeURIComponent(email)}&type=PASSWORD_RESET`);
    }
  };

  return (
    <AuthLayout>
      <h2 className="text-gray-600 text-2xl font-bold mb-4">Forgot password</h2>
      <p className="text-gray-600 mb-6">
        Enter your email for the verification process.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <TextInput
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <AuthButton loading={loading}>
          CONTINUE
        </AuthButton>
      </form>

      <AuthFooter
        text=""
        linkText="← Back to Login"
        href="/login"
      />
    </AuthLayout>

  );
}

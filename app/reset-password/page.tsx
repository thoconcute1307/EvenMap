'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { api } from '@/lib/api';

import AuthLayout from '@/components/auth/AuthLayout';
import PasswordInput from '@/components/auth/PasswordInput';
import AuthButton from '@/components/auth/AuthButton';
import AuthFooter from '@/components/auth/AuthFooter';

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  const code = searchParams.get('code') || '';

  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (formData.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      setLoading(false);
      return;
    }

    const response = await api.post('/api/auth/reset-password', {
      email,
      code,
      newPassword: formData.newPassword,
      confirmPassword: formData.confirmPassword,
    });

    setLoading(false);

    if (response.error) {
      toast.error(response.error);
    } else {
      toast.success('Password reset successfully!');
      router.push('/login');
    }
  };

  return (
    <AuthLayout
      title="New Password"
      description="Set the new password for your account so you can login and access all features."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <PasswordInput
          label="New password"
          value={formData.newPassword}
          onChange={(e) =>
            setFormData({ ...formData, newPassword: e.target.value })
          }
        />

        <PasswordInput
          label="Confirm password"
          value={formData.confirmPassword}
          onChange={(e) =>
            setFormData({ ...formData, confirmPassword: e.target.value })
          }
        />

        <AuthButton loading={loading}>
          UPDATE PASSWORD
        </AuthButton>
      </form>

      <AuthFooter
        linkText="← Back to Login"
        href="/login"
      />
    </AuthLayout>
  );
}

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import { api } from '@/lib/api';
import AuthLayout from '@/components/auth/AuthLayout';
import TextInput from '@/components/auth/TextInput';
import PasswordInput from '@/components/auth/PasswordInput';
import AuthButton from '@/components/auth/AuthButton';
import AuthFooter from '@/components/auth/AuthFooter';

export default function RegisterUserPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    password: '',
    reEnterPassword: '',
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    if (formData.password !== formData.reEnterPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setLoading(true);

    const response = await api.post('/api/auth/register', {
      name: formData.name,
      company: formData.company,
      email: formData.email,
      password: formData.password,
      role: 'USER',
    });

    setLoading(false);

    if (response.error) {
      toast.error(response.error);
    } else {
      toast.success('Registration successful! Please check your email.');
      router.push(
        `/verify?email=${encodeURIComponent(formData.email)}&type=EMAIL_VERIFICATION`
      );
    }
  };

  return (
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
  );
}

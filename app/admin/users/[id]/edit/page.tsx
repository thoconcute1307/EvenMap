'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

/* ================= TYPES ================= */

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  gender?: string;
  language?: string;
  country?: string;
  timezone?: string;
  avatar?: string;
}

/* ================= PAGE ================= */

export default function EditUserPage() {
  const router = useRouter();
  const params = useParams();
  const userId = Array.isArray(params.id) ? params.id[0] : params.id;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'USER',
    gender: '',
    language: 'Tiếng Việt',
    country: 'Việt Nam',
    timezone: 'UTC+7',
    avatar: '',
  });

  /* ================= MOCK LOAD USER (FE ONLY) ================= */

  useEffect(() => {
    if (!userId) return;

    const mockUser: User = {
      id: userId,
      name: 'Demo User',
      email: 'demo@email.com',
      role: 'USER',
      gender: 'Nam',
      language: 'Tiếng Việt',
      country: 'Việt Nam',
      timezone: 'UTC+7',
      avatar: '',
    };

    setUser(mockUser);
    setFormData({
      name: mockUser.name,
      email: mockUser.email,
      role: mockUser.role,
      gender: mockUser.gender || '',
      language: mockUser.language || 'Tiếng Việt',
      country: mockUser.country || 'Việt Nam',
      timezone: mockUser.timezone || 'UTC+7',
      avatar: mockUser.avatar || '',
    });

    setLoading(false);
  }, [userId]);

  /* ================= SUBMIT (FE ONLY) ================= */

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    setTimeout(() => {
      setSaving(false);
      router.push('/admin/users');
    }, 800);
  };

  /* ================= LOADING ================= */

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        Loading...
      </div>
    );
  }

  /* ================= MAIN RENDER ================= */

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">
            Chỉnh sửa thông tin tài khoản
          </h1>

          <div className="flex space-x-4">
            <Link
              href="/admin"
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300"
            >
              Quản lí Sự Kiện
            </Link>

            <Link
              href="/admin/users"
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-light"
            >
              Quản lí tài khoản
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 max-w-4xl mx-auto">
          <div className="flex items-center space-x-4 mb-6">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-24 h-24 rounded-full object-cover"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center text-white text-3xl">
                {user?.name?.[0] || 'U'}
              </div>
            )}
            <h2 className="text-2xl font-bold">{user?.name}</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Name"
                value={formData.name}
                onChange={(v) =>
                  setFormData({ ...formData, name: v })
                }
              />

              <Input
                label="Email"
                type="email"
                value={formData.email}
                onChange={(v) =>
                  setFormData({ ...formData, email: v })
                }
              />

              <Select
                label="Account Type"
                value={formData.role}
                options={['USER', 'EVENT_CREATOR', 'ADMIN']}
                onChange={(v) =>
                  setFormData({ ...formData, role: v })
                }
              />

              <Select
                label="Gender"
                value={formData.gender}
                options={['', 'Nam', 'Nữ']}
                onChange={(v) =>
                  setFormData({ ...formData, gender: v })
                }
              />

              <Input
                label="Country"
                value={formData.country}
                onChange={(v) =>
                  setFormData({ ...formData, country: v })
                }
              />

              <Select
                label="Language"
                value={formData.language}
                options={['Tiếng Việt', 'English']}
                onChange={(v) =>
                  setFormData({ ...formData, language: v })
                }
              />

              <Select
                label="Time Zone"
                value={formData.timezone}
                options={['UTC+0', 'UTC+7', 'UTC+9', 'UTC+1', 'UTC-4']}
                onChange={(v) =>
                  setFormData({ ...formData, timezone: v })
                }
              />
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={saving}
                className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-light disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save'}
              </button>

              <button
                type="button"
                onClick={() => router.push('/admin/users')}
                className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

/* ================= REUSABLE INPUTS ================= */

function Input({
  label,
  value,
  onChange,
  type = 'text',
}: {
  label: string;
  value: string;
  type?: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
      />
    </div>
  );
}

function Select({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt || 'Select'}
          </option>
        ))}
      </select>
    </div>
  );
}

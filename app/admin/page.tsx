'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import toast from 'react-hot-toast';
import Link from 'next/link';

/* ================= MOCK BACKEND ================= */

// mock user
const getUser = () => ({
id: '1',
name: 'Admin',
role: 'ADMIN',
});

// mock role check
const hasRole = (role: string) => {
const user = getUser();
return user?.role === role;
};

// mock api
const api = {
get: async (url: string) => {
if (url === '/api/admin/stats') {
return {
data: {
totalUsers: 120,
totalEvents: 35,
eventsToday: 3,
newUsers: 7,
eventsByMonth: [
{ month: '01/2025', count: 4 },
{ month: '02/2025', count: 6 },
{ month: '03/2025', count: 8 },
{ month: '04/2025', count: 10 },
{ month: '05/2025', count: 7 },
],
},
};
}

return { error: 'API not found' };


},
};

/* ================= COMPONENT ================= */

export default function AdminDashboard() {
const router = useRouter();
const [stats, setStats] = useState<any>(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
const user = getUser();
if (!user || !hasRole('ADMIN')) {
router.push('/login');
return;
}
fetchStats();
}, []);

const fetchStats = async () => {
setLoading(true);
const response = await api.get('/api/admin/stats');
setLoading(false);

if (response.data) {
  setStats(response.data);
} else {
  toast.error(response.error || 'Failed to load statistics');
}

};

if (loading) {
return ( <div className="min-h-screen bg-gray-100"> <Header /> <div className="container mx-auto p-8"> <div className="text-center">Loading...</div> </div> </div>
);
}

return ( <div className="min-h-screen bg-gray-100"> <Header />

  <div className="container mx-auto p-8">
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <div className="flex space-x-4">
        <Link
          href="/admin/events"
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-light"
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

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Link href="/admin/users">
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600">Tổng số users</p>
          <p className="text-3xl font-bold">{stats?.totalUsers}</p>
        </div>
      </Link>

      <Link href="/admin/events">
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600">Tổng số events</p>
          <p className="text-3xl font-bold">{stats?.totalEvents}</p>
        </div>
      </Link>

      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-600">Events hôm nay</p>
        <p className="text-3xl font-bold">{stats?.eventsToday}</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-600">Users mới</p>
        <p className="text-3xl font-bold">{stats?.newUsers}</p>
      </div>
    </div>
  </div>
</div>

);
}

'use client';

import { ReactNode } from 'react';

interface AuthLayoutProps {
    children: ReactNode;
    title?: string;
    subtitle?: string;
}

export default function AuthLayout({
    children,
    title,
    subtitle,
}: AuthLayoutProps) {
    return (
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
            {/* LEFT */}
            <div className="flex items-center justify-center bg-white px-6">
                <div className="w-full max-w-md">
                    {title && (
                        <h1 className="text-3xl font-bold mb-2 text-gray-600">
                            {title}
                        </h1>
                    )}

                    {subtitle && (
                        <p className="text-gray-600 mb-6">
                            {subtitle}
                        </p>
                    )}

                    {children}
                </div>
            </div>

            {/* RIGHT */}
            <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-500 text-white">
                <div className="text-center">
                    <div className="text-4xl mb-4">📍</div>
                    <h2 className="text-4xl font-bold mb-2">Event Map</h2>
                    <p className="text-lg opacity-90">
                        Discover events around you
                    </p>
                </div>
            </div>
        </div>
    );
}

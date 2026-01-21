'use client';

import Link from 'next/link';

interface AuthFooterProps {
    text?: string;
    linkText: string;
    href: string;
}

export default function AuthFooter({
    text,
    linkText,
    href,
}: AuthFooterProps) {
    return (
        <div className="mt-6 text-center text-sm text-gray-600">
            {text && <span>{text} </span>}
            <Link
                href={href}
                className="text-blue-600 hover:underline font-medium"
            >
                {linkText}
            </Link>
        </div>
    );
}

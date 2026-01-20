'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PasswordInput(props: any) {
    const [show, setShow] = useState(false);

    return (
        <div className="relative">
            <input
                {...props}
                type={show ? 'text' : 'password'}
                onCopy={(e) => e.preventDefault()}
                onPaste={(e) => e.preventDefault()}
                className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-lg
                   bg-white text-gray-900 placeholder-gray-400
                   focus:outline-none focus:ring-2 focus:ring-primary"
            />

            <motion.button
                type="button"
                onClick={() => setShow(!show)}
                whileTap={{ scale: 0.9 }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
                {show ? <EyeOff size={20} /> : <Eye size={20} />}
            </motion.button>
        </div>
    );
}

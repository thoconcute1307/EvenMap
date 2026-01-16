import { InputHTMLAttributes } from 'react';

export default function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            {...props}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg
                 bg-white text-gray-900 placeholder-gray-400
                 focus:outline-none focus:ring-2 focus:ring-primary"
        />
    );
}

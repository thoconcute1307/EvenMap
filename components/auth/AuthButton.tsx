export default function AuthButton({ children, loading }: any) {
    return (
        <button
            disabled={loading}
            className="w-full bg-primary text-white py-3 rounded-lg
                 hover:bg-primary-light transition disabled:opacity-50"
        >
            {children}
        </button>
    );
}

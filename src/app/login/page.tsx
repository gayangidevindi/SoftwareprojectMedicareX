'use client';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  const handleSelect = (role: 'customer' | 'pharmacist') => {
    router.push(`/${role}`);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-3xl font-bold">Select Role</h1>
      <div className="flex gap-4">
        <button className="btn-primary" onClick={() => handleSelect('customer')}>
          Customer
        </button>
        <button className="btn-secondary" onClick={() => handleSelect('pharmacist')}>
          Pharmacist
        </button>
      </div>
    </div>
  );
}

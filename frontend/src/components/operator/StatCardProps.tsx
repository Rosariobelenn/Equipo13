interface StatCardProps {
  label: string;
  value: number;
}

export default function StatCard({ label, value }: StatCardProps) {
  return (
    <div className='bg-white rounded-xl shadow-sm p-4 text-center border'>
      <p className='text-sm text-gray-500'>{label}</p>
      <p className='text-2xl font-semibold text-gray-800'>{value}</p>
    </div>
  );
}

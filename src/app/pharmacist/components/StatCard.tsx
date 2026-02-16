interface StatCardProps {
  title: string;
  value: number | string;
}

export default function StatCard({ title, value }: StatCardProps) {
  return (
    <div className="group relative bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-200 p-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-teal-50/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      <div className="relative">
        <p className="text-xs font-semibold tracking-widest text-slate-400 uppercase mb-3">{title}</p>
        <p className="text-4xl font-extrabold text-slate-800 leading-none tabular-nums">{value}</p>
      </div>
    </div>
  );
}
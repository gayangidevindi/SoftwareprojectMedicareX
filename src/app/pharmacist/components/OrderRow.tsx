interface Props {
  order: any;
  onDeliver: () => void;
}

export default function OrderRow({ order, onDeliver }: Props) {
  const statusColors: Record<string, string> = {
    pending: 'bg-amber-100 text-amber-700 border border-amber-200',
    delivered: 'bg-emerald-100 text-emerald-700 border border-emerald-200',
    cancelled: 'bg-red-100 text-red-700 border border-red-200',
  };

  const paymentIcons: Record<string, string> = {
    cash: '💵', card: '💳', online: '📱',
  };

  return (
    <div className="group relative bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${
        order.status === 'pending' ? 'bg-amber-400'
        : order.status === 'delivered' ? 'bg-emerald-400'
        : 'bg-red-400'
      }`} />
      <div className="px-6 py-5 flex items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-base font-semibold text-slate-800 truncate">{order.customerName}</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2">
            <span className="text-sm text-slate-600 font-medium">
              Rs. <span className="text-teal-700 font-bold">{order.total}</span>
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-sm text-slate-500 flex items-center gap-1">
              <span>{paymentIcons[order.paymentMethod] ?? '💳'}</span>
              <span className="capitalize">{order.paymentMethod}</span>
            </span>
            <span className="text-slate-300">•</span>
            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${
              statusColors[order.status] ?? 'bg-slate-100 text-slate-600'
            }`}>
              {order.status}
            </span>
          </div>
        </div>
        {order.status === 'pending' && (
          <button
            onClick={onDeliver}
            className="shrink-0 flex items-center gap-2 bg-gradient-to-r from-teal-600 to-emerald-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-sm hover:shadow-md hover:from-teal-700 hover:to-emerald-700 active:scale-95 transition-all duration-150"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Mark Delivered
          </button>
        )}
      </div>
    </div>
  );
}
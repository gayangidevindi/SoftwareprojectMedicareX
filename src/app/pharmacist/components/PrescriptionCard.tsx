interface Props {
  prescription: any;
  onApprove: () => void;
  onReject: () => void;
}

export default function PrescriptionCard({ prescription, onApprove, onReject }: Props) {
  const statusConfig: Record<string, { label: string; classes: string }> = {
    pending: { label: 'Pending Review', classes: 'bg-amber-100 text-amber-700 border border-amber-200' },
    approved: { label: 'Approved', classes: 'bg-emerald-100 text-emerald-700 border border-emerald-200' },
    rejected: { label: 'Rejected', classes: 'bg-red-100 text-red-700 border border-red-200' },
  };
  const status = statusConfig[prescription.status] ?? { label: prescription.status, classes: 'bg-slate-100 text-slate-600' };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden">
      <div className={`h-1 w-full ${
        prescription.status === 'pending' ? 'bg-gradient-to-r from-amber-400 to-orange-400'
        : prescription.status === 'approved' ? 'bg-gradient-to-r from-teal-400 to-emerald-500'
        : 'bg-gradient-to-r from-red-400 to-rose-500'
      }`} />
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center shrink-0">
                <span className="text-white text-sm font-bold">
                  {prescription.customerName?.charAt(0)?.toUpperCase() ?? 'P'}
                </span>
              </div>
              <div>
                <p className="font-semibold text-slate-800 text-base leading-tight">{prescription.customerName}</p>
                <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold mt-0.5 ${status.classes}`}>
                  {status.label}
                </span>
              </div>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {prescription.customerPhone}
              </div>
              <div className="flex items-start gap-2 text-sm text-slate-500">
                <svg className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="line-clamp-2">{prescription.customerAddress}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end gap-3 shrink-0">
            
              href={prescription.imageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-xl border border-teal-200 bg-teal-50 px-3 py-2 text-sm font-semibold text-teal-700 hover:bg-teal-100 transition-colors duration-150"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              View
            </a>
            {prescription.status === 'pending' && (
              <>
                <button
                  onClick={onApprove}
                  className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 text-white px-4 py-2 text-sm font-semibold hover:from-teal-700 hover:to-emerald-700 active:scale-95 transition-all duration-150"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Approve
                </button>
                <button
                  onClick={onReject}
                  className="flex items-center gap-1.5 rounded-xl border border-red-200 bg-red-50 text-red-600 px-4 py-2 text-sm font-semibold hover:bg-red-100 active:scale-95 transition-all duration-150"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Reject
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    
  );
}
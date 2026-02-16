'use client';

import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useEffect, useState } from 'react';
import { MessageSquare, Star, User } from 'lucide-react';

export default function FeedbackPage() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'reviews'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, snap => {
      setReviews(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });
    return () => unsub();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full border-4 border-cyan-200 border-t-cyan-500 animate-spin" />
          <p className="text-sm text-slate-400 font-medium tracking-wide">Loading feedback…</p>
        </div>
      </div>
    );
  }

  const avgRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + (r.rating ?? 0), 0) / reviews.length).toFixed(1)
    : null;

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="bg-[#0f172a] rounded-2xl p-6 shadow-lg">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-xs font-semibold tracking-widest text-cyan-400 uppercase mb-1">Customer Voice</p>
            <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <MessageSquare className="w-7 h-7 text-cyan-400" />
              Feedback
            </h1>
            <p className="text-blue-300/60 text-sm mt-1">Customer reviews and ratings</p>
          </div>
          {avgRating && (
            <div className="flex items-center gap-3 bg-white/10 rounded-2xl border border-white/10 px-5 py-3">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map(star => (
                  <Star key={star} className={`w-4 h-4 ${star <= Math.round(Number(avgRating)) ? 'text-yellow-400 fill-yellow-400' : 'text-white/20 fill-white/20'}`} />
                ))}
              </div>
              <span className="text-base font-bold text-white">{avgRating}</span>
              <span className="text-xs text-blue-300/60">{reviews.length} reviews</span>
            </div>
          )}
        </div>
      </div>

      {/* Empty state */}
      {reviews.length === 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm py-20 text-center">
          <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="w-8 h-8 text-slate-300" />
          </div>
          <p className="text-slate-500 font-medium">No feedback yet.</p>
          <p className="text-slate-400 text-sm mt-1">Customer reviews will appear here.</p>
        </div>
      )}

      {/* Review cards */}
      <div className="grid gap-4">
        {reviews.map(r => (
          <div key={r.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
            <div className="h-1 w-full bg-gradient-to-r from-violet-400 via-purple-500 to-indigo-500" />
            <div className="p-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-400 to-indigo-500 flex items-center justify-center shrink-0 shadow-sm">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-base leading-tight">{r.productName}</p>
                    <p className="text-sm text-slate-400 mt-0.5">{r.customerName}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star key={star} className={`w-4 h-4 ${star <= Math.round(r.rating ?? 0) ? 'text-yellow-400 fill-yellow-400' : 'text-slate-200 fill-slate-200'}`} />
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-yellow-600 bg-yellow-50 px-2 py-0.5 rounded-full border border-yellow-200">
                    {r.rating}/5
                  </span>
                </div>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed border-l-2 border-violet-200 pl-4 italic">{r.comment}</p>
              {r.createdAt && (
                <p className="text-xs text-slate-300 mt-4 font-mono">
                  {new Date(r.createdAt.seconds * 1000).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
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
    return <div className="text-gray-500">Loading feedback...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <MessageSquare className="w-8 h-8 text-purple-600" />
        <h1 className="text-3xl font-bold text-gray-900">Customer Feedback</h1>
      </div>

      {reviews.length === 0 && (
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No feedback yet.</p>
        </div>
      )}

      <div className="grid gap-4">
        {reviews.map(r => (
          <div key={r.id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-bold text-lg text-gray-900">{r.productName}</p>
                <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                  <User className="w-4 h-4" />
                  <span>{r.customerName}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span className="font-semibold text-yellow-700">{r.rating}/5</span>
              </div>
            </div>
            <p className="text-gray-700 mt-3 leading-relaxed">{r.comment}</p>
            {r.createdAt && (
              <p className="text-xs text-gray-400 mt-3">
                {new Date(r.createdAt.seconds * 1000).toLocaleDateString()}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
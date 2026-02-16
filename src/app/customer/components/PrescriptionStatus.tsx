'use client';

import { useEffect, useState } from 'react';
import { db } from '../../lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';

interface PrescriptionStatusProps {
  prescriptionId: string;
}

export default function PrescriptionStatus({ prescriptionId }: PrescriptionStatusProps) {
  const [status, setStatus] = useState<string>('pending');
  const [rejectionReason, setRejectionReason] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const prescriptionRef = doc(db, 'prescriptions', prescriptionId);
    
    const unsubscribe = onSnapshot(prescriptionRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setStatus(data.status);
        setRejectionReason(data.rejectionReason || null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [prescriptionId]);

  if (loading) {
    return (
      <div style={{
        padding: '24px',
        borderRadius: '16px',
        background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
        border: '2px solid #e5e7eb'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <div style={{
            width: '24px',
            height: '24px',
            border: '3px solid #667eea',
            borderTop: '3px solid transparent',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}></div>
          <span style={{
            color: '#6b7280',
            fontSize: '16px',
            fontWeight: '500'
          }}>Loading prescription status...</span>
        </div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{
      borderRadius: '16px',
      overflow: 'hidden'
    }}>
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '16px 24px'
      }}>
        <h3 style={{
          fontSize: '18px',
          fontWeight: 'bold',
          color: 'white',
          margin: 0,
          letterSpacing: '0.5px'
        }}>📋 Prescription Status</h3>
      </div>
      
      {status === 'pending' && (
        <div style={{
          background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
          padding: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          borderLeft: '6px solid #f59e0b'
        }}>
          <div style={{
            fontSize: '48px',
            animation: 'pulse 2s ease-in-out infinite'
          }}>⏳</div>
          <div style={{ flex: 1 }}>
            <p style={{
              fontWeight: 'bold',
              fontSize: '18px',
              color: '#92400e',
              margin: '0 0 6px 0'
            }}>Pending Review</p>
            <p style={{
              fontSize: '14px',
              color: '#78350f',
              margin: 0,
              lineHeight: '1.5'
            }}>Your prescription is being carefully reviewed by our licensed pharmacist</p>
          </div>
          <style>{`
            @keyframes pulse {
              0%, 100% { opacity: 1; transform: scale(1); }
              50% { opacity: 0.8; transform: scale(1.1); }
            }
          `}</style>
        </div>
      )}
      
      {status === 'accepted' && (
        <div style={{
          background: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
          padding: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          borderLeft: '6px solid #10b981'
        }}>
          <div style={{
            fontSize: '48px',
            animation: 'bounce 1s ease-in-out infinite'
          }}>✅</div>
          <div style={{ flex: 1 }}>
            <p style={{
              fontWeight: 'bold',
              fontSize: '18px',
              color: '#065f46',
              margin: '0 0 6px 0'
            }}>Prescription Accepted</p>
            <p style={{
              fontSize: '14px',
              color: '#047857',
              margin: 0,
              lineHeight: '1.5'
            }}>Great news! Your prescription has been approved. You can now proceed with your order.</p>
          </div>
          <style>{`
            @keyframes bounce {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-10px); }
            }
          `}</style>
        </div>
      )}
      
      {status === 'rejected' && (
        <div style={{
          background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
          padding: '24px',
          borderLeft: '6px solid #ef4444'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '16px'
          }}>
            <div style={{
              fontSize: '48px',
              animation: 'shake 0.5s ease-in-out'
            }}>❌</div>
            <p style={{
              fontWeight: 'bold',
              fontSize: '18px',
              color: '#991b1b',
              margin: 0
            }}>Prescription Rejected</p>
          </div>
          {rejectionReason && (
            <div style={{
              background: 'rgba(255, 255, 255, 0.6)',
              padding: '16px',
              borderRadius: '12px',
              marginBottom: '16px'
            }}>
              <p style={{
                fontSize: '14px',
                fontWeight: '600',
                color: '#7f1d1d',
                margin: '0 0 8px 0'
              }}>📝 Reason for Rejection:</p>
              <p style={{
                fontSize: '15px',
                color: '#991b1b',
                margin: 0,
                lineHeight: '1.6'
              }}>{rejectionReason}</p>
            </div>
          )}
          <div style={{
            background: 'rgba(255, 255, 255, 0.6)',
            padding: '16px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <span style={{ fontSize: '24px' }}>💡</span>
            <p style={{
              fontSize: '14px',
              color: '#7f1d1d',
              margin: 0,
              lineHeight: '1.6'
            }}>Please upload a new prescription or contact our support team for assistance.</p>
          </div>
          <style>{`
            @keyframes shake {
              0%, 100% { transform: translateX(0); }
              25% { transform: translateX(-10px); }
              75% { transform: translateX(10px); }
            }
          `}</style>
        </div>
      )}
    </div>
  );
}
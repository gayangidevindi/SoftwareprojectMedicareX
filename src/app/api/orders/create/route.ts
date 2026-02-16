import { NextRequest, NextResponse } from 'next/server';
import { db, storage } from '/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    console.log('📤 Upload request received');
    
    const formData = await request.formData();
    const file = formData.get('prescription') as File;
    const customerName = formData.get('customerName') as string || 'Anonymous Customer';
    const customerPhone = formData.get('customerPhone') as string || 'Not provided';

    if (!file) {
      console.error('❌ No file provided');
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    console.log('📁 File received:', file.name, 'Size:', file.size);

    // 1. Upload file to Firebase Storage
    const timestamp = Date.now();
    const fileName = `${timestamp}_${file.name}`;
    const storageRef = ref(storage, `prescriptions/${fileName}`);
    
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    console.log('☁️ Uploading to Firebase Storage...');
    const uploadResult = await uploadBytes(storageRef, buffer, {
      contentType: file.type,
    });

    // 2. Get download URL
    const downloadURL = await getDownloadURL(uploadResult.ref);
    console.log('✅ File uploaded successfully:', downloadURL);

    // 3. Save metadata to Firestore
    const prescriptionData = {
      imageUrl: downloadURL,
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      status: 'pending',
      customerName: customerName,
      customerPhone: customerPhone,
      createdAt: serverTimestamp(),
      uploadedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    console.log('💾 Saving to Firestore...');
    const docRef = await addDoc(collection(db, 'prescriptions'), prescriptionData);
    console.log('✅ Firestore document created:', docRef.id);

    // 4. Send email notification to pharmacist
    let emailSent = false;
    try {
      console.log('📧 Sending email notification...');
      
      // Verify environment variables
      if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.PHARMACIST_EMAIL) {
        console.warn('⚠️ Email credentials not configured. Skipping email notification.');
      } else {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        await transporter.sendMail({
          from: `"MediCareX System" <${process.env.EMAIL_USER}>`,
          to: process.env.PHARMACIST_EMAIL,
          subject: '🔔 New Prescription Uploaded - MediCareX',
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); color: white; padding: 30px; border-radius: 12px 12px 0 0; }
                .header h1 { margin: 0; font-size: 28px; }
                .content { background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; }
                .info-box { background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0; }
                .info-row { display: flex; padding: 8px 0; border-bottom: 1px solid #e5e7eb; }
                .info-row:last-child { border-bottom: none; }
                .info-label { font-weight: bold; width: 140px; color: #374151; }
                .info-value { color: #1f2937; }
                .button { display: inline-block; background: #1e40af; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; margin-top: 20px; font-weight: bold; }
                .button:hover { background: #1e3a8a; }
                .footer { background: #f9fafb; padding: 20px; text-align: center; color: #6b7280; font-size: 14px; border-radius: 0 0 12px 12px; }
                .urgent { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; border-radius: 4px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>💊 MediCareX</h1>
                  <p style="margin: 10px 0 0 0; font-size: 16px;">New Prescription Alert</p>
                </div>
                
                <div class="content">
                  <div class="urgent">
                    <strong>⚡ Action Required:</strong> A new prescription has been uploaded and is awaiting your review.
                  </div>

                  <h2 style="color: #1e40af; margin-top: 0;">Prescription Details</h2>
                  
                  <div class="info-box">
                    <div class="info-row">
                      <span class="info-label">📋 Document ID:</span>
                      <span class="info-value">${docRef.id}</span>
                    </div>
                    <div class="info-row">
                      <span class="info-label">👤 Customer Name:</span>
                      <span class="info-value">${customerName}</span>
                    </div>
                    <div class="info-row">
                      <span class="info-label">📞 Phone:</span>
                      <span class="info-value">${customerPhone}</span>
                    </div>
                    <div class="info-row">
                      <span class="info-label">📄 File Name:</span>
                      <span class="info-value">${file.name}</span>
                    </div>
                    <div class="info-row">
                      <span class="info-label">📦 File Size:</span>
                      <span class="info-value">${(file.size / 1024 / 1024).toFixed(2)} MB</span>
                    </div>
                    <div class="info-row">
                      <span class="info-label">📅 Uploaded At:</span>
                      <span class="info-value">${new Date().toLocaleString('en-US', { 
                        dateStyle: 'full', 
                        timeStyle: 'short' 
                      })}</span>
                    </div>
                    <div class="info-row">
                      <span class="info-label">⚡ Status:</span>
                      <span class="info-value" style="color: #f59e0b; font-weight: bold;">⏳ PENDING REVIEW</span>
                    </div>
                  </div>

                  <p style="margin: 25px 0;">Please review this prescription as soon as possible and update its status in the dashboard.</p>

                  <a href="${downloadURL}" class="button" target="_blank">
                    📥 View Prescription Image
                  </a>

                  <p style="margin-top: 25px; padding: 15px; background: #eff6ff; border-radius: 8px; font-size: 14px;">
                    <strong>💡 Quick Actions:</strong><br>
                    1. Click the button above to view the prescription image<br>
                    2. Log in to your pharmacist dashboard to approve/reject<br>
                    3. Contact the customer at ${customerPhone} if clarification is needed
                  </p>
                </div>

                <div class="footer">
                  <p style="margin: 0 0 10px 0;"><strong>MediCareX Pharmacy Management System</strong></p>
                  <p style="margin: 0; font-size: 12px;">This is an automated notification. Please do not reply to this email.</p>
                  <p style="margin: 10px 0 0 0; font-size: 12px;">Need help? Contact support@medicarex.com</p>
                </div>
              </div>
            </body>
            </html>
          `,
        });

        emailSent = true;
        console.log('✅ Email notification sent successfully');
      }
    } catch (emailError) {
      console.error('❌ Email sending failed:', emailError);
      // Continue even if email fails - don't break the upload process
    }

    return NextResponse.json({
      success: true,
      message: 'Prescription uploaded successfully',
      prescriptionId: docRef.id,
      emailSent: emailSent,
      downloadURL: downloadURL,
    }, { status: 200 });

  } catch (error) {
    console.error('❌ Upload error:', error);
    return NextResponse.json({ 
      error: 'Failed to upload prescription',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
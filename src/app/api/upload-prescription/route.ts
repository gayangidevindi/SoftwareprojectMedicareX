import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { db } from '../../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('prescription') as File;

  const customerName = formData.get('customerName') as string;
const customerPhone = formData.get('customerPhone') as string;
const customerAddress = formData.get('customerAddress') as string;


    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // ✅ Save file locally in /public/uploads/prescriptions
    const uploadsDir = path.join(process.cwd(), 'public/uploads/prescriptions');
    if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
    const filePath = path.join(uploadsDir, file.name);
    fs.writeFileSync(filePath, buffer);

    const base64File = buffer.toString('base64');

    // Save prescription metadata in Firestore
    
    const docRef = await addDoc(collection(db, 'prescriptions'), {
      fileName: file.name,
      fileSize: file.size,
      imageUrl: `/uploads/prescriptions/${file.name}`,
      status: 'pending',
      customerName,
      customerPhone,
      customerAddress,
      createdAt: serverTimestamp(),
    });

    // Send notification email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.PHARMACIST_EMAIL,
      subject: '🔔 New Prescription Uploaded - MediCareX',
      html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2>New Prescription Uploaded</h2>
              <p><strong>Customer Name:</strong> ${customerName}</p>
              <p><strong>Phone:</strong> ${customerPhone}</p>
              <p><strong>Delivery Address:</strong> ${customerAddress}</p>
              <p><strong>File Name:</strong> ${file.name}</p>
              <p><strong>Size:</strong> ${(file.size / 1024 / 1024).toFixed(2)} MB</p>
              <p><strong>Upload Time:</strong> ${new Date().toLocaleString()}</p>
              <p><a href="${process.env.NEXT_PUBLIC_APP_URL}/uploads/prescriptions/${file.name}">View Prescription</a></p>
             </div>`,
      attachments: [
        {
          filename: file.name,
          content: base64File,
          encoding: 'base64',
        },
      ],
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      {
        success: true,
        message: 'Prescription uploaded and pharmacist notified',
        prescription: {
          id: docRef.id,
          fileName: file.name,
          fileSize: file.size,
          imageUrl: `/uploads/prescriptions/${file.name}`,
          status: 'pending',
          customerName,
         customerPhone,
          customerAddress,
          createdAt: new Date().toISOString(),
        },
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Failed to upload prescription' }, { status: 500 });
  }
}

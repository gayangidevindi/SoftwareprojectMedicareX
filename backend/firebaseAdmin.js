import admin from "firebase-admin";
import fs from "fs";

/* Read service account JSON safely */
const serviceAccount = JSON.parse(
  fs.readFileSync(new URL("./serviceAccountKey.json", import.meta.url))
);

/* Initialize Firebase Admin */
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

/* Firestore reference */
const db = admin.firestore();

export { admin, db };

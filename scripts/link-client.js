
const admin = require("firebase-admin");
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

// Load environment variables from .env.local
const envPath = path.resolve(__dirname, '../.env.local');
if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
} else {
    console.error('.env.local file not found!');
    process.exit(1);
}

// Initialize Firebase Admin
if (!admin.apps.length) {
    try {
        admin.initializeApp({
            credential: admin.credential.cert({
                projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                // Handle private key newlines correctly
                privateKey: process.env.FIREBASE_PRIVATE_KEY
                    ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
                    : undefined,
            }),
        });
        console.log('Firebase Admin initialized successfully.');
    } catch (error) {
        console.error('Failed to initialize Firebase Admin:', error);
        process.exit(1);
    }
}

const db = admin.firestore();

const email = process.argv[2];
const clientId = process.argv[3];

if (!email || !clientId) {
    console.error("Usage: node scripts/link-client.js <email> <clientId>");
    process.exit(1);
}

async function linkClient() {
    const emailKey = email.toLowerCase();
    const userRef = db.collection("users").doc(emailKey);

    try {
        const doc = await userRef.get();
        if (!doc.exists) {
            console.log(`User ${email} not found.Creating...`);
            await userRef.set({
                email: emailKey,
                clientId: clientId,
                role: "client",
                createdAt: admin.firestore.FieldValue.serverTimestamp(),
                updatedAt: admin.firestore.FieldValue.serverTimestamp(),
            });
        } else {
            console.log(`Updating user ${email} to link to client ${clientId}...`);
            await userRef.update({
                clientId: clientId,
                role: "client", // Ensure they are a client, not admin (unless specified otherwise, but user asked to connect client)
                updatedAt: admin.firestore.FieldValue.serverTimestamp(),
            });
        }
        console.log("Successfully updated user linkage.");
    } catch (error) {
        console.error("Error updating user:", error);
    }
}

linkClient();

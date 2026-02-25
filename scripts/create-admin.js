const admin = require('firebase-admin');
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

async function createAdminUser(email) {
    if (!email) {
        console.error('Please provide an email address.');
        process.exit(1);
    }

    const normalizedEmail = email.toLowerCase();

    try {
        // 1. Get User UID from Auth (Optional, just to verify user exists)
        try {
            await admin.auth().getUserByEmail(normalizedEmail);
        } catch (error) {
            if (error.code === 'auth/user-not-found') {
                console.error(`User ${normalizedEmail} not found in Firebase Auth. Please sign up first.`);
                process.exit(1);
            }
            throw error;
        }

        console.log(`Found user ${normalizedEmail}`);

        // 2. Create/Update User Document in Firestore (Keyed by Email)
        const userRef = db.collection('users').doc(normalizedEmail);
        const doc = await userRef.get();

        if (doc.exists) {
            console.log(`User profile for ${normalizedEmail} already exists. Updating role to admin...`);
            await userRef.update({
                role: 'admin',
                updatedAt: admin.firestore.FieldValue.serverTimestamp(),
            });
        } else {
            console.log(`Creating new admin profile for: ${normalizedEmail}`);
            await userRef.set({
                email: normalizedEmail,
                role: 'admin',
                createdAt: admin.firestore.FieldValue.serverTimestamp(),
                updatedAt: admin.firestore.FieldValue.serverTimestamp(),
                clientId: '',
                // We can store UID if we want, but doc ID is email
            });
        }
        console.log(`Successfully configured ${normalizedEmail} as admin.`);
    } catch (error) {
        console.error('Error creating/updating user:', error);
    }
}

// Get email from command line args
const emailArg = process.argv[2];
if (!emailArg) {
    console.log('Usage: node scripts/create-admin.js <email>');
    process.exit(1);
}

createAdminUser(emailArg);

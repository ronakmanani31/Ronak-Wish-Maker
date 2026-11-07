RONAK WISH MAKER — FIREBASE PACKAGE
===================================

INCLUDED
- index.html, app.js, style.css: Firebase-enabled website files
- firebase-config.js: your Firebase web app config
- firestore.rules: suggested Firestore rules
- storage.rules: suggested Storage rules
- backup/: original website files from the GitHub main branch

IMPORTANT BEFORE UPLOAD
1. Firebase Console > Firestore Database > Rules: publish firestore.rules.
2. Firebase Console > Storage > Rules: publish storage.rules.
3. Firebase Console > Authentication > Sign-in method: Email/Password must be enabled.
4. Firebase Console > Authentication > Users: your admin user must exist.
5. Firestore collection admins: document ID must be exactly your Auth UID; field role (string) = admin.
6. Firebase Storage must be enabled and the bucket must match firebase-config.js.
7. In GitHub, upload/replace index.html, app.js, style.css and add firebase-config.js to the repository root.
8. Wait for GitHub Pages deployment, then test Admin Login, create a test Wish, upload small media, open the Wish link in another browser/device, and test reactions.

DATA COLLECTIONS USED
- admins/{uid}: admin role document (create manually in Firebase Console)
- Wishes/{wishId}: public-read wishes; only admins can create/update/delete
- Reactions/{id}: public create, admin read
- Visits/{sessionId}: public create/update, admin read/delete
- CustomFestivals/{id}: admin managed

MEDIA
- images/, audio/, videos/ in Firebase Storage.
- Video limit: 1–35 seconds and 50 MB maximum.
- Audio limit: 2 MB. Image limit: 4 MB.

SECURITY NOTES
- Firebase web config/API key is not a password; Firestore and Storage Rules enforce access.
- Never publish passwords, service-account JSON, private keys, or OTPs.
- Visits rules are intentionally public create/update for anonymous visitors; this can be abused. For a production public website, add App Check and stronger rate limiting/server validation.
- Storage read is public so shared Wish media can play without login. Upload is admin-only.
- Existing old LocalStorage/IndexedDB entries are not automatically migrated to Firestore/Storage. Keep backup/ before replacing.
- This is a Firebase integration draft based on the current repository files. Test all features before treating it as production-ready.
- CustomFestivals are fetched from Firestore when the site loads.
- The admin dashboard local-data button clears only this browser local cache/video cache; it does NOT delete Firestore Wishes.

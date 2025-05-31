# WhatsApp Clone with Firebase

This is a simple WhatsApp clone built with React and Firebase. It uses Firebase Authentication for user login/signup and Firestore for real-time chat messages.

## Features

- User authentication (email/password)
- Real-time chat messages
- Responsive design with Tailwind CSS
- Modern black and white theme with Google Fonts

## Setup

1. Clone the repository.

2. Install dependencies:

```bash
npm install
```

3. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).

4. Enable Email/Password authentication in Firebase Authentication.

5. Create a Firestore database in test mode.

6. Copy your Firebase config from the project settings and replace the placeholders in `src/firebase.js`.

```js
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

7. Run the app:

```bash
npm start
```

8. Open http://localhost:3000 in your browser.

## Notes

- This is a basic implementation for demonstration purposes.
- You can extend it with features like media sharing, typing indicators, and more.

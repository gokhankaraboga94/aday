(function () {
  try {
    const firebaseConfig = {
      apiKey: "AIzaSyC2kdx87fjEfM-SnszPXZUz6-5rKxNrRu0",
      authDomain: "deneme-525a5.firebaseapp.com",
      databaseURL: "https://deneme-525a5-default-rtdb.firebaseio.com",
      projectId: "deneme-525a5",
      storageBucket: "deneme-525a5.firebasestorage.app",
      messagingSenderId: "491503514654",
      appId: "1:491503514654:web:1a3b404731e85ba2c32a0f",
      measurementId: "G-13N4L23Q31",
    };

    if (!window.firebase || typeof window.firebase.initializeApp !== "function") {
      window.TS_FIREBASE = null;
      return;
    }

    if (!firebase.apps || firebase.apps.length === 0) {
      firebase.initializeApp(firebaseConfig);
    }

    if (typeof firebase.database !== "function") {
      window.TS_FIREBASE = null;
      return;
    }

    const db = firebase.database();
    const auth = typeof firebase.auth === "function" ? firebase.auth() : null;

    window.TS_FIREBASE = {
      app: firebase.app(),
      db,
      auth,
    };

    if (typeof firebase.analytics === "function") {
      try {
        firebase.analytics();
      } catch (_) {
      }
    }
  } catch (e) {
    console.warn("Firebase init failed:", e);
    window.TS_FIREBASE = null;
  }
})();

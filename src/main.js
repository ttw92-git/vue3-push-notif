import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Initialize Firebase
import firebase from "firebase/compat/app";
import "firebase/compat/messaging";

firebase.initializeApp({
    apiKey: "AIzaSyBhGlM36_ek81kjG2onnXDIwBM1TQR3Pp0",
    authDomain: "p2m-ttw-push-notif.firebaseapp.com",
    projectId: "p2m-ttw-push-notif",
    storageBucket: "p2m-ttw-push-notif.appspot.com",
    messagingSenderId: "478329841565",
    appId: "1:478329841565:web:32f6da2cfebdcd2ac4f174"
});

navigator.serviceWorker
  .register("firebase-messaging-sw.js")
//   .then((registration) => {
//     const messaging = firebase.messaging();
//     messaging.useServiceWorker(registration);
//   })
  .catch((err) => {
    console.log(err);
  });
// fiebase configs end

const app = createApp(App)

app.use(router)

app.mount('#app')

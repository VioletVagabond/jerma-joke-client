import firebase from 'firebase/app'

import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCad4kSZWvYym8Ve1coV2J7mpRP7rVTdfE",
  authDomain: "northernlion-joke-tracker.firebaseapp.com",
  projectId: "northernlion-joke-tracker",
  storageBucket: "northernlion-joke-tracker.appspot.com",
  messagingSenderId: "603798316346",
  appId: "1:603798316346:web:a6a0c804b8f98382bd1c03",
  measurementId: "G-91F3S3HRQ0"
}

firebase.initializeApp(firebaseConfig)

// Enable cache
firebase.firestore().enablePersistence()

export default firebase

import firebase from 'firebase'
import 'firebase/storage'

var firebaseConfig = {
    apiKey: "AIzaSyDMSdZDMi8v2BuA5lZCanfn7iIfJsnAw6E",
    authDomain: "movie-database-season.firebaseapp.com",
    projectId: "movie-database-season",
    storageBucket: "movie-database-season.appspot.com",
    messagingSenderId: "814284809441",
    appId: "1:814284809441:web:f7fceb9eecd6a886ca03a0",
    measurementId: "G-3TDWSDFFCW"
};

export const app = firebase.initializeApp(firebaseConfig);
export const firebaseStorage = app.storage();
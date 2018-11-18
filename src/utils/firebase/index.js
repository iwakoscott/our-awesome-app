import firebase from 'firebase';

// Initialize Firebase
var config = {
  apiKey: 'AIzaSyCrS1onPpkGXtoTR2MVvtvEr5AdUG8v7XI',
  authDomain: 'example-1698e.firebaseapp.com',
  databaseURL: 'https://example-1698e.firebaseio.com',
  projectId: 'example-1698e',
  storageBucket: 'example-1698e.appspot.com',
  messagingSenderId: '1038220796667'
};

firebase.initializeApp(config);

const storage = firebase.storage();

export { storage };

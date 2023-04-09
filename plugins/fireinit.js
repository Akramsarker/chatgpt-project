/* eslint-disable no-unused-vars */
import firebase from 'firebase/app'
import 'firebase/auth'

// input your project credentials here
const firebaseConfig = {
  apiKey: 'AIzaSyBTptwmpMPUkZMMzC4ZRcWeNHrTOUI-qvU',
  authDomain: 'chatgpt-clone-3009d.firebaseapp.com',
  projectId: 'chatgpt-clone-3009d',
  storageBucket: 'chatgpt-clone-3009d.appspot.com',
  messagingSenderId: '930372337823',
  appId: '1:930372337823:web:7561d45bc36f0fa946e2aa',
  measurementId: 'G-ZVZ1LT4MXN',
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}
export const auth = firebase.auth()
export default firebase

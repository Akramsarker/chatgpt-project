/* eslint-disable no-unused-vars */
import firebase from 'firebase/app'
import 'firebase/auth'

// input your project credentials here
const firebaseConfig = {
  apiKey: 'xxxx',
  authDomain: 'xxx.firebaseapp.com',
  projectId: 'xx-xx',
  storageBucket: 'xx-xxx.appspot.com',
  messagingSenderId: '550711462248',
  appId: '1:xxx:web:14c8b8222652935b992edd',
  measurementId: 'G-xx',
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}
export const auth = firebase.auth()
export default firebase

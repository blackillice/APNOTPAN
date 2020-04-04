import firebase from 'firebase/app'
import 'firebase/database'

export const db = firebase
  .initializeApp({ databaseURL: 'https://apnotpan-3ca38.firebaseio.com' })
  .database()
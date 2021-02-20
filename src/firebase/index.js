import firebaseConfig from './.firebaseConfig.js'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()

const login = () => {
  const provider = new firebase.auth.GoogleAuthProvider()
  // 他のスコープにアクセスしたい場合 https://developers.google.com/identity/protocols/googlescopes?hl=ja
  // provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  firebase.auth().useDeviceLanguage()
  return firebase.auth().signInWithPopup(provider)
  // .then(function(result) {
  //   // This gives you a Google Access Token. You can use it to access the Google API.
  //   var token = result.credential.accessToken
  //   // The signed-in user info.
  //   var user = result.user
  //   // ...
  // })
  // .catch(function(error) {
  //   // Handle Errors here.
  //   var errorCode = error.code
  //   var errorMessage = error.message
  //   // The email of the user's account used.
  //   var email = error.email
  //   // The firebase.auth.AuthCredential type that was used.
  //   var credential = error.credential
  //   // ...
  // })
}

export { login, db, firebase }

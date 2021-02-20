import { db, firebase } from './index.js'

const postRef = db.collection('posts')

const shapeData = doc => {
  const post = {
    id: doc.id,
    ...doc.data(),
  }
  if (post.timestamp === null) {
    post.timestamp = new Date(Date.now())
  } else {
    post.timestamp = post.timestamp.toDate()
  }

  return post
}
const postMessage = (user, message) => {
  postRef
    .add({
      message: message,
      uid: user.uid,
      displayName: user.displayName,
      icon: user.photoURL,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then(result => {
      console.log(result)
    })
    .catch(error => {
      console.log(error)
    })
}

const getPost = callback => {
  //すでにデータベースにあるメッセージをロード
  postRef
    .orderBy('timestamp', 'asc')
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        callback(shapeData(doc))
      })
    })
}

const setPostListner = callback => {
  postRef
    .orderBy('timestamp', 'asc')
    .startAt(new Date(Date.now()))
    .onSnapshot(querySnapshot => {
      querySnapshot.docChanges().forEach(change => {
        if (change.type == 'added') {
          callback(shapeData(change.doc))
        }
      })
    })
}

export { postMessage, getPost, setPostListner }

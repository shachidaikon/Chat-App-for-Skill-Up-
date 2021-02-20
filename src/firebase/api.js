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

const deletePost = id => {
  postRef
    .doc(id)
    .delete()
    .then(() => {
      console.log('成功')
    })
    .catch(error => {
      console.log('失敗', error)
    })
}

const setPostListner = (added, removed) => {
  postRef.orderBy('timestamp', 'asc').onSnapshot(querySnapshot => {
    querySnapshot.docChanges().forEach(change => {
      if (change.type == 'added') {
        added(shapeData(change.doc))
      } else if (change.type == 'removed') {
        removed(change.doc.id)
      }
    })
  })
}

export { postMessage, setPostListner, deletePost }

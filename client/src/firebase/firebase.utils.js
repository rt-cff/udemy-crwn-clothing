import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyBw-4Wm9RNX59F7FyTXVy4A2iindv4imK4",
    authDomain: "udemy-crwn-db-3dd87.firebaseapp.com",
    databaseURL: "https://udemy-crwn-db-3dd87.firebaseio.com",
    projectId: "udemy-crwn-db-3dd87",
    storageBucket: "udemy-crwn-db-3dd87.appspot.com",
    messagingSenderId: "553700448400",
    appId: "1:553700448400:web:4a7f7184ec55ee135ca015"
}

export const createUserProfileDocument = async(userAuth, additionalData) => {
    if(!userAuth) return

    const userRef = firestore.doc(`users/${userAuth.uid}`)
    const snapShot = await userRef.get()

    if(!snapShot.exists) {
        const {displayName, email} = userAuth, createdAt = new Date()

        try {
            userRef.set({
                displayName, 
                email, 
                createdAt, 
                ...additionalData, 
            })
        }catch (error) {
            console.log('error creating user')
        }

        return userRef
    }
    else {
        console.log('already exist')
        return userRef
    }
}


firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({prompt: 'select_account'})
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export const createUserWithEmailAndPassword = (email, password) => auth.createUserWithEmailAndPassword(email, password)
export const signInWithEmailAndPassword = async (email, password) => auth.signInWithEmailAndPassword(email, password)
// will cause error with unknown reason
// export const signInWithEmailAndPassword = auth.signInWithEmailAndPassword

export const signOut = () => auth.signOut()

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey)
    const batch = firestore.batch()

    objectsToAdd.forEach(obj => {
        batch.set(collectionRef.doc(), obj)
    })

    await batch.commit()
}

export const convertCollectionSnapshotToMap = collections => {
    const transformedCollection = collections.docs.map(doc => {
        const {title, items} = doc.data()

        return {
            title, 
            routeName: encodeURI(title.toLowerCase()), 
            id: doc.id, 
            items, 
        }
    })

    return transformedCollection.reduce((obj, collection) => ({
        ...obj, 
        [collection.title.toLowerCase()]: collection, 
    }), {})
}

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(userAuth => {
            unsubscribe()
            resolve(userAuth)
        }, reject)
    })
}

export default firebase


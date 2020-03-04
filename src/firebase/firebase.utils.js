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
console.log(userAuth, additionalData, snapShot.exists)
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
export const signInWithEmailAndPassword = (email, password) => auth.signInWithEmailAndPassword(email, password)

export default firebase


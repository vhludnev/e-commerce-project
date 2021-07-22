import firebase from 'firebase/app'; // firebase utility library
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCdYIs3ZSytrR-LQ5RwGKMl2HARpBoj174",
    authDomain: "e-commerce-22.firebaseapp.com",
    projectId: "e-commerce-22",
    storageBucket: "e-commerce-22.appspot.com",
    messagingSenderId: "851500222568",
    appId: "1:851500222568:web:b25ca76d3b0e8d6230d3dd"
};

firebase.initializeApp(config);

// For sign up form
export const createUserProfileDocument = async (userAuth, additionalData) => {
	if (!userAuth) return;
  
	const userRef = firestore.doc(`users/${userAuth.uid}`);
	const snapShot = await userRef.get();
  
	if (!snapShot.exists) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();
		try {
			await userRef.set({
			displayName,
			email,
			createdAt,
			...additionalData
			});
		} catch (error) {
			console.log('error creating user', error.message);
		}
	}
  
	return userRef;
};

// for data export from js file to Firebase DB
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
	const collectionRef = firestore.collection(collectionKey);
  
	const batch = firestore.batch();
	objectsToAdd.forEach(obj => {
		const newDocRef = collectionRef.doc(); // creates new uid for each element
		batch.set(newDocRef, obj);
	});
  
	return await batch.commit();
};
  
export const convertCollectionsSnapshotToMap = collections => {
	const transformedCollection = collections.docs.map(doc => {
		const { title, items } = doc.data();
	
		return {
			routeName: encodeURI(title.toLowerCase()),
			id: doc.id,
			title,
			items
		};
	});
  
	return transformedCollection.reduce((accumulator, collection) => {
		accumulator[collection.title.toLowerCase()] = collection;
			return accumulator;
	}, {});
};
  


export const auth = firebase.auth();
export const firestore = firebase.firestore();

// setting up Google Auth utility
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
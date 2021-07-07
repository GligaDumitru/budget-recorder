import firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyCK098O1ZXCZwOGcBqfq4TqCzbLEWKBesQ",
  authDomain: "crwn-db-ec7eb.firebaseapp.com",
  projectId: "crwn-db-ec7eb",
  storageBucket: "crwn-db-ec7eb.appspot.com",
  messagingSenderId: "847991764665",
  appId: "1:847991764665:web:9eccd2f0d6bd2cab438d68",
  measurementId: "G-XZ69SC3KP8",
};

firebase.initializeApp(config);
export const firestore = firebase.firestore();
export const convertCollectionsSnapshotToMap = (collections) => {
  const transforCollection = collections.docs.map((doc) => {
    const res = {
      id: doc.id,
      ...doc.data(),
    };
    return res;
  });

  return transforCollection;
};
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);
  const batch = firestore.batch();
  const newDocRef = collectionRef.doc();
  batch.set(newDocRef, objectsToAdd);

  return await batch.commit();
};
export default firebase;

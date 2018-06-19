import firebase from 'firebase';
import config from '../constants/config';

firebase.initializeApp(config);

export const providerGoogle = new firebase.auth.GoogleAuthProvider();
export const providerFaceboook = new firebase.auth.FacebookAuthProvider();
export const auth = firebase.auth();
export default firebase;
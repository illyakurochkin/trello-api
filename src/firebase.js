const admin = require('firebase-admin');

const firebaseConfig = {
  apiKey: "AIzaSyAF0D2aSgIguxzVzzxbHfvFJBTsVoCIhFA",
  authDomain: "auth-f570a.firebaseapp.com",
  databaseURL: "https://auth-f570a.firebaseio.com",
  projectId: "auth-f570a",
  storageBucket: "auth-f570a.appspot.com",
  messagingSenderId: "310591516617",
  appId: "1:310591516617:web:8f9a557197cb61db"
};

const initialize = () => {
  admin.initializeApp(firebaseConfig);
};

const verifyToken = async (token) => admin.auth()
  .verifyIdToken(token)
  .then(({email}) => email)
  .catch((error) => {
    console.error('error', error);
    return null;
  });

module.exports = {
  initialize,
  verifyToken,
};

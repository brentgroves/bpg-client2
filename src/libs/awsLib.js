import { CognitoUserPool } from "amazon-cognito-identity-js";
import config from "../config";


export function signOutUser() {
  const currentUser = getCurrentUser();

  if (currentUser !== null) {
    currentUser.signOut();
  }
}



export async function authUser() {
  const currentUser = getCurrentUser();

  if (currentUser === null) {
    return false;
  }

  await getUserToken(currentUser);

  return true;
}

function getUserToken(currentUser) {
  return new Promise((resolve, reject) => {
    currentUser.getSession(function(err, session) {
      if (err) {
        reject(err);
        return;
      }
      resolve(session.getIdToken().getJwtToken());
    });
  });
}

function getCurrentUser() {
  const userPool = new CognitoUserPool({
    UserPoolId: config.cognito.USER_POOL_ID,
    ClientId: config.cognito.APP_CLIENT_ID
  });
  // from local storage
  return userPool.getCurrentUser();
}


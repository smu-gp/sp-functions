import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as cors from "cors";

const corsHandler = cors({ origin: true });

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

admin.initializeApp();

export const getToken = functions.https.onRequest((request, response) => {
  corsHandler(request, response, () => {
    if (request.method == "POST") {
      if (request.body.uid) {
        const uid = request.body.uid;
        admin
          .auth()
          .createCustomToken(uid)
          .then(customToken => {
            response.send(customToken);
          })
          .catch(error => {
            response.send(`err: ${error}`);
          });
      } else {
        response.send("getToken is required uid value");
      }
    } else {
      response.send("getToken is work only POST method.");
    }
  });
});

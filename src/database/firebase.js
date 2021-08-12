const serviceAccount = require("../../VisualizAR-app-firebase-adminsdk.json");

const connectToDatabase = async (firebase) => {
  await firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: process.env.DBURL ,
  });
  console.log("[connected] firebase is connected successfully");
};

module.exports = connectToDatabase;

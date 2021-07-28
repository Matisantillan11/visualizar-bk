const connectToDatabase = async (firebase) => {
  await firebase.initializeApp({
    credential: firebase.credential.applicationDefault(),
    databaseURL: "https://visualizar-app-default-rtdb.firebaseio.com/",
  });
  console.log("[connected] firebase is connected successfully");
};

module.exports = connectToDatabase;

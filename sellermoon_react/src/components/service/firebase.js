// 파이어베이스 공통코드 
import { initializeApp } from "firebase/app";
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FS_APIKEY,
    authDomain: process.env.REACT_APP_FS_AUTHDOMAIN,
    projectId: process.env.REACT_APP_FS_PROJECTID,
    storageBucket: process.env.REACT_APP_FS_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_FS_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_FS_APPID,
    measurementId: process.env.REACT_APP_FS_MEASUREMENTID
};

const firebaseApp = initializeApp(firebaseConfig)
export default firebaseApp
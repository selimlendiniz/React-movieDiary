import {initializeApp} from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import {getFirestore, collection, doc, onSnapshot, getDoc} from "firebase/firestore"
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {setMovie} from "../redux/movieSlice";



const firebaseConfig = {
    apiKey: "AIzaSyDMwx8XDGUC_1_qaKbLnP3rjXagNmrdD2g",
    authDomain: "moviediary-411d5.firebaseapp.com",
    projectId: "moviediary-411d5",
    storageBucket: "moviediary-411d5.appspot.com",
    messagingSenderId: "668038436691",
    appId: "1:668038436691:web:f62e6dc7af9c20bc6973a6",
    measurementId: "G-ZXB34G06MY"
};




const app = initializeApp(firebaseConfig);
getAnalytics(app);
export const auth = getAuth(app);
export const  db = getFirestore(app);



export const useMoviesLister = () => {
    const uid = auth.currentUser?.uid;
    const  dispatch = useDispatch();
    useEffect(() => {
        return onSnapshot(collection(db,`users/${uid}/movies/`), snapshot => {
            const docs = snapshot.docs.map((doc) => {
                const data = doc.data();
                return {id: doc.id, ...data}
            })
            dispatch(setMovie(docs))
        });
    },[dispatch]);
}

export const movieDidWatched = async  (movieId) => {
    const uid = auth.currentUser?.uid

    let watched = false;
    const snapshot = await getDoc(doc(db,`users/${uid}/movies/${movieId}`))
    let data = snapshot.data();

    if (data){
        console.log("data var")
        watched = true;
    }

    data = null

    return watched;



}



import Router from "./config/router";
import {auth, signIn, signUp, useMoviesLister} from "./config/firebase";
import {signOut} from "firebase/auth";
import {Provider} from "react-redux";
import {store} from './redux/index'
import {useEffect} from "react";


function App() {
    useEffect(() => {
        document.title = 'MovieDiary';
    }, []);


  return (
      <Provider store={store} >
        <Router />
      </Provider>

  );
}

export default App;

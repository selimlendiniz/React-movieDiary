import Router from "./config/router";
import {auth, signIn, signUp} from "./config/firebase";
import {signOut} from "firebase/auth";

function App() {

  signOut(auth);

  return (
    <Router />
  );
}

export default App;

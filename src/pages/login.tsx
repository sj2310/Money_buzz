import { auth, Provider } from "../config/firebase"
import {signInWithPopup} from "firebase/auth"
import { useNavigate } from "react-router-dom"
import "./css/login.css"
import googleImage from '../images/google.png';


const Login = () => {
  const navigate = useNavigate();
  const withgoogle = async ()=>{
    const data = await signInWithPopup(auth,Provider);
    console.log(data);
    navigate("/")
  }
  return (
    <div className="login-box">
      <img src={googleImage} alt='img' height="50px" width="50x"/>
      <img src={"../images/google.png"} alt=""></img>
      <p>Login with Google</p>
      <button onClick={withgoogle}>Sign in using Google</button>
    </div>
  )
}

export default Login
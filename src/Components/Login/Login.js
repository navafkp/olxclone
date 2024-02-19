import React, {useState, useContext} from 'react';
import { FirebaseContext } from '../../store/farebaseContext';
import Logo from '../../olx-logo.png';
import './Login.css';
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { Link, useNavigate } from 'react-router-dom';
function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const firebase = useContext(FirebaseContext)

  const navigate = useNavigate()
  const loginSubmit = (e) =>{
    e.preventDefault()
    console.log(email)
    console.log(password)
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      navigate('/')
    })
    .catch((error) => {
      alert(error.message)
    });

  }

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo} alt="logo"></img>
        <form onSubmit={(e)=>loginSubmit(e)}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
            className="input"
            type="email"
            id="fname"
            name="email"
           
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
            className="input"
            type="password"
            id="lname"
            name="password"
           
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <Link to={'/signup'}>Signup</Link>
       
      </div>
    </div>
  );
}

export default Login;

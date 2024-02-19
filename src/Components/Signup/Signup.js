import React, {useState, useContext} from 'react';
import  {Link, useNavigate} from 'react-router-dom'
import Logo from '../../olx-logo.png';
import './Signup.css';
import { FirebaseContext } from '../../store/farebaseContext';
import "firebase/compat/auth";
import "firebase/compat/firestore";

export default function Signup() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const firebase = useContext(FirebaseContext)

  const navigate = useNavigate();
  const usernameChange = (e) =>{
    setUsername(e.target.value)
  }
  const emailChange = (e) =>{
    setEmail(e.target.value)   
  }
  const phoneChange = (e) =>{
    setPhone(e.target.value)  
  }
  const passwordChange = (e) =>{
    setPassword(e.target.value)
  }

  const handleSubmiForm = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          user.updateProfile({ displayName: username }).then(() => {
            console.log("User profile updated");
            firebase
              .firestore()
              .collection("users")
              .add({
                id: user.uid,
                username: username,
                phone: phone,
              })
              .then(() => {
                console.log("User added to the database");
                navigate("/login");
              })
              .catch((error) => {
                console.error("Error adding user to the database:", error);
              });
          });
        } else {
          console.error("User is undefined");
        }
      })
      .catch((error) => {
        console.error("Error signing up:", error);
      });
  };
  
  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt="logo"></img>
        <form onSubmit={(e)=>handleSubmiForm(e)}  >
          <label htmlFor="fname">Username</label>
          <br />
          <input
          value={username}
          onChange={(e)=>usernameChange(e)}
            className="input"
            type="text"
            id="fname"
            name="name"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input

          value={email} onChange={(e)=>emailChange(e)}
            className="input"
            type="email"
            id="fname"
            name="email"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
          value={phone} onChange={(e)=>phoneChange(e)}
            className="input"
            type="text"
            id="lname"
            name="phone"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
          onChange={(e)=>passwordChange(e)}
            className="input"
            type="password"
            id="lname"
            name="password"

          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <Link to={'/login'}>Login</Link>

      </div>
    </div>
  );
}

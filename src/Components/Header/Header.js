import React, {useContext} from 'react';

import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { Link } from 'react-router-dom';
import { AuthContext, FirebaseContext } from '../../store/farebaseContext';
import { useNavigate } from 'react-router-dom';
import 'firebase/compat/auth'

function Header() {
  const {user} = useContext(AuthContext)
  const firebase  = useContext(FirebaseContext)
  const navigate  = useNavigate()

  const logoutFun = (e) =>{
    firebase.auth().signOut().then(() => {
      console.log("succcess logout")
    }).then(()=>{
    navigate('/login')
    }).catch((error) => {
      // An error happened.
    });
  }


  const sellFun = (e) =>{
    if(user){
      navigate('/sell-your-vehicle')
    }else{
      navigate('/login')
    }
    
  }
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
   <span >
        <span className='loginandout'>  
          {user? `${user.displayName}`: <Link to={'/login'}>Login</Link>}
         </span>
        
         <span> 
          {user? <Link>Logout</Link>: ''}
           </span>
           </span>
         
        </div>

        <div className="sellMenu" onClick={(e)=>sellFun(e)}>
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus ></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;

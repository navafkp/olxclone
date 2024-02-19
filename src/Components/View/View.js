import React, {useContext, useState, useEffect} from 'react';

import './View.css';
import { PostDetails } from '../../store/postContext';
import { FirebaseContext } from '../../store/farebaseContext';

function View() {
  const [userDetails, setUserDetails] = useState();
  const {postData} = useContext(PostDetails);
  const {firebase} = useContext(FirebaseContext);
 
  useEffect(() => {
    if (postData) {
      const { userId } = postData;
      firebase
        .firestore()
        .collection('users')
        .where('id', '==', userId)
        .get()
        .then((res) => {
          res.forEach((doc) => {
            setUserDetails(doc.data());
            console.log(userDetails);
          });
        });
    }
  },[]);

  if (!postData) {
    return <div>Loading...</div>; // or a loading spinner
  }

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postData.url}
          alt="vehicle"
        />
      </div>
      <div className="rightSection">
        
        <div className="productDetails">
          <p>&#x20B9; {postData.price} </p>
          <span>{postData.name}</span>
          <p>{postData.created_at}</p>
          <span></span>
        </div>
       {userDetails &&  
        <div className="contactDetails">
          <p>Seller details</p>
          <p>{ userDetails.username}</p>
          <p>{ userDetails.phone}</p>
        </div>
        }
      </div>
    </div>
  );
}
export default View;

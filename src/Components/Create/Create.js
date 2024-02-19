import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import "firebase/compat/storage";
import "firebase/compat/firestore"
import { AuthContext , FirebaseContext} from '../../store/farebaseContext';
import { useNavigate } from 'react-router-dom';
const Create = () => {
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState(null)
  const {user} = useContext(AuthContext)
  const firebase = useContext(FirebaseContext)
  const navigate = useNavigate()
  
  const date  =new Date()
  const handleSubmit = ()=>{
    firebase.storage().ref(`/image/${image.name}`).put(image).then(({ref})=>{
      ref.getDownloadURL().then((url)=>{
        console.log(url);
        firebase.firestore().collection('product').add({
          name,
          category,
          price,
          url,
          userId:user.uid,
          created_at:date.toDateString(),
        })
      }).then(()=>{
        navigate('/')
      })
    }
    ).catch((error)=>{
      console.log(error)
    })
  }
  ;
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
        
            <label htmlFor="fname">Name</label>
            <br />
            <input
            value={name}
            onChange={(e)=>setName(e.target.value)}
              className="input"
              type="text"
              id="fname"
              name="Name"
              
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
             value={category} 
             onChange={(e)=>setCategory(e.target.value)}
              className="input"
              type="text"
              id="fname"
              name="category"
           
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input   value={price}
             onChange={(e)=>setPrice(e.target.value)} className="input" type="text" id="fname" name="Price" />
            <br />
          
          <br />
          <img alt="Posts" width="200px" height="200px" src={image? URL.createObjectURL(image): ' '}></img>
        
            <br />
            <input onChange={(e)=>setImage(e.target.files[0])} type="file" />
            <br />
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
          
        </div>
      </card>
    </Fragment>
  );
};

export default Create;

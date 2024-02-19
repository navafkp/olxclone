import React, {useState, useEffect, useContext} from 'react';
import {FirebaseContext} from '../../store/farebaseContext'
import {PostDetails} from '../../store/postContext'
import Heart from '../../assets/Heart';
import './Post.css';
import "firebase/compat/firestore"
import { useNavigate } from 'react-router-dom';
function Posts() {
  const {firebase}  = useContext(FirebaseContext)
  const [products, setProducts] = useState([])

  const {setPostDate} = useContext(PostDetails)
  const navigate = useNavigate()
  const date = new Date()
  const formatdate = date.toDateString()
  useEffect(()=>{
    firebase.firestore().collection('product').get().then((snap)=>{
      const allPost = snap.docs.map((product)=>{     
        return{
          ...product.data(),
          id:product.id,
        }   
      })
        setProducts(allPost) 
    })
  },[])

  


  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">

          {products.map((product)=>{
            
            return(<div  key={product.id} className="card">

            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img onClick={()=>{setPostDate(product); console.log(product); navigate('/view-post')}} src={product.url} alt="" />
            
            </div>
            <div className="content">
              <p className="rate">&#x20B9; {product.price}</p>
              <span className="kilometer">{product.category}</span>
              <p className="name"> {product.name}</p>
            </div>
            <div className="date">
              <span>{product.created_at}</span>
            </div>
          </div>)
          })}


        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          {products.map((product)=>{
            console.log(product)
          
            console.log(formatdate)
            console.log(product.created_at)
            if(product.created_at == formatdate){
              
              return(
                <div  key={product.id} className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src={product.url} alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; {product.price}</p>
              <span className="kilometer">{product.category}</span>
              <p className="name"> {product.name}</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
              )
            }
          })}
        </div>
      </div>
    </div>
  );
}

export default Posts;

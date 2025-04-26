import './App.css'
import {  Route, Routes, Link } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Register from "./Register";
import Login from "./Login";
import Account from "./Account";
import { logout,fetchUserAccount } from "./UserSlice";
import Category from "./Category";
import Product from "./Product";
import UnAuthorized from "./UnAuthorized";
import PrivateRoute from "./PrivateRoute";
import ProtectedRoute from "./ProtectedRoute";


export default function ClassifiedApp(){
    const {isLoggedIn,data}=useSelector((state)=>{
        return state.user
      })
      console.log(isLoggedIn) 
       const dispatch=useDispatch()
       const navigate=useNavigate()
       useEffect(()=>{
           if(localStorage.getItem('token')){
               dispatch(fetchUserAccount())
           }
       },[dispatch])
    return(
        <div className="App">
            <h2>Classified App</h2>
        <div>
            {isLoggedIn?(<> <Link to="/account">Account</Link> <br/>
           {data.role==="admin" && <Link to="/category">Category</Link> }<br/>
           {data.role==="seller" && <Link to="/product">Product</Link>} <br/>
            <button onClick={()=>{dispatch(logout()) 
                localStorage.removeItem("token")
                navigate("/login")
            }}>Logout</button></>):(<><Link to="/register">Register</Link> <br />
            <Link to="/login">Login</Link> <br/></>)}
        
        </div>
        <Routes>
            <Route path="/register" element={<Register />} /> 
            <Route path="/login" element={<Login />} />
            <Route path="/account" element={<PrivateRoute><Account /></PrivateRoute>} />
            <Route path="/category" element={<PrivateRoute><ProtectedRoute roles={['admin']}><Category /></ProtectedRoute></PrivateRoute>} />
            <Route path="/product" element={<PrivateRoute><ProtectedRoute roles={['seller']}><Product /></ProtectedRoute></PrivateRoute>} />
            <Route path='/unauthorised'element={<UnAuthorized />} />
        </Routes>
        </div>
    )
}

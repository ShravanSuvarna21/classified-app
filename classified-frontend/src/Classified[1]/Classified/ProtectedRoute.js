import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
export default function ProtectedRoute(props){

    const {data} = useSelector((state)=>{
         return state.user
    })
    console.log(data)

    if(props.roles.includes(data.role)){
        return props.children
    }else{
        return <Navigate  to="/unAuthorized"/>
    }
}
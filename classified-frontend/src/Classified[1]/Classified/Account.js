import {useSelector} from 'react-redux'
export default function Account(){
    const {data}=useSelector((state)=>{
        return state.user
    })
    if(!data) return false
    // console.log(data)
    return(
        <div>
            <h2>Account Details</h2>
            <p>email is -{data.email}</p>
            <p>role is -{data.role}</p>
        </div>
    )
}
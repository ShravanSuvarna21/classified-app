import { useState } from "react"; 
import { isEmail } from 'validator';
import { useNavigate} from 'react-router-dom'; 
import {useDispatch} from 'react-redux'
import { login } from "./UserSlice";
import axios from "axios";
export default function Login() {
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState(''); 
    const [clientErrors, setClientErrors] = useState({}); 
    const [serverErrors, setServerErrors] = useState(null); 
    const navigate = useNavigate(); 
    const dispatch=useDispatch()
    const handleSubmit = async (e) => { 
        e.preventDefault(); 
        const errors = {};

        if(email.trim().length === 0) {
            errors.email = 'email is required'; 
        } else if(!isEmail(email)) { // check email format
            errors.email = 'email is invalid'; 
        }

        if(password.trim().length === 0) {
            errors.password = 'password is required'; 
        } else if(password.trim().length < 8 || password.trim().length > 128) {
            errors.password = 'password should be between 8 to 128 characters'; 
        }
        if(Object.keys(errors).length > 0) {
            setClientErrors(errors); 
        } else {
            const formData = {
                email: email,
                password: password
            }
            try {
                const response = await axios.post('http://localhost:3036/login', formData)
                console.log(response.data); 
                localStorage.setItem('token',response.data.token)
                const userResponse=await axios.get('http://localhost:3036/account',{headers:{Authorization:localStorage.getItem('token')}})
                // console.log(userResponse.data)
                dispatch(login(userResponse.data))
                navigate('/account'); 
            } catch(err) {
                console.log(err)
                setServerErrors(err.response.data.error); 
                setClientErrors({}); 
            }
        }
    }
    return (
        <div>
            <h2>Login</h2>
            { serverErrors && (
                <div>
                    {/* <h3>These error/s prohibitted the form from being saved: </h3>
                    <ul>
                        { serverErrors.map((err, i) => {
                            return <li key={i}>{err.msg}</li>
                        })}
                    </ul> */}
                    <h2>{serverErrors}</h2>
                </div> 
            )}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Enter email</label> <br />
                    <input 
                        type="text" 
                        value={email} 
                        onChange={e => setEmail(e.target.value)} 
                        id="email" 
                    />
                    { clientErrors.email && <p style={{color:"red"}}> { clientErrors.email } </p>}
                </div>
                <div>
                    <label htmlFor="password">Enter password</label> <br />
                    <input 
                        type="password" 
                        value={password} 
                        onChange={e => setPassword(e.target.value)} 
                        id="password"    
                    />
                    { clientErrors.password && <p style={{color:"red"}}> { clientErrors.password } </p>}
                </div>
                <div>
                    <input type="submit" />
                </div>
            </form>
        </div>
    )
}
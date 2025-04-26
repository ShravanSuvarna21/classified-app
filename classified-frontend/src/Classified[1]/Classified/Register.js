import { useState } from "react"; 
import { isEmail } from 'validator';
import { useNavigate} from 'react-router-dom'; 
import axios from "./Axios"
export default function Register() {
    const [name,setName] = useState("");
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState(''); 
    const [role, setRole] = useState(''); 
    const [clientErrors, setClientErrors] = useState({}); 
    const [serverErrors, setServerErrors] = useState(null); 
    const navigate = useNavigate(); 
    const handleSubmit = async (e) => { 
        e.preventDefault(); 
        const errors = {}; 
        if(name.trim().length === 0) {
            errors.name = 'name is required'; 
        }
        if(email.trim().length === 0) {
            errors.email = 'email is required'; 
        } else if(!isEmail(email)) { 
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
                name: name,
                email: email,
                password: password,
                role: role
            }
            try {
                const response = await axios.post('/register', formData)
                console.log(response.data); 
                navigate('/login'); 
            } catch(err) {
                setServerErrors(err.response.data.error); 
                setClientErrors({}); 
            }
        }
    }
    return (
        <div>
            <h2>Register</h2>
            { serverErrors && (
                <div>
                    <h3>These error/s prohibitted the form from being saved: </h3>
                    <ul>
                        { serverErrors.map((err, i) => {
                            return <li key={i}>{err.msg}</li>
                        })}
                    </ul>
                </div> 
            )}
            <form onSubmit={handleSubmit}>
            <div>
                    <label htmlFor="email">Enter Name</label> <br />
                    <input 
                        type="text" 
                        value={name} 
                        onChange={e => setName(e.target.value)} 
                        id="name" 
                    />
                    { clientErrors.name && <p> { clientErrors.name } </p>}
                </div>
                <div>
                    <label htmlFor="email">Enter email</label> <br />
                    <input 
                        type="text" 
                        value={email} 
                        onChange={e => setEmail(e.target.value)} 
                        id="email" 
                    />
                    { clientErrors.email && <p> { clientErrors.email } </p>}
                </div>
                <div>
                    <label htmlFor="password">Enter password</label> <br />
                    <input 
                        type="password" 
                        value={password} 
                        onChange={e => setPassword(e.target.value)} 
                        id="password"    
                    />
                    { clientErrors.password && <p> { clientErrors.password } </p>}
                </div>

                <div>
                    <label>Select role</label>
                    <input 
                        type="radio" 
                        id="buyer" 
                        name="role" 
                        checked={role === 'buyer'} 
                        onChange={() => { setRole("buyer")}} 
                    /> <label htmlFor="buyer"> buyer</label>
                    <input 
                        type="radio" 
                        id="seller" 
                        name="role" 
                        checked={role === 'seller'} 
                        onChange={() => setRole("seller")} 
                    /> <label htmlFor="seller"> seller</label>
                </div>
                <div>
                    <input type="submit" />
                </div>
            </form>
        </div>
    )
}
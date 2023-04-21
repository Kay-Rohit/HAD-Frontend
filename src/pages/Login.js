import React, {useState} from 'react';
import axios from 'axios';
import swal from 'sweetalert'
import {useNavigate} from 'react-router-dom'
import jwt_decode from "jwt-decode";
import { loginURL, loginURL_v2 } from '../assets/URLs';

function LoginComponent(){

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [pwd, setPwd] = useState('');

    const enabled = username.length>0 && pwd.length>0;

    //code to skip ngrok browser error part

    const handleLogin = async(event) => {
        event.preventDefault();

        try{
            const response1 = await axios.post(loginURL, {
                username: username,
                password: pwd
            },{
                headers:{
                    'ngrok-skip-browser-warning':'true'
                }
            });

            const token = response1.headers['authorization'];
            console.log(token);

            //authority role check
            var decoded = jwt_decode(token.substring(7));
            const role = decoded.authorities[3].authority;

            console.log("decoded", role);

            //ONLY DOCTORS are allowed to LOGIN
            if(decoded.authorities[3].authority==='ROLE_DOCTOR'){
                localStorage.setItem('jwt-token', token);
                let config = {
                    headers: {
                        Authorization: token,
                        'ngrok-skip-browser-warning':'true'
                        }
                };

                const response2 = await axios.post(loginURL_v2, {
                    username: username,
                    password: pwd
                }, config);

                // console.log("logged in user data :", response2.data);
                localStorage.setItem('jwt-token', token);
                localStorage.setItem('user', JSON.stringify(response2.data));
                localStorage.setItem('role', role);
                navigate("/");
            }
            else if(decoded.authorities[3].authority==='ROLE_ADMIN'){
                            //ONLY ADMINS
                localStorage.setItem('jwt-token', token);
                // localStorage.setItem('user', JSON.stringify(response2.data));
                localStorage.setItem('role', role)
                navigate("/admin");
            }
            else{
                swal("This is doctor portal", "use the app instead", "error");
                navigate("/login");
            }

        }
        catch(error){
            console.log(error);
            swal("invalid Credentials","please check your login id or password","error");

        }
    }

    return (
        <>
        <section className="vh-100 gradient-form" style={{backgroundColor: "#eee"}}>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-xl-10">
                        <div className="card rounded-3 text-black">
                        <div className="row g-0">
                            <div className="col-lg-6">
                            <div className="card-body p-md-5 mx-md-4">

                                <div className="text-center">

                                <form className='mt-3 py-3'>
                                <p>Please login to your account</p>

                                <div className="form-outline mb-4">
                                    <input type="text" id="username" className="form-control"
                                    placeholder="UserName" 
                                    value={username}
                                    onChange={event => setUsername(event.target.value)}
                                    required
                                    />
                                    <label className="form-label" htmlFor="email">Username</label>
                                </div>

                                <div className="form-outline mb-4">
                                    <input type="password" id="password" className="form-control"
                                    placeholder="Your Password" 
                                    value={pwd}
                                    onChange={event => setPwd(event.target.value)}
                                    required
                                    />
                                    <label className="form-label" htmlFor="password">Password</label>
                                </div>

                                <div className="text-center pt-1 mb-5 pb-1">
                                    <button 
                                        className="btn btn-dark btn-block fa-lg gradient-custom-2 mb-3" type="button"
                                        onClick={handleLogin}
                                        disabled={!enabled}
                                        >
                                        Login
                                    </button>
                                    
                                </div>
                                </form>
                                <br />
                                <span className='text-muted'>Donot have an accout? <button 
                                    className='btn btn-sm btn-light'
                                    type='button'
                                    onClick={()=>{
                                        navigate("/register");
                                    }}
                                    
                                    >
                                        Register
                                    </button>
                                </span>

                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </section>
        </>
    );
}


export default LoginComponent;
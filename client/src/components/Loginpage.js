import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Loginpage() {
    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");

    const navigate = useNavigate();

    const AddUser = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3001/AddUser', { username: Username, password: Password })
                .then(result => {
                    alert('User Registration Successful');
                    console.log(result.data); // Log the response from the server
                })
                .catch(error => console.log(error));
        } catch (error) {
            console.log(error);
        }
    };
    

    const CheckUser = async (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/CheckUser', { username: Username, password: Password }) // Pass username and password
            .then(result => {
                if (result.data.message === 'Login Successful') {
                    alert(result.data.message); // Show login successful message
                    navigate('/Homepage');
                } else if (result.data === 'Please Check the Password') {
                    alert('Incorrect Password');
                } else {
                    alert('Error');
                }
            })
            .catch(error => console.log(error))
    };
    

    return (
        <div className='loginpage'>
            <div className='user-register'>
                <h2>User Register</h2>
                <div className='register-card'>
                    <form className='AddNew' onSubmit={AddUser}>
                        <label>Username:</label>
                        <input type='text' placeholder='Username' value={Username} onChange={(e) => setUsername(e.target.value)} />
                        <label>Password:</label>
                        <input type='password' placeholder='Password' value={Password} onChange={(e) => setPassword(e.target.value)} />
                        <button className='btn btn-outline-danger' type='submit'>Register</button>
                    </form>
                </div>
            </div>
            <div className='user-login'>
                <h2>User Login</h2>
                <div className='login-card'>
                    <form className='AddNew' onSubmit={CheckUser}>
                        <label>Username:</label>
                        <input type='text' placeholder='Username' value={Username} onChange={(e) => setUsername(e.target.value)} />
                        <label>Password:</label>
                        <input type='password' placeholder='Password' value={Password} onChange={(e) => setPassword(e.target.value)} />
                        <button className='btn btn-outline-danger' type='submit'>Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

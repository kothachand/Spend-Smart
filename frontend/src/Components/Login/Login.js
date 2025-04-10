import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function Login({ onLogin }){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    let navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:5000/api/v1/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            console.log(data);
    
            if (res.ok) { // Check if response status is OK (200-299)
                if (data.success === true) {
                    alert('Login Successful');
                    onLogin(); // Update authentication state
                    localStorage.setItem('name', data.name);    
                    localStorage.setItem('username',data.username);     
                    navigate("/dashboard");
                }
            } else { // Handle errors here
                alert(data.message || 'Something went wrong');
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred while logging in');
        }
    };
    
    return (
        <LoginStyled>
            <div className="login-container">
                <form onSubmit={handleLogin} className="login-form">
                    <h3 className="title">Login</h3>
                    <div className="inputBox">
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            type="email"
                            placeholder="Email"
                            name="email"
                            id="email"
                            required
                        />
                    </div>
                    <div className="inputBox">
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            type="password"
                            placeholder="Password"
                            name="password"
                            id="password"
                            required
                        />
                    </div>
                    <button type="submit" className="btnBig">
                        Login
                    </button>
                    <p>
                        Create a new account{' '}
                        <Link to="/signup" className="signup-link">
                            SignUp
                        </Link>
                    </p>
                </form>
            </div>
        </LoginStyled>
    );
}

const LoginStyled = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: #fcf6f;

    .login-container {
        background: #fcf6f9;
        border: 2px solid #ffffff;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        border-radius: 20px;
        padding: 4.5rem;
        width: 550px;

        .login-form {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1.5rem;

            .title {
                font-size: 2rem;
                font-weight: 700;
                color: #f56692;
            }

            .inputBox {
                width: 100%;
                input {
                    width: 100%;
                    padding: 1rem;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    font-size: 1.2rem;
                    transition: all 0.3s ease;

                    &:focus {
                        border-color: #f56692;
                        outline: none;
                    }
                }
            }

            .btnBig {
                padding: 0.8rem 1.5rem;
                background: #F56692;
                color: white;
                font-size: 1.2rem;
                font-weight: 600;
                border: none;
                border-radius: 8px;
                cursor: pointer;
                transition: all 0.3s ease;

                &:hover {
                    color:#f56692;
                    background: white;
                }
            }

            p {
                font-size: 1.1rem;
                color: #555;

                .signup-link {
                    color: #f56692;
                    text-decoration: none;
                    font-weight: 600;
                    transition: all 0.3s ease;

                    &:hover {
                        color: #d65d42;
                    }
                }
            }
        }
    }
`;

export default Login;



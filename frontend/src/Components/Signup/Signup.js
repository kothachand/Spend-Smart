import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function Signup() {
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');   
    const [error, setError] = useState('');

    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(username)
        console.log(password)
        console.log(email)
        console.log(name)
        let res = await fetch("http://localhost:5000/api/v1/signup", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                name,
                email,
                password,
            }),
        });

        let data = await res.json();
        console.log(data);

        if (data.success === true) {
            alert("Registration Successful");
            navigate("/login");
        } else {
            setError(data.message);
            alert(data.message);
        }
    };

    return (
        <SignupStyled>
            <div className="container">
                <form onSubmit={handleSubmit} className="form">
                    <h3>Signup</h3>
                    <div className="inputBox">
                        <input
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                            type="text"
                            placeholder="Username"
                            name="username"
                        />
                    </div>
                    <div className="inputBox">
                        <input
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            type="text"
                            placeholder="Name"
                            name="name"
                        />
                    </div>
                    <div className="inputBox">
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            type="text"
                            placeholder="Email"
                            name="email"
                        />
                    </div>
                    <div className="inputBox">
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            type="password"
                            placeholder="Password"
                            name="password"
                        />
                    </div>
                    <button type="submit" className="btnBig">Signup</button>
                    <p>
                        Already have an account?{' '}
                        <Link to="/login" className="link">Login</Link>
                    </p>
                </form>
            </div>
        </SignupStyled>
    );
}

const SignupStyled = styled.div`
    .container {
        background: #f5f66;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        min-width: 100vw;

        .form {
            background: #FCF6F9;
            padding: 4rem;
            border-radius: 15px;
            box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
            width: 100%;
            max-width: 600px;

            h3 {
                text-align: center;
                font-size: 1.8rem;
                margin-bottom: 2rem;
                color: #333333;
            }

            .inputBox {
                margin-bottom: 1rem;

                input {
                    width: 100%;
                    padding: 1.1rem;
                    border: 1.5px solid #e0e0e0;
                    border-radius: 5px;
                    font-size: 1.2rem;
                    outline: none;
                    transition: border-color 0.3s;

                    &:focus {
                        border-color: #f56692;
                    }
                }
            }

            .btnBig {
                background: #f56692;
                color: #ffffff;
                padding: 0.8rem;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                font-size: 1.2rem;
                transition: background-color 0.3s;
                margin-left: 200px;
                

                &:hover {
                    color:#f56692;
                    background: white;
                }
            }

            p {
                text-align: center;
                margin-top: 1rem;
                font-size: 1rem;

                .link {
                    color: #f56692;
                    text-decoration: none;
                    font-weight: bold;

                    &:hover {
                        text-decoration: underline;
                    }
                }
            }
        }
    }
`;

export default Signup;

// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import styled from 'styled-components';

// function Signup() {
//     const [username, setUsername] = useState('');
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');

//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const res = await fetch("http://localhost:5000/api/v1/signup", {
//                 method: "POST",
//                 mode: "cors",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({
//                     username,
//                     name,
//                     email,
//                     password,
//                 }),
//             });

//             const data = await res.json();

//             if (data.success) {
//                 alert("Registration Successful");
//                 localStorage.setItem("user", JSON.stringify(data.user)); // Storing user data in localStorage
//                 navigate("/login");
//             } else {
//                 setError(data.message);
//                 alert(data.message);
//             }
//         } catch (err) {
//             console.error("Signup error:", err);
//             setError("An error occurred. Please try again.");
//         }
//     };

//     return (
//         <SignupStyled>
//             <div className="container">
//                 <form onSubmit={handleSubmit} className="form">
//                     <h3>Signup</h3>
//                     <div className="inputBox">
//                         <input
//                             onChange={(e) => setUsername(e.target.value)}
//                             value={username}
//                             type="text"
//                             placeholder="Username"
//                             name="username"
//                             required
//                         />
//                     </div>
//                     <div className="inputBox">
//                         <input
//                             onChange={(e) => setName(e.target.value)}
//                             value={name}
//                             type="text"
//                             placeholder="Name"
//                             name="name"
//                             required
//                         />
//                     </div>
//                     <div className="inputBox">
//                         <input
//                             onChange={(e) => setEmail(e.target.value)}
//                             value={email}
//                             type="email"
//                             placeholder="Email"
//                             name="email"
//                             required
//                         />
//                     </div>
//                     <div className="inputBox">
//                         <input
//                             onChange={(e) => setPassword(e.target.value)}
//                             value={password}
//                             type="password"
//                             placeholder="Password"
//                             name="password"
//                             required
//                         />
//                     </div>
//                     <button type="submit" className="btnBig">Signup</button>
//                     <p>
//                         Already have an account?{' '}
//                         <Link to="/login" className="link">Login</Link>
//                     </p>
//                     {error && <p className="error">{error}</p>}
//                 </form>
//             </div>
//         </SignupStyled>
//     );
// }

// const SignupStyled = styled.div`
//     .container {
//         display: flex;
//         flex-direction: column;
//         justify-content: center;
//         align-items: center;
//         min-height: 100vh;
//         min-width: 100vw;
//         background: #f5f5f5;

//         .form {
//             background: #FCF6F9;
//             padding: 4rem;
//             border-radius: 15px;
//             box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
//             max-width: 600px;
//             width: 100%;

//             h3 {
//                 text-align: center;
//                 font-size: 1.8rem;
//                 margin-bottom: 2rem;
//                 color: #333333;
//             }

//             .inputBox {
//                 margin-bottom: 1rem;

//                 input {
//                     width: 100%;
//                     padding: 1.1rem;
//                     border: 1.5px solid #e0e0e0;
//                     border-radius: 5px;
//                     font-size: 1.2rem;
//                     outline: none;
//                     transition: border-color 0.3s;

//                     &:focus {
//                         border-color: #f56692;
//                     }
//                 }
//             }

//             .btnBig {
//                 background: #f56692;
//                 color: #ffffff;
//                 padding: 0.8rem;
//                 border: none;
//                 border-radius: 5px;
//                 cursor: pointer;
//                 font-size: 1.2rem;
//                 transition: background-color 0.3s;

//                 &:hover {
//                     color: #f56692;
//                     background: white;
//                 }
//             }

//             p {
//                 text-align: center;
//                 margin-top: 1rem;

//                 .link {
//                     color: #f56692;
//                     text-decoration: none;
//                     font-weight: bold;

//                     &:hover {
//                         text-decoration: underline;
//                     }
//                 }
//             }

//             .error {
//                 color: red;
//                 text-align: center;
//                 margin-top: 1rem;
//             }
//         }
//     }
// `;

// export default Signup;


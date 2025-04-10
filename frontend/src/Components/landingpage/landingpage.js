import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const LandingPage = () => {
  return (
    <LandingStyled>
      <div className="top-buttons">
        <Link to="/login" className="btn">Login</Link>
        <Link to="/signup" className="btn">Sign Up</Link>
      </div>
      <div className="container">
        <h1>Welcome to Spend Smart</h1>
        <p>Track and manage your expenses easily and efficiently.</p>
      </div>
    </LandingStyled>
  );
};

const LandingStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  color: white;
  position: relative;

  background: url("https://t3.ftcdn.net/jpg/07/55/30/86/360_F_755308668_ctmtFXNNXJG96dOUM4Ph40jQZrtNztxi.jpg") no-repeat center center/cover;

  /* Dark overlay for better readability */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  }

  .top-buttons {
    position: absolute;
    top: 20px;
    right: 20px;
    display: flex;
    gap: 15px;
    z-index: 10;
  }

  .btn {
    text-decoration: none;
    padding: 8px 16px;
    border-radius: 5px;
    background: #2ed573;
    color: white;
    font-weight: bold;
    transition: 0.3s ease-in-out;
  }

  .btn:hover {
    background: #1e90ff;
  }

  .container {
    background: rgba(0, 0, 0, 0.4);
    padding: 30px;
    border-radius: 15px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
    position: relative;
    z-index: 10;
  }

  h1 {
    color: white; /* Ensures "Welcome to Spend Smart" is white */
    margin-bottom: 10px;
  }

  p {
    font-size: 18px;
    margin-bottom: 20px;
  }
`;
export default LandingPage;
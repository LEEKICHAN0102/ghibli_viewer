// import { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default function Header({userData, handleLogout}) {
  return(
    <Head>
      <Link to="/">
        <Logo src="https://upload.wikimedia.org/wikipedia/en/thumb/c/ca/Studio_Ghibli_logo.svg/300px-Studio_Ghibli_logo.svg.png" alt="main_logo"/>
      </Link>
      {userData ? (
        <>
          <Name>반가워요 {userData.username} 님</Name>
          <Link to="/">
            <HeadBtn onClick={handleLogout}>Logout</HeadBtn>
          </Link>
        </>
      ) : (
        <Link to="/login">
          <HeadBtn>Login</HeadBtn>
        </Link>
      )}
    </Head>
  )
}

const Head = styled.nav`
  z-index: 10;
  width: 100%;
  height: 100px;
  top: 0;
  position: fixed;
  background-color: #109CEB;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid black;
`;

const Logo = styled.img`
  width: auto;
  height: 100px;
`;

const HeadBtn = styled.div`
  width: 70px;
  height: 40px;
  background-color: gray;
  color: white;
  font-size: 16px;
  border-radius: 10px;
  margin-right: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Name = styled.div`
  color: white;
  font-size: 12px;
`;
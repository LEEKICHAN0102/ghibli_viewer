// import { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Header({userData}) {
  const handleLogout = async()=>{
    try{
      const response = await axios.post("http://localhost:8080/logout");
      if(response.status === 200){
        console.log("로그아웃 성공")
      } 
    }catch(error) {
      console.error("로그아웃 실패" , error)
    }
  }

  return(
    <Head>
      <Link to="/">
        <Logo src="https://upload.wikimedia.org/wikipedia/en/thumb/c/ca/Studio_Ghibli_logo.svg/300px-Studio_Ghibli_logo.svg.png" alt="main_logo"/>
      </Link>
      {userData ? (
        <>
          <Name>반가워요 {userData.username} 님</Name>
          <Link to="/logout">
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
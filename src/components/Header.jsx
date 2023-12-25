import styled from "styled-components";
import { Link } from "react-router-dom";

export default function Header() {
  return(
    <Head>
      <Link to="/">
        <Logo src="https://upload.wikimedia.org/wikipedia/en/thumb/c/ca/Studio_Ghibli_logo.svg/300px-Studio_Ghibli_logo.svg.png" alt="main_logo"/>
      </Link>
      <Login>Login</Login>
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
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;

const Logo = styled.img`
  width: auto;
  height: 100px;
`;

const Login = styled.div`
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

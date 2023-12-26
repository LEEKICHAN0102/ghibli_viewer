import styled from "styled-components";

export default function Footer() {
  return(
    <Foot>
      <Logo src="https://upload.wikimedia.org/wikipedia/en/thumb/c/ca/Studio_Ghibli_logo.svg/300px-Studio_Ghibli_logo.svg.png" alt="foot_logo"/>
      <Caution>
        This website was created using the https://ghibliapi.vercel.app API and is intended for personal learning and portfolios only and not for financial purposes.
      </Caution>
    </Foot>
  )
}

const Foot = styled.nav`
  z-index: 10;
  width: 100%;
  height: 100px;
  bottom: 0;
  background-color: #109CEB;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border-top: 2px solid black;
`;

const Logo = styled.img`
  width: auto;
  height: 60px;
`;

const Caution = styled.p`
  color: white;
  font-size: 12px;
`;
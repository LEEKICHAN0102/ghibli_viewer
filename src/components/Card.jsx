import { Link } from "react-router-dom";
import styled from "styled-components";

export default  function Card({films}){
  return (
      <GhibliCard>
        {films.map((film) => (
          <Link key={film.id} to={`/detail/${film.id}`}>
            <Poster>
              <Banner src={`${film.image}`} alt="films_image" />
              <Name>{film.original_title}</Name>
              <Director>{film.director}</Director>
            </Poster>
          </Link>
        ))}
      </GhibliCard>
  )
}

const GhibliCard = styled.div`
  position: fixed;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 30px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-height: 100%;
  margin-top: 10%;
`;

const Poster = styled.div`
  width: 400px;
  height: 550px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid black;
  padding: 30px;
  gap:20px;
  border-radius: 20px;
  background-color: #109CEB;
`;

const Banner = styled.img`
  width: 370px;
  height: 450px;
  margin-top: 10px;
  border-radius: 20px;
  border: 1px solid black;
`;

const Name = styled.div`
  font-size: 24px;
`;

const Director = styled.div`
  font-size: 18px;
`;
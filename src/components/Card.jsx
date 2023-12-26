import { Link } from "react-router-dom";
import styled from "styled-components";

export default function Card({films}){
  return (
    <GhibliCard>
      {films.map((film) => (
        <Link key={film.id} to={`/detail/${film.id}`} className="active_link">
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
  display: grid;
  grid-template-columns: 3fr 3fr 3fr;
  gap: 30px;
  margin-top: 120px;
  padding: 30px;
`;

const Poster = styled.div`
  width: 400px;
  height: 500px;
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
  height: 400px;
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
import { useParams } from "react-router-dom"
import styled from "styled-components";

export default function Detail({films}){
  const {filmId} = useParams();
  console.log(filmId);
  const matchFilm = films.find((film) => film.id === filmId);
  console.log(matchFilm);

  return(
    <>
      {matchFilm && (
        <BannerContainer>
          <Banner src={`${matchFilm.movie_banner}`} alt="bannerImage" />
          <Overlay>
            <MovieInfo>
              <h1>제목 : {matchFilm.original_title}</h1>
              <h4>줄거리 : {matchFilm.description}</h4>
              <h4>감독 : {matchFilm.director}</h4>
              <h4>출시 년도 : {matchFilm.release_date} 년</h4>
              <h4>런타임 : {matchFilm.running_time} 분</h4>
            </MovieInfo>
          </Overlay>
      </BannerContainer>
      )}
    </>
  )
}

const BannerContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
`;

const Banner = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.7;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 70%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MovieInfo = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
  gap: 20px;
`;

import { useParams } from "react-router-dom"
import styled from "styled-components";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Detail({films}){
  const {filmId} = useParams();
  const matchFilm = films.find((film) => film.id === filmId);

  const [comments, setComments] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userComment = await axios.get(`${process.env.REACT_APP_BASE_URL}/comment/${filmId}`, { withCredentials: true });
        console.log(userComment);
        setComments(userComment.data);
      } catch (error) {
        console.error("에러 발생:", error);
      }
    };
    fetchData();
  }, []);

  const onSubmit = async (data) => {
    try{
      const comment = await axios.post(`${process.env.REACT_APP_BASE_URL}/comment/${filmId}`, data , { withCredentials:true });
      console.log("적은 내용:", comment.data);
    } catch( error) {
      console.error("버그:", error);
    }
  }

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
      <CommentSection>
        <CommentForm onSubmit={handleSubmit(onSubmit)}>
          <InputField 
            placeholder="로그인 후 감상평을 적어주세요"
            type="text"
            {...register("content", {required: "감상평을 남겨주세요."})}
          />
          {errors.email && (
            <ErrorMessage>{errors.content.message}</ErrorMessage>
          )}
          <SubmitButton type="submit">감상평 남기기</SubmitButton>
        </CommentForm>
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <UserComment key={index}>{comment.username}: {comment.content}</UserComment>
          ))
        ) : (
          <p>아직 아무도 감상평을 남기지 않았습니다.</p>
        )}
      </CommentSection>
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


const CommentSection = styled.div`
  width: 500px;
  height: auto 0%;
`;

const CommentForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const InputField = styled.input`
  margin-bottom: 10px;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 20px;
  width: 450px;
  height: 20px;
  font-size: 24px;
  outline: none;
`;

const SubmitButton = styled.button`
  padding: 10px;
  background-color: #109ceb;
  color: white;
  width: 470px;
  height: 50px;
  font-size: 24px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  outline: none;
  &:hover {
    background-color: #0d85cc;
  }
`;

const UserComment = styled.div`
  margin-bottom: 10px;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 20px;
  width: 450px;
  height: 20px;
  font-size: 24px;
  outline: none;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 12px;
`;

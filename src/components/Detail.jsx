import styled from "styled-components";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Comment from "./Comment";

export default function Detail({films, userData}){
  const {filmId} = useParams();
  const matchFilm = films.find((film) => film.id === filmId);
  const [comments, setComments] = useState([]);
  const [matchUser, setMatchUser] = useState(false);
  const [reply , setReply] = useState(false);

  useEffect(() => {
    fetchData();
  },[]);

  console.log(userData);
  console.log(comments);

  const fetchData = async () => {
    try {
      const userComment = await axios.get(`${process.env.REACT_APP_BASE_URL}/comment/${filmId}`, { withCredentials: true });
      console.log(userComment);
      setComments(userComment.data);

      const isMatch = userComment.data.some(
        (comment) => comment.username === userData.username
      );
      setMatchUser(isMatch);

    } catch (error) {
      console.error("에러 발생:", error);
    }
  };

  const onSubmit = async (data) => {
    try{
      const comment = await axios.post(`${process.env.REACT_APP_BASE_URL}/comment/${filmId}`, data , { withCredentials:true });
      console.log("적은 내용:", comment.data);
      fetchData();
    } catch( error) {
      console.error("버그:", error);
    }
  }

  const handleCommentDelete = async (commentId) =>{
    try{
      const comment = await axios.post(`${process.env.REACT_APP_BASE_URL}/comment/${filmId}/delete`, { commentId }, { withCredentials:true });
      console.log("삭제 댓글:", comment.data.commentId);
      fetchData();
    } catch( error) {
      console.error("버그:", error);
    }
  }

  const handleReply = () => {
    setReply(prev=> !prev);
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
        <Comment 
          placeholder={"로그인 후 감상평을 적어주세요"}
          required={"감상평은 한글자 이상 남겨야합니다."}
          text={"감상평 남기기"}
          handler={onSubmit}
        />
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <>
              <Content key={index}>
                <UserComment>{comment.username}: {comment.content}</UserComment>
                <ReplyComment onClick={handleReply}>답글</ReplyComment>
                {matchUser ? <DeleteComment onClick={() => handleCommentDelete(comment.contentId)}>삭제</DeleteComment> : null}
              </Content>
              {reply ? (
              <Comment 
                placeholder={"로그인 후 답글을 남겨주세요"}
                required={"답글은 한글자 이상 남겨야합니다."}
                text={"답글 남기기"}
                handler={onSubmit}
              />
              ) : null}
            </>
          ))
        ) : (
          <NoComment>아직 아무도 감상평을 남기지 않았습니다.</NoComment>
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
  max-width: auto;
  height: auto;
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

const Content = styled.span`
  color: black;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;

const DeleteComment = styled.button`
  color: white;
  background-color: #f04646;
  width: 100px;
  height: 30px;
  border-radius: 10px;
`;

const NoComment = styled.div`
  margin-bottom: 10px;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: auto;
  height: 20px;
  font-size: 24px;
  outline: none;
`;

const ReplyComment = styled.button`
  color: black;
  background-color: white;
  width: 100px;
  height: 30px;
  border-radius: 10px;
`;
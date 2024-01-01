import { useForm } from "react-hook-form"
import axios from "axios"
import styled from "styled-components"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

export default function Login({ setUserData }) {
  const navigate = useNavigate();

  const {
  register,
  handleSubmit,
  formState: { errors },
  } = useForm({mode:"onSubmit"})

  const onSubmit = async(data, e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/login`, data, { withCredentials: true });
      console.log("서버 응답:", response.data);
      if (response.status === 200) {
        // 로그인 성공 후 세션 정보 가져오기
        const sessionResponse = await axios.get(`${process.env.REACT_APP_BASE_URL}/user`, { withCredentials: true });
        console.log("세션 응답:", sessionResponse.data);
        setUserData(sessionResponse.data.user);
        navigate("/");
      }
    } catch (error) {
      console.error("에러 발생:", error);
    }
  }

  return (
    <LogInContainer>
      <LoginForm onSubmit={handleSubmit(onSubmit)}>
        <InputField 
          placeholder="email"
          type="email"
          {...register("email", {required: "E-mail을 작성해주세요"})}
        />
        {errors.email && (
          <ErrorMessage>{errors.email.message}</ErrorMessage>
        )}
        <InputField 
          placeholder="Password"
          type="password"
          {...register("password", {required: "비밀번호를 작성해주세요."})}
        />
        {errors.password && (
          <ErrorMessage>{errors.password.message}</ErrorMessage>
        )}
        <SubmitButton type="submit">로그인</SubmitButton>
        <Link to="/join">
          <CreateAccount>아직 계정이 없으신가요?</CreateAccount>
        </Link>
      </LoginForm>
    </LogInContainer>
  )
}

const LogInContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90vh;
`;

const LoginForm = styled.form`
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

const CreateAccount = styled.div`
  margin-top: 30px;
  color: gray;
  &:hover {
    color: #0d85cc;
  }
  font-size: 16px;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 12px;
`;
import { useForm } from "react-hook-form"
import axios from "axios"
import styled from "styled-components"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

export default  function Login() {
    const navigate = useNavigate();

    const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async(data, e) => {
    e.preventDefault();

    const response = await axios.get(`http://localhost:3001/join`, data);
    if (response.status === 200) {
      navigate("/login");
    }
  }

  return (
    <LogInContainer>
      <LoginForm onSubmit={handleSubmit(onSubmit)}>
        <InputField placeholder="ID" {...register("example")} />
        <InputField placeholder="Password" type="password" {...register("password")} />
        <SubmitButton type="submit">로그인</SubmitButton>
      </LoginForm>
      <Link to="/join">
        <CreateAccount>아직 계정이 없으신가요?</CreateAccount>
      </Link>
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
  gap: 30px;
`;

const InputField = styled.input`
  margin-bottom: 10px;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 20px;
  width: 450px;
  height: 50px;
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
  color:#109ceb;
  &:hover {
    background-color: #0d85cc;
  }
  font-size: 16px;
`;
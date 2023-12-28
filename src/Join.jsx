import { useForm  } from "react-hook-form"
import styled from "styled-components"
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Join() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm()

  const onSubmit = async (data, e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:3001/join`, data);
      console.log("서버 응답:", response.data);
      if (response.status === 200) {
        navigate("/login");
      }
    } catch (error) {
      console.error("에러 발생:", error);
    }
  };

  const password = watch("password", "");

  return (
    <JoinContainer>
      <JoinForm onSubmit={handleSubmit(onSubmit)}>
        <InputField
          placeholder="닉네임"
          {...register(
            "username",
            {required: "사용할 유저명을 입력해주세요"}
          )}
        />
        {errors.username &&  (
          <ErrorMessage>
            {errors.username.message}
          </ErrorMessage>
        )}
        <InputField
          placeholder="이메일"
          type="email" 
          {...register(
            "email",
            {
              required: "이메일을 입력해주세요",
              pattern: { 
                value: /\S+@\S+\.\S+/, 
                message: "올바른 이메일 형식이 아닙니다."  // 이메일 validate RegExp
              },
            }
          )}
        />
        {errors.email && (
          <ErrorMessage>{errors.email.message}</ErrorMessage>
        )}
        <InputField
          placeholder="비밀번호"
          type="password"
          {...register(
            "password",
            {
              required: "비밀번호를 입력해주세요",
              minLength: { value: 8, message: "비밀번호는 최소 8자 이상이어야 합니다."},
              pattern: {
                value: /^(?=.*[!@#$%^&*])/, // 최소 하나의 특수 문자가 포함된 경우
                message: "하나 이상의 특수 문자가 포함되어야 합니다.",
              },
            }
          )}
        />
        {errors.password && (
          <ErrorMessage>{errors.password.message}</ErrorMessage>
        )}
        <InputField
          placeholder="비밀번호 재확인"
          type="password"
          {...register(
            "password_confirm",
            {
              required: "비밀번호 재확인을 입력해주세요",
              validate: (value) => value === password || "비밀번호가 일치하지 않습니다.",
            }
          )}
        />
        {errors.password_confirm && (
          <ErrorMessage>{errors.password_confirm.message}</ErrorMessage>
        )}
        <SubmitButton type="submit">회원 가입</SubmitButton>
      </JoinForm>
    </JoinContainer>
  )
}

const JoinContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90vh;
`;

const JoinForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const InputField = styled.input`
  margin-bottom: 10px;
  padding: 12px;
  border: 1px solid;
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

const ErrorMessage = styled.p`
  color: red;
  font-size: 12px;
`;

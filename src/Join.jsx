import { useForm } from "react-hook-form"
import styled from "styled-components"

export default function Join() {
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm()

  const onSubmit = (data) => console.log(data)

  return (
    <JoinContainer>
      <JoinForm onSubmit={handleSubmit(onSubmit)}>
        <InputField placeholder="아이디" {...register("example")} />
        <InputField placeholder="비밀번호" type="password" {...register("password")} />
        <InputField placeholder="비밀번호 재확인" type="password" {...register("password")} />
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

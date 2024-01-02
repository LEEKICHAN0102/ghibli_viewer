import styled from "styled-components";
import { useForm } from "react-hook-form";

export default function Comment({handler ,placeholder, required, text}){
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  return (
    <CommentForm onSubmit={handleSubmit(handler)}>
      <InputField 
        placeholder={`${placeholder}`}
        type="text"
        {...register("content", {required: `${required}`})}
      />
      {errors.email && (
        <ErrorMessage>{errors.content.message}</ErrorMessage>
      )}
      <SubmitButton type="submit">{text}</SubmitButton>
    </CommentForm>
  )
}

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

const ErrorMessage = styled.p`
  color: red;
  font-size: 12px;
`;
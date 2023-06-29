import styled from 'styled-components';

export const Container = styled.div`
  width: 500px;
  border: 1px solid #ffffff1f;
  border-radius: 10px;
  padding: 20px;
`;

export const Form = styled.form``;

export const FormField = styled.div`
  margin-bottom: 10px;

  .react-datepicker-wrapper {
    width: 100%;
    input {
      height: 36px;
      width: 100%;
      font-size: 16px;
    }
  }
`;

export const Label = styled.div`
  color: #ffffff;
  font-size: 16px;
  margin-bottom: 5px;
`;

export const Input = styled.input`
  height: 36px;
  width: 100%;
  padding: 5px;
  font-size: 16px;
  border: 1px solid #ffffff1f;
  border-radius: 3px;
  &[type='file'] {
    color: #ffffff;
  }
`;

export const Button = styled.button`
  width: 100%;
  height: 36px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #70b5f9;
  color: #70b5f9;
  cursor: pointer;
  margin-top: 20px;
  &:hover {
    opacity: 0.8;
  }
  &:active {
    opacity: 0.5;
  }
`;

export const Error = styled.div`
  color: red;
  font-size: 12px;
  margin-bottom: 20px;
`;

export const ServerErrorWrapper = styled.div`
  margin-top: 20px;
`;

export const ServerError = styled.div`
  color: red;
  font-size: 12px;
`;

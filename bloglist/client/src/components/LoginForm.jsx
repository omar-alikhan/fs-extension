import { useState } from "react";
import styled from "styled-components";
import {
  useNotificationsActions,
  useUserActions,
} from "../store/useBloglistStore";
import { useNavigate } from "react-router-dom";

const Input = styled.input`
  margin: 0.25em;
  width: 300px;
  padding: 0.5em 0.75em;
  font-size: 1rem;
  border: 2px solid #000;
  border-radius: 4px;
  box-shadow: 4px 4px 0 #000;
  outline: none;

  &:focus {
    transform: translate(2px, 2px);
    box-shadow: 2px 2px 0 #000;
  }
`;

const Button = styled.button`
  margin: 0.25em;
  padding: 0.5em 1em;
  font-size: 1rem;
  font-weight: 700;
  color: #000;
  background-color: #ffd60a;
  border: 2px solid #000;
  border-radius: 4px;
  box-shadow: 4px 4px 0 #000;
  cursor: pointer;
  transition:
    transform 0.1s ease,
    box-shadow 0.1s ease;

  &:hover {
    transform: translate(2px, 2px);
    box-shadow: 2px 2px 0 #000;
  }

  &:active {
    transform: translate(4px, 4px);
    box-shadow: 0 0 0 #000;
  }
`;

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useUserActions();
  const navigate = useNavigate();
  const { displayErrorNotification } = useNotificationsActions();

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await login({ username, password });
      navigate("/");
    } catch (error) {
      displayErrorNotification("Invalid username/password");
    }
  };

  return (
    <>
      <h1>log in to the application</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">
            username
            <Input
              type="text"
              id="username"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
        </div>
        <div>
          <label htmlFor="password">
            password
            <Input
              type="password"
              id="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </div>
        <Button>login</Button>
      </form>
    </>
  );
};

export default LoginForm;

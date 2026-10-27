import { useEffect } from "react";
import { Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import {
  useBlogsActions,
  useUser,
  useUserActions,
} from "../store/useBloglistStore";
import "./App.css";
import LoginForm from "../components/LoginForm";
import BlogForm from "../components/BlogForm";
import BlogList from "../components/BlogList";
import Blog from "../components/Blog";
import Users from "../components/Users";
import User from "../components/User";
import Notification from "../components/Notification";
import ErrorBoundary from "../components/ErrorBoundary";
import NotFound from "../components/NotFound";
import blogService from "../services/blog";
import styled from "styled-components";

export const Navigation = styled.nav`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  padding: 0.75rem 1rem;
  border: 2px solid var(--color-border);
  border-radius: var(--radius-base);
  background-color: var(--color-secondary-background);

  font-family: var(--font-heading);
  color: var(--color-foreground);

  /* Hover effect for any child link/button */
  a,
  button {
    border-radius: var(--radius-base);
    padding: 0.5rem 0.75rem;
    border: 2px solid transparent;
    text-decoration: none;
    color: inherit;
    background: var(--color-main);
    color: var(--color-main-foreground);
    font-family: var(--font-heading);

    &:hover {
      border-color: var(--color-border);
      filter: brightness(0.95);
    }
  }
`;

const Menubar = styled.nav`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.375rem 0.5rem;
  background-color: #dbeafe;
  border: 2px solid #000;
  border-radius: 8px;
  box-shadow: 3px 3px 0 #000;
  font-family: "Inter", system-ui, sans-serif;
`;

const MenubarItem = styled.button`
  padding: 0.375em 0.875em;
  font-size: 0.95rem;
  font-weight: 700;
  color: #000;
  background: none;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.08);
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

function App() {
  const navigate = useNavigate();
  const user = useUser();
  const { logout } = useUserActions();
  const { initialize } = useBlogsActions();

  const padding = {
    padding: 5,
  };

  useEffect(() => {
    if (user) {
      blogService.setToken(user.token);
    }

    async function fetchData() {
      await initialize();
    }
    fetchData();
  }, []);

  const handleLogout = async () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <Notification></Notification>
      <Menubar>
        <MenubarItem>
          <Link style={padding} to="/">
            blogs
          </Link>
        </MenubarItem>
        <MenubarItem>
          <Link style={padding} to="/users">
            users
          </Link>
        </MenubarItem>
        {user && (
          <MenubarItem>
            <Link style={padding} to="/create">
              new blog
            </Link>
          </MenubarItem>
        )}
        {user ? (
          <Button style={padding} onClick={handleLogout}>
            logout
          </Button>
        ) : (
          <MenubarItem>
            <Link style={padding} to="/login">
              login
            </Link>
          </MenubarItem>
        )}
      </Menubar>

      <Routes>
        <Route
          path="/"
          element={
            <ErrorBoundary>
              <BlogList />
            </ErrorBoundary>
          }
        />
        <Route
          path="/blogs/:id"
          element={
            <ErrorBoundary>
              <Blog />
            </ErrorBoundary>
          }
        />
        <Route
          path="/users"
          element={
            <ErrorBoundary>
              <Users />
            </ErrorBoundary>
          }
        />
        <Route
          path="/users/:id"
          element={
            <ErrorBoundary>
              <User />
            </ErrorBoundary>
          }
        />
        <Route
          path="/login"
          element={
            user ? (
              <Navigate to="/" />
            ) : (
              <ErrorBoundary>
                <LoginForm />
              </ErrorBoundary>
            )
          }
        />
        <Route
          path="/create"
          element={
            user ? (
              <ErrorBoundary>
                <BlogForm />
              </ErrorBoundary>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route path="*" element={<NotFound></NotFound>} />
      </Routes>
    </>
  );
}

export default App;

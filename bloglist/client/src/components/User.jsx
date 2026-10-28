import { useParams } from "react-router-dom";
import { useBlogsActions, useUsers } from "../store/useBloglistStore";
import { useEffect } from "react";
import styled from "styled-components";

const Card = styled.div`
  max-width: 600px;
  margin: 1rem 0rem;
  padding: 1.5rem;
  background-color: #dbeafe;
  border: 2px solid #000;
  border-radius: 8px;
  box-shadow: 4px 4px 0 #000;
  font-family: "Inter", system-ui, sans-serif;
  color: #000;
`;

const User = () => {
  const users = useUsers();
  const { initialize } = useBlogsActions();
  useEffect(() => {
    async function fetchData() {
      await initialize();
    }
    fetchData();
  }, []);

  const id = useParams().id;
  const user = users.find(u => u.id === id);

  if (!user) {
    return <p>Loading user...</p>;
  }
  return (
    <Card>
      <h1>{user.name}</h1>
      <p>added blogs</p>
      <ul>
        {user.blogs.map(b => (
          <li key={b.id}>{b.title}</li>
        ))}
      </ul>
    </Card>
  );
};

export default User;

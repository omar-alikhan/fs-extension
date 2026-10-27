import { useParams } from "react-router-dom";
import { useBlogsActions, useUsers } from "../store/useBloglistStore";
import { useEffect } from "react";
import blog from "../services/blog";

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
    <>
      <h1>{user.name}</h1>
      <p>added blogs</p>
      <ul>
        {user.blogs.map(b => (
          <li key={b.id}>{b.title}</li>
        ))}
      </ul>
    </>
  );
};

export default User;

import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import {
  useBlogs,
  useUser,
  useBlogsActions,
  useNotificationsActions,
} from "../store/useBloglistStore";
import NotFound from "./NotFound";
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

const Title = styled.h1`
  margin: 0 0 1rem;
  font-size: 1.75rem;
  font-weight: 800;
`;

const UrlLink = styled.a`
  display: inline-block;
  margin-bottom: 1rem;
  color: #000;
  font-weight: 700;
  word-break: break-all;
  text-decoration: underline;
  text-decoration-thickness: 2px;

  &:hover {
    background-color: #ffd60a;
  }
`;

const Likes = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  font-weight: 700;
`;

const Button = styled.button`
  padding: 0.5em 1em;
  font-size: 1rem;
  font-weight: 700;
  color: #000;
  background-color: #ffd60a;
  border: 2px solid #000;
  border-radius: 4px;
  box-shadow: 3px 3px 0 #000;
  cursor: pointer;
  transition:
    transform 0.1s ease,
    box-shadow 0.1s ease;

  &:hover {
    transform: translate(2px, 2px);
    box-shadow: 1px 1px 0 #000;
  }

  &:active {
    transform: translate(3px, 3px);
    box-shadow: none;
  }
`;

const RemoveButton = styled(Button)`
  background-color: #ff1744;
  color: #fff;
  margin-top: 1rem;
`;

const AddedBy = styled.div`
  font-weight: 500;
`;

const Loading = styled.div`
  padding: 1rem;
  font-weight: 700;
`;

const Blog = () => {
  const blogs = useBlogs();
  const user = useUser();
  const id = useParams().id;
  const { displayErrorNotification } = useNotificationsActions();
  const navigate = useNavigate();
  const [comment, setComment] = useState("");
  const { voteBlog, removeBlog, addBlogComment } = useBlogsActions();

  const handleSubmit = async e => {
    e.preventDefault();
    if (comment.trim().length === 0) {
      displayErrorNotification("Comment can't be empty!");
    }
    addBlogComment(id, comment);
  };

  if (blogs.length === 0) return <Loading>Loading blog...</Loading>;

  const blog = blogs.find(b => b.id === id);
  if (blog) {
    const canRemove = user && user.username === blog.user.username;
    const canLike = !!user;
    return (
      <Card className="blog">
        <Title>{blog.title}</Title>
        <p>by {blog.author}</p>
        <UrlLink href={`${blog.url}`}>{blog.url}</UrlLink>
        <AddedBy>Added by {blog.user.name}</AddedBy>
        <Likes>
          likes {blog.likes}
          {canLike && <Button onClick={() => voteBlog(blog.id)}>like</Button>}
        </Likes>
        {canRemove && (
          <RemoveButton
            onClick={() => {
              removeBlog(blog.id);
              navigate("/");
            }}
          >
            remove
          </RemoveButton>
        )}
        <h3>comments</h3>
        <form onSubmit={handleSubmit}>
          <input
            value={comment}
            onChange={e => setComment(e.target.value)}
            placeholder="add a comment"
          />
          <button>add comment</button>
        </form>
        <ul>
          {blog.comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
      </Card>
    );
  } else {
    return <NotFound></NotFound>;
  }
};

export default Blog;

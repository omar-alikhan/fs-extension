import { Link } from "react-router-dom";
import { useBlogs } from "../store/useBloglistStore";
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

const BlogList = () => {
  const blogs = useBlogs();
  return (
    <Card className="blogs">
      <h1>blogs</h1>
      <ul>
        {blogs &&
          blogs.map(blog => (
            <li key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>
                {blog.title} {blog.author}
              </Link>
            </li>
          ))}
      </ul>
    </Card>
  );
};

export default BlogList;

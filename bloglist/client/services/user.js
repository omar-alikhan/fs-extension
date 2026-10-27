import axios from "axios";

const baseUrl = "/api/users";

const getBlogs = async username => {
  const response = await axios.get(`${baseUrl}/${username}`);
  return response.data[0].blogs;
};

const getAll = async () => {
  const { data: users } = await axios.get(`${baseUrl}`);
  return users;
};

export default { getBlogs, getAll };

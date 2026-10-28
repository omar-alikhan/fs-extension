const getUser = () => {
  window.localStorage.getItem("logged-in-user");
};

const saveUser = user => {
  window.localStorage.setItem("logged-in-user", JSON.stringify(user));
};

const removeUser = () => {
  window.localStorage.removeItem("logged-in-user");
};

export { getUser, saveUser, removeUser };

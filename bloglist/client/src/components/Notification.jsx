import styled from "styled-components";
import { useNotifications } from "../store/useBloglistStore";

export const Message = styled.div`
  display: block;
  padding: 0.375rem 0.5rem;
  margin: 0.375rem 0.5rem;
  background-color: #000;
  border: 2px solid #000;
  border-radius: 8px;
  box-shadow: 3px 3px 0 #000;
  font-family: "Inter", system-ui, sans-serif;
`;

const Notification = () => {
  const { notification, type } = useNotifications();
  if (!notification) return null;

  const style = {
    color: type === "error" ? "#ff1744" : "#00c853",
    backgroundColor: `${type === "error" ? "#fee2e2" : "#dcfce7"}`,
  };

  return (
    <Message className={type} style={style}>
      {notification}
    </Message>
  );
};

export default Notification;

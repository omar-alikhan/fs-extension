import { useUsers } from "../store/useBloglistStore";
import styled from "styled-components";

export const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background-color: #fff7e0;
  border: 4px solid #000;
  box-shadow: 8px 8px 0 #000;
  font-family: "Inter", system-ui, sans-serif;
  color: #000;
  margin-top: 20px;
  max-width: 800px;
`;

export const THead = styled.thead`
  background-color: #ffd23f;
`;

export const TBody = styled.tbody`
  background-color: #fff;
`;

export const TFoot = styled.tfoot`
  background-color: #c4f1ff;
  font-weight: 800;
`;

export const Tr = styled.tr`
  &:hover td {
    background-color: #ff6b9d;
  }
`;

export const Th = styled.th`
  padding: 0.75rem 1rem;
  text-align: left;
  font-size: 0.9rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  border-bottom: 4px solid #000;
  border-right: 4px solid #000;

  &:last-child {
    border-right: none;
  }
`;

export const Td = styled.td`
  padding: 0.75rem 1rem;
  font-size: 1rem;
  font-weight: 600;
  border-bottom: 4px solid #000;
  border-right: 4px solid #000;
  transition: background-color 0.08s ease;

  &:last-child {
    border-right: none;
  }
`;

const Users = () => {
  const users = useUsers();
  console.log(users);
  return (
    <>
      <h1>users</h1>
      <Table>
        <THead>
          <Tr>
            <Th>Name</Th>
            <Th>Username</Th>
            <Th>Blogs Created</Th>
          </Tr>
        </THead>
        <TBody>
          {users.map(u => (
            <Tr key={u.id}>
              <Td>{u.name}</Td>
              <Td>{u.username}</Td>
              <Td>{u.blogs.length}</Td>
            </Tr>
          ))}
        </TBody>
      </Table>
    </>
  );
};

export default Users;

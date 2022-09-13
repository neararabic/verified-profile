import { useState, useEffect } from "react";

import Container from "react-bootstrap/Container";


import { getUsers, getWallet } from "../lib/near";
import UsersList from "./users-list";

function Users(props) {
  const [wallet, setWallet] = useState();
  const [accountId, setAccountId] = useState("");
  const [loading, setLoading] = useState(true);
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const tempWallet = await getWallet();
        console.log(tempWallet);
        setWallet(tempWallet);
        setAccountId(tempWallet.getAccountId());
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const result = await getUsers(wallet);
        const {
          status: { SuccessValue },
        } = result;
        const contractResponse = atob(SuccessValue).split("\\n");
        const jsonData = JSON.parse(contractResponse);
        console.log(props.userID);
        if (props.userID) {
          jsonData.forEach((user) => {
            if (user.name === props.userID) {
              setUsersData([user]);
              setLoading(false);
            }
          });
        } else {
          setUsersData(jsonData);
          setLoading(false);
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, [wallet, props.userID]);

  return (
    <Container className="m-4">
      {console.log(accountId)}
      {loading ? (
        <p>loading...</p>
      ) : (
        <UsersList users={usersData} />
      )}
    </Container>
  );
}

export default Users;

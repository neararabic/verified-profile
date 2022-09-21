import React, { useState, useEffect } from "react";
import Loader from "./utils/loader";
import Admin from "./admin";
import { verifyAccount } from "./utils/functions";
const Splitusers = ({ usersList }) => {
  var [pendingList] = useState([]);
  var [newList] = useState([]);
  var [rejectedList] = useState([]);
  var [verifiedList] = useState([]);
  var [spamList] = useState([]);
  const [List, setList] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const splitUsers = async () => {
    console.log(usersList);
    if (usersList.length !== 0) {
      for (let i = 0; i < usersList.length; i++) {
        var user = usersList[i].split(",");
        if (user[1] === "Verified") {
          verifiedList.push(user[0]);
        } else if (user[1] === "Pending") {
          pendingList.push(user[0]);
        } else if (user[1] === "New") {
          newList.push(user[0]);
        } else if (user[1] === "Rejected") {
          rejectedList.push(user[0]);
        } else if (user[1] === "Spam") {
          spamList.push(user[0]);
        }
      }
      setList(true);
    }
  };

  const verifyUser = async (ID, type) => {
    try {
      setList(false);
      await verifyAccount(ID, type);
    } catch (error) {
      console.log(error);
    } finally {
      setList(true);
      setRefresh(true);
    }
  };

  useEffect(() => {
    splitUsers();
  }, []);
  if (List === false) {
    return (
      <>
        <Loader />
      </>
    );
  }
  if (refresh === true) {
    return (
      <>
        <Admin />
      </>
    );
  }

  return (
    <>
      <div style={{ background: "#000" }}>
        <h1>New</h1>
        {/* New Users Part*/}
        {newList.length === 0 ? (
          <p>No User Found</p>
        ) : (
          <div>
            <ol>
              {newList.map((newList) => (
                <li>{newList}</li>
              ))}
            </ol>
          </div>
        )}

        {/* Verified Users Part*/}
        <h1>Verified</h1>
        {verifiedList.length === 0 ? (
          <p>No User Found</p>
        ) : (
          <div>
            <ol>
              {verifiedList.map((verifiedList) => (
                <li>
                  {verifiedList}{" "}
                  <button
                    style={{
                      width: 150,
                      height: 30,
                      backgroundColor: "#fff",
                      borderRadius: 50,
                    }}
                    onClick={() => verifyUser(verifiedList, 0)}
                  >
                    Change to New
                  </button>
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Spam Users Part*/}
        <h1>Spam</h1>
        {spamList.length === 0 ? (
          <p>No User Found</p>
        ) : (
          <div>
            <ol>
              {spamList.map((spamList) => (
                <li>
                  {spamList}{" "}
                  <button
                    style={{
                      width: 150,
                      height: 30,
                      backgroundColor: "#fff",
                      borderRadius: 50,
                    }}
                    onClick={() => verifyUser(verifiedList, 0)}
                  >
                    Change to New
                  </button>
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Pending Users Part*/}
        <h1>Pending</h1>
        {pendingList.length === 0 ? (
          <p>No User Found</p>
        ) : (
          <div>
            <ol>
              {pendingList.map((pendingList) => (
                <li>
                  {pendingList}{" "}
                  <button
                    style={{
                      width: 150,
                      height: 30,
                      backgroundColor: "#fff",
                      borderRadius: 50,
                    }}
                    onClick={() => verifyUser(pendingList, 3)}
                  >
                    Verify
                  </button>
                  <button
                    style={{
                      width: 150,
                      height: 30,
                      backgroundColor: "#fff",
                      borderRadius: 50,
                    }}
                    onClick={() => verifyUser(verifiedList, 2)}
                  >
                    Reject
                  </button>
                  <button
                    style={{
                      width: 150,
                      height: 30,
                      backgroundColor: "#fff",
                      borderRadius: 50,
                    }}
                    onClick={() => verifyUser(verifiedList, 4)}
                  >
                    Spam
                  </button>
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Rejected Users Part*/}
        <h1>Rejected</h1>
        {rejectedList.length === 0 ? (
          <p>No User Found</p>
        ) : (
          <div>
            <ol>
              {rejectedList.map((rejectedList) => (
                <li>
                  {rejectedList}{" "}
                  <button
                    style={{
                      width: 150,
                      height: 30,
                      backgroundColor: "#fff",
                      borderRadius: 50,
                    }}
                    onClick={() => verifyUser(rejectedList, 3)}
                  >
                    verify
                  </button>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </>
  );
};
export default Splitusers;

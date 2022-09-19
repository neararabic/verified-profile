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
    splitUsers()
  }, []);
  if (List === false) {
    return(
        <>
        <Loader />
        </>
    )
  }
  if (refresh === true) {
    return(
        <>
        <Admin />
        </>
    )  }

  return (
    <>
      <div style={{ background: "#000" }}>
        <div>
          <h1>New</h1>
          <ol>
            {newList.map((newList) => (
              <li>{newList}</li>
            ))}
          </ol>
        </div>

        <div>
          <h1>Verified</h1>
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

        <div>
          <h1>Spam</h1>
          <ol>
            {spamList.map((spamList) => (
              <li>{spamList}</li>
            ))}
          </ol>
        </div>

        <div>
          <h1>Pending</h1>
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
              </li>
            ))}
          </ol>
        </div>

        <div>
          <h1>Rejected</h1>
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
                  onClick={() => verifyUser(rejectedList, 0)}
                >
                  Change to New
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </>
  );
};
export default Splitusers;

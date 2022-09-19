import React, { useState, useEffect } from "react";
import Loader from "./utils/loader";
import { getusersList, verifyAccount } from "./utils/functions";
const Admin = () => {
  var [pendingList] = useState([]);
  var [newList] = useState([]);
  var [rejectedList] = useState([]);
  var [verifiedList] = useState([]);
  var [spamList] = useState([]);
  var [usersList, setUsers] = useState([]);
  const [list, setList] = useState(false);
  const [loading, setLoading] = useState(false);

  const splitUsers = () => {
    console.log(usersList);
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
  };

  const getUsers = async () => {
    try {
      setLoading(true);
      console.log("setting users");
      setUsers(await getusersList());
      console.log(" done");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  
  const refresh = async () => {
    try {
      setLoading(true);
      pendingList = [];
      newList = [];
      rejectedList = [];
      verifiedList = [];
      spamList = [];
      await splitUsers();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const verifyUser = async (ID, type) => {
    try {
      setLoading(true);
      await verifyAccount(ID, type);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);
  if (!list) {
    return (
      <>
        {!loading ? (
          <button
            onClick={splitUsers}
            style={{
              align: "middle",
              alignItems: "center",
              justifyContent: "center",
              width: 500,
              height: 100,
              backgroundColor: "#fff",
              borderRadius: 50,
              fontSize: 30,
            }}
          >
            Get Users List
          </button>
        ) : (
          <Loader />
        )}
      </>
    );
  }

  return (
    <>
      {!loading ? (
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
                      onClick={() =>
                        verifyUser(verifiedList, 0).then(getUsers)
                      }
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
                    <button  style={{
                      width: 150,
                      height: 30,
                      backgroundColor: "#fff",
                      borderRadius: 50,
                    }} onClick={() => verifyUser(pendingList, 3).then(getUsers)}>
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
                    <button  style={{
                      width: 150,
                      height: 30,
                      backgroundColor: "#fff",
                      borderRadius: 50,
                    }} onClick={() => verifyUser(rejectedList, 0).then(getUsers)}>
                      Change to New
                    </button>
                  </li>
                ))}
              </ol>
            </div>
          </div>
         
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};
export default Admin;

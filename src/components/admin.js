import React, { useState, useEffect } from "react";
import Loader from "./utils/loader";
import { getusersList, verifyAccount } from "./utils/functions";
import Splitusers from "./Splitusers"
const Admin = () => {

  var [userList, setUsers] = useState([]);
  
  const getUsers = async () => {
    try {
      console.log("setting users");
      setUsers(await getusersList());
      console.log(" done");
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  useEffect(async() => {
    await getUsers();    
  }, []);

  if(userList.length === 0)
  {
    return(<Loader/>)
  }

  return (
    <>
       <Splitusers usersList={userList}  />
    </>
  );
};
export default Admin;

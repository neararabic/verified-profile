import React, {useState, useEffect} from "react";
import Loader from "./utils/loader";
import {
    verifyAccount,
    getPendingUsers,
  } from "./utils/functions";
  const Admin = () => {
    const [usersList, setUserList] = useState([]);
    const [loading, setLoading] = useState(false);
    const getUsers = async () => {
        try {
          setLoading(true);
          setUserList(await getPendingUsers())
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };
      const verifyUser = async (ID) => {
        try {
            setLoading(true);
            await verifyAccount(ID, 3);
          } catch (error) {
            console.log(error);
          } finally {
            setLoading(false);
          };
      };
      useEffect(async() => {
        await getUsers()
      }, []);    
      if(usersList.length === 0)
      {
        return(
          <>
          <h1 align= "middle"> All Users Have Been Verified!</h1>
          </>
        )
      }
      else
      {
      return (
        <>
          {!loading ? (
            <>
            <ol>
             {usersList.map((usersList) => (
              <li>{usersList} <button onClick={() => verifyUser(usersList).then(getUsers)}>Verify</button> </li>
            ))}
            </ol>
            </>
      
          ) : (
            <Loader />
          )}
        </>
      );
        }
  }
  export default Admin;
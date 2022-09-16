import React, {useState, useEffect} from "react";
import Loader from "./utils/loader";
import {
    verifyAccount,
    getPendingUsers,
    getNewUsers,
    getVerifiedUsers,
    getRejectedUsers,
    getSpamUsers,
  } from "./utils/functions";
  const Admin = () => {
    const [pendingList, setPending] = useState([]);
    const [newList, setNew] = useState([]);
    const [rejectedList, setRejected] = useState([]);
    const [verifiedList, setVerified] = useState([]);
    const [spamList, setSpam] = useState([]);
    const [loading, setLoading] = useState(false);
    const getPending = async () => {
        try {
          setLoading(true);
          setPending(await getPendingUsers())
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

      const getNew = async () => {
        try {
          setLoading(true);
          setNew(await getNewUsers())
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };

      const getRejected = async () => {
        try {
          setLoading(true);
          setRejected(await getRejectedUsers())
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };

      const getVerified = async () => {
        try {
          setLoading(true);
          setVerified(await getVerifiedUsers())
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };

      const getSpam = async () => {
        try {
          setLoading(true);
          setSpam(await getSpamUsers())
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };

      useEffect(async() => {
        await getPending()
        await getNew()
        await getRejected()
        await getVerified()
        await getSpam()
      }, []);
   
      return (
        <>
          {!loading ? (
            <>
            <ol>
             {pendingList.map((pendingList) => (
              <li>{pendingList}   "Pending"   <button onClick={() => verifyUser(pendingList).then(getPending)}>Verify</button> </li>
            ))}
            </ol>

            <ol>
             {newList.map((newList) => (
              <li>{newList}   "New"</li>
            ))}
            </ol>

            <ol>
             {rejectedList.map((rejectedList) => (
              <li>{rejectedList}   "Rejected"</li>
            ))}
            </ol>

            <ol>
             {verifiedList.map((verifiedList) => (
              <li>{verifiedList}   "Verified"</li>
            ))}
            </ol>

            <ol>
             {spamList.map((spamList) => (
              <li>{spamList}   "Spam"</li>
            ))}
            </ol>

            </>
      
          ) : (
            <Loader />
          )}
        </>
      );
        
  }
  export default Admin;
import React, {useState} from "react";
import Loader from "./utils/Loader";
import Form from "./form"
import {
  isAccountVerified,
  verifyAccount,
  createProfile,
  getusersList
} from "./utils/functions";


const Functions = () => {
  const [verificationType, SetVerificationType] = useState("None");
  const [Users, setUsers] = useState([]);

  const [userId, setUserId] = useState("None");
  const [loading, setLoading] = useState(false);

  const getVerification = async (userId) => {
    try {
      setLoading(true);
      SetVerificationType(await isAccountVerified(userId));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const createNewProfile = async()=> {
    try {
      setLoading(true);
      setUserId(await (createProfile()));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }  
};

const getUsers = async () => {
  try {
    setLoading(true);
    Users.push(await getusersList())
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

const addVerification = async (userId , type) => {
  try {
    setLoading(true);
    await verifyAccount(userId, type);
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};
return (
  <>
    {!loading ? (
        <>
          <button onClick={createNewProfile}>Create Account</button>
          <button onClick={getUsers}>Get users</button>
          <button onClick={() => getVerification("kareemayman.testnet")}>Get verification</button>
          <button onClick={() => addVerification("kareemayman.testnet" , 4)}>Add verification</button>
          <div>Verification Type : {verificationType}</div>
          <div> Users List : {Users.map( e => <div>{ e }</div> )}
        </div>
        </>
    ) : (
      <Loader />
    )}
  </>
);
};

export default Functions;
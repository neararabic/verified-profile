import React, {useState} from "react";
import Loader from "./utils/Loader";
import Form from "./form"
import {
  isAccountVerified,
  verifyAccount,
  createProfile
} from "./utils/functions";


const Functions = () => {
  const [verificationType, SetVerificationType] = useState("");
  const [userId, setUserId] = useState("None");
  const [loading, setLoading] = useState(false);

  const getVerification = async ({userId}) => {
    try {
      setLoading(true);
      SetVerificationType(await isAccountVerified({userId}));
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  };

  const createNewProfile = async()=> {
    try {
      setLoading(true);
      SetVerificationType(await setUserId(createProfile()));
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }  
};

const addVerification = async (userId) => {
  try {
    setLoading(true);
    await verifyAccount({userId});
  } catch (error) {
    console.log({ error });
  } finally {
    setLoading(false);
  }
};
return (
  <>
    {!loading ? (
        <>
        {userId === "None" ? (
            <button onClick={createNewProfile}> Create Account</button>
        ): (
            <h1> user : {userId}</h1>
        )}
        </>
    ) : (
      <Loader />
    )}
  </>
);
};

export default Functions;
import React, {useState} from "react";
import Loader from "./utils/loader";
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

  const createNewProfile = async () => {
  try {
    setLoading(true);
    alert(`Creating Profile`)

    setUserId( await createProfile());
    alert(`Done`)

  } catch (error) {
     alert(error) ;
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
            <Form/>
        )}
        </>
    ) : (
      <Loader />
    )}
  </>
);
};

export default Functions;
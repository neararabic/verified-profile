import React, {useState, useEffect} from "react";
import Loader from "./utils/Loader";
import Direct from "./Direct"
import {
  isAccountVerified,
  verifyAccount,
  createProfile,
  getusersList
} from "./utils/functions";


const Functions = () => {
  const [verificationType, SetVerificationType] = useState("type");
  const [userId, setUserId] = useState("ID");
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
      setUserId(window.walletConnection.account().accountId)
      await (createProfile());
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }  
};

const getUsers = async () => {
  try {
    setLoading(true);
    (await getusersList())
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
  };
}
  useEffect(async() => {
    await createNewProfile()
  }, []);

return (
  <>
    {!loading ? (
      <>
      <div>
      <button onClick={() => getVerification(userId)}>V</button>
      <button onClick={<Direct ID = {userId} vType = {verificationType}/>}>load</button>
      </div>
      </>

    ) : (
      <Loader />
    )}
  </>
);
};

export default Functions;
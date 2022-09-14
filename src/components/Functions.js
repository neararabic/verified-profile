import React, {useState, useEffect} from "react";
import Loader from "./utils/loader";
import Direct from "./Direct"
import {
  createProfile,
} from "./utils/functions";

const Functions = () => {
  const [userId, setUserId] = useState("ID");
  const [loading, setLoading] = useState(false);

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
  useEffect(async() => {
    await createNewProfile()
  }, []);

return (
  <>
    {!loading ? (
      <>
      <Direct ID = {userId}/>
      </>

    ) : (
      <Loader />
    )}
  </>
);
};

export default Functions;
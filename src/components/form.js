import React, { useEffect, useCallback, useState } from "react";
import Direct from "./Direct"
import Loader from "./utils/loader";
import {
    verifyAccount,
  } from "./utils/functions";
const Form = ({userID}) => {
const [ID, setUserID] = useState(userID);
const [loading, setLoading] = useState(false);
const [showform, setForm] = useState(true);

const addVerification = async (userId , type) => {
    try {
      setLoading(true);
      await verifyAccount(userId, type);
      setForm(false)
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    };
  }
return (
    <>
    {!loading ? (
        <div>
        {showform ? (
            <button align="middle" onClick={() => addVerification( ID  , 1)}> Submit Form </button>
        ) : ( <Direct ID = {ID}/>)}
        </div>
    ): ( <Loader />)}
    </>
)
};
export default Form
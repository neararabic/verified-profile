import React, { useEffect, useCallback, useState } from "react";
import Direct from "./Direct"
import {
    verifyAccount,
  } from "./utils/functions";
const Form = ({userID}) => {
const [ID, setUserID] = useState(userID);
const [showform, setForm] = useState(true);

const addVerification = async (userId , type) => {
    try {
      await verifyAccount(userId, type);
    } catch (error) {
      console.log(error);
    } finally {
    };
  }

return (
    <>
    {showform ? (
        <button onClick={() => addVerification( ID  , 1)}> Submit Form </button>
    ): ( <Direct ID = {ID}/>)}
    </>
)
};
export default Form
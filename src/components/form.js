import React, { useEffect, useCallback, useState } from "react";
import Direct from "./Direct"
import addVerification from "./Functions"
const Form = ({userID}) => {
const [ID, setUserID] = useState(userID);
const [showform, setForm] = useState(true);
return (
    <>
    {showform ? (
        <button onClick={() => addVerification( ID  , 1)}> Submit Form </button>
    ): ( <Direct ID = {ID}/>)}
    </>
)
};
export default Form
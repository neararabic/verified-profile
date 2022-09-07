import React, { useEffect, useCallback, useState } from "react";

const Form = () => {
const [IDFront, setFront] = useState("");
const [IDBack, setBack] = useState("");
const [photoID, setPhoto] = useState("");
const handleSubmit =  useCallback(async () => {
    alert(`ID front : ${IDFront} and Back ID : ${IDBack} and Photo With ID: ${photoID}`)
});
return(
    <>
    <h1>Please fill this for to verify your profile</h1>
    <div>
        <label> Google Drive link of your ID front:
            <input 
                type="text" 
                value={IDFront}
                onChange={(e) => setFront(e.target.value)}
            />
        </label>
    </div>
    <div>
        <label>Google Drive link of your ID Back:
            <input 
                type="text" 
                value={IDBack}
                onChange={(e) => setBack(e.target.value)}
            />
        </label>
    </div>
    <div>
        <label>Google Drive link of your Photo with the ID:
            <input 
                type="text" 
                value={photoID}
                onChange={(e) => setPhoto(e.target.value)}
            />
        </label>
    </div>
    <button onClick={handleSubmit}> Submit Form </button>
    </>
)
};
export default Form
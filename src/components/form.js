import React, { useEffect, useCallback, useState } from "react";
import Direct from "./Direct"
import Loader from "./utils/loader";
import storage from "./storageconfig"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
    verifyAccount,
  } from "./utils/functions";
  
const Form = ({userID}) => {
const [ID] = useState(userID);
const [loading, setLoading] = useState(false);
const [showform, setForm] = useState(true);
const [file, setFile] = useState([]);
const [percent, setPercent] = useState(0);
const [urls, setUrls] = useState([]);

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
  function handleChange(e) {
    for (let i = 0; i < e.target.files.length; i++) {
    const Newfile = e.target.files[i];
    setFile((prevState) => [...prevState, Newfile]) 
    }   
}
const handleUpload = () => {
  if (file.length !== 3) {
      alert("Please upload 3 pictures");
  }
  else
  {
  const promises = [];
  file.map((image) => {
  const storageRef = ref(storage, `/files/${image.name}`);
  const uploadTask = uploadBytesResumable(storageRef, image);
  promises.push(uploadTask);
  uploadTask.on(
      "state_changed",
      (snapshot) => {
          const percent = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setPercent(percent);
      },
      (err) => console.log(err),
      async () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
            setUrls((prevState) => [...prevState, urls]);
          });
        }
      );
    });
    addVerification( ID  , 1)
  }
  }
  const style = {
    padding: "10px",
    fontSize: "24px"
  };
return (
    <>
    {!loading ? (
        <div>
        {showform ? (
          <div>
          <div style={style}> 
            <p1>To be verified successfully Please upload 3 Pictures</p1>  
          </div>
          <div style={style}>1. Picture of the ID front</div>
          <div style={style}>2. Picture of the ID back</div>
          <div style={style}>3. Picture of you with the ID</div>
          <div> 
          <input  type="file" multiple onChange={handleChange} />          
          </div>

          <div> 
          <p>{percent} % of the upload is done</p>
          </div>
          <div> 
          <button onClick={handleUpload}> Submit Form </button>
          </div>
          </div>
        ) : ( <Direct ID = {ID}/>)}
        </div>
    ): ( <Loader />)}
    </>
)
};
export default Form
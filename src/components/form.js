import React, { useEffect, useCallback, useState } from "react";
import Direct from "./Direct";
import Loader from "./utils/loader";
import { colRef } from "./storageconfig";
import storage from "./storageconfig";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { verifyAccount } from "./utils/functions";

const Form = ({ userID }) => {
  const [ID] = useState(userID);
  const [loading, setLoading] = useState(false);
  const [showform, setForm] = useState(true);
  var [urls] = useState([]);

  const addVerification = async (userId, type) => {
    try {
      setLoading(true);
      await verifyAccount(userId, type);
      setForm(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  function handleFrontID(e) {
    const Newfile = e.target.files[0];
    const storageRef = ref(storage, `/files/${Newfile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, Newfile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
          urls[0] = url;
        });
      }
    );
  }
  function handleBackID(e) {
    const Newfile = e.target.files[0];
    const storageRef = ref(storage, `/files/${Newfile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, Newfile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
          urls[1] = url;
        });
      }
    );
  }
  function handlePicWithID(e) {
    const Newfile = e.target.files[0];
    const storageRef = ref(storage, `/files/${Newfile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, Newfile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
          urls[2] = url;
        });
      }
    );
  }

  const submit = async () => {
    console.log(urls);
    await setDoc(doc(colRef, ID), {
      FrontID: urls[0],
      BackID: urls[1],
      PicWithID: urls[2],
    });
    addVerification( ID  , 1)
  };
  const style = {
    padding: "10px",
    fontSize: "24px",
    borderRightWidth: "10 px",
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
              <input type="file" onChange={handleFrontID} />
              <div style={style}>2. Picture of the ID back</div>
              <input type="file" onChange={handleBackID} />
              <div style={style}>3. Picture of you with the ID</div>
              <input type="file" onChange={handlePicWithID} />
              <div>
                <button onClick={submit}> Submit Form </button>
              </div>
            </div>
          ) : (
            <Direct ID={ID} />
          )}
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};
export default Form;

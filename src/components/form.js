import React, {useState } from "react";
import Direct from "./Direct";
import Loader from "./utils/loader";
import { colRef } from "./storageconfig";
import storage from "./storageconfig";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { changeToPending } from "./utils/functions";

const Form = ({ userID }) => {
  const [ID] = useState(userID);
  const [loading, setLoading] = useState(false);
  const [showform, setForm] = useState(true);
  var [urls] = useState([]);
//check file size
  const addVerification = async (userId) => {
    try {
      setLoading(true);
      await changeToPending(userId);
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
      (snapshot) => {},
      (err) => console.log(err),
      () => {
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
      (snapshot) => {},
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
      (snapshot) => {},
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
    addVerification(ID);
  };
  const style = {
    padding: "10px",
    fontSize: "24px",
  };
  return (
    <>
      {!loading ? (
        <div
          style={{
            padding: "10px",
            fontSize: "30px",
          }}
        >
          {showform ? (
            <div  align="middle" >
              <div style={{fontSize: "35px"}}>
                <p>To be verified successfully Please upload 3 Pictures</p>
              </div>
              <div style={style}>1 - Picture of the ID front :</div>
              <input
                type="file"
                onChange={handleFrontID}
                style={{
                  fontSize: "15px",
                  paddingBottom: 25,
                }}
              />
              <div style={style}>2 - Picture of the ID back :</div>
              <input
                type="file"
                onChange={handleBackID}
                style={{
                  fontSize: "15px",
                  paddingBottom: 25,
                }}
              />
              <div style={style} >3 - Picture of you with the ID :</div>
              <input
                type="file"
                onChange={handlePicWithID}
                style={{
                  fontSize: "15px",
                  paddingBottom: 35,
                }}
              />
              <div>
                <button
                  onClick={submit}
                  style={{
                    borderWidth: 2,
                    borderColor: "rgba(0,0,0,0.2)",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 500,
                    height: 100,
                    backgroundColor: "#fff",
                    borderRadius: 50,
                  }}
                >
                  Submit Form
                </button>
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

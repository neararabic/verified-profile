import React, {useState, useEffect} from "react";
import Loader from "./utils/Loader";
import Form from "./form"
import { Checkmark } from "react-checkmark";
import {
  verificationType,
} from "./utils/functions";


const Direct = ({ID}) => {
  const [vType, SetVerificationType] = useState(" Verification Type Not Found");
  const Verification = async (userId) => {
    try {
      SetVerificationType(await verificationType(userId));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(async() => {
    await Verification(ID)
  }, []);
  if(vType === "New")
  {
    return (
        <>
        <Form userID = {ID}/>
        </>
      );
  }
  else if(vType === "Spam")
  {
    return (
      <>
      <h1 align="middle"> {ID} is marked as a spam account</h1>
      </>
    );
  }
  else if(vType === "Pending")
  {
    return (
      <>
      <h1 align="middle"> {ID} is Pending verification</h1>
      <Loader />
      </>
    );
  }
  else if(vType === "Verified")
  {
    return (
      <>
      <h1 align="middle"> {ID} is verified successfully</h1> <Checkmark size={'large'} />
      </>
    );
  }
  else if(vType === "Rejected")
  {
    return (
      <>
      <h1 align="middle"> {ID} verification rejected</h1>
      </>
    );
  }
  return <h1> Error : {vType}</h1>;
};
export default Direct;
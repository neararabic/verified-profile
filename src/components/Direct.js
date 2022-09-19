import React, {useState, useEffect} from "react";
import Loader from "./utils/loader";
import Form from "./form"
import { Checkmark } from "react-checkmark";
import {
  verificationType,
} from "./utils/functions";

const Direct = ({ID}) => {
  const [vType, SetVerificationType] = useState(" Verification Type Not Found");
  const [loading, setLoading] = useState(false);

  const Verification = async (userId) => {
    try {
      setLoading(true);
      SetVerificationType(await verificationType(userId));
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false);
    }
  };
  useEffect(async() => {
    await Verification(ID)
  }, []);
  if(!loading){
    if(vType === "New" )
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
      <h1 align="middle"> {ID} is Pending Verification</h1>
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
      <h1 align="middle"> {ID} Verification Rejected</h1>
      <Form userID = {ID}/>
      </>
    );
  }
  }
  else{
    <Loader/>
  }
  return <Loader/>
};
export default Direct;
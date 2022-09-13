import { useState } from "react";

import NavBar from "./navbar";

import Users from "./user";

function Main() {
  const [userID, setUserName] = useState("");

  return (
    <div>
      <NavBar setUserName={setUserName} />
      <Users userID={userID} />
    </div>
  );
}

export default Main;
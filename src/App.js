import React, { useEffect, useCallback, useState } from "react";
import { Container, Nav } from "react-bootstrap";
import { login, logout as destroy, accountBalance } from "./components/utils/near";
import Cover from "./components/utils/Cover";
import Wallet from "./components/Wallet";
import coverImg from "./cover.png";
import "./App.css";
import Functions from "./components/Functions"
import { alignPropType } from "react-bootstrap/esm/types";

const App = function AppWrapper() {
  const account = window.walletConnection.account();
  const [balance, setBalance] = useState("0");


  const getBalance = useCallback(async () => {
    if (account.accountId) {
      setBalance(await accountBalance());
    }
  });

  useEffect(() => {
    getBalance();
  }, [getBalance]);

  return (
    <>
      {account.accountId ? (
        <Container fluid="md">
          <Nav className="justify-content-end pt-3 pb-5">
            <Nav.Item>
              <Wallet
                address={account.accountId}
                amount={balance}
                symbol="NEAR"
                destroy={destroy}
              />
            </Nav.Item>
          </Nav>
          <dev> <h1 align="middle">Verified Accounts</h1></dev>
          <main>
          {account.accountId === "Owner.testnet" ? (
            <h1>This is the owner</h1>
            //ALI should do this part
          ): 
            (
              <Functions/>
            )
          }
          </main>
        </Container>

        
      ) : (
        <Cover name="Verified Accounts" login={login} coverImg={coverImg}/>
      )}
    </>
  );
}

export default App;
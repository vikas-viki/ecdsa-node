import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import Instructions from "./Instructions";
import SignMessage from "./SignMessage";
import { useState } from "react";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [privateKey, setPrivateKey] = useState("");

  return (
    <div className="main">
      <Instructions />
      <div className="app">
        <Wallet
          balance={balance}
          setPrivateKey={setPrivateKey}
          privateKey={privateKey}
          setBalance={setBalance}
          address={address}
          setAddress={setAddress}
        />
        <Transfer
          setBalance={setBalance}
          setPrivateKey={setPrivateKey}
          privateKey={privateKey}
          address={address}
        />
      </div>
      <div className="external">
        <SignMessage />
      </div>
    </div>
  );
}

export default App;

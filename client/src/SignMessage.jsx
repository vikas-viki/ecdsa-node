import React, { useState } from "react";
import * as secp from "ethereum-cryptography/secp256k1";
import {keccak256} from "ethereum-cryptography/keccak"
import { toHex, utf8ToBytes } from "ethereum-cryptography/utils";

const SignMessage = () => {
  const [privateKey, setPrivateKey] = useState("");
  const [message, setMessage] = useState("");
  const [signature, setSignnature] = useState("");
  const [recoveryBIT, setRecoveryBIT] = useState("")

  const handlePrivateKeyChange = (e) => {
    setPrivateKey(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const createSignature = async (e) => {
    e.preventDefault();
    const messageHash = toHex(keccak256(utf8ToBytes(JSON.stringify(message))));
    const [sign, recoveryBit] = await secp.sign(messageHash, privateKey, {recovered: true});
    setSignnature(toHex(sign));
    setRecoveryBIT(recoveryBit);
  };
  
  return (
    <div className="container signature">
      <form onSubmit={createSignature}>
        <h1>Sign a message</h1>
        <label>
          Your private Key
          <input
            placeholder="04asx3..."
            value={privateKey}
            required
            onChange={handlePrivateKeyChange}
          ></input>
        </label>
        <label>
          Write a message
          <input
            placeholder="Hello world!"
            value={message}
            required
            onChange={handleMessageChange}
          ></input>
        </label>
        <button type="submit" className="button">Create Signature</button>
      </form>
      <label className="sign">
        Your Signature:
        <span >{signature}</span>
      </label><br/>
      <label className="sign">
        Recovery bit:
        <span >{recoveryBIT}</span>
      </label>
    </div>
  );
};

export default SignMessage;

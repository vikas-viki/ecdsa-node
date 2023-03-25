import React, { useState } from "react";
import server from "./server";
import * as secp from "ethereum-cryptography/secp256k1";
import { keccak256 } from "ethereum-cryptography/keccak";
import { toHex, utf8ToBytes } from "ethereum-cryptography/utils";

function Transfer() {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [signature, setSignature] = useState("");
  const [message, setMessage] = useState("");
  const [recoveryBit, setRecoveryBit] = useState("");
  const [recoveredPublickey, setRecoveredPublickey] = useState("");
  const [actualPublicKey, setActualPublicKey] = useState("");
  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();
    await recoverPUBLICKey();
    if (recoveredPublickey !== actualPublicKey) {
      alert("Please re enter your public key & signature");
      setSignature("");
      setActualPublicKey("");
    } else {
      try {
        const {
          data: { balance },
        } = await server.post(`send`, {
          sender: actualPublicKey,
          amount: parseInt(sendAmount),
          recipient,
        });
      } catch (ex) {
        console.log(ex);
      }
    }
  }

  const recoverPUBLICKey = async () => {
    const messageHash = keccak256(utf8ToBytes(JSON.stringify(message)));
    const pubKey = secp.recoverPublicKey(
      messageHash,
      signature,
      Number(recoveryBit)
    );
    await setRecoveredPublickey(toHex(pubKey));
  };

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          required
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          required
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <label>
        Signature
        <input
          placeholder="Paste exact signature..."
          value={signature}
          required
          onChange={setValue(setSignature)}
        ></input>
      </label>

      <label>
        Message
        <input
          placeholder="Paste exact message..."
          value={message}
          required
          onChange={setValue(setMessage)}
        ></input>
      </label>
      <label>
        Recovery Bit
        <input
          type="number"
          placeholder="Paste exact recovery bit..."
          value={recoveryBit}
          required
          onChange={setValue(setRecoveryBit)}
        ></input>
      </label>
      <label>
        Your public key
        <input
          placeholder="Paste your public key"
          value={actualPublicKey}
          required
          onChange={setValue(setActualPublicKey)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;

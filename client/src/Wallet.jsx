import server from "./server";
import * as secp from "ethereum-cryptography/secp256k1";
import { toHex } from "ethereum-cryptography/utils";

/*

  1. Ask the user for private key & get public key from it.
  2. send the public key to the server to get the correcsponding blance of the public key.

  --- here it is Public Key Crytpography, because you will only have your private key. so if you want to send money 
  some other person you can send by only your account, but not from others account because you don't have access 
  to others private key.

*/

function Wallet({
  address,
  setAddress,
  balance,
  setBalance,
  setPrivateKey,
  privateKey,
}) {

  async function handlePrivateKeyChange(evt) {
    await setPrivateKey(evt.target.value);
    try {
      const tempAddress = toHex(secp.getPublicKey(evt.target.value))
      await setAddress(String(tempAddress));
      if (tempAddress) {
        const {
          data: { balance },
        } = await server.get(`/balance/${String(tempAddress)}`);
        setBalance(balance);
      } else {
        setBalance(0);
      }
    } catch (e) {
      console.log(e);
      await setAddress("Invalid address");
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Signature</h1>
      <span>This is only to check the balance.</span>
      <label>
        Private key
        <input
          placeholder="Type in a private key"
          value={privateKey}
          onChange={handlePrivateKeyChange}
        ></input>
      </label>
      <div className="address">
        ADDRESS:{" "}
        {address !== "Invalid address"
          ? address.slice(0, 4) + "..." + address.slice(-10)
          : address}
      </div>
      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;

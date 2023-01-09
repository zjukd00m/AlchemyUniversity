import { useState, useEffect, useRef } from "react";
import * as secp from "ethereum-cryptography/secp256k1";
import { toHex } from "ethereum-cryptography/utils";
import server from "./server";
import * as cryptools from "./utils/crypto";

function Wallet({ address, setAddress, balance, setBalance, privateKey, setPrivateKey }) {
  const [error, setError] = useState(null);
  const inputKeyRef = useRef(null);

  useEffect(() => {
    const getUserBalance = async () => {
        try {
          const {
            data: { balance },
          } = await server.get(`balance/${address}`);

          setBalance(balance);
        } catch (e) {
          console.log(e.message);
        }
    }

    // Get the users balance using the public address
    if (address?.length) {
      getUserBalance();
    }
  }, [address]);

  async function onChange(evt) {
    inputKeyRef.current.style["border-color"] = "1px solid #BF616A";

    const privateKey = evt.target.value;

    setPrivateKey(privateKey);

    if (privateKey?.length) {
      try {;
        // Get the public key given the private key
        const publicKey = secp.getPublicKey(privateKey);

        // Set the address as a hex string
        setAddress(toHex(cryptools.getEthereumAddress(publicKey)));

        // Clean the errors
        setError(false);
        // Set the input the normal attributes (when no error)
        inputKeyRef.current.style.border = "1px solid rgb(226, 232, 240)";
        inputKeyRef.current.style["outline-color"] = "black";
      } catch(e) {
        console.log(e.message);   
        // On error, change the input styles for a better ui feedback
        if (inputKeyRef.current) {
          inputKeyRef.current.style.border = "1px solid #BF616A";
          inputKeyRef.current.style["outline-color"] = "#BF616A";
          setError(true);
        }

        // Reset the user address
        setAddress("");
      }
    } else {
      // When the user deletes the string, reset the public address string
      setAddress("");
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Wallet Private Key
        <input placeholder="Enter your private key" value={privateKey} onChange={onChange} ref={inputKeyRef} ></input>
        {
          error ? (
            <p style={{ fontSize: "10px", color: "#BF616A" }}> Enter a valid private key </p> 
          ) : null
        }
      </label>

      {
        address?.length ? (
          <div>
            <label> 
              Public Address 
              <input value={`0x${address}`} disabled={true} />
            </label>
          </div>
        ) : null
      }

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;

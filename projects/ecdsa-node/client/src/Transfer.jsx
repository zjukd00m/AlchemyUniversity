import { useState }  from "react";
import { toHex } from "ethereum-cryptography/utils";
import server from "./server";
import * as cryptools from "./utils/crypto";

function Transfer({ privateKey }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();

    if (!recipient || !recipient?.length) {
      alert("You must provide the receipent address");
      return;
    }

    if (sendAmount <= 0) {
      alert("The send amount must be a value higher than 0");
      return;
    }


    const hashedMessage = cryptools.hashMessage(JSON.stringify({ sendAmount }));
    const signedTx = await cryptools.generateMsgSignature(hashedMessage, privateKey);
          
    const data = {
      transaction: toHex(signedTx),
      hashedMessage: toHex(hashedMessage),
      recipient,
      amount: parseFloat(sendAmount),
    };

    try {
      const response = await server.post("/send", data);
      console.log(response);
    } catch (e) {
      console.log(e.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
          type="number"
          min={1}
        ></input>
      </label>

      <label> Recipient
        <input
          placeholder="Type a valid ethereum address"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;

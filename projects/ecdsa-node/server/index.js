const express = require("express");
const app = express();
const cors = require("cors");
const { toHex } = require("ethereum-cryptography/utils");
const port = 3042;
const Wallet = require("./utils/wallet");
const cryptools = require("./utils/crypto");

app.use(cors());
app.use(express.json());

const userA = new Wallet(100);
const userB = new Wallet(50);
const userC = new Wallet(75);

const users = [userA, userB, userC];

for (const user of users) {
  console.log("===============");
  console.log("Balance")
  console.log(user.balance);
  console.log("Private Key");
  console.log(user.privateKey);
  console.log("Public Key");
  console.log(user.getAddress());
  console.log("Public Key");
  console.log(user.publicKey);
}


app.get("/balance/:address", (req, res) => {
  const { address } = req.params;

  const user = users?.find((user) => user.getAddress() === address);

  if (!user) {
    return res.send({ message: "User not found" }).status(404);
  };

  const balance = user.balance;

  res.send({ balance });
});

// Receive a signed transaction from the client
// Derive the public key from the signature
app.post("/send", (req, res) => {
  const { recipient, amount, transaction, hashedMessage } = req.body;

  console.log({
    recipient,
    amount,
    transaction,
    hashedMessage,
  });

  let recipientUser;
  let senderUser;

  // Verify if there's an user that has the public address
  // that were sent from the react app
  for (let i=0; i<users.length; i++) {
    const user = users[i];

    if (user.getAddress() === recipient) {
      recipientUser = user;
    }
  }

  if (!recipientUser) {
    return res.status(404).json({
      message: "The receipent user doesn't exists",
    });
  }
  
  // Get the sender's publicc key given the signature (transaction) and the hashed message
  const senderPublicKey = cryptools.getPublicKeyFromSignature(hashedMessage, transaction);

  console.log(senderPublicKey);
  console.log(toHex(senderPublicKey));
  console.log(cryptools.getEthereumAddress(senderPublicKey));

  // Find the sender users inside the users array
  for (let i=0; i<users.length; i++) {
    const user = users[i];

    if (user.getAddress() === "") {
      senderUser = user;
    }
  }

  if (!senderUser) {
    return res.status(404).json({
      message: "The sender user wasn't found",
    });
  }

  // Send the given amount to the recipient user
  try {
    senderUser.send(amount, recipientUser);
  } catch(err) {
    return res.status(400).json({
      message: err.message,
    });
  }

  res.json({ data: { msg: "This is the violet flame" } });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

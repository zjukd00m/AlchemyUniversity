const express = require('express');
const verifyProof = require('../utils/verifyProof');
const niceList = require("../utils/niceList.json");
const MerkleTree = require("../utils/MerkleTree");

const port = 1225;

const app = express();
app.use(express.json());


// Create the Merkle Tree using the guest list as leaves
const merkleTree = new MerkleTree(niceList);

// Get the root of the Merkle tree and store it as a variable
const MERKLE_ROOT = merkleTree.getRoot()


app.post('/gift', (req, res) => {
  // grab the parameters from the front-end here
  const { name }= req.body;

  const nameIndex = niceList.findIndex((n) => n === name);

  const proof = merkleTree.getProof(nameIndex);

  const isInTheList = verifyProof(proof, name, MERKLE_ROOT);

  if(isInTheList) {
    res.send("You got a toy robot!");
  }
  else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

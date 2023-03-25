const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());
/*
  ask user to sign message using metamask & get public key, if it is there, then transfer funds.
*/

const balances = {
  "04c4955cd7d8e14e55734513cc5dc0a51ef057d28b7a6b17a1c6346840c78e7220a9ea67fa6e97132db4da6c16d40dcfe7abe92d18c87fc88064ba519add2f1e95": 100,
  "043cf0ff00d1aee3fb22235f7915fad61fcbb8fc71b53109f012d0f9464e6e5c9dd359f0bb360a6e2d7e9acfe0bcb6c2d17566de2dabbc65c32c2dce38c3d4e083": 50,
  "04a08c8b81828c4d052a2fb92d6865b3be1eb8ab4733ed43fd53ce09a7d7eb4b9722060375a8b011ad66598e834da625d1f69e99ca85d527cb25485b620b099f05": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}

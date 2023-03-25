const secp = require("ethereum-cryptography/secp256k1");
const {toHex} = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");


const privateKey = secp.utils.randomPrivateKey();
console.log("Private key: ",toHex(privateKey));
const publicKey = secp.getPublicKey(privateKey);
console.log("Public key: ", toHex(publicKey));

/*
Private key:  5f8305a7feb60cba841cae042f7331e4321dadabf6cf973f8ca0ad2843a78dd3
Public key:  04c4955cd7d8e14e55734513cc5dc0a51ef057d28b7a6b17a1c6346840c78e7220a9ea67fa6e97132db4da6c16d40dcfe7abe92d18c87fc88064ba519add2f1e95


Private key:  a2cff224ba9da23626fbbfceac223bfa58fb53d463744e8f3711291a23913180
Public key:  043cf0ff00d1aee3fb22235f7915fad61fcbb8fc71b53109f012d0f9464e6e5c9dd359f0bb360a6e2d7e9acfe0bcb6c2d17566de2dabbc65c32c2dce38c3d4e083

Private key:  e3cc97d45064006438f6c33ec5a4b50073a6ee7a6aa7baa4960f95a5a2cb8b2d
Public key:  04a08c8b81828c4d052a2fb92d6865b3be1eb8ab4733ed43fd53ce09a7d7eb4b9722060375a8b011ad66598e834da625d1f69e99ca85d527cb25485b620b099f05

*/
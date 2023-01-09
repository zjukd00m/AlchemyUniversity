const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes } = require("ethereum-cryptography/utils");

const createRandomKeyPair = () => {
    const privateKey = secp.utils.randomPrivateKey();
    const publicKey = secp.getPublicKey(privateKey);

    return { privateKey, publicKey };
}

const getEthereumAddress = (publicKey) => {
    const hashedPublicKey = keccak256(publicKey.slice(1))
    return hashedPublicKey.slice(hashedPublicKey.length - 20);
}

const hashMessage = (message) => {
    const bytesMessage = utf8ToBytes(message);
    const hashedMessage = keccak256(bytesMessage);
    return hashedMessage;
}

const generateMsgSignature = (hashedMessage, privateKey) => secp.sign(hashedMessage, privateKey);

const verifySignature = (signature, hashedMessage, publicKey) => secp.verify(signature, hashedMessage, publicKey);

const getPublicKeyFromSignature = (hashedMessage, signature) => secp.recoverPublicKey(hashedMessage, signature, 1);

module.exports = { 
    createRandomKeyPair, 
    getEthereumAddress, 
    hashMessage,
    generateMsgSignature,
    verifySignature,
    getPublicKeyFromSignature,
};

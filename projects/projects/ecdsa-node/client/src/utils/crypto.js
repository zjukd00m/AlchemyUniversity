import * as secp from "ethereum-cryptography/secp256k1";
import { keccak256 } from "ethereum-cryptography/keccak";
import { utf8ToBytes } from "ethereum-cryptography/utils";

export const createRandomKeyPair = () => {
    const privateKey = secp.utils.randomPrivateKey();
    const publicKey = secp.getPublicKey(privateKey);

    return { privateKey, publicKey };
}

export const getEthereumAddress = (publicKey) => {
    const hashedPublicKey = keccak256(publicKey.slice(1))
    return hashedPublicKey.slice(hashedPublicKey.length - 20);
}

export const hashMessage = (message) => {
    const bytesMessage = utf8ToBytes(message);
    const hashedMessage = keccak256(bytesMessage);
    return hashedMessage;
}

export const generateMsgSignature = (hashedMessage, privateKey) => secp.sign(hashedMessage, privateKey);

export const verifySignature = (signature, hashedMessage, publicKey) => secp.verify(signature, hashedMessage, publicKey);

export const getPublicKeyFromSignature = (hashedMessage, signature) => secp.recoverPublicKey(hashedMessage, signature, 1);

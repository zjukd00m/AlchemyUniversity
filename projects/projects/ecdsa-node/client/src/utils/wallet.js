import { toHex } from "ethereum-cryptography/utils";
import { 
    createRandomKeyPair, 
    getEthereumAddress, 
    hashMessage, 
    generateMsgSignature, 
    verifySignature
} from "./crypto";

export default class Wallet {
    address;
    balance;
    publicKey;
    privateKey;

    constructor(balance) {
        const { privateKey, publicKey } = createRandomKeyPair();

        this.privateKey = privateKey;
        this.publicKey = publicKey;
        this.address = getEthereumAddress(publicKey);
        this.balance = balance || 100;
    };

    getAddress() {
        return toHex(this.address);
    }
    
    send(amount, userWallet) {
        // Multiple validations
        if (!amount || amount <= 0) {
            throw new Error("Can't send 0 or a lesser amount");
        }

        if (this.balance < amount) {
            throw new Error("Can't send an amount higher than your current balance");
        }

        if (!address) {
            throw new Error("The receipt address must be provided");
        }

        if (address === this.getAddress()) {
            throw new Error("Can't send funds to your own wallet");
        }

        console.log(`Will transfer the user ${amount} tokens`);

    }

    receive(amount) {
        if (!amount || amount <= 0) {
            throw new Error("Cant receive an amount less or equals to 0");
        }

        this.balance += amount;
    }

    // Sign a message using the user's private key
    async sign(message) {
        if (!message || !message?.length) {
            throw new Error("The message can't be empty");
        }

        // Hash the message using the elliptic curve
        const hashedMessage = hashMessage(message);
        
        const signature = await generateMsgSignature(hashedMessage);

        return signature;
    }

    async verify(signature, hashedMessage) {
        if (!signature) {
            throw new Error("You must provide a valid signature");
        }

        if (!hashedMessage || !hashedMessage?.length) {
            throw new Error("You must provide a valid message hash")
        }

        const isValidSignature = verifySignature(signature, hashedMessage, this.publicKey);
        
        return isValidSignature;
    }

}

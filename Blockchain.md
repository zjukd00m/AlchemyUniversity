# The Blockchain

The purpose of the blockchain is to have a peer to peer network in which the devices agree upon a common state of data. This process is commonly known as __consensus__.

It took research in the areas of __cryptography__ and __game theory__ to build the first blockchain that solved the _trust_ problem to avoid having a centralized place that controlls it all.

The _descentralization_ in the blockchain means that the code or the _smart contracts_ runs (after it's compiled and deployed) in a blochchain node and it becomes publicy available (everyone can see the deployed source code).


__Advangtages__

- Censorship resistant


## The Cryptograpy Hash Function

A hash function is a 'one-way' transformation that's applied to the input and it produces a fixed length sequence of bytes. It's not possible to obtain the input if we only have the hashed data but there are many techniques that may work with a little of tricks:

If we know the hash of some common inputs then we can use a **_brute force attack_** by creating a **_rainbow table_**.

To __avoid__ this kind of attacks it's better to add _salt_, _pepper_ or both to the input to make it harder to guess.


### Encryption

Encryptions means to transform a sequenece of characters in such a way that if the message is intercepted it stays "_secret_" and doesn't reveal any kind of the information that is to be sent.

The most common methods used in cryptography are:

- Simmetric-Key Encryption: 
  - one private key that must be shared between two parties to encrypt/decrypt the data

- Assimetric-Key Encryption (Public Key Encryption):
  - a pair of keys (public key and private key)
  - idea proposed in _1976_ by _Whitfield Diffie_

The Public Key Encryption is the most used today since its a more reliable method to share messages between two parties. A message can be encrypted with both the _private key_ and the _public key_ but the way it works it's not the same as we'll see in this example:

__Encryption with Private Key__

1. Bob wants to send a message and encrypts it using his private key
2. Bob sends the message to other user
3. The other user decrypts the message using Bob's public key

__Encryption with Public Key__

1. An user wants to send a message to Bob
2. The user encrypts the message using Bob's public key
3. Bob receives the message and decrypts it with his private key

It doesn't matter if another user intercepts the message since is the Bob's private key the only ones that can "open" it.


#### Public Encryption Algorithms

The algorithms that are most used in practice are the _RSA_ and the _ECDSA_. While both algorithms provide the same level of security _EDCSA_ uses eliptic curves and it has a smaller key size and in the blockchain the one that's used is the _ECDSA_ one with a curve that's called the __secp256k1__.

Note that it's common to call an encryption algorithm a _digital signature algorithm_ or just DSA.

#### The RSA algorithm

Public Key: The product of two prime numbers plus a small number $y = A*B + C$
Private Key: Related number

#### The ECDSA algorithm

Public Key: An equation for the elliptic curve and a point that lies in that curve
Private Key: Number

###### A worth mentioning note

An user's private key can be mapped into a blockchain address, the process of how it's mapped is specific to the blockchain where it will belong to.

* For the Bitcoin Chain: checksum and base58 encoding
* For the Ethereum Chain: the last 20 bytes of the hashed public key


## Proof Of Work

In a proof of work blockchain the miners are the keypoint since they're the ones that produces a sequence of linked blocks with _transaction_ data to be added to the blockchain.

A miner is basically a node in the peer to peer network that __enforces__ the __consensus__ mechanism/rules in order to keep the blockchain data in a common state (what is valid and what is not).

Since it's a P2P network there are _distributed_ and _descentralized_ networks must agree on that data state.

__Mining Transactions__

A miner that worked and "inserted" a valid block in the existing blockchain is rewarded with the internal digital currency by using the _proof of work_ mechanism. The proof of work mechanism is one type of many _consensus mechanism_ that are used in other blockchains like _Polygon_ or _Ethereum_ (that uses the _proof of stake_ mechanism).

The proof of work is basically the way a miner "shows" the amount of resources spent while validating the transaction.

A mining algorithm may looks like this:

1. Take the last block header address
2. Generate a nonce (starting at 0)
3. Hash the data from 1 and 2 steps
4. Verify if the hashed data meets the required blockchain's hash difficulty
5. If the hashed data meets this requirement, then the miner gets rewarded
6. If the hashed data didn't met the requirement then repeat the process by incrementing the nonce by one

The proof of work solves the __Byzantine General's Problem__ and is there to make the network more secure.

If more than one miner finds a valid hash then the node to be rewarded is the one with the longest chain of blocks, this is called the __Nakamoto consensus__.


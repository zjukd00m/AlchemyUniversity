from block_chain import BlockChain

if __name__ == "__main__":
    # Create the blockchain instance
    blockchain = BlockChain(target_difficulty=4)

    # Mine the genesis block
    genesis_block = blockchain.get_genesis_block()

    print("Genesis block hash")
    print(genesis_block.get_hash())

    # Mine the second block
    block_data = {"username": "Lil Peep"}
    second_block = blockchain.mine_next_block(block_data)

    print("Second block hash")
    print(second_block.get_hash())

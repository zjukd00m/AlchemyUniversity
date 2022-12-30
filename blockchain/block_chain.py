from typing import List, Dict
from block import Block
from utils import get_current_timestamp
import json


class BlockChain:
    def __init__(self, target_difficulty: int):
        self.blocks: List[Block] = []
        self.TARGET_DIFFICULTY: int = target_difficulty

    def get_genesis_block(self):
        """
        The first block for the blockchain to be added

        Returns:
            Block: The genesis block
        """
        timestamp = get_current_timestamp()

        block = Block(
            id=0,
            timestamp=timestamp,
            previous_hash="0",
            data="{'user':'tylerdurden'}",
            nonce=0,
        )

        # Mine the block to get a valid hash
        block.mine(self.TARGET_DIFFICULTY)

        # Add the valid block to the chain
        self.blocks.append(block)

        return block

    def mine_next_block(self, data: Dict) -> Block:
        """
        Mine the next block given the input data

        Args:
            data (dict): The data to be added in the block's attributes

        Returns:
            Block: The block that was mined
        """

        # Get the lastest block that was mined
        latest_block = self.get_latest_block()

        # Increment the id by 1
        _id = latest_block.id + 1

        # Get the previous block header
        previous_hash = latest_block.get_hash()

        # Jsonify the data
        _data = json.dumps(data)

        # Create the block
        block = Block(
            id=_id,
            timestamp=get_current_timestamp(),
            data=_data,
            previous_hash=previous_hash,
            nonce=0,
        )

        # Mine the new block with the given data
        block.mine(self.TARGET_DIFFICULTY)

        return block

    def get_latest_block(self) -> Block:
        """
        Get the latest block that was mined

        Returns:
            Block: Latest mined block
        """
        latest_block_id = len(self.blocks) - 1

        return self.blocks[latest_block_id]

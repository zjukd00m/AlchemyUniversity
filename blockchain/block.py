from typing import Optional
from pydantic import BaseModel
from utils import get_current_timestamp, get_hashed_data, is_valid_hash


class Block(BaseModel):
    id: int
    # Time when block was mined (in seconds)
    timestamp: float
    # Previous block header
    previous_hash: Optional[str]
    # Transaction data
    data: str
    # Random nonce that starts from 0
    nonce: int = 0

    def get_hash(self) -> str:
        """
        Compute the hash for the current block by hashing all of its data

        Returns:
            str: Hexadecimal string that's the hashed block contents
        """
        # The block data to be hashed
        block_data = {
            "id": self.id,
            "timestamp": self.timestamp,
            "previous_hash": self.previous_hash,
            "data": self.data,
            "nonce": self.nonce,
        }

        return get_hashed_data(block_data)

    def mine(self, TARGET_DIFFICULTY: int):
        """
        To find a valid hash the block is mined multiple times which
        is basically incrementing the nonce by 1
        """
        # Set the nonce to 0 when initially mining
        self.nonce = 0

        # Get the block hash
        block_hash = self.get_hash()

        # Loop until finding a valid hash
        while not is_valid_hash(block_hash, TARGET_DIFFICULTY):
            # Increment the nonce by 1
            self.nonce += 1

            # Set the timestamp to the current time
            self.timestamp = get_current_timestamp()

            # Get the block hash with the new nonce (if looping more than once)
            block_hash = self.get_hash()

        return block_hash

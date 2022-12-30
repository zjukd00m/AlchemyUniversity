from typing import Dict
from datetime import datetime
import hashlib
import json


def get_current_timestamp() -> float:
    """
    Get the current time as a timestamp in seconds
    """
    # Current time in UTC
    current_time = datetime.utcnow()
    # Timestamp in seconds
    return current_time.timestamp()


def get_hashed_data(data: Dict) -> str:
    # Jsonify the data and then encode it as a binary sequence
    bytes_data = json.dumps(data).encode("utf-8")

    # Compute the hash and return its hexadecimal string version
    return hashlib.sha512(bytes_data).hexdigest()


def is_valid_hash(_hash: str, TARGET_DIFFICULTY: int) -> bool:
    """
    Validate whether or not the hash meets the TARGET_DIFFICULT
    of the blockchain (has a number of leading 0's equals to that difficulty).

    Args:
        hash (bool): _description_

    Returns:
        bool: tells if the hash is valid
    """
    # Get the first TARGET_DIFFICULTY number of characters
    leading_chars = _hash[:TARGET_DIFFICULTY:]

    # Verify if all the leading chars are 0
    for char in leading_chars:
        if char != "0":
            return False

    return True

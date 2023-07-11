import base64
from Crypto.Cipher import AES
from Crypto.Hash import SHA256
from Crypto import Random


def encrypt(key: str, source: str, encode=True):
    try:
        key = key.encode("UTF-8")
        source = source.encode("UTF-8")
        key = SHA256.new(key).digest()
        IV = Random.new().read(AES.block_size)
        encryptor = AES.new(key, AES.MODE_CBC, IV)
        padding = AES.block_size - len(source) % AES.block_size
        source += bytes([padding]) * padding
        data = IV + encryptor.encrypt(source)  
        return base64.b64encode(data).decode("latin-1") if encode else data
    except Exception as e:
        raise RuntimeError("Encrypt error: ", e)

def decrypt(key: str, source, decode=True):
    try: 
        key = key.encode("UTF-8")
        if decode:
            source = base64.b64decode(source.encode("latin-1"))
        key = SHA256.new(key).digest() 
        IV = source[:AES.block_size]  
        decryptor = AES.new(key, AES.MODE_CBC, IV)
        data = decryptor.decrypt(source[AES.block_size:])
        padding = data[-1]  
        if data[-padding:] != bytes([padding]) * padding:
            raise ValueError("Invalid padding...")
        return data[:-padding].decode("UTF-8")
    except Exception as e:
        raise RuntimeError("Decrypt error: ", e)
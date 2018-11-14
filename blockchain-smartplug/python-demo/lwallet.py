import web3
from web3.auto import w3

import os


def _check_connection():
    if not w3.isConnected():
        raise Exception("Could not connect to the node", '')


class LWallet:
    def __init__(self):
        _check_connection()

        contract_address = "0x78b3D69911fE61FD7FcdB869B79449175832422E"
        contract_abi = '[ { "constant": true, "inputs": [], "name": "totalSupply_", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "socketId", "type": "address" } ], "name": "getConsumption", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "lsw", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "currentConsumption", "type": "uint256" } ], "name": "updateConsumption", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "transfer", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "socketId", "type": "address" } ], "name": "getBalance", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [ { "name": "_lsw", "type": "address" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "sourceSocket", "type": "address" }, { "indexed": false, "name": "consumption", "type": "uint256" }, { "indexed": false, "name": "balance", "type": "uint256" } ], "name": "PowerConsumption", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "from", "type": "address" }, { "indexed": true, "name": "to", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" } ], "name": "Transfer", "type": "event" } ]'
        self.l = w3.eth.contract(
            address=contract_address,
            abi=contract_abi,
        )

        self.account_addr = '0x9b4486BEC14ee60BF4738be06a23e12A76Cb724a'
        self.account_pwd = 'test'

        self._authorize()

    def _authorize(self):
        res = w3.personal.unlockAccount(self.account_addr, self.account_pwd)
        print('auth result: ' + str(res))

    def getConsumption(self, socketId):
        self._authorize()
        return self.l.functions.socketUpdate(socketId).transact({'from': self.account_addr})

    def updateConsumption(self, currentConsumption):
        self._authorize()
        return self.l.functions.updateConsumption(currentConsumption).transact({'from': self.account_addr})


if __name__ == '__main__':
    os.environ['WEB3_PROVIDER_URI'] = "ws://127.0.0.1:8546"

    l = LWallet()

    l.updateConsumption(12)

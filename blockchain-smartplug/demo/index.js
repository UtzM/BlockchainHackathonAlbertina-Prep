// Shorthand for $( document ).ready()
$(function () {
    const key = "0xf7ff9e8b7bb2e09b70935a5d785e0cc5d9d0abf0862ba9e16088902221101976";

    let deviceWallet = new ethers.Wallet(key);
    const deviceAddress = deviceWallet.address;

    console.log("Device wallet address: " + deviceWallet);

    // The Contract interface
    const abi = [
        {
            "constant": true,
            "inputs": [],
            "name": "totalSupply_",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "socketId",
                    "type": "address"
                }
            ],
            "name": "getConsumption",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "lsw",
            "outputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "owner",
            "outputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "currentConsumption",
                    "type": "uint256"
                }
            ],
            "name": "updateConsumption",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_to",
                    "type": "address"
                },
                {
                    "name": "_value",
                    "type": "uint256"
                }
            ],
            "name": "transfer",
            "outputs": [
                {
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "socketId",
                    "type": "address"
                }
            ],
            "name": "getBalance",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "name": "_lsw",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "sourceSocket",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "consumption",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "name": "balance",
                    "type": "uint256"
                }
            ],
            "name": "PowerConsumption",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "name": "to",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "Transfer",
            "type": "event"
        }
    ];

    // Connect to the network
    let provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");

    // The address from the above deployment example
    let contractAddress = "0x871749bFe9B225A728c6A83C8595550d2142952A";

    // We connect to the Contract using a Provider, so we will only
    // have read-only access to the Contract
    let contract = new ethers.Contract(contractAddress, abi, provider);

    console.log(getConsumption(deviceAddress, contract));
});

async function getConsumption(deviceId, contract) {
    // Get the current value
    return await contract.getBalance(deviceId);
}

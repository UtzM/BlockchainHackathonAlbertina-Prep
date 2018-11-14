// Shorthand for $( document ).ready()
$(function () {
    const key = "0xf7ff9e8b7bb2e09b70935a5d785e0cc5d9d0abf0862ba9e16088902221101976";

    let deviceWallet = new ethers.Wallet(key);
    const deviceAddress = deviceWallet.address;

    console.log("Device wallet address: " + deviceWallet);

    // The Contract interface
    let abi = [
        "event ValueChanged(address indexed author, string oldValue, string newValue)",
        "constructor(string value)",
        "function getValue() view returns (string value)",
        "function setValue(string value)"
    ];

    // Connect to the network
    let provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");

    // The address from the above deployment example
    let contractAddress = "0x2bD9aAa2953F988153c8629926D22A6a5F69b14E";

    // We connect to the Contract using a Provider, so we will only
    // have read-only access to the Contract
    let contract = new ethers.Contract(contractAddress, abi, provider);

    console.log(getConsumption(deviceAddress, contract));
});

async function getConsumption(deviceId, contract) {
    // Get the current value
    return await contract.consumptions(deviceId);
}

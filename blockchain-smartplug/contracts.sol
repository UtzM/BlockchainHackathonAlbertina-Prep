pragma solidity ^0.4.24;


contract owned {
    address _owner;

    constructor() public {
        _owner = msg.sender;
    }

    // This contract only defines a modifier but does not use
    // it: it will be used in derived contracts.
    // The function body is inserted where the special symbol
    // `_;` in the definition of a modifier appears.
    // This means that if the owner calls this function, the
    // function is executed and otherwise, an exception is
    // thrown.
    modifier owner {
        require(
            msg.sender == _owner,
            "Only owner can call this function."
        );
        _;
    }
}

contract LSW is owned {
    uint public price;

    function setPrice(uint _price) public owner {
        price = _price;
    }

}

contract L2 {
    address public owner;
    LSW public lsw;
    uint public totalSupply_;

    // Last stored power consumption for a given socket
    mapping(address => uint) consumptions;

    // Total balance of credits for a given socket
    mapping(address => uint) balances;

    event PowerConsumption(address indexed sourceSocket, uint consumption, uint balance);
    event Transfer(address indexed from, address indexed to, uint256 value);

    constructor(LSW _lsw) public {
        owner = msg.sender;
        lsw = _lsw;
    }


    // Private methods
    function isNotNullAddress(address addr) internal pure returns (bool) {
        return !(addr == address(0));
    }

    function getConsumption(address socketId) public view returns (uint) {
        require(isNotNullAddress(socketId));
        return consumptions[socketId];
    }

    function getBalance(address socketId) public view returns (uint) {
        require(isNotNullAddress(socketId));
        return balances[socketId];
    }

    // Public functions (transactions)
    function updateConsumption(uint currentConsumption) public {
        address socketId = msg.sender;
        // Check if socketId is not empty
        require(isNotNullAddress(socketId));

        uint lastConsumption = consumptions[socketId];
        require(
            lastConsumption <= currentConsumption,
            "Current consumption is lower than the last one registered"
        );

        uint delta = currentConsumption - lastConsumption;
        uint cost = delta * lsw.price();

        consumptions[socketId] = currentConsumption;
        balances[socketId] += cost;

        emit PowerConsumption(socketId, currentConsumption, balances[socketId]);
    }

    /**
     * @dev transfer token for a specified address
     * @param _to The address to transfer to.
     * @param _value The amount to be transferred.
     */
    function transfer(address _to, uint _value) public returns (bool) {
        require(isNotNullAddress(_to));
        if (msg.sender == owner) {
            totalSupply_ += _value;
            balances[_to] += _value;
        } else {
            require(_value <= balances[msg.sender]);
            balances[msg.sender] = balances[msg.sender] - _value;
            balances[_to] = balances[_to] + _value;
        }
        emit Transfer(msg.sender, _to, _value);
        return true;
    }
}

var Web3 = require("web3");
var EthereumTransaction = require("ethereumjs-tx").Transaction
var web3 = new Web3('HTTP://127.0.0.1:8545');

// CONFIGURATION (Set wallet address, destination, and source private key)
var sendingAddress = '0xA21f89E816846a779f0411c3eD5BFcdb4B159d64';
var receivingAddress = '0xd1d5EaB3d2CF10De250D1B1f30611948479e3959';
var privateKeySender = '9f9d6de457936159cbd5c7d7696fb75ecbab2668e4467b23078aefed186770d5';
var privateKeySenderHex = Buffer.from(privateKeySender, 'hex');

// TX CONFIG (Enter the amount of ETH to send and select gas price)
web3.eth.getTransactionCount(sendingAddress, (err, txCount) => {
    var txObject = {
      nonce:    web3.utils.toHex(txCount),
      to:       receivingAddress,
      value:    web3.utils.toHex(web3.utils.toWei('1', 'ether')),
      gasLimit: web3.utils.toHex(21000),
      gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
    }

// SIGN & TRANSACT
var transaction = new EthereumTransaction(txObject);
transaction.sign(privateKeySenderHex);
var serializedTransaction = transaction.serialize(); 
web3.eth.sendSignedTransaction(serializedTransaction);

// VIEW RESULTING BALANCE
web3.eth.getBalance(sendingAddress).then(console.log);
web3.eth.getBalance(receivingAddress).then(console.log);
});
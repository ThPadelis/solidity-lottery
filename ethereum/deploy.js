const HDWalletProvider = require("truffle-hdwallet-provider");
const { bytecode, interface } = require("./compile");
const Web3 = require("web3");
require("dotenv").config();

const provider = new HDWalletProvider(
  process.env.APP_MNEMONIC,
  process.env.APP_RINKEBY
);

const web3 = new Web3(provider);

(async () => {
  const accounts = await web3.eth.getAccounts();
  console.log("Attemping to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(interface)
    .deploy({ data: bytecode })
    .send({ gas: "1000000", from: accounts[0] });

  console.log("Contract deployed to", result.options.address);
})();

const path = require("path");
const fs = require("fs");
const solc = require("solc");

const LotterPath = path.resolve(__dirname, "contracts", "Lottery.sol");
const source = fs.readFileSync(LotterPath, "utf8");

const input = {
    language: 'Solidity',
    sources: {
        'Lottery.sol': {
            content: source
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ["abi", "evm.bytecode"]
            }
        }
    }
};

let output = JSON.parse(solc.compile(JSON.stringify(input)));

let bytecode;
let interface;

for (let contractName in output.contracts['Lottery.sol']) {
    bytecode = output.contracts['Lottery.sol'][contractName].evm.bytecode.object;
    interface = output.contracts['Lottery.sol'][contractName].abi;
}

module.exports = { bytecode, interface  };
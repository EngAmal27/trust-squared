export const abi = [
  {
    "inputs": [
      {
        "internalType": "contract ISuperfluid",
        "name": "host",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "NO_FLOW_CHANGE",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "NotAcceptedSuperToken",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "NotImplemented",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "UnauthorizedHost",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "truster",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "int96",
        "name": "newTrust",
        "type": "int96"
      },
      {
        "indexed": false,
        "internalType": "int96",
        "name": "totalTrusteeInFlow",
        "type": "int96"
      },
      {
        "indexed": false,
        "internalType": "int96",
        "name": "totalTrusterOutFlow",
        "type": "int96"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "prevTrustScore",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "newTrustScore",
        "type": "uint256"
      }
    ],
    "name": "TrustUpdated",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "CFAV1_TYPE",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "HOST",
    "outputs": [
      {
        "internalType": "contract ISuperfluid",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "member",
        "type": "address"
      },
      {
        "internalType": "enum TrustPool.IdType",
        "name": "idtype",
        "type": "uint8"
      }
    ],
    "name": "addMember",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "contract ISuperToken",
        "name": "superToken",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "agreementClass",
        "type": "address"
      },
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      },
      {
        "internalType": "bytes",
        "name": "agreementData",
        "type": "bytes"
      },
      {
        "internalType": "bytes",
        "name": "",
        "type": "bytes"
      },
      {
        "internalType": "bytes",
        "name": "ctx",
        "type": "bytes"
      }
    ],
    "name": "afterAgreementCreated",
    "outputs": [
      {
        "internalType": "bytes",
        "name": "newCtx",
        "type": "bytes"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "contract ISuperToken",
        "name": "superToken",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "agreementClass",
        "type": "address"
      },
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      },
      {
        "internalType": "bytes",
        "name": "agreementData",
        "type": "bytes"
      },
      {
        "internalType": "bytes",
        "name": "cbdata",
        "type": "bytes"
      },
      {
        "internalType": "bytes",
        "name": "ctx",
        "type": "bytes"
      }
    ],
    "name": "afterAgreementTerminated",
    "outputs": [
      {
        "internalType": "bytes",
        "name": "newCtx",
        "type": "bytes"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "contract ISuperToken",
        "name": "superToken",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "agreementClass",
        "type": "address"
      },
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      },
      {
        "internalType": "bytes",
        "name": "agreementData",
        "type": "bytes"
      },
      {
        "internalType": "bytes",
        "name": "cbdata",
        "type": "bytes"
      },
      {
        "internalType": "bytes",
        "name": "ctx",
        "type": "bytes"
      }
    ],
    "name": "afterAgreementUpdated",
    "outputs": [
      {
        "internalType": "bytes",
        "name": "newCtx",
        "type": "bytes"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "contract ISuperToken",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      },
      {
        "internalType": "bytes",
        "name": "",
        "type": "bytes"
      },
      {
        "internalType": "bytes",
        "name": "",
        "type": "bytes"
      }
    ],
    "name": "beforeAgreementCreated",
    "outputs": [
      {
        "internalType": "bytes",
        "name": "",
        "type": "bytes"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "contract ISuperToken",
        "name": "superToken",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "agreementClass",
        "type": "address"
      },
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      },
      {
        "internalType": "bytes",
        "name": "agreementData",
        "type": "bytes"
      },
      {
        "internalType": "bytes",
        "name": "",
        "type": "bytes"
      }
    ],
    "name": "beforeAgreementTerminated",
    "outputs": [
      {
        "internalType": "bytes",
        "name": "",
        "type": "bytes"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "contract ISuperToken",
        "name": "superToken",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "agreementClass",
        "type": "address"
      },
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      },
      {
        "internalType": "bytes",
        "name": "agreementData",
        "type": "bytes"
      },
      {
        "internalType": "bytes",
        "name": "",
        "type": "bytes"
      }
    ],
    "name": "beforeAgreementUpdated",
    "outputs": [
      {
        "internalType": "bytes",
        "name": "",
        "type": "bytes"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bool",
        "name": "activateOnCreated",
        "type": "bool"
      },
      {
        "internalType": "bool",
        "name": "activateOnUpdated",
        "type": "bool"
      },
      {
        "internalType": "bool",
        "name": "activateOnDeleted",
        "type": "bool"
      }
    ],
    "name": "getConfigWord",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "configWord",
        "type": "uint256"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "member1",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "member2",
        "type": "address"
      }
    ],
    "name": "getMutualId",
    "outputs": [
      {
        "internalType": "enum TrustPool.IdType",
        "name": "mutualId",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "contract ISuperToken",
        "name": "",
        "type": "address"
      }
    ],
    "name": "isAcceptedSuperToken",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "memberTrusts",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "enum TrustPool.IdType",
        "name": "",
        "type": "uint8"
      },
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "members",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bool",
        "name": "activateOnCreated",
        "type": "bool"
      },
      {
        "internalType": "bool",
        "name": "activateOnUpdated",
        "type": "bool"
      },
      {
        "internalType": "bool",
        "name": "activateOnDeleted",
        "type": "bool"
      }
    ],
    "name": "selfRegister",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "trustScore",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "name": "trusts",
    "outputs": [
      {
        "internalType": "address",
        "name": "trustee",
        "type": "address"
      },
      {
        "internalType": "int96",
        "name": "flowRate",
        "type": "int96"
      },
      {
        "internalType": "enum TrustPool.IdType",
        "name": "idtype",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const
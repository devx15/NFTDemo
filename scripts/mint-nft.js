
const API_URL = "https://eth-goerli.g.alchemy.com/v2/LDTeJdWrz5gTNBhni_E7ZugAjkzOElGE";
const PRIVATE_KEY="c3f96be3214cdd12d90c21f344b2d6eb60fd9ca9845b5b876adafd0cfa1258ba"
const PUBLIC_KEY="0xF5eE018201E593A5E4F0923499d3F26084Ff509C";
// const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
// const web3 = createAlchemyWeb3(API_URL);

// const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json");
// // console.log(JSON.stringify(contract.abi));

// const contractAddress="0xAFD50A81007b9541C952c62547bD74fCAD05235E";
// const nftContract=new web3.eth.Contract(contract.abi,contractAddress);

// //create transaction

// async function mintNFT(tokenURI) {
//     const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest"); //get latest nonce
  
//     //the transaction
//     const tx = {
//         'from': PUBLIC_KEY,
//         'to': contractAddress,
//         'nonce': nonce,
//         'gas': 500000,
//         'data': nftContract.methods. mintNFT (PUBLIC_KEY, tokenURI).encodeABI()
//       };
  
//     const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
//     signPromise
//       .then((signedTx) => {
//         web3.eth.sendSignedTransaction(
//           signedTx.rawTransaction,
//           function (err, hash) {
//             if (!err) {
//               console.log(
//                 "The hash of your transaction is: ",
//                 hash,
//                 "\nCheck Alchemy's Mempool to view the status of your transaction!"
//               );
//             } else {
//               console.log(
//                 "Something went wrong when submitting your transaction:",
//                 err
//               );
//             }
//           }
//         );
//       })
//       .catch((err) => {
//         console.log(" Promise failed:", err);
//       });
//   }
//   mintNFT(
//     "https://gateway.pinata.cloud/ipfs/QmaePUpfpG5s2uG7FRZsBxQyWeN6movpumHRFTCm2khpHo"
//   );









const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
const contractAddress = "0xAFD50A81007b9541C952c62547bD74fCAD05235E"
const nftContract = new web3.eth.Contract(contract.abi, contractAddress)
console.log(JSON.stringify(contract.abi));

async function mintNFT(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //get latest nonce

  //the transaction
  const tx = {
    from: PUBLIC_KEY,
    to: contractAddress,
    nonce: nonce,
    gas: 500000,
    data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
  }

  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
  signPromise
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log(
              "The hash of your transaction is: ",
              hash,
              "\nCheck Alchemy's Mempool to view the status of your transaction!"
            )
          } else {
            console.log(
              "Something went wrong when submitting your transaction:",
              err
            )
          }
        }
      )
    })
    .catch((err) => {
      console.log("Promise failed:", err)
    });
   
};
mintNFT("https://gateway.pinata.cloud/ipfs/QmaePUpfpG5s2uG7FRZsBxQyWeN6movpumHRFTCm2khpHo")


.then(() => process.exit(0))
.catch((error) => {
    console.error(error);
    process.exit(1);
});




//   const ethers = require('ethers');

// const provider = new ethers.providers.AlchemyProvider('goerli', API_URL)

// const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json");

// const signer = new ethers.Wallet(PRIVATE_KEY, provider)

// // Get contract ABI and address
// const abi = contract.abi
// const contractAddress = '0xAFD50A81007b9541C952c62547bD74fCAD05235E'

// // Create a contract instance
// const myNftContract = new ethers.Contract(contractAddress, abi, signer)

// // Get the NFT Metadata IPFS URL
// const tokenUri = "https://gateway.pinata.cloud/ipfs/QmaePUpfpG5s2uG7FRZsBxQyWeN6movpumHRFTCm2khpHo"

// // Call mintNFT function
// const mintNFT = async () => {
//     let nftTxn = await myNftContract.mintNFT(signer.address, tokenUri)
//     await nftTxn.wait()
//     console.log(`NFT Minted! Check it out at: https://goerli.etherscan.io/tx/${nftTxn.hash}`)
// }

// mintNFT()
//     .then(() => process.exit(0))
//     .catch((error) => {
//         console.error(error);
//         process.exit(1);})
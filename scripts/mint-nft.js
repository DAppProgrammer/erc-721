const { ethers } = require("ethers");
const Tx = require("ethereumjs-tx");

require("dotenv").config();
const { API_URL, PRIVATE_KEY, PUBLIC_KEY } = process.env;

const provider = new ethers.providers.JsonRpcProvider(API_URL);
const signer = provider.getSigner();

(async () => {
  const tokenURI =
    "https://gateway.pinata.cloud/ipfs/QmXLgTWbRqBSFsNmtCZFjjLTdYrnwTw2oDX1qTDKviYeex";

  const daiAbi = require("../artifacts/contracts/SikhModel.sol/SikhModel.json");
  const daiAddress = "0x3354794fde7a58cc8595a4d2c9072c0a8d7f7cb9";
  const daiContract = new ethers.Contract(
    daiAddress,
    daiAbi.abi,
    provider.getSigner()
  );

  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

  const nonce = await wallet.getTransactionCount();
  // console.log("nonce", nonce);

  let abi = ["function mintNFT(address,string)"];
  let iface = new ethers.utils.Interface(abi);
  const params = {
    _recipient: PUBLIC_KEY,
    _tokenURI: tokenURI
  };
  // console.log("IFACE", iface);
  let data = iface.encodeFunctionData("mintNFT", [PUBLIC_KEY, tokenURI]);
  // console.log("DATA", data);
  const tx = {
    from: PUBLIC_KEY,
    to: daiAddress,
    nonce: nonce,
    gasLimit: 1000000,
    gasPrice: "0x07f9acf02",
    data: data
    // data: daiContract.mintNFT(PUBLIC_KEY, tokenURI).encodeABI()
  };
  // wallet.signTransaction(tx).then((signedTX) => {
  //   provider.sendTransaction(signedTX).then(console.log);
  // });

  const signedTX = await wallet.signTransaction(tx);
  console.log("SIGNED-TX", signedTX);
  const trans = await provider.sendTransaction(signedTX);
  console.log("TRANS", trans);
  const res = await trans.wait();
  console.log("RES", res);
})();
// 0x3ad4976c662f7e9a58daf80ac073d7b5c4e6bbdd5219b393cdcb3bb40038328b;

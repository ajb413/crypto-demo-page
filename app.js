var abi;
var web3;
var accounts;
var owner;
var contract;
var contractAddress = '0xc5cde775df2b8b68bc26cb4570f951daab4276f8';

window.App = {
  start: function() {
    contract = web3.eth.contract(abi)
      .at(contractAddress);
  },

  setBuyStatus: function(message) {
    buyStatus.innerText = message;
  },

  buy: function() {
    var amount = buyAmount.value;

    // Convert full TOK to wei TOK
    amount = web3.toBigNumber(amount).mul(web3.toBigNumber('1e+18'))

    contract.purchaseToken(
      {value: amount},
      function(error, transactionHash) {
        if (error) {
          window.App.setBuyStatus('Error: ' + error);
        } else {
          window.App.setBuyStatus(
            'Purchase complete! Check the wallet TOK balance'
          );
        }
    });
  }
};

var buyAmount = document.getElementById('buyAmount');
var buyButton = document.getElementById('buyButton');
var buyStatus = document.getElementById('buyStatus');

buyButton.onclick = window.App.buy;

window.onload = function() {

  if (!Web3) {
    alert("Please install and activate MetaMask Chrome Extension");
    return;
  }

  function getABI(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
      if (rawFile.readyState === 4 && rawFile.status == "200") {
        callback(rawFile.responseText);
      }
    }
    rawFile.send(null);
  }

  getABI("./Token.json", function(json) {
    abi = JSON.parse(json).abi;
    App.start();
  });

};
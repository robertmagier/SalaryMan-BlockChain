/*************Change this when creating new contract ************/
adrSalaryMan = '0x1411cb266fced1587b0aa29e9d5a9ef3db64a9c5';

/*Add new employee*/




/* Create new web3 instance to communicate with Ethereum Blockchain */

if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  //console.log(web3);

  //Parse Solidity contract and create new contract salaryManInstance
  /*******************************************************************/

  abi = $.getJSON('SalaryMan.json', function(data) {
  abi = data.abi;
  SalaryMan = web3.eth.contract(abi);
  salaryManInstance = SalaryMan.at(adrSalaryMan);
  console.log(salaryManInstance);

  var filter = web3.eth.filter('pending');
  //filter.watch(function (error, log) {
  //console.log(log); //  {"address":"0x0000000000000000000000000000000000000000", "data":"0x0000000000000000000000000000000000000000000000000000000000000000", ...}
  //  });
event = salaryManInstance.PaymentRecived("latest");
event.watch(function(error, result) {
  if (!error) {
      console.log("PaymentRecived");
      //$("#salaryManBalance").text(getBalance(adrSalaryMan,'#salaryManBalance')).hide().fadeIn(500);
      console.log(result.args.amount.toNumber());

}});


});

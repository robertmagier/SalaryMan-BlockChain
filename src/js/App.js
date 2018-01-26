/*************Change this when creating new contract ************/
adrSalaryMan = '0x90d6832d014b5a4417a5f904c60edd4268df250e';


function getEmployees()
{
  $('#contractsList').empty();
  salaryManInstance.countEmployees((err,res) => {
    if(res)
    {
      var empcount = res.toNumber();
      salaryManInstance.getEmployees((err,res) =>{
        console.log(res);
        var empadresses = res;
        var i =0;
        for(i=0;i<empcount;i++) {
          console.log(i);
        salaryManInstance.getEmployee(empadresses[i],function(err2,res2){


        console.log(web3.toAscii(res2[0]));
        console.log(web3.toAscii(res2[1]));
        console.log((res2[3].toNumber()));
        $('#contractsList').append("<tr><td>"+res2[0]+"<td>"+web3.toAscii(res2[1])+"<td>"+web3.toAscii(res2[2])+"<td>"+i+"</tr>");

        });
        }

      });

    }

  });




 }



function web3callback(error,res)
    {
      console.log("error: " + error + " "+ "result: " + res);

    }
/*Add new employee*/

function addEmployeeFunction() {

  fNameEmp = $('#fNameEmp').val()
  lNameEmp = $('#lNameEmp').val()
  adrEmp = $('#adrEmp').val()


   //elen +=1;

   salaryManInstance.setEmployee(adrEmp,fNameEmp,lNameEmp, web3callback);

   $('#addEmpPreloaderBtn').fadeOut();
   $('#addEmpPreloaderBtn').fadeIn();
  // $('#addEmpBtn').prop("disabled", true).addClass("ui-state-disabled")
   //console.log(salarymanInstance);
}

     $(document).ready(function(){
       //getEmployees();
       $("#salaryManAdress").hide().text("Salary Man: " + adrSalaryMan).fadeIn(500).effect("bounce",{ times: 3, distance:15 }, "slow");
       $("#salaryManBalance").text("test " + getBalance(adrSalaryMan,"#salaryManBalance")).hide().fadeIn(500);

        $('#addEmpBtn').click(addEmployeeFunction);
        $("#updateContract").click(function(){
          $("#test").hide();
          $("#test").text("Contract: " + $("#contractNumber").val());
        $("#test").fadeIn(500);
        $("#test").effect( "bounce", { times: 3, distance:15 }, "slow" );
        var balance = getBalance($("#contractNumber").val(),'#balance');
        console.log(balance);
        $("#balance").text("test " + getBalance($("#contractNumber").val()));





 });

     $("#sendfunds").click(function (){
       var transaction = {
         from: $('#contractNumber').val(),
         to: $('#sendToContractNumber').val(),
         value: web3.toWei($('#sendToAmount').val(),"ether")
       };
       web3.eth.sendTransaction(transaction,web3callback);
     })
});




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
    }
  });

      eventemp = salaryManInstance.employeeInfo();
      eventemp.watch(function(error, result) {
        if (!error) {
            console.log("EmployeeInfo Event");
          //  $('#addEmpPreloaderBtn').fadeOut(500);
            //$("#salaryManBalance").text(getBalance(adrSalaryMan,'#salaryManBalance')).hide().fadeIn(500);
            $('#addEmpPreloaderBtn').fadeOut();
            $('#addEmpBtn').prop("disabled", false).removeClass("ui-state-disabled")
            //$('#fNameEmp').val('');
            //$('#lNameEmp').val('');
            //$('#adrEmp').val('');
            console.log(result.args);
           getEmployees();

}});


});

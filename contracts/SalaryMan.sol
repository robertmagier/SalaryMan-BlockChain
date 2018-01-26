pragma solidity ^0.4.18;


contract Owned {
  address owner;

  function Owned() public {
    owner = msg.sender;
  }

  modifier onlyOwner {
    require(msg.sender == owner);
    _;
  }
}

contract SalaryMan is Owned {

    struct Employee {
        uint256 totalAmount;
        bytes16 fName;
        bytes16 lName;
    }

    mapping (address => Employee) employees;
    address[] public employeeAccts;

    event employeeInfo(
      bytes16 fName,
      bytes16 lName,
      uint256 totalAmount,
      address adr
      );

      event PaymentRecived(uint amount);


    function() payable
      {
        //employeeInfo("test","test",0,msg.sender);
        PaymentRecived(msg.value);
      }

    function setEmployee(address _address, bytes16 _fName, bytes16 _lName) public onlyOwner returns(uint)
    {
        var employee = employees[_address];
        employee.fName = _fName;
        employee.lName = _lName;

        employeeAccts.push(_address) - 1;
        employeeInfo(_fName,_lName,0,_address);
    }

    function getEmployees() view public returns(address[])
    {
        return employeeAccts;
    }

    function getEmployee(address _address) public view returns(address, bytes16, bytes16, uint256)
    {
        return (_address, employees[_address].fName, employees[_address].lName, employees[_address].totalAmount);
    }

    function countEmployees() public view returns(uint)
    {
      return employeeAccts.length;
    }

    function getBalance() returns (uint){
      return this.balance;
      
    }

}

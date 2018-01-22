pragma solidity ^0.4.18;


contract SalaryMan {

    struct Employee {
        address addr;
        uint256 totalAmount;

    }

    event PaymentReceived(uint value);

    uint numEmployees;
    mapping(uint=>Employee) employees;

    function newEmployee(address adr) public returns (uint employeeID) {
        employeeID = numEmployees++;
        employees[employeeID] = Employee(adr,0);

    }

    function getNumEmployees() public view returns (uint)
    {
        return numEmployees;
    }

    function getEmployee(uint empID) public returns (Employee person) {
        person = employees[empID];
    }

    function depositFunds() public payable returns(bool success) {
    LogDep(msg.sender, msg.value, this.balance);
    return true;
  }
  event LogDep (address sender,    uint amount, uint balance);

    function() public payable {
      PaymentReceived(msg.value);

    }
}

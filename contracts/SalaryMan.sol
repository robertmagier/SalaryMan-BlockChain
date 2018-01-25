pragma solidity ^0.4.18;


contract SalaryMan {

    struct Employee {
        uint256 totalAmount;
        string fName;
        string lName;
    }

    mapping (address => Employee) employees;
    address[] public employeeAccts;

    function setEmployee(address _address, string _fName, string _lName) public returns(uint)
    {
        var employee = employees[_address];
        employee.fName = _fName;
        employee.lName = _lName;

        employeeAccts.push(_address) - 1;
    }

    function getEmployees() view public returns(address[])
    {
        return employeeAccts;
    }

    function getEmployee(address _address) public view returns(string, string, uint256)
    {
        return (employees[_address].fName, employees[_address].lName, employees[_address].totalAmount);
    }

    function countEmployees() public view returns(uint)
    {
      return employeeAccts.length;
    }

}

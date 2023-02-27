const Employee = require("./Employee.js");

class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
        super(name, id, email, "Manager");
        this.officeNo = officeNo;
    }
}

module.exports = Manager;
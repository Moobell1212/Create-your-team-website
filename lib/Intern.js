const Employee = require("./Employee.js");

class Intern extends Employee {
    constructor(name, id, email, school) {
        super(name, id, email, "Intern");
        this.school = school;
    };
    getSchool() {
        inquirer.prompt({
        type: 'input',
        name: 'school',
        message: "What is the intern's school?"})
    };
    getRole() {
        this.role = 'Intern'
    }
}

module.exports = Intern;
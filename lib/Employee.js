var emailCheck = require("email-validator");

class Employee {
    constructor(name, id, email, role) {
        this.name = name;
        this.id = id;
        this.email = email;
        this.role = role;
    };
    getRole() {
        inquirer.prompt({
            type: 'list',
            name: 'employeeType',
            message: 'What type of employee do you want to add?',
            choices: ['Manager', 'Engineer', 'Intern'],
        })
            .then((answer) => {
                if (answer.employeeType === 'Manager') {
                    console.log("You chose Manager!")
                }
                if (answer.employeeType === "Engineer") {
                    console.log("You chose Engineer!")
                }
                if (answer.employeeType === "Intern") {
                    console.log("You chose Intern!")
                }
            })
    };
    getName() {
        inquirer.prompt({
            type: 'Input',
            name: 'name',
            message: 'What is the employee name?',
            validate: answer => {
                if (answer === "") {
                    return "Employee name required"
                }
                else { return true }
            }
        })
    };
    getID() {
        inquirer.prompt({
            type: 'Input',
            name: 'id',
            message: 'What is the employee id?',
            validate: answer => {
                if (answer === "") {
                    return "Employee id required"
                }
                else { return true }
            }
        })
    };
    getEmail() {
        inquirer.prompt({
        type: 'input',
        name: 'email',
        message: 'What email address would you like to use for this README?',
        validate: answer => {
            if (!emailCheck.validate(answer)) {
                return "A valid email is required"
            }
            else {
                return true
            }
        }
    })
};

getRole();

module.exports = Employee;
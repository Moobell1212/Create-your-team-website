const Employee = require("./Employee.js");

class Engineer extends Employee {
    constructor(name, id, email, github) {
        super(name, id, email, "Engineer");
        this.github = github;
    };
    getGithub() {
        inquirer.prompt({
            type: 'input',
            name: 'github',
            message: 'What is the engineers GitHub username?',
            validate: answer => {
                if (answer === "") {
                    return "Engineer GitHub username required"
                }
                else { return true }
            }
        })
    };
    getRole() {
        this.role = 'Engineer'
    }
}

module.exports = Engineer;
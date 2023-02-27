const Employee = require("./Employee.js");

class Engineer extends Employee {
    constructor(name, id, email, github) {
        super(name, id, email, "Engineer");
        this.github = github;
    }
}

// const eng1 = new Engineer("Danish", "danish@gmail.gov", "danisheng");

module.exports = Engineer;
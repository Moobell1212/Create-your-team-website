const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

function newEmployee() {
    inquirer.prompt({
        type: 'list',
        name: 'employeeType',
        message: 'What type of employee do you want to add?',
        choices: ['Manager', 'Engineer', 'Intern'],
        validate: answer => {
            if (answer === "") {
                return "Employee tye required"
            }
            else { return true }
        }
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
}

newEmployee()
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Employee = require("./lib/Employee")
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
var emailCheck = require("email-validator");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

function startTeamBuild() {
    inquirer.prompt({
        type: 'list',
        name: 'employeeType',
        message: 'What type of employee do you want to add?',
        choices: ['Manager', 'Engineer', 'Intern', 'Finish building team'],
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
            else {
                console.log("You have finished building the team!")
            }
        })
};

function askQuestions() {
    inquirer.prompt([{
        type: 'input',
        name: 'name',
        message: 'What is the employee name?',
        validate: answer => {
            if (answer === "") {
                return "Employee name required"
            }
            else { return true }
        }
    },
    {
        type: 'input',
        name: 'id',
        message: 'What is the employee id?',
        validate: answer => {
            if (answer === "") {
                return "Employee id required"
            }
            else { return true }
        }
    },
    {
        type: 'input',
        name: 'email',
        message: "What is the employee's email address?",
        validate: answer => {
            if (!emailCheck.validate(answer)) {
                return "A valid email is required"
            }
            else {
                return true
            }
        }
    },
    {
        type: 'input',
        name: 'github',
        message: 'What is the engineers GitHub username?',
        validate: answer => {
            if (answer === "") {
                return "Engineer GitHub username required"
            }
            else { return true }
        }
    },
    {
        type: 'input',
        name: 'school',
        message: "What is the intern's school?"}])
}

startTeamBuild()
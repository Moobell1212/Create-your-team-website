const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
var emailCheck = require("email-validator");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

const team = [];

function startTeamBuild() {
    inquirer.prompt({
        type: 'input',
        name: 'employeeType',
        message: "What is the team manager's name?"
    }
    )
        .then((answer => askQuestions(answer.employeeType)))
}

function continueTeamBuild() {
    inquirer.prompt({
        type: 'list',
        name: 'employeeType',
        message: 'What type of employee do you want to add?',
        choices: ['Engineer', 'Intern', 'Finish building team'],
    })
        .then((answer) => {
            if (answer.employeeType === "Engineer") {
                // console.log("You chose Engineer!");
                askQuestions(answer.employeeType)
            }
            else if (answer.employeeType === "Intern") {
                // console.log("You chose Intern!");
                askQuestions(answer.employeeType)
            }
            else {
                console.log("You have finished building the team!");
                console.log(team)
            }
        })
};

function askQuestions(employeeType) {
    // console.log(employeeType)
    inquirer.prompt([{
        type: 'input',
        name: 'name',
        message: 'What is the employee name?',
        validate: answer => {
            if (answer === "") {
                return "Employee name required"
            }
            else { return true }
        },
        when: () => employeeType !== "Manager"
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
        // validate: answer => {
        //     if (!emailCheck.validate(answer)) {
        //         return "A valid email is required"
        //     }
        //     else {
        //         return true
        //     }
        // }
    },
    {
        type: 'input',
        name: 'github',
        message: "What is the engineer's GitHub username?",
        validate: answer => {
            if (answer === "") {
                return "Engineer GitHub username required"
            }
            else { return true }
        },
        when: () => employeeType === "Engineer"
    },
    {
        type: 'input',
        name: 'school',
        message: "What is the intern's school?",
        when: () => employeeType === "Intern"
    },
    {
        type: 'input',
        name: 'officeNo',
        message: "What is the managers office number?",
        when: () => employeeType === "Manager"
    }
    ])
        .then(answers => {
            console.log(answers);
            if (employeeType === "Manager") {
                // console.log("You chose Manager!");
                const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNo);
                team.push(manager);
                continueTeamBuild()
            }
            else if (employeeType === "Engineer") {
                // console.log("You chose Engineer!");
                const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
                team.push(engineer);
                continueTeamBuild()
            }
            else if (employeeType === "Intern") {
                // console.log("You chose Intern!");
                const intern = new Intern(answers.name, answers.id, answers.email, answers.school);
                team.push(intern);
                continueTeamBuild()
            }
        })
}

startTeamBuild()
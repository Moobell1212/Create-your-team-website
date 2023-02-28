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

// empty team array to push to later
const team = [];

// first function to get first get manager information before later building the team
function startTeamBuild() {
    inquirer.prompt({
        type: 'list',
        name: 'newTeam',
        message: "Do you want to start building the team?",
        choices: ['Yes', 'No']
    }
    )
        .then((answer) => {
            if (answer.newTeam === "Yes"){
                answer.employeeType = "Manager"
            askQuestions(answer.employeeType)}
        }
    )
}

// function for adding as many engineers and interns as wanted
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
                console.log(team);
                if (!fs.existsSync(OUTPUT_DIR)) {
                    fs.mkdirSync(OUTPUT_DIR)
                }
                fs.writeFileSync(outputPath, render(team), "UTF-8")
            }
        })
};

// questions to be asked regarding each employee
function askQuestions(employeeType) {
    // console.log(employeeType)
    inquirer.prompt([{
        type: 'input',
        name: 'name',
        message: 'What is the Manager name?',
        validate: answer => {
            if (answer === "") {
                return "Manager name required"
            }
            else { return true }
        },
        when: () => employeeType === "Manager"
    },
    {
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
        validate: answer => {
            if (answer === "") {
                return "Intern school name required"
            }
            else { return true }
        },
        when: () => employeeType === "Intern"
    },
    {
        type: 'input',
        name: 'officeNo',
        message: "What is the manager's office number?",
        validate: answer => {
            if (answer === "") {
                return "Manager office number required"
            }
            else { return true }
        },
        when: () => employeeType === "Manager"
    }
    ])
        .then(answers => {
            // console.log(answers);
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

// starts the team building functions
startTeamBuild()
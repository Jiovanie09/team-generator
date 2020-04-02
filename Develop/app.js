const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const render = require('./lib/htmlRenderer');

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

let employees = []

const confirm = 
[{
  message: 'add an employee',
  type: 'confirm',
  name: 'confirm'
}]
const questions = [
  {
    type: 'list',
    name: 'role',
    message: "role:",
    choices: ['Manager', "Engineer", "Intern"]
  },
  {
    type: 'input',
    name: 'name',
    message: 'what is your name'
  },
  {
    type: 'input',
    name: 'id',
    message: 'what is your id',
  },
  {
    type: "input",
    name: "email",
    message: "email"
  }
]
const engineerQ = [
  {
    type: 'input',
    name: 'github',
    message: 'what is your github?'
  }
]
const internQ = [
  {
    type: 'input',
    name: 'officeNumber',
    message: 'name of school?: '
  }
]
const managerQ = [{
  type:'input',
  name:'officeNumber',
  message:'office number?:'
}]

const engineer = async (data) => {
  const res = await inquirer.prompt(engineerQ)
  const e = new Engineer(data.name, data.id, data.email, res.github)
  employees.push(e)
  init()
}

const manager = async (data) => {
  const res = await inquirer.prompt(managerQ)
  const e = new Manager(data.name, data.id, data.email, res.officeNumber)
  employees.push(e)
  init()
}

const intern = async (data) => {
  const res = await inquirer.prompt(internQ)
  const e = new Intern(data.name, data.id, data.email, res.school)
  employees.push(e)
  init()
}


const exit = async (data) => {
  //send data
  render(data);
  // create html)
  fs.writeFile(outputPath, render(data),console.log);
}

const init = async () => {
  const choice = await inquirer.prompt(confirm)
  if (choice.confirm) {
    const res = await inquirer.prompt(questions)
    switch (res.role) {
      case 'Manager':
        return manager(res)
      case 'Engineer':
        return engineer(res)
      case "Intern":
        return intern(res)
      default:
        console.log('default')
        break;
    }
  } else {
    exit(employees)
  }
}


init()


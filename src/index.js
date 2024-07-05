const inquirer = require('inquirer');
const queries = require('./queries.js');

async function choiceAddDepartment() {
    const result = await inquirer.prompt([
        {
            type: 'input', 
            name: 'depName', 
            message: 'What is the name of the department',
            validate: function(data) {
                if(data.trim().length === 0) {return "Please select a valid name";}
                return true;
            }
        }
    ]);

    queries.addDepartment(result.depName);
}

async function choiceAddRole() {
    const deps = await queries.getDepartments();
    const depNames = deps.map(dep => dep.id + '-' + dep.name );

    const result = await inquirer.prompt([
        {
            type: 'input', 
            name: 'title', 
            message: 'What is the title of the role?',
            validate: function(data) {
                if(data.trim().length === 0) {return "Please select a valid name";}
                return true;
            }
        },
        {
            type: 'input', 
            name: 'salary', 
            message: 'What is the salary of the role?',
            validate: function (value) {
                const parsedValue = parseFloat(value);
                    if (isNaN(parsedValue)) {
                        return 'Please enter a valid floating-point number.';
                    }
                    
                    return true;
                },

                filter: function (value) {
                    return parseFloat(value);
                },
        },
        {
            type: 'list',
            name: 'role',
            message: 'What department is the role for?',
            choices: depNames
        }
    ]);
    
    const title = result.title;
    const salary = parseFloat(result.salary);
    const roleID = Number(result.role.split('-')[0]);
    
    queries.addRole(title, salary, roleID);
                
}

async function choiceAddEmployee() {
    const roles = await queries.getRoles();
    const roleTitles = roles.map(role => role.id + '-' + role.title );

    const employees = await queries.getEmployees();
    let emplNames = employees.map(employee => employee.id + '-' + employee.first_name + ' ' + employee.last_name);
    emplNames.push('None');

    const result = await inquirer.prompt([
        {
            type: 'input', 
            name: 'first_name', 
            message: 'What is the employee first name?',
            validate: function(data) {
                if(data.trim().length === 0) {return "Please select a valid name";}
                return true;
            }
        },
        {
            type: 'input', 
            name: 'last_name', 
            message: 'What is the employee last name?',
            validate: function(data) {
                if(data.trim().length === 0) {return "Please select a valid name";}
                return true;
            }
        },
        {
            type: 'list',
            name: 'role',
            message: 'What role the employee plays?',
            choices: roleTitles
        },
        {
            type: 'list',
            name: 'manager',
            message: 'Who is this employee manager?',
            choices: emplNames
        }
    ]);
    
    const first_name = result.first_name;
    const last_name = result.last_name;
    const role = Number(result.role.split('-')[0]);
    const manager = result.manager !== "None" ? Number(result.manager.split('-')[0]) : null;
    
    queries.addEmployee(first_name, last_name, role, manager);
}

async function choiceUpdateEmployeeRole() {
    const roles = await queries.getRoles();
    const roleTitles = roles.map(role => role.id + '-' + role.title );

    const employees = await queries.getEmployees();
    const emplNames = employees.map(employee => employee.id + '-' + employee.first_name + ' ' + employee.last_name);


    const result = await inquirer.prompt([
        {
            type: 'list',
            name: 'toUpdate',
            message: 'What Employee you would like to change the role?',
            choices: emplNames
        },
        {
            type: 'list',
            name: 'newRole',
            message: 'What role the employee will play?',
            choices: roleTitles
        }
    ]);

    const employeeID = Number(result.toUpdate.split('-')[0]);
    const newRoleID = Number(result.newRole.split('-')[0]);
    
    queries.updateEmployeeRole(employeeID, newRoleID);

    
}

const main = async () => {
    while (true) {
    try {
        const answers = await inquirer.prompt([
            {
                type: 'list',
                name: 'action',
                message: 'Choose an action:',
                choices: ['Add Employee', 'View All Employees', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Exit'],
            }
            ]);
            
        switch (answers.action) {
            case 'Add Employee':
                await choiceAddEmployee();
                break;
            case 'View All Employees':
                queries.getAllEmployees();
                break;
            case 'Update Employee Role':
                await choiceUpdateEmployeeRole();
                break;
            case 'View All Roles':
                queries.getAllRoles();
                break;
            case 'Add Role':
                await choiceAddRole();
                break;
            case 'View All Departments':
                queries.getAllDepartments();
                break;
            case 'Add Department':
                await choiceAddDepartment();
                break;
            default:
                console.log('Exiting...');
                process.exit();
            }
    }catch(err) {
        console.error(err);
    }
    }
};

main();
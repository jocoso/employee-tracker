
const { Client } = require('pg');
const fs = require('fs');
const path = require('path');  
const { exec } = require('child_process');

require('dotenv').config();

// Read connection parameters from environment variables
const host = process.env.PG_HOST;
const port = process.env.PG_PORT;
const user = process.env.PG_USER;
const password = process.env.PG_PASSWORD;
const database = process.env.PG_DATABASE;



async function getAllDepartments() {
    const client = new Client({
        host: host,
        port: port,
        user: user,
        password: password,
        database: database,
    });

    try {
        await client.connect();

        const departmentsResult = await client.query("SELECT * FROM departments;");
        const departments = departmentsResult.rows;

        console.log('\n\n================================================================');

        for (const department of departments) {

            console.log(`ID: ${department.id} --- Name: ${department.name}`);

        }

        console.log('================================================================\n\n');

    } catch {
        console.error("Error connecting to the database:", error.stack);
    } finally {
        await client.end();
    }
    
}

async function getDepartments() {
    const client = new Client({
        host: host,
        port: port,
        user: user,
        password: password,
        database: database,
    });

    try {
        await client.connect();

        const departmentsResult = await client.query("SELECT * FROM departments;");
        return  departmentsResult.rows;
    }catch(error) {
        console.error("Error connecting to the database:", error.stack);
    }finally {
        await client.end();
    };
        
}

async function getAllRoles() {
    const client = new Client({
        host: host,
        port: port,
        user: user,
        password: password,
        database: database,
    });

    try {
        await client.connect();

        const rolesResult = await client.query("SELECT * FROM roles;");
        const roles = rolesResult.rows;

        console.log('\n\n================================================================');

        for(const role of roles) {
            
            const departmentResults = await client.query("SELECT name FROM departments WHERE id = $1;", [role.department_id]);
            const departmentName = departmentResults.rows[0] ? departmentResults.rows[0].name : "Unknown";
        
            console.log(`ID: ${role.id} --- Name: ${role.title}`);
            console.log(`   Salary: $${role.salary}`);
            console.log(`   Department: ${departmentName}`);
        
        }

        console.log('================================================================\n\n');

    } catch (err) {
        console.error("Error connecting to the database:", err.stack);
    } finally {
        await client.end();
    }
}

async function getAllEmployees() {
    const client = new Client({
        host: host,
        port: port,
        user: user,
        password: password,
        database: database,
    });

    const query = `
            SELECT 
                e.id AS employee_id,
                e.first_name,
                e.last_name,
                r.title AS role_title,
                m.first_name AS manager_first_name,
                m.last_name AS manager_last_name
            FROM employees e
                LEFT JOIN roles r ON e.role_id = r.id
                LEFT JOIN employees m ON e.manager_id = m.id;
        `;

    try {
        await client.connect();
        
        const rowResults = await client.query(query);
        const results = rowResults.rows;

        console.log('\n\n================================================================');
        for(const r of results) {
            console.log(`ID: ${r.employee_id} --- First Name: ${r.first_name} --- Last Name: ${r.last_name}`);
            console.log(`   Role: ${r.role_title}`);
            r.manager_first_name && console.log(`   Manager: ${r.manager_first_name} ${r.manager_last_name}`);
        }
        console.log('================================================================\n\n');
    } catch (err) {
        console.error("Error connecting to the database:", err.stack);
    } finally {
        await client.end();
    }
}
async function addDepartment(name) {
    const client = new Client({
        host: host,
        port: port,
        user: user,
        password: password,
        database: database,
    });

    const query = "INSERT INTO departments (name) VALUES ($1);";

    try {
        await client.connect();

        const res = await client.query(query, [name]);
        console.log(`Department Added: `, res.rows);
    } catch(err) {
        console.log('Error executing query: ', err.stack);
    } finally {
        await client.end();
    }
}

async function addRole(title, salary, department_id) {
    const client = new Client({
        host: host,
        port: port,
        user: user,
        password: password,
        database: database,
    });

    const query = "INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3);";

    try {
        await client.connect();

        const res = await client.query(query, [title, salary, department_id]);
        console.log(`Department Added: `, res.rows);
    } catch(err) {
        console.log('Error executing query: ', err.stack);
    } finally {
        await client.end();
    }
}

async function getEmployees() {
    const client = new Client({
        host: host,
        port: port,
        user: user,
        password: password,
        database: database,
    });

    const query = "SELECT * FROM employees;";

    try {
        await client.connect();
        const employees = await client.query(query);
        return employees.rows;
    } catch(error) {
        console.error('Error connecting to the database:', error.stack);
    }
}

async function getRoles() {
    const client = new Client({
        host: host,
        port: port,
        user: user,
        password: password,
        database: database,
    });

    const query = "SELECT * FROM roles;";

    try {
        await client.connect();
        const roles = await client.query(query);
        return roles.rows;
    } catch(error) {
        console.error('Error connecting to the database:', error.stack);
    }
}

async function addEmployee(first_name, last_name, role_id, manager_id) {
    const client = new Client({
        host: host,
        port: port,
        user: user,
        password: password,
        database: database,
    });

    const query  = "INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)";

    try {
        await client.connect();
        const res = await client.query(query, [first_name, last_name, role_id, manager_id]);
        console.log(`Department Added: `, res.rows);
    } catch(err) {
        console.log('Error connecting to the database:', err.stack);
    }
}
async function updateEmployeeRole(employee_id, role_id) {
    const client = new Client({
        host: host,
        port: port,
        user: user,
        password: password,
        database: database,
    });

    const query = "UPDATE employees SET role_id = $2 WHERE id = $1";

    try {
        await client.connect();
        const res = await client.query(query, [employee_id, role_id]);
        console.log(`Employee Role Updated: `, res.rows);
    } catch(err) {
        console.error('Error executing query: ', err.stack);
    }
}


module.exports = {
    getAllDepartments,
    getAllRoles,
    getDepartments,
    getRoles,
    getEmployees,
    getAllEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployeeRole,
};

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

console.log('PG_HOST:', host);
console.log('PG_PORT:', port);
console.log('PG_USER:', user);
console.log('PG_PASSWORD:', password ? '*****' : null); // Mask the password
console.log('PG_DATABASE:', database);

const client = new Client({
    host: host,
    port: port,
    user: user,
    password: password,
    database: database,
});

const executeSQLFile = async (filePath) => {
    const sql = fs.readFileSync(filePath, 'utf8');
    try {
        await client.query(sql);
        console.log(`Executed ${path.basename(filePath)} successfully.`);
    } catch(err) {
        console.error(`Error executing ${path.basename(filePath)}`, err.stack);
    };
}

// Connect to the PostgreSQL database
client.connect()
    .then(async () => {
        console.log('Connected to the database successfully');
        executeSQLFile(path.join(__dirname, "schema.sql"));
        executeSQLFile(path.join(__dirname, "seeds.sql"));
        return client.query('SELECT * FROM Departments');
    })
    .then(res => {
        console.log('Database version:', res.rows[0].version);
    })
    .catch(err => {
        console.error('Error connecting to the database:', err.stack);
    })
    .finally(() => {
        client.end();
        console.log('Connection closed');
    });


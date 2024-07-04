const { Client } = require('pg');
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

// Connect to the PostgreSQL database
client.connect()
    .then(() => {
        console.log('Connected to the database successfully');
        return client.query('SELECT version();');
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
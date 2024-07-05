# Employee Tracker

## Description

Employee Tracker is a command-line application that allows users to manage a company's employee database using Node.js, Inquirer, and PostgreSQL. It provides an interface for users to view and manage departments, roles, and employees within a company.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation

1. **Clone the repository**:
   ```sh
   git clone https://github.com/jocoso/employee-tracker.git
   cd employee-tracker
   ```

2. **Install dependencies**:
   Ensure you have [Node.js](https://nodejs.org/) installed. Then, run:
   ```sh
   npm install
   ```

3. **Set up PostgreSQL**:
   - Ensure you have PostgreSQL installed and running.
   - Create a `.env` file in the root directory of the project and add your PostgreSQL connection details:
     ```env
     PG_HOST=your_postgres_hostname
     PG_PORT=5432
     PG_USER=your_postgres_user
     PG_PASSWORD=your_postgres_password
     PG_DATABASE=your_postgres_database
     ```

4. **Set up the database schema and seed data**:
   Run the following command to create the tables and insert initial data:
   ```sh
   node db/connection.js
   ```

## Usage

1. **Start the application**:
   ```sh
   npm start
   ```

2. **Follow the prompts**:
   Use the arrow keys to navigate through the options and press `Enter` to select an action. You can:
   - View all departments
   - View all roles
   - View all employees
   - Add a department
   - Add a role
   - Add an employee
   - Update an employee role

## License

This project is licensed under the MIT License. See the [LICENSE](https://mit-license.org/) file for details.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

## Tests

To run tests, run the following command:
```sh
npm test
```

## Questions

If you have any questions about the project, please open an issue or contact me directly at [joshua.collado022@gmail.com](mailto:joshua.collado022@gmail.com). You can find more of my work at [jocoso](https://github.com/jocoso).

## Link to Walkthrough Video

Watch the [walkthrough video](https://youtu.be/o1808gFCGGU) to see the application in action and understand how to use it.

-- Insert seed data into the departments table
INSERT INTO departments (name) VALUES 
('Engineering'),
('Human Resources'),
('Finance'),
('Marketing');

-- Insert seed data into the roles table
INSERT INTO roles (title, salary, department_id) VALUES 
('Software Engineer', 80000, (SELECT id FROM departments WHERE name = 'Engineering')),
('HR Manager', 60000, (SELECT id FROM departments WHERE name = 'Human Resources')),
('Accountant', 55000, (SELECT id FROM departments WHERE name = 'Finance')),
('Marketing Specialist', 50000, (SELECT id FROM departments WHERE name = 'Marketing'));

-- Insert seed data into the employees table
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES 
('John', 'Doe', (SELECT id FROM roles WHERE title = 'Software Engineer'), 2),
('Jane', 'Smith', (SELECT id FROM roles WHERE title = 'HR Manager'), NULL),
('Robert', 'Johnson', (SELECT id FROM roles WHERE title = 'Accountant'), NULL),
('Emily', 'Davis', (SELECT id FROM roles WHERE title = 'Marketing Specialist'), NULL);

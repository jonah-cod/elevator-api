# Elevator API Setup Guide

Welcome to the Elevator API setup guide! This guide will walk you through the steps to set up and test the elevator API application.

## Project Setup Instructions

### Build Database and Containers

1. Navigate to the root directory of the project.
2. Run the following command to build and start the containers:

```bash
   docker compose up -d

```

### Run Migration

1. Inside the API container's shell (terminal), navigate to the project directory.
2. Run the migration command:

```bash
npm run migrate
```


### Seed Data
1. Inside the API container's shell, navigate to the project directory.
2. Run the command to seed data:

```bash
npm run seed
```

### Testing the Elevator API
Now you're ready to test the elevator API. You can access the following URLs in your browser:

1. To view elevator information: http://localhost:2020/api/elevators/info

2. To request an elevator: http://localhost:2020/api/elevators/request?requestFloor=2&targetFloor=4

Feel free to experiment with different values for requestFloor and targetFloor to observe different elevator behaviors.

You can also open the latter request in multiple browsers to see different elevators moving concurrently.

### Running Tests
To run tests, execute:

```bash
npm run test
```

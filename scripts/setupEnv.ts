import * as fs from 'node:fs';
import inquirer from 'inquirer';

// Default environment variables
const defaultEnv = {
  PORT: 8080,
  HOST: '0.0.0.0',
  NODE_ENV: 'development',
  BASE_URL: 'http://www.omdbapi.com/',
};


// Prompt the user for API_KEY
async function setupEnvFile() {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'API_KEY',
      message: 'Enter your API_KEY:',
      validate: (input) => (input ? true : 'API_KEY cannot be empty'),
    },
  ]);

  // Merge user inputs with default values
  const envVariables = {
    ...defaultEnv,
    API_KEY: answers.API_KEY,
  };

  // Convert the environment variables to .env file format
  const envContent = Object.entries(envVariables)
    .map(([key, value]) => `${key}=${value}`)
    .join('\n');

  // Write the .env file
  fs.writeFileSync('.env', envContent);
  console.log('.env file created successfully!');
}

setupEnvFile().catch((err) => console.error('Error:', err));

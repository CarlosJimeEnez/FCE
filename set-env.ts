const fs = require('fs');
const dotenv = require("dotenv")
const envConfig = dotenv.parse(fs.readFileSync('.env'));
const path = require('path');

// Verificar y crear archivos de entorno si no existen
const envDir = path.resolve(__dirname, 'src/app/enviroments/enviroments.ts');
const envFiles = ['environment.ts', 'environment.prod.ts']

// Escritura en environment.ts
let envFileContent = `export const environment = {
  production: false,
`;

Object.keys(envConfig).forEach((key) => {
  envFileContent += `  ${key}: "${envConfig[key]}",\n`;
});

envFileContent += '};\n';
fs.writeFileSync(envDir, envFileContent);

// // Escritura en environment.prod.ts
// envFileContent = `export const environment = {
//   production: true,
// `;

// Object.keys(envConfig).forEach((key) => {
//   envFileContent += `  ${key}: "${envConfig[key]}",\n`;
// });

// envFileContent += '};\n';
// fs.writeFileSync('src/environments/environment.prod.ts', envFileContent);

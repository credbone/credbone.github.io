const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const buildInfo = {
  buildDateTime: new Date().toLocaleString(),
  version: process.env.REACT_APP_VERSION || "Version not available"
};

fs.writeFileSync(
  path.join(__dirname, 'src', 'buildInfo.json'),
  JSON.stringify(buildInfo, null, 2)
);

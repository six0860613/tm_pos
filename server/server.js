require('dotenv').config();
const fs = require('fs');
const https = require('https');
const managment = require('./management');

const PORT = process.env.PORT || 7000;
const certPath = process.env.CERT_PATH || '/home/root/.cert/';

// if certificate file exist, run with credentials
if (fs.existsSync(certPath)) {
  const keyFile = fs.readFileSync(certPath + 'server.key', 'utf-8');
  const certFile = fs.readFileSync(certPath + 'server.crt', 'utf-8');

  const credentials = {
    key: keyFile,
    cert: certFile,
  };

  https.createServer(credentials, managment).listen(PORT, () => {
    console.log(`[Server][Secure] Listening at port ${PORT}.`);
  });
} else {
  managment.listen(PORT, () => {
    console.log(`[Server] Listening at port ${PORT}.`);
  });
}

const crypto = require('crypto');

const encryptionType = 'aes-256-cbc';

function generateIv() {
  return crypto.randomBytes(16);
}


function encrypt(data, encryptionKey) {
  // Generate an Initialization Vector for each encryption
  const iv = generateIv();
  console.log(encryptionKey);
  // Cipher
  const cipher = crypto.createCipheriv(encryptionType, Buffer.from(encryptionKey), iv);

  // Encrypt the data
  let encryptedSecret = cipher.update(data);
  encryptedSecret = Buffer.concat([encryptedSecret, cipher.final()]);

  // Embedded IV with the encrypted secret
  const encryptedData = `${iv.toString('hex')}:${encryptedSecret.toString('hex')}`;
  console.log(encryptedData);
  return encryptedData;

}


function decrypt(data, encryptionKey) {
  // Retrieve the IV from the encrypted data
  const encryptedData = data.split(':');
  const iv = Buffer.from(encryptedData.shift(), 'hex');

  // Retrieve the secret
  const encryptedSecret = Buffer.from(encryptedData.join(':'), 'hex');

  // Decipher
  const decipher = crypto.createDecipheriv(encryptionType, Buffer.from(encryptionKey), iv);

  // Decrypt the data
  let secret = decipher.update(encryptedSecret);
  secret = Buffer.concat([secret, decipher.final()]);

  return secret;
}

module.exports = { encrypt, decrypt };

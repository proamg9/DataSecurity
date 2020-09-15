const boom = require('boom');
const _ = require('lodash');
const Secret = require('../models/secrets');
const crypto = require('../lib/gocrpyt');

// Get secrets by ID
exports.getSecrets = async (req,res,next) => {

  console.log(JSON.stringify(req.body.id));
  try {
    const query = req.body.id.search(/\*/) !== -1 ? { $regex: `${req.body.id}` } : req.body.id;
    const encryptedSecrets = await Secret.find({ id: query });
    const secrets = [];

    _.forEach(encryptedSecrets, (secret) => {
      secrets.push({
        id: secret.id,
        value: JSON.parse(crypto.decrypt(secret.value, req.body.encryption_key)),
      });
    });
    //console.log(secrets);
    res.status(200).send(secrets);
    return secrets;
    }
    catch (err) {
    res.status(500).send(err);
    throw boom.boomify(err);
  }
};

// Add a new secret
exports.addSecret = async (req,res,next) => {

  try {
    // Cipher data must be a string or a buffer
    console.log(JSON.stringify(req.body.value));
    const unencryptedSecret = JSON.stringify(req.body.value);

    // Encrypt secret with the encryption key passed by POST
    const encryptedSecret = crypto.encrypt(unencryptedSecret, req.body.encryption_key);

    // Save the encrypted Secret under MongoDB
    const data = {
      id: req.body.id,
      value: encryptedSecret,
    };
    res.status(201).send();
    // Save data
    return Secret.findOneAndUpdate(
      {
        id: req.body.id,
      },
      data,
      {
        upsert: true,
        new: true,
        runValidators: true,
        rawResult: true
      },
    );

  } catch(err) {

    res.status(409).send(err);
    throw boom.boomify(err);
  }
};

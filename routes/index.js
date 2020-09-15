const secretController = require('../controllers/secretController');


module.exports = (app) => {
  app.get('/api', (req, res,next) => res.status(200).send({
    message: 'Welcome to the API!',
  }));

  app.post('/api/secrets',secretController.getSecrets);
  app.post('/api/secrets/add', secretController.addSecret);
}

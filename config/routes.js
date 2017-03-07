const router = require('express').Router();

const registrations = require('../controllers/registrations');
const sessions = require('../controllers/sessions');
const cocktails = require('../controllers/cocktails');
const secureRoute = require('../lib/secureRoute');

router.get('/', (req, res) => res.render('statics/index'));

router.route('/cocktails')
  .get(secureRoute, cocktails.indexCocktail);

router.route('/cocktails/:id')
  .get(secureRoute, cocktails.showCocktail)
  .get(secureRoute, cocktails.showTwist);

router.route('/cocktails/:id/twists/new')
  .get(secureRoute, cocktails.newTwist);

router.route('/cocktails/:id/twists')
  .post(secureRoute, cocktails.createTwist);

router.route('/cocktails/:id/twists/:twistId')
  .get(secureRoute, cocktails.showTwist)
  .delete(secureRoute, cocktails.deleteTwist);

router.route('/register')
  .get(registrations.new)
  .post(registrations.create);

router.route('/login')
  .get(sessions.new)
  .post(sessions.create);

router.all('*', (req, res) => res.notFound());

module.exports = router;

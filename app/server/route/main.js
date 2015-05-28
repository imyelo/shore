var Router = require('koa-middlewares').router;
var main = require('../ctrl/main');

var router = new Router();

router.get('/', main.home);
router.get('/:id', main.resolve);

module.exports = router;

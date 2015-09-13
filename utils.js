var lazy = require('lazy-cache')(require);
lazy('is-valid-glob');
lazy('extend-shallow', 'extend');
lazy('load-templates', 'loader');
module.exports = lazy;


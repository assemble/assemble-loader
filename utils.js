var lazy = require('lazy-cache')(require);
lazy('mixin-deep', 'merge');
lazy('load-templates', 'loader');
module.exports = lazy;

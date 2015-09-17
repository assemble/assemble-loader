var lazy = require('lazy-cache')(require);
lazy('mixin-deep', 'merge');
lazy('load-templates', 'loader');
lazy('map-dest');
module.exports = lazy;

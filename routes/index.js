const multiply =  require('../NumberMultiplication');

function routes(app) {
    app.use('/NumberMultiplication', multiply)
}

module.exports = routes;

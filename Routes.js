const loginRouter = require("./route/LoginRoutes");
const CategoryRoutes =require("./route/CategoryRoutes");
const productRouter = require("./route/ProductRoutes");

module.exports = function(app) {
    app.use('/api/v1/', loginRouter);
    app.use('/api/v1',CategoryRoutes);
    app.use('/api/v1/product',productRouter);
}
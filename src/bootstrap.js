import authRouter from './modules/Auth/auth.routes.js';
import userRouter from './modules/User/user.routes.js';
import categoryRouter from './modules/Category/category.routes.js';
import subCategoryRouter from './modules/SubCategory/subcategory.routes.js';
import productRouter from './modules/Product/product.routes.js';
export const bootstrap = (app) => {
    app.use('/api/auth', authRouter);
    app.use('/api/user', userRouter);
    app.use('/api/category', categoryRouter);
    app.use('/api/subcategory', subCategoryRouter);
    app.use('/api/product', productRouter);
};
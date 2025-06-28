import authRouter from './modules/Auth/auth.routes.js';
import userRouter from './modules/User/user.routes.js';
import categoryRouter from './modules/Category/category.routes.js';
import subCategoryRouter from './modules/SubCategory/subcategory.routes.js';
import productRouter from './modules/Product/product.routes.js';
import cartRouter from './modules/Cart/cart.routes.js';
import wishlistRouter from './modules/Wishlist/wishlist.routes.js';
import orderRouter from './modules/Order/order.routes.js'
export const bootstrap = (app) => {
    app.use('/api/auth', authRouter);
    app.use('/api/user', userRouter);
    app.use('/api/category', categoryRouter);
    app.use('/api/subcategory', subCategoryRouter);
    app.use('/api/product', productRouter);
    app.use('/api/cart', cartRouter);
    app.use('/api/wishlist', wishlistRouter);
    app.use('/api/order',orderRouter);
};
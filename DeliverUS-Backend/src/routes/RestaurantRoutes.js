import OrderController from '../controllers/OrderController.js'
import ProductController from '../controllers/ProductController.js'
import RestaurantController from '../controllers/RestaurantController.js'

const loadFileRoutes = function (app) {
  app.route('/restaurants')
    .get(
      isLoggedIn,
      hasRole('customer'),
      RestaurantController.index)
    .post(
      isLoggedIn,
      hasRole('owner'),
      handleFilesUpload(['heroImage'], process.env.RESTAURANTS_FOLDER),
      handleFilesUpload(['logo'], process.env.RESTAURANTS_FOLDER),
      RestaurantValidation.create,
      handleValidation,
      RestaurantMiddleware.checkRestaurantOwnership,
      RestaurantController.create)

  app.route('/restaurants/:restaurantId')
    .get(
      isLoggedIn,
      hasRole('owner'),
      RestaurantMiddleware.checkRestaurantOwnership,
      RestaurantController.show)
    .put(
      isLoggedIn,
      hasRole('owner'),
      handleFilesUpload(['heroImage'], process.env.RESTAURANTS_FOLDER),
      handleFilesUpload(['logo'], process.env.RESTAURANTS_FOLDER),
      RestaurantValidation.create,
      handleValidation,
      RestaurantMiddleware.checkRestaurantOwnership,
      RestaurantController.update)
    .delete(
      isLoggedIn,
      hasRole('owner'),
      handleFilesUpload(['heroImage'], process.env.RESTAURANTS_FOLDER),
      handleFilesUpload(['logo'], process.env.RESTAURANTS_FOLDER),
      RestaurantValidation.create,
      handleValidation,
      RestaurantMiddleware.checkRestaurantOwnership,
      RestaurantController.destroy)

  app.route('/restaurants/:restaurantId/orders')
    .get(
      isLoggedIn,
      hasRole('owner'),
      RestaurantMiddleware.checkRestaurantOwnership,
      OrderController.indexRestaurant)

  app.route('/restaurants/:restaurantId/products')
    .get(
      isLoggedIn,
      hasRole('customer'),
      ProductController.indexRestaurant)

  app.route('/restaurants/:restaurantId/analytics')
    .get(
      isLoggedIn,
      hasRole('customer'),
      OrderController.analytics)
}
export default loadFileRoutes

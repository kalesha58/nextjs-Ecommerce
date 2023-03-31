const express = require("express");
const {
  getAllProducts,
  createProduct,
  deleteProduct,
  getProductDetails,
  updateProduct,
} = require("../controller/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const productRoute = express.Router();

productRoute.get("/getproducts", getAllProducts);

productRoute.post(
  "/create",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  createProduct
);
productRoute.delete(
  "/getproducts/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  deleteProduct
);
productRoute.get("/getproducts/:id", getProductDetails);

productRoute.put(
  "/getproducts/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  updateProduct
);

module.exports = productRoute;

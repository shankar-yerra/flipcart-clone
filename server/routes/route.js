// routing will be done

import express from "express";
import { userSignup, userLogin } from "../controller/user-controller.js";

import { getProducts, getProductById } from "../controller/product-controller.js";

import { addPaymentGateway, paytmResponse } from "../controller/payment-controller.js";

const router = express.Router();

router.post("/signup", userSignup);
//after hitting signup, what actions should be taken are written inside this call back function which is 'userSignup'.
//this file is only for routing purpose.function actions are written in user-controller.js file

router.post("/login", userLogin);

router.get("/products", getProducts);
// get api is built to fetch products data from database.get api's backend is fetched here and we use redux to fetch get api's frontend

router.get('/product/:id', getProductById);

router.post('/payment', addPaymentGateway);

router.post('/callback', paytmResponse);

export default router;

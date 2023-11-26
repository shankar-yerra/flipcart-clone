// const express = require('express');
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
// cors = Cross-origin resource sharing.it supports secure requests and data transfers from outside origins. ie., requesting data from two different ports will not be allowed by browser.

import bodyParser from "body-parser";
// body-parser handels postapi.it comes inbuilt with express but in latest version of express it is not in build with express

import { v4 as uuid } from "uuid";

import Connection from "./database/db.js";
// in backend extention must be mentioned like .js
import DefaultData from "./default.js";
import Router from "./routes/route.js";

const app = express();

dotenv.config();

app.use(cors());
app.use(bodyParser.json({ extended: true }));
// request of postapi body will come in the form of json
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", Router);

const PORT = 8000;

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

Connection(USERNAME, PASSWORD);

// express server can be build from listen function
app.listen(PORT, () =>
  console.log(`Server is running successfully on PORT ${PORT}`)
);

DefaultData();

export let paytmMerchantKey = process.env.PAYTM_MERCHANT_KEY;
export let paytmParams = {};
paytmParams["MID"] = process.env.PAYTM_MID;
paytmParams["WEBSITE"] = process.env.PAYTM_WEBSITE;
paytmParams["CHANNEL_ID"] = process.env.PAYTM_CHANNEL_ID;
paytmParams["INDUSTRY_TYPE_ID"] = process.env.PAYTM_INDUSTRY_TYPE_ID;
paytmParams["ORDER_ID"] = uuid();
// paytmParams["CUST_ID"] = process.env.PAYTM_CUST_ID;
paytmParams["TXN_AMOUNT"] = "100";
paytmParams["CALLBACK_URL"] = "http://localhost:8000/callback";
// what to do after approval or decline of transaction will say that jo api ka url should given
paytmParams["EMAIL"] = "shankaryerra765@gmail.com";
paytmParams["MOBILE_NO"] = "1234567890";

// API details can get from (dashboard.paytm.com) after login from paytm. or else you can get universal API details from (mvcjaipur.wordpress.com) without any login.

// paytm payment gateway babane keliye API details chahiye.

// paytm ka API is checksum protected.

// aapko agar jo frontend se response aare aapke pas backend me vo agar aapka kisne tempered nahi kiya beech me...aap yaha pe checksum ko implement kar sekthe usko bachane keliye.

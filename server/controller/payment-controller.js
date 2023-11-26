
import paytmchecksum from '../paytm/PaytmChecksum.js';
import { paytmParams, paytmMerchantKey } from '../index.js';

import formidable from 'formidable';

import https from 'https';

/*
    setting up the necessary dependencies for working with the Paytm payment gateway, including checksum generation, configuration parameters, form data parsing, and secure HTTPS communication.
*/

export const addPaymentGateway = async (request, response) => {
    try{
        let paytmCheckSum = await paytmchecksum.generateSignature(paytmParams, paytmMerchantKey);

        let params = {
            ...paytmParams, 'CHECKSUMHASH': paytmCheckSum
        } 
    
        response.status(200).json(params);

    } catch (error) {
        response.status(500).json({error: error.message})    
    }
} 
/* 
    this code defines a function (addPaymentGateway) that generates a Paytm checksum, constructs a parameter object for a Paytm API request, and sends a JSON response with either the parameters or an error message, depending on the success or failure of the operation.
*/

export const paytmResponse = (request, response) => {
    const form = new formidable.IncomingForm();
    let paytmCheckSum = request.body.CHECKSUMHASH;
    delete request.body.CHECKSUMHASH;

    let isVerifySignature = paytmchecksum.verifySignature(request.body, paytmMerchantKey, paytmCheckSum);
    if(isVerifySignature) {
        let paytmParams = {};
        paytmParams['MID'] = request.body.MID;
        paytmParams['ORDERID'] = request.body.ORDERID;

        paytmchecksum.generateSignature(paytmParams, paytmMerchantKey).then(function(checksum){
            paytmParams['CHECKSUMHASH'] = checksum;

            let post_data = JSON.stringify(paytmParams);

            let options = {
                hostname: 'securegw-stage.paytm.in',
                port: 443,
                path: '/order/status',
                headers: {
                    'content-Type': 'application/json',
                    'content-Length': post_data.length
                }
            }

            let res = "";
            let post_req = https.request(options, function(post_res) {
                post_res.on('data', function(chunk) {
                    res += chunk;
                });

                post_res.on('end', function() {
                    let result = JSON.parse(res)
                    response.redirect('http://localhost:3000/')
                })
            });

            post_req.write(post_data);
            post_req.end();

        }) 

    } else {
        console.log('Checksum mismatched');
    }
}


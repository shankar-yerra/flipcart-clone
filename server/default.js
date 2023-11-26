
import {products} from "./constants/data.js";

import Product from "./model/product-schema.js";

const DefaultData = async() => {
    try{
    //    await Product.deleteMany({});
       await Product.insertMany(products);

        console.log('Data imported Successfully');
    }catch(error){
        console.log('Error while inserting default data', error.message);
    }
}

//if we do not mention Product.deleteMany({}), then when ever mongoose restarts the server the data which is already inserted into mongodb we again and again get inserted which makes duplicates. to avoid duplicates we have to delete previous data from database and insert again with await function.

// but deleting all data before inserting is not a good practise.so we have to take the help of product-schema.

export default DefaultData;
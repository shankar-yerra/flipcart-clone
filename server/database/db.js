import mongoose from "mongoose";

export const Connection = async(username, password) => {
    const URL = `mongodb+srv://${username}:${password}@flipcart-clone.9zfgxey.mongodb.net/`;
    try{
        await mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser: true });
        console.log('Database connected Successfully');
    } catch (error){
        console.log('Error while connecting with the database', error.message);
    }
}
 
// monogoDB will internally use monitoring engine,server directory and it will be depricated..so to create new monitoring engine we used useUnifiedTopology.

export default Connection;
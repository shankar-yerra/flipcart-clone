// this file is used to build API for login and signup.

import User from '../model/user-schema.js';

export const userSignup = async (request, response) => {
    try{

        const exist = await User.findOne({username: request.body.username});
        // to check whether username exist previously or not.
        if(exist){
            return response.status(401).json({message: 'Username already exist'});
        }

        const user = request.body;
        const newUser = new User(user);
        await newUser.save(); // saves the user details in database
        
        response.status(200).json({message: user});
    } catch(error){
        response.status(500).json({message: error.message});
    }
} // API

export const userLogin = async(request, response ) => {
    try{
        const username = request.body.username;
        const password = request.body.password;

        let user = await User.findOne({ username: username, password:password});

        if( user){
            return response.status(200).json({data: user} );
        } else {
            return response.status(401).json('Invalid login');
        }
    } catch(error){
        response.status(500).json('Error',error.message);
    }
}
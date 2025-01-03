import userModel from "../Model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


// Register API
export function userRegistration(req, res) {
    const { name, email, password } = req.body;

    userModel.findOne({email}).then((data) => {
        if(data){
            return res.status(403).send({message: "User already exist!"});
        }

        try{
            const newUser = new userModel({
                name: name,
                email: email,
                password: bcrypt.hashSync(password, 10)
            });
            newUser.save();
            res.status(201).send(newUser);
        }
        catch(err){
            res.status(500).send({message: "Serve Error", error: err});
        }
    });
}

// Login API
export function userLogin(req, res){
    const { email, password } = req.body;
    userModel.findOne({email}).then((data) => {
        if(!data){
            return res.status(404).send({message: "User not found!, Please Register"});
        }
        const isMatch = bcrypt.compareSync(password, data.password);
        if(!isMatch){
            return res.status(401).send({message: "Invalid Password!"});
        }
        const accessToken = jwt.sign({id: data._id}, "secretKey" ,{expiresIn: "3h"});

        res.send({
            message: "User Login Successfully",
            token: accessToken
        });
    })
}
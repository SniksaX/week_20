import {prisma} from "../../app.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';

dotenv.config();


export const signup = async (req, res) => {
    try {
        const {firstName, lastName, email, password} = req.body

        const hash = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
                data: {
                    firstName,
                    lastName,
                    email,
                    password: hash
                }
        });

        res.status(201).json({message: "User Created: ", data: newUser});
    } catch (e){
        res.status(500).json({message: e || "Error during creation"})
        console.error(em)
    }
};

export const login = async (req, res) => {
    try {
        const {email, password} = req.body
        
        const findUser = await prisma.user.findUnique({
            where: { email: email }
        })
        
        if (!findUser) {
            res.status(404).json({message: "User not found"})
        }

        // console.log(process.env.JWT_SECRET)

        const hash = await bcrypt.compare(password, findUser.password)
        const token = await jwt.sign(
            { 
                userId: findUser.id, 
                email: findUser.email 
            },
            process.env.JWT_SECRET || 'VNtG9bZNwmR28VeCOYuHyNWhlj8pgPrP',
            { expiresIn: '24h' }
        )

        return res.status(200).json({message: "connected", user: findUser.firstName, token})
    } catch (e) {
        res.status(500).json({message: e || "Error during user fetch"})
        console.error(e)
    }
}
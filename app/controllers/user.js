import {prisma} from "../../app.js";
import bcrypt from "bcrypt";

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
        res.status(500).json({message: "User not created"})
        console.error("Error during creation", e)
    }
};

export const login = (req, res) => {
    res.send('You are logged in')
}
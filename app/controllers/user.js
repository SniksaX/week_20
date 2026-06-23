import {prisma} from "../../app.js"

export const signup = async (req, res) => {
    try {
        const {firstName, lastName, email, password} = req.body

        const newUser = await prisma.user.create({
                data: {
                    firstName,
                    lastName,
                    email,
                    password
                }
        });

        res.status(201).json({message: "User Created: ", data: newUser});
    } catch {
        res.status(500).json({message: "User not created"})
        console.error("Error during creation")
    }
};

export const login = (req, res) => {
    res.send('You are logged in')
}
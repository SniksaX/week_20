import {prisma} from "../../app.js"

export const signup = async (req, res) => {
    const {firstName, lastName, email, password} = req.body
    console.log(firstName, lastName, email, password)

    const newUser = await prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
                password
            }
    });

    console.log(newUser)

    res.status(201).json({message: "User Created: ", data: newUser});
};

export const login = (req, res) => {
    res.send('You are logged in')
}
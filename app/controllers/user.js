import { prisma } from "../../app.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { promisify } from "node:util";

const signAsync = promisify(jwt.sign);

export const signup = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        const hash = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
                password: hash
            }
        });

        return res.status(201).json({ message: "User Created", data: newUser });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: e.message || "Error during creation" });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const findUser = await prisma.user.findUnique({
            where: { email: email }
        });

        if (!findUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, findUser.password);
        
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Wrong password" });
        }

        const token = await signAsync(
            { 
                userId: findUser.id, 
                email: findUser.email 
            },
            process.env.JWT_SECRET,
            { expiresIn: Number(process.env.JWT_EXPIRATION) || 86400 }
        );

        return res.status(200).json({ 
            message: "connected", 
            user: findUser,
            token 
        });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: e.message || "Error during user fetch" });
    }
}
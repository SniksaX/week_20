
import {prisma} from "../../app.js";

export const getAll = async (req, res) => {
    
    const result = await prisma.wood.findMany();
    res.status(302).json({result})
}
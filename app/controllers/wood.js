import { prisma } from "../../app.js";

export const getAll = async (req, res) => {
    try {
        const result = await prisma.wood.findMany();
        res.status(200).json({ result })
    } catch (e) {
        res.status(500).json({ message: e.message || "Error fetching woods" });
        console.error("Error during fetch:", e);
    }
};
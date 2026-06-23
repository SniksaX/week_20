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

export const getByHardness = async (req, res) => {
    try {
        const { hardness } = req.params;

        const result = await prisma.wood.findMany({
            where: {
                hardness: hardness 
            }
        });

        res.status(200).json({ result });
    } catch (e) {
        res.status(500).json({ message: e.message || "Error fetching woods by hardness" });
        console.error("Error during fetch by hardness:", e);
    }
};
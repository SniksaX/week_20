import { prisma } from "../../app.js";

const addLinks = (wood, req) => {
    const baseUrl = `${req.protocol}://${req.get("host")}/api/woods`;
    
    return {
        ...wood,
        links: [
            { 
                rel: "self", 
                method: "GET", 
                href: `${baseUrl}/${wood.id}` 
            },
            { 
                rel: "sameHardness", 
                method: "GET", 
                href: `${baseUrl}/${wood.hardness}` 
            }
        ]
    };
};


export const getAll = async (req, res) => {
    try {
        const result = await prisma.wood.findMany();

        if (!result) {
            res.status(400).json({message: "Wood param not found"})
        }

        const woodsWithLinks = result.map(wood => addLinks(wood, req));

        res.status(200).json({ result:  woodsWithLinks})
    } catch (e) {
        res.status(500).json({ message: e.message || "Error fetching woods" });
    }
};

export const getByHardness = async (req, res) => {
    try {
        const { hardness } = req.params;

        if (!hardness) {
            res.status(400).json({message: "hardness param not found"})
        }

        const result = await prisma.wood.findMany({
            where: {
                hardness: hardness 
            }
        });

        const woodsWithLinks = result.map(wood => addLinks(wood, req));

        res.status(200).json({ result: woodsWithLinks });
    } catch (e) {
        res.status(500).json({ message: e.message || "Error fetching woods by hardness" });
    }
};

export const create = async (req, res) => {
    try {
        const woodData = req.body.datas ? JSON.parse(req.body.datas) : req.body;

        let imageUrl = null;
        if (req.file) {
            imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
        }

        const result = await prisma.wood.create({
            data: {
                ...woodData,
                image: imageUrl
            }
        });

        const woodWithLinks = addLinks(result, req);


        res.status(201).json({ message: "Wood created", data: woodWithLinks });
    } catch (e) {
        res.status(500).json({ message: e.message || "Error creating wood" });
    }
};
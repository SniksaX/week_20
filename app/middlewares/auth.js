import jwt from 'jsonwebtoken';

export default (req, res, next) => {
    try {
        if (!req.headers.authorization) {
        return res.status(401).json({ error: 'Missing token.' });
    }

    // 2. Extraire le token (Format attendu : "Bearer <TOKEN>")
    const token = req.headers.authorization.split(' ')[1];

    // 3. Décoder et vérifier le token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.id;

    // 4. Stocker les infos dans l'objet req pour les contrôleurs suivants
    req.auth = { userId };

    next();
    } catch (err) {
        res.status(401).json({
        error: 'Request not authorized !'
    });
}
};
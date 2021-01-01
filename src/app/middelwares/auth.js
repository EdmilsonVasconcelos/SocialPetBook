import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import configAuth from '../../config/auth';

export default async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401)
            .json({ error: true, code: 127, message: "Token not found" });
    }

    const [, token] = authHeader.split(' ');

    try {

        const decoded = await promisify(jwt.verify)(token, configAuth.secret);

        req.userId = decoded.id;

        return next();

    } catch (e) {

        return res.status(401)
            .json({ error: true, code: 127, message: "Token invalid" });

    }

}
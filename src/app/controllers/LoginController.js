import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import configAuth from '../../config/auth';

import User from '../model/User';

class LoginController {
    async store(req, res) {

        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401)
                .json({ error: true, code: 110, message: "User not exist in database" });
        }

        if (!(await bcrypt.compare(password, user.password))) {
            return res.status(401)
                .json({ error: true, code: 111, message: "Password is invalid" });
        }

        return res
            .json({
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email
                },
                token: jwt.sign(
                    { id: user._id },
                    configAuth.secret,
                    { expiresIn: configAuth.expiresIn }
                )
            })
    }
}

export default new LoginController();
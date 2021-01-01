import * as yup from 'yup';
import bcrypt from 'bcryptjs';

import User from '../model/User';

class UserController {
    async store(req, res) {

        let schema = yup.object().shape({
            name: yup.string().required().min(4).max(100),
            email: yup.string().email().required().min(6).max(100),
            password: yup.string().required().min(6).max(100)
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400)
                .json({ error: true, code: 103, message: "Required fields" });
        }

        const existEmail = await User.findOne({ email: req.body.email });
        if (existEmail) {
            return res.status(400)
                .json({ error: true, code: 102, message: "User exist in database" });
        }

        let data = req.body;
        data.password = await bcrypt.hash(data.password, 7);

        await User.create(data, error => {
            if (error) return res.status(400)
                .json({ error: true, code: 101, message: "User not found" });

            return res.status(201)
                .json({ user: data });
        });

    }

    async update(req, res) {
        const user = await User.findOne({ _id: req.params.id });
        if (!user) {
            return res.status(400)
                .json({ error: true, code: 112, message: "User not found" });
        }

        if (user.email === req.body.email) {
            return res.status(400)
                .json({ error: true, code: 114, message: "E-mail exist in database" });
        }

        let schema = yup.object().shape({
            name: yup.string().required().min(4).max(100),
            email: yup.string().email().required().min(6).max(100),
            password: yup.string().required().min(6).max(100)
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400)
                .json({ error: true, code: 103, message: "Required fields" });
        }

        let data = req.body;
        data.password = await bcrypt.hash(data.password, 7);

        await User.updateOne(data, error => {
            if (error) return res.status(400)
                .json({ error: true, code: 113, message: "Erro to update user" });

            return res.status(200)
                .json({ error: false, message: "User updated with success" });
        });
    }
}

export default new UserController();
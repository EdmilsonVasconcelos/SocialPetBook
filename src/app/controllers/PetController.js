import * as yup from 'yup';

import Pet from '../model/Pet';

class PetController {
    async store(req, res) {

        let schema = yup.object().shape({
            name: yup.string().required().min(2).max(100),
            gender: yup.string().required().min(1).max(10),
            breed: yup.string().required().min(2).max(50),
            born_when: yup.date().required()
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400)
                .json({ error: true, code: 103, message: "Required fields" });
        }

        let data = req.body;
        data.tutor_id = req.userId;

        await Pet.create(data, error => {
            if (error) return res.status(400)
                .json({ error: true, code: 129, message: "Pet not saved" });

            return res.status(200)
                .json({ pet: data });
        });

    }

    async petForUser(req, res) {
        const pets = await Pet.find({ tutor_id: req.userId }).exec();

        return res.status(200)
            .json({ pets });
    }
}

export default new PetController();
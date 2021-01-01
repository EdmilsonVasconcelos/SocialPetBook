import * as yup from 'yup';

import Post from '../model/Post';

class PostController {
    async store(req, res) {

        let schema = yup.object().shape({
            post: yup.string().required().min(1).max(1000)
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400)
                .json({ error: true, code: 103, message: "Required fields" });
        }

        let data = req.body;
        data.tutor_id = req.userId;
        data.pet_id = req.params.idpet;

        await Post.create(data, error => {
            if (error) return res.status(400)
                .json({ error: true, code: 129, message: "Post not saved" });

            return res.status(201)
                .json({ post: data });
        });

    }

}

export default new PostController();
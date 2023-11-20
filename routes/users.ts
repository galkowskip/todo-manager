import { Router } from "express";
import { createUser } from "../controllers/users";


const router = Router();

router.post("/register", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ errorMessage: "Please enter all required fields." });
        }

        if (password.length < 6) {
            return res.status(400).json({ errorMessage: "Please enter a password of at least 6 characters." });
        }

        const user = await createUser(email, password);

        res.status(200).send(user);

    } catch (err) {
        res.status(500).send(err);
    }
});

export default router;
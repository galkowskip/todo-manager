import { Router } from "express";
import { createUser, getAllUsers } from "../controllers/users";


const router = Router();

router.post("/register", async (req, res) => {
    try {
        const { username, password, email } = req.body;

        if (!email || !password || !username) {
            return res.status(400).json({ errorMessage: "Please enter all required fields." });
        }

        if (password.length < 6) {
            return res.status(400).json({ errorMessage: "Please enter a password of at least 6 characters." });
        }

        const user = await createUser(username, password, email);

        res.status(200).send(user);

    } catch (err) {
        res.status(500).send(err);
    }
});

router.get("/all", async (req, res) => {
    try {
        const users = await getAllUsers();
        return res.status(200).send(users)
    } catch (err) {
        res.status(500).send(err);
    }
})

export default router;
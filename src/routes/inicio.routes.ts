import { Router, Request, Response } from "express";
import path from "path";

const router: Router = Router();

router.get("/inicio", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../../public/html/inicio.html"));
});

export default router;

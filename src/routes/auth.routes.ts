import { Router } from "express";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";

const router = Router();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post("/google", async (req, res) => {
  try {
    const { token } = req.body;

    // ✅ Verificar token de Google
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // 🧠 Datos del usuario
    const user = {
      googleId: payload.sub,
      email: payload.email,
      name: payload.name,
      picture: payload.picture,
    };

    console.log("USER:", user);

    // 🔐 Crear token propio (JWT)
    const appToken = jwt.sign(user, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

    res.json({
      token: appToken,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Auth failed" });
  }
});

export default router;
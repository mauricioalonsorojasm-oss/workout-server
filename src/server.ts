import "dotenv/config";
import app from "./app";

const PORT = process.env.PORT; // 👈 SIN 5005

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
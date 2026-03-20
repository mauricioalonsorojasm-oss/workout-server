import "dotenv/config";
import app from "./app";

const PORT = Number(process.env.PORT) || 5005;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
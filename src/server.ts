const app = require("./app");

const PORT = process.env.PORT || 5005;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
import app from "./server";

//get port applicatton in .env
const PORT = process.env.PORT;

app.listen(PORT);
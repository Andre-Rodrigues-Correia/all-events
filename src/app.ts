import app from "./server";
import { connectDB } from "./database/connection";
//get port applicatton in .env
const PORT = process.env.PORT;

app.listen(PORT, async () => {
    await connectDB();
});
import express from "express"
import dotenv from "dotenv"
dotenv.config();
import connectDB from "./config/db.js"
import authRouter from "./routes/auth.routes.js";
import cors from "cors";
import cookieStoreParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
import geminiResponse  from "./gemini.js";






const app = express();
app.use(cors({
    origin:"https://assistant-frontend-ecru.vercel.app",
    credentials: true, // Allow credentials to be sent
}));

const port = process.env.PORT || 5000
app.use(express.json());

app.use(cookieStoreParser())
app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)


app.listen(port, () => {

    connectDB(); // Ensure the database connection is established before starting the server
  console.log(`Server is running on http://localhost:${port}`);
})


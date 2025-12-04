import express from "express";
import cors from "cors"
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";
import studentQuizRoutes from "./routes/studentQuizRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js"


dotenv.config();
connectDB();


const app = express();
app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173", // Vite dev server
  methods: ["GET","POST","PUT","DELETE"],
  credentials: true
}));


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/quiz", quizRoutes);               // teacher quizzes
app.use("/api/student/quizzes", studentQuizRoutes);// student practice quizzes
app.use("/api/dashboard", dashboardRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("✅ Server is running on http://localhost:3000"));

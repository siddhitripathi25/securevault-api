
import express from "express";
import notesRoutes from "./routes/notes.route.js";

const app = express();

app.use(express.json());


app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to SecureVault API!"
    });
});


app.use("/api/notes", notesRoutes);


app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found."
    });
});

export default app;

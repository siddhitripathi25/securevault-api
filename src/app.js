
import express from "express";
import notesRoutes from "./routes/notes.route.js";

import { requestId,rateLimiter,securityHeaders,ipGuard,requestSize,securityLogger } from "express-api-guard";

const app = express();

app.use(requestId());
app.use(securityLogger());
app.use(securityHeaders());
app.use(ipGuard({
    blockedIPs: []
}));
app.use(rateLimiter({
    windowMs: 60 * 1000,
    max: 5
}));
app.use(requestSize({
    limit: 1024 * 1024
}));


app.use(express.json());


app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to SecureVault API!",
        requestId: req.requestId
    });
});


app.use("/api/notes", notesRoutes);


app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found.",
        requestId: req.requestId
    });
});

export default app;

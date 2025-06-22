// pages/api/upload.ts
import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import { spawn } from "child_process";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { image } = req.body;

    if (!image || typeof image !== "string") {
        return res.status(400).json({ error: "Invalid image data" });
    }

    try {
        // Decode base64 image
        const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
        const buffer = Buffer.from(base64Data, "base64");

        // Save to disk
        const filePath = path.join(process.cwd(), "public", "uploads", "tongue.jpg");
        fs.writeFileSync(filePath, buffer);

        // Run Python model
        const python = spawn("python3", ["scripts/analyze_tongue.py", filePath]);

        let output = "";
        python.stdout.on("data", (data) => {
            output += data.toString();
        });

        python.stderr.on("data", (data) => {
            console.error("stderr:", data.toString());
        });

        python.on("close", (code) => {
            if (code !== 0) {
                return res.status(500).json({ error: "Python script failed" });
            }

            try {
                const result = JSON.parse(output);
                return res.status(200).json(result);
            } catch (err) {
                return res.status(500).json({ error: "Invalid model output" });
            }
        });
    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
}

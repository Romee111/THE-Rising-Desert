import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "The Rising Desert API is running" });
  });

  // Mock products for now (will move to Firestore later)
  const products = [
    {
      id: "1",
      name_en: "Desert Soul Oversized T-Shirt",
      name_ar: "تيشيرت ديزرت سول أوفرسايز",
      price: 189,
      category: "t-shirts",
      colors: ["Black", "Sand", "White", "Olive"],
      sizes: ["S", "M", "L", "XL"],
      description_en: "Premium 280 GSM cotton oversized t-shirt with desert-inspired embroidery.",
      description_ar: "تيشيرت أوفرسايز من القطن المميز ٢٨٠ جرام مع تطريز مستوحى من الصحراء.",
      images: ["https://picsum.photos/seed/streetwear1/800/1000", "https://picsum.photos/seed/streetwear1back/800/1000"],
      fabric: "100% Cotton, 280 GSM",
      stock: 50
    },
    {
      id: "2",
      name_en: "Dune Cargo Trousers",
      name_ar: "بنطال كارجو ديون",
      price: 249,
      category: "trousers",
      colors: ["Sand", "Olive", "Black"],
      sizes: ["S", "M", "L", "XL"],
      description_en: "Functional cargo trousers with adjustable cuffs and premium hardware.",
      description_ar: "بنطال كارجو عملي مع أطراف قابلة للتعديل وإكسسوارات مميزة.",
      images: ["https://picsum.photos/seed/cargo1/800/1000", "https://picsum.photos/seed/cargo1back/800/1000"],
      fabric: "Cotton Twill, 320 GSM",
      stock: 30
    }
  ];

  app.get("/api/products", (req, res) => {
    res.json(products);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import dotenv from "dotenv";
// import authRoutes from "./routes/auth.js";
// import userRoutes from "./routes/users.js";
// import bookRoutes from "./routes/books.js";
// import transactionRoutes from "./routes/transactions.js";
// import categoryRoutes from "./routes/categories.js";

// /* App Config */
// dotenv.config();


// const app = express();
// const port = process.env.PORT || 4000;

// /* Middlewares */
// app.use(express.json());
// app.use(cors());

// /* API Routes */
// app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/books", bookRoutes);
// app.use("/api/transactions", transactionRoutes);
// app.use("/api/categories", categoryRoutes);
// console.log('Mongo URL:', process.env.MONGO_URL);

// /* MongoDB connection */
// mongoose.connect(
//   process.env.MONGO_URL,
//   {
//     useCreateIndex: true,
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   },
//   () => {
//     console.log("MONGODB CONNECTED");
//   }a
// );

// app.get("/", (req, res) => {
//   res.status(200).send("Welcome to LibraryApp");
// });

// /* Port Listening In */
// app.listen(port, () => {
//   console.log(`Server is running in PORT ${port}`);
// });


import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import bookRoutes from "./routes/books.js";
import transactionRoutes from "./routes/transactions.js";
import categoryRoutes from "./routes/categories.js";

/* App Config */
dotenv.config();
console.log("Loaded ENV Variables:", process.env);


const app = express();
const port = process.env.PORT || 4000;

/* Middlewares */
app.use(express.json());
app.use(cors());

/* API Routes */
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/categories", categoryRoutes);

console.log("Mongo URL:", process.env.MONGO_URL);

/* MongoDB Connection */
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MONGODB CONNECTED"))
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit process on failure
  });

/* Root Endpoint */
app.get("/", (req, res) => {
  res.status(200).send("Welcome to LibraryApp");
});

/* Start Server */
app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});

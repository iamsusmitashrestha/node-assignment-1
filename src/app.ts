/* session one */
import express, { RequestHandler } from "express";
import dotenv from "dotenv";
import routes from "./routes";

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }) as RequestHandler);
app.use(express.json() as RequestHandler);

app.use(routes);

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.listen(3002, () => {
  console.log("Server is running on port 3002");
});

//
/* session two - user routes */
// import express, { RequestHandler } from "express";
// import routes from "./routes";
// import dotenv from "dotenv";

// dotenv.config();
// const app = express();
// app.use(express.urlencoded({ extended: true }) as RequestHandler);
// app.use(express.json() as RequestHandler);

// app.use(routes);

// app.get("/", (req, res) => {
//   res.send("Hello world!");
// });

// app.listen(3002, () => {
//   console.log("Server is running on port 3002");
// });

//
/* session three - error route and handeling middleware*/
// import express, { RequestHandler } from "express";
// import routes from "./routes";
// import { errorHandler } from "./errors/index";
// import dotenv from "dotenv";

// dotenv.config();
// const app = express();
// app.use(express.urlencoded({ extended: true }) as RequestHandler);
// app.use(express.json() as RequestHandler);

// app.use(routes);
// app.use(errorHandler); //--

// // handle all the other routes
// app.all("*", (req, res) => {
//   res.status(404).json({
//     success: false,
//     message: "Resource not found",
//   });
// });

// app.listen(3002, () => {
//   console.log("Server is running on port 3002");
// });

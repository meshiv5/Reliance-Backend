require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./src/Swagger/swagger.json");
const customCss = fs.readFileSync(process.cwd() + "/src/Swagger/swagger.css", "utf8");
const usersRoute = require("./src/Routes/Users/users.routes");
const productsRouter = require("./src/Routes/Products/products.routes");
const mediaRouter = require("./src/Routes/Media/media.routes");
const cartRouter = require("./src/Routes/Cart/cart.routes");
const { connect } = require("./src/Config/db.config");

const PORT = process.env.SERVER_PORT;
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument, { customCss }));
app.use("/api/products", productsRouter);
app.use("/api/medias", mediaRouter);
app.use("/api/users", usersRoute);
app.use("/api/cart", cartRouter);
app.get("/", (req, res) => {
  res.send(`<h1>API Works !!!</h1>`);
});
app.listen(PORT, async () => {
  await connect();
  console.log(`Server Started Listening On PORT ${PORT}`);
});

const express = require("express");
const path = require("path");
const pathToFrontend = path.join(__dirname, "../frontend");
const serveStatic = express.static(pathToFrontend);

// TODO: Import your controllers from ./controllers/petControllers.js
const petControllers = require("./controllers/petControllers.js");

const app = express();

/////////////////////
// Middleware
/////////////////////

// TODO: Create a logRoutes middleware function that logs the method and
// originalUrl of every incoming request, along with the current time.

const logRoutes = (req, res, next) => {
  const time = new Date().toLocaleString();
  console.log(`${req.method}: ${req.originalUrl} - ${time}`);
  next();
};

app.use(logRoutes);
app.use(serveStatic);
app.use(express.json());

// TODO: Add the express.json() middleware to parse JSON request bodies.

// TODO: Serve the frontend/ folder as static assets using express.static()

/////////////////////
// Endpoints
/////////////////////

// TODO: Define RESTful endpoints for managing pets.

app.get("/api/pets", petControllers.listPets);
app.get("/api/pets/:id", petControllers.getPet);
app.post("/api/pets", petControllers.createPet);
app.patch("/api/pets/:id", petControllers.updatePet);
app.delete("/api/pets/:id", petControllers.deletePet);

const port = 8080;
app.listen(port, () =>
  console.log(`Server is running at http://localhost:${port}`),
);

// Generar un endpoint que me permita listar mis koders en mi base de datos

const express = require("express");
const mongoose = require("mongoose");

const Koder = require("./koderModel");
const server = express();

const DB_USER = "****";
const DB_PASSWORD = "*********";
const DB_HOST = "kodemia16-jess.bnfzu.mongodb.net";
const DB_NAME = "kodemia";

const URL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`;
server.use(express.json());

server.get("/koders", async (request, response) => {
  const koders = await Koder.find({}); // Regresa una promesa

  response.json({
    success: true,
    data: {
      koders: koders,
    },
  });
});

server.get("/koders/:id", async (request, response) => {
  try {
    const idKoder = request.params.id;
    // const koderFound = awaitKoder.find({ _id: idKoder });// Regresa una promesa
    const koderFound = await Koder.findById(idKoder); // Regresa un objeto si lo encuentra me regresa un undefined

    // Si no encuentras al koder
    // if (!koderFound) {
    //   response.status(404);
    //   response.json({
    //     succes: "false",
    //     message: "koder not found",
    //   });
    //   return;
    // }

    if (!koderFound) throw new Error("koder not found");

    response.json({
      succes: true,
      data: {
        koder: koderFound,
      },
    });
  } catch (error) {
    response.status(404);
    response.json({
      succes: false,
      message: error.message,
    });
  }
});

server.post("/koders", async (request, response) => {
  try {
    const newKoder = request.body;
    const koderCreated = await Koder.create(newKoder); // Regresa una promesa

    response.json({
      succes: true,
      message: "Koder created",
      data: {
        koder: koderCreated,
      },
    });
  } catch (error) {
    response.status(400);
    response.json({
      success: false,
      message: error.message,
    });
  }
});

server.patch("/koders/:id", async (request, response) => {
  try {
    const idKoder = request.params.id;
    const dataToUpdate = request.body;
    const koders = await Koder.findByIdAndUpdate(idKoder, dataToUpdate, {
      new: true,
    }); // Esto es lo que vamos a actualizar,
    if (!koders) throw new Error("koder not found");
    response.json({
      succes: true,
      data: {
        koders: koders,
      },
    });
  } catch (error) {
    response.status(404);
    response.json({
      succes: false,
      message: error.message,
    });
  }
});

server.delete("/koders/:id", async (request, response) => {
  try {
    const idKoder = request.params.id;
    const koders = await Koder.findByIdAndDelete(idKoder);
    if (!koders) throw new Error("koder not found");
    response.json({
      succes: true,
      message: "Koder deleted",
    });
  } catch (error) {
    response.status(404);
    response.json({
      succes: false,
      message: error.message,
    });
  }
});

mongoose
  .connect(URL) // regresa una promesa
  .then(() => {
    console.log("Database connected :D");
    server.listen(8080, () => {
      console.log("Server running on port 8080");
    });
  })
  .catch((error) => {
    console.log("Error al conectarnos a la BD: ", error);
  });

// Generar un endpoint que me permita listar mis koders en mi base de datos

const express = require("express");
const server = express();
server.use(express.json());

server.get("/koders", (request, response) => {
  response.json({
    success: true,
    data: {
      koders: [],
    },
  });
});

server.listen(8080, () => {
  console.log("Server running on port 8080");
});

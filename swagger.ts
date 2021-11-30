const swagger: any =  {
  swaggerOptions: {
    swaggerDefinition:{
      info:{
        title: "Visualizar API",
        description: "Whatever",
        contact: [
          {
            name: "Matias Santillan"
          },
          {
            name: "Emiliano Dominguez De Soto"
          }
        ],
        servers: [ "http://localhost:3001/", "https://api-visualizar.herokuapp.com/" ]
      }
    },
    apis: ["./routes/*.ts"]
  }  
  
}

export default swagger
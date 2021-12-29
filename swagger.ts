import { modelUser as User} from './src/models/User/user'
import { modelRol as Rol } from './src/models/Rol/rol'
import { modelBook as Book } from './src/models/Book/book'

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
      },
      paths: {
        "/api/users": {
          "get": {
            "tags": ["Users"],
            "summary": "Get all users in system",
            "responses": {
              "200": {
                "description": "OK",
                "schema": {
                  "$ref": "#/definitions/Users"
                }
              }
            }
          },
          "post": {
            "tags": ["Users"],
            "summary": "Create a new user on the system. Require authentication",
            "responses": {
              "200": {
                "description": "OK",
                "schema": {
                  "$ref": "#/definitions/Users"
                }
              }
            }
          }
        },
        "/api/users/{id}": {
          "put": {
            "tags": ["Users"],
            "summary": "Update an existent user on the system. Require authentication",
            "parameters": [
              {
                "name": "id",
                "in": "path",
                "description": "ID of user that needs to be updated",
                "required": true,
                "schema": {
                  "type": "string"
                }
              }
            ],
            "responses": {
              "200": {
                "description": "OK",
                "schema": {
                  "$ref": "#/definitions/Users"
                }
              }
            }
          },
          "delete": {
            "tags": ["Users"],
            "summary": "Delete an existing user in the system. Removed is logical not physical, that means active is updated to false. Require authentication",
            "parameters": [
              {
                "name": "id",
                "in": "path",
                "description": "ID of user that needs to be deleted",
                "required": true,
                "schema": {
                  "type": "string"
                }
              }
            ],
            "responses": {
              "200": {
                "description": "OK",
                "schema": {
                  "$ref": "#/definitions/Users"
                }
              }
            }
          },
        },
        "/api/rol": {
          "get": {
            "tags": ["Roles"],
            "summary": "Get all roles in system",
            "responses": {
              "200": {
                "description": "OK",
                "schema": {
                  "$ref": "#/definitions/Roles"
                }
              }
            }
          },
          "post": {
            "tags": ["Roles"],
            "summary": "Create a new rol on the system. Require authentication",
            "responses": {
              "200": {
                "description": "OK",
                "schema": {
                  "$ref": "#/definitions/Roles"
                }
              }
            }
          }
        },
        "/api/rol/{id}": {
          "put": {
            "parameters": {
              "in": "path",
              "name": "id",
              "schema": {
                "type": "string"

              },
              "description": "Rol ID",
              "required": "true"
            },
            "tags": ["Roles"],
            "summary": "Update an existent rol on the system. Require authentication",
            "responses": {
              "200": {
                "description": "OK",
                "schema": {
                  "$ref": "#/definitions/Roles"
                }
              }
            }
          },
          "delete": {
            "parameters": {
              "- in": "path",
              "name": "id",
              "schema": {
                "type": "ObjectId"
              },
              "description": "Rol ID",
              "required": "true"
            },
            "tags": ["Roles"],
            "summary": "Delete an existing Rol in the system. Removed is logical not physical, that means active is updated to false. Require authentication",
            "responses": {
              "200": {
                "description": "OK",
                "schema": {
                  "$ref": "#/definitions/Roles"
                }
              }
            }
          }
        },
        "/api/books": {
          "get": {
            "tags": ["Books"],
            "summary": "Get all books in system",
            "responses": {
              "200": {
                "description": "OK",
                "schema": {
                  "$ref": "#/definitions/Books"
                }
              }
            }
          },
          "post": {
            "tags": ["Books"],
            "summary": "Create a new book on the system. Require authentication",
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "name": { 
                        "description": "Updated name of the pet",
                        "type": "string"
                      },
                      "status": {
                        "description": "Updated status of the pet",
                        "type": "string"
                      }
                    },
                    "required": ["status"] 
                  }
                }
              }
            },
            "responses": {
              "200": {
                "description": "OK",
                "schema": {
                  "$ref": "#/definitions/Books"
                }
              }
            }
          }
        },
        "/api/books/{id}": {
          "put": {
            "tags": ["Books"],
            "summary": "Update an existent book on the system. Require authentication",
            "parameters": [
              {
                "name": "id",
                "in": "path",
                "description": "ID of book that needs to be updated",
                "required": true,
                "schema": {
                  "type": "string"
                }
              }
            ],
            "responses": {
              "200": {
                "description": "OK",
                "schema": {
                  "$ref": "#/definitions/Books"
                }
              }
            }
          },
          "delete": {
            "tags": ["Books"],
            "summary": "Delete an existing book in the system. Removed is logical not physical, that means active is updated to false. Require authentication",
            "parameters": [
              {
                "name": "id",
                "in": "path",
                "description": "ID of book that needs to be deleted",
                "required": true,
                "schema": {
                  "type": "string"
                }
              }
            ],
            "responses": {
              "200": {
                "description": "OK",
                "schema": {
                  "$ref": "#/definitions/Books"
                }
              }
            }
          }
        },
        // newimplementation
      },
      definitions: {
        "User": {
          "properties": User
        },
        "Users": {
          "type": "array",
          "$ref": "#/definitions/User"
        },
        "Rol": {
          "properties": Rol
        },
        "Roles": {
          "type": "array",
          "$ref": "#/definitions/Rol"
        },
        "Book": {
          "properties": Book
        },
        "Books": {
          "type": "array",
          "$ref": "#/definitions/Book"
        },
        // newdefinitions
      }
    },
    apis: ["./routes/*.ts"],
  },
  
}

export default swagger
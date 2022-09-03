
const swaggerDocument =
{
    "swagger": "2.0",
    "info": {
        "description": "Criar e buscar contatos",
        "version": "1.0.0",
        "title": "lista de contatos"
    },
    "host": "localhost:3000",
    "tags": [
        {
            "name": "contatos",
            "description": "Contatos"
        }
    ],
    "paths": {
        "/": {  
            "get": {
                "tags": [
                    "contatos"
                ],
                "summary": "Exibir ejs principal",
                "description": "Exibir ejs principal",
                "produces": [
                    "application/ejs"
                ],
                "responses": {
                    "200": {
                        "description": "Sucesso",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/Contatos"
                            }
                        }
                    },
                    "400": {
                        "description": "Erro"
                    }
                }
            },
            "post": {
                "tags": [
                    "contatos"
                ],
                "summary": "Criar contato",
                "description": "Criar contato",
                "produces": [
                    "application/ejs"
                ],
                "parameters": [
                    {
                        "in": "body",
                        "name": "contato",
                        "description": "Contato object",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/Contatos"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Conato criada"
                    },
                    "400": {
                        "description": "Erro"
                    }
                }
            },
        },
        "/Contato": {
            "get": {
                "tags": [
                    "contatos"
                ],
                "summary": "Mostrar contato",
                "description": "Mostrar contato",
                "produces": [
                    "application/ejs"
                ],
                "parameters": [
                    {
                        "in": "body",
                        "name": "body",
                        "description": "Contatos object",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/Contatos"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Sucesso",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/Contatos"
                            }
                        }
                    },
                    "400": {
                        "description": "Erro"
                    }
                }
            
            }
        }
    },
    "definitions": {
        "Contatos": {
            "type": "object",
            "properties": {
                "nome": {
                    "type": "string",
                    "example": "Jorge"
                },
                "email": {
                    "type": "string",
                    "example": "jorge@gmail.com"
                }
                
            }
        }
    }
};

module.exports = swaggerDocument
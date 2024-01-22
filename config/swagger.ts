/* eslint-disable @typescript-eslint/no-explicit-any */
import swaggerJsdoc from 'swagger-jsdoc'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Beeve API',
      version: '1.0.0',
      description:
        'Documentação da API do Beeve para consumo por clientes Web e Mobile',
    },
    servers: [{ url: '/api' }],
    components: {
      schemas: {
        Role: {
          type: 'object',
          properties: {
            id: { type: 'string', example: '1', format: 'uuid' },
            name: { type: 'string', example: 'Admin' },
            description: { type: 'string', example: 'Administrative role' },
          },
        },
        RoleUser: {
          type: 'object',
          properties: {
            id: { type: 'string', example: '1', format: 'uuid' },
            idUser: { type: 'string', example: '1', format: 'uuid' },
            idRole: { type: 'string', example: '1', format: 'uuid' },
          },
        },
        User: {
          type: 'object',
          properties: {
            id: { type: 'string', example: '1', format: 'uuid' },
            fullName: { type: 'string', example: 'John Doe' },
            dateOfBirth: {
              type: 'string',
              format: 'date-time',
              example: '2022-01-01T00:00:00Z',
            },
            email: { type: 'string', example: 'john@example.com' },
            passwordHash: { type: 'string', example: 'hashed_password' },
            profilePicUrl: {
              type: 'string',
              example: 'http://example.com/profile.jpg',
            },
            isExternal: { type: 'boolean', example: false },
            institutionalCode: { type: 'string', example: '12345' },
          },
        },
        Event: {
          type: 'object',
          properties: {
            id: { type: 'string', example: '1', format: 'uuid' },
            name: { type: 'string', example: 'Birthday Party' },
            idCreator: { type: 'string', example: '1', format: 'uuid' },
            dateTime: {
              type: 'string',
              format: 'date-time',
              example: '2022-01-01T18:00:00Z',
            },
            location: { type: 'string', example: 'Party Venue' },
            description: {
              type: 'string',
              example: 'Join us for a celebration!',
            },
            maxParticipants: { type: 'integer', example: 50 },
            eventCode: { type: 'string', example: 'BDAY2022' },
            isPublic: { type: 'boolean', example: true },
            coverUrl: {
              type: 'string',
              example: 'http://example.com/cover.jpg',
            },
          },
        },
        Subscription: {
          type: 'object',
          properties: {
            id: { type: 'string', example: '1', format: 'uuid' },
            idUser: { type: 'string', example: '1', format: 'uuid' },
            idEvent: { type: 'string', example: '1', format: 'uuid' },
          },
        },
      },
    },
  },
  apis: [],
}
;(options.definition as any).paths = {
  '/health': {
    get: {
      summary: 'Verifica o estado da API',
      tags: ['Base'],
      responses: {
        '200': {
          description: 'Requisição bem-sucedida',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  msg: {
                    type: 'string',
                    example: 'Oi? A API está online! 👩🏽‍🚀',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  '/auth': {
    post: {
      summary: 'Autenticação de usuário',
      tags: ['Base'],
      requestBody: {
        description: 'Corpo da requisição para autenticação',
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                email: { type: 'string', example: 'john@example.com' },
                password: { type: 'string', example: 'your_password' },
              },
            },
          },
        },
      },
      responses: {
        '200': {
          description: 'Requisição bem-sucedida',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  token: { type: 'string', example: 'your_token' },
                },
              },
            },
          },
        },
      },
    },
  },
}

const swaggerSpec = swaggerJsdoc(options)

export default swaggerSpec

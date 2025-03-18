import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: "Products API Documentation",
            description: "API documentation for the Products and Users API ",
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: "Development Server",
            },
        ],
    },
    apis: ['./swagger/*.js'],
};

const specs = swaggerJsdoc(options);

export default specs;
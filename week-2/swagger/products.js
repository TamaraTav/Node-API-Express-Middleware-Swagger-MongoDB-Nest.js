/**
 * @swagger
 * components:
 *  schemas:
 *   Product:
 *    type: object
 *    required:
 *      - name
 *      - price
 *      - category
 *    properties:
 *      name:
 *        type: string
 *        description: The name of the product
 *      price:
 *        type: number
 *        description: The price of the product
 *      category:
 *        type: string
 *        description: The category of the product
 *      slug:
 *        type: string
 *        description: URL-friendly version of the name
 *
 * paths:
 *  /products:
 *    get:
 *      summary: Get all products
 *      tags:
 *        - Products
 *      responses:
 *        "200":
 *          description: A list of products.
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Product'
 *
 *    post:
 *      summary: Create a new product
 *      tags:
 *        - Products
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      responses:
 *        "201":
 *          description: Product created successfully.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Product'
 *        "400":
 *          description: Invalid input.
 *
 *  /products/{id}:
 *    get:
 *      summary: Get a product by ID
 *      tags:
 *        - Products
 *      parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        "200":
 *          description: A single product.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Product'
 *        "404":
 *          description: Product not found.
 *
 *    put:
 *      summary: Update a product by ID
 *      tags:
 *        - Products
 *      parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          schema:
 *            type: string
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      responses:
 *        "200":
 *          description: Product updated successfully.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Product'
 *        "400":
 *          description: Invalid input.
 *        "404":
 *          description: Product not found.
 *
 *    delete:
 *      summary: Delete a product by ID
 *      tags:
 *        - Products
 *      parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        "204":
 *          description: Product deleted successfully.
 *        "404":
 *          description: Product not found.
 */

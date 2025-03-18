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
   */

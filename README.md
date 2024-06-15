# Backend para Tienda de Mascotas (Pet Shop)

## [Link Repositorio FrontEnd PetShop](https://github.com/EduMMorenolp/PetShop)

Este repositorio contiene el backend de una aplicación de ventas para una tienda de mascotas, desarrollado con Node.js, Express y MySQL. La aplicación permite la gestión de productos, categorías, usuarios, carritos de compra y órdenes de compra.

## Integrantes

<div class="integrantes">
    <table>
        <thead>
            <tr>
                <th>Nombre</th>
                <th>Rol</th>
                <th>GitHub</th>
                <th>LinkedIn</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Ferreyra Emilse Antonella</td>
                <td>Desarrollo Web Full Stack Front-End / Back-End</td>
                <td><a href="https://github.com/EmiFerreyra" target="_blank">EmiFerreyra</a></td>
                <td><a href="https://linkedin.com/in/emilse-antonella-ferreyra" target="_blank">Emilse Antonella Ferreyra</a></td>
            </tr>
            <tr>
                <td>Guillermo Darío Arias</td>
                <td>Desarrollo Web Full Stack Front-End / Back-End</td>
                <td><a href="https://github.com/misterio07" target="_blank">misterio07</a></td>
                <td><a href="https://www.linkedin.com/in/dario-arias-b542a8227/" target="_blank">Dario Arias</a></td>
            </tr>
            <tr>
                <td>Eduardo M Moreno</td>
                <td>Desarrollo Web Full Stack Front-End / Back-End</td>
                <td><a href="https://github.com/EduMMorenolp" target="_blank">EduMMorenolp</a></td>
                <td><a href="https://www.linkedin.com/in/eduardo-m-moreno-programador/" target="_blank">Eduardo M Moreno</a></td>
            </tr>
            <tr>
                <td>Luis Amaison</td>
                <td>Desarrollo Web Full Stack Front-End / Back-End</td>
                <td><a href="https://github.com/LuisDev6" target="_blank">LuisDev6</a></td>
                <td><a href="https://www.linkedin.com/in/luis-amaison/" target="_blank">Luis Amaison</a></td>
            </tr>
        </tbody>
    </table>
</div>

## Características

- **CRUD de Usuarios**: Registro, login, actualización y eliminación de usuarios.
- **CRUD de Productos**: Creación, lectura, actualización y eliminación de productos.
- **CRUD de Categorías**: Creación, lectura, actualización y eliminación de categorías.
- **Gestión de Carrito**: Agregar, actualizar y eliminar productos en el carrito de compra.
- **Gestión de Órdenes**: Creación y visualización de órdenes de compra.
- **Autenticación**: Implementación de JWT para la autenticación de usuarios.
- **Relaciones de Base de Datos**: Relaciones uno a muchos entre categorías y productos, usuarios y carritos, y usuarios y órdenes.

## Tecnologías Utilizadas

- Node.js
- Express
- MySQL
- JWT (JSON Web Tokens)

# Estructura de archivos

- 📁 backend
    - 📁 config
        - 📄 config.js
        - 📄 database.js
    - 📁 controllers
        - 📄 userController.js
        - 📄 productController.js
        - 📄 categoryController.js
        - 📄 cartController.js
        - 📄 orderController.js
    - 📁 middleware
        - 📄 authMiddleware.js
    - 📁 models
        - 📄 User.js
        - 📄 Product.js
        - 📄 Category.js
        - 📄 Cart.js
        - 📄 Order.js
    - 📁 routes
        - 📄 userRoutes.js
        - 📄 productRoutes.js
        - 📄 categoryRoutes.js
        - 📄 cartRoutes.js
        - 📄 orderRoutes.js
    - 📄 .env
    - 📄 .gitignore
    - 📄 package.json
    - 📄 server.js


# Estructura de la Base de Datos

El esquema de la base de datos utiliza MySQL y consta de las siguientes tablas:

## Usuarios

| Campo        | Tipo      | Descripción                              |
|--------------|-----------|------------------------------------------|
| id           | INT       | Identificador único del usuario          |
| nombre       | VARCHAR   | Nombre del usuario                       |
| email        | VARCHAR   | Correo electrónico del usuario           |
| contraseña   | VARCHAR   | Contraseña del usuario (hash)            |
| rol          | ENUM      | Rol del usuario (admin, cliente)         |

## Categorías

| Campo        | Tipo      | Descripción                              |
|--------------|-----------|------------------------------------------|
| id           | INT       | Identificador único de la categoría      |
| nombre       | VARCHAR   | Nombre de la categoría                   |

## Productos

| Campo        | Tipo      | Descripción                              |
|--------------|-----------|------------------------------------------|
| id           | INT       | Identificador único del producto         |
| nombre       | VARCHAR   | Nombre del producto                      |
| descripcion  | TEXT      | Descripción del producto                 |
| precio       | DECIMAL   | Precio del producto                      |
| imagen       | VARCHAR   | URL de la imagen del producto            |
| categoria_id | INT       | ID de la categoría a la que pertenece el producto |

## Carrito

| Campo        | Tipo      | Descripción                              |
|--------------|-----------|------------------------------------------|
| id           | INT       | Identificador único del item de carrito  |
| usuario_id   | INT       | ID del usuario                           |
| producto_id  | INT       | ID del producto                          |
| cantidad     | INT       | Cantidad del producto en el carrito      |

## Órdenes

| Campo        | Tipo      | Descripción                              |
|--------------|-----------|------------------------------------------|
| id           | INT       | Identificador único de la orden          |
| usuario_id   | INT       | ID del usuario                           |
| total        | DECIMAL   | Total de la orden                        |
| estado       | ENUM      | Estado de la orden (pendiente, completada, cancelada) |
| fecha_pedido | TIMESTAMP | Fecha y hora del pedido                  |

## OrdenDetalles

| Campo        | Tipo      | Descripción                              |
|--------------|-----------|------------------------------------------|
| id           | INT       | Identificador único del detalle de la orden |
| orden_id     | INT       | ID de la orden                           |
| producto_id  | INT       | ID del producto                          |
| cantidad     | INT       | Cantidad del producto en la orden        |
| precio       | DECIMAL   | Precio del producto en la orden          |


## Requisitos Previos

- Node.js instalado
- MySQL instalado
- Crear un archivo `.env` en la raíz del proyecto con las siguientes variables de entorno:

```plaintext
DB_HOST=tu_host_de_base_de_datos
DB_USER=tu_usuario_de_base_de_datos
DB_PASSWORD=tu_contraseña_de_base_de_datos
DB_NAME=nombre_de_tu_base_de_datos
JWT_SECRET=tu_secreto_para_jwt
```

## Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/EduMMorenolp/PetShopAPI.git
```

2. Navega al directorio del proyecto:

```bash
cd PetShopAPI
```

3. Instala las dependencias:

```bash
npm install
```

4. Inicia el servidor:

```bash
npm run dev
```

## Uso

### Endpoints de la API

#### Usuarios

- `POST /usuarios/registro` - Crear una cuenta de cliente.
- `POST /usuarios/login` - Iniciar sesión y obtener un token.
- `GET /admin/usuarios` - Obtener todos los usuarios (requiere rol de administrador).
- `GET /admin/usuarios/:id` - Obtener un usuario por ID (requiere rol de administrador).
- `PUT /admin/usuarios/:id` - Actualizar un usuario por ID (requiere rol de administrador).
- `DELETE /admin/usuarios/:id` - Borrar un usuario por ID (requiere rol de administrador).

#### Productos

- `POST /admin/productos` - Crear un nuevo producto (requiere rol de administrador).
- `GET /productos` - Obtener todos los productos disponibles.
- `GET /productos/:id` - Obtener un producto por ID.
- `PUT /admin/productos/:id` - Actualizar un producto por ID (requiere rol de administrador).
- `DELETE /admin/productos/:id` - Borrar un producto por ID (requiere rol de administrador).

#### Categorías

- `POST /admin/categorias` - Crear una nueva categoría (requiere rol de administrador).
- `GET /categorias` - Obtener todas las categorías disponibles.
- `GET /categorias/:id` - Obtener una categoría por ID.
- `PUT /admin/categorias/:id` - Actualizar una categoría por ID (requiere rol de administrador).
- `DELETE /admin/categorias/:id` - Borrar una categoría por ID (requiere rol de administrador).

#### Carrito de Compra

- `POST /carrito/agregar/:idProducto` - Agregar un producto al carrito de compra.
- `PUT /carrito/actualizar/:idProducto` - Actualizar la cantidad de un producto en el carrito de compra.
- `DELETE /carrito/eliminar/:idProducto` - Eliminar un producto del carrito de compra.

#### Órdenes de Compra

- `POST /ordenes/crear` - Crear una nueva orden de compra.
- `GET /ordenes` - Obtener todas las órdenes de compra.
- `GET /ordenes/:id` - Obtener una orden de compra por ID.
- `PUT /ordenes/actualizar/:id` - Actualizar una orden de compra por ID.
- `DELETE /ordenes/eliminar/:id` - Eliminar una orden de compra por ID.

## Contribución

Las contribuciones son bienvenidas. Para sugerencias de nuevas características, mejoras o correcciones de errores, por favor abre un issue o una pull request.

## Licencia

Este proyecto está bajo la [Licencia MIT](https://choosealicense.com/licenses/mit/).

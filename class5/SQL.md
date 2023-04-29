**Click [here](https://github.com/women-who-code-med/from-zero-to-superhero-5-postgresql) to see an Example**

**Schema (PostgreSQL v15)**

    CREATE TABLE productos (
      id SERIAL PRIMARY KEY,
      nombre VARCHAR(100) NOT NULL,
      descripcion TEXT,
      precio DECIMAL(10, 2) NOT NULL,
      inventario INTEGER NOT NULL
    );
    
    INSERT INTO productos (nombre, descripcion, precio, inventario)
    VALUES ('Producto 1', 'Descripción del producto 1', 10.99, 100),
           ('Producto 2', 'Descripción del producto 2 azul', 19.99, 50),
           ('Producto 3', 'Descripción del producto 3 rojo', 5.99, 200);
    
    
    

---

**Query #1 Listar todos los productos.**

    select * from productos;

| id  | nombre     | descripcion                     | precio | inventario |
| --- | ---------- | ------------------------------- | ------ | ---------- |
| 1   | Producto 1 | Descripción del producto 1      | 10.99  | 100        |
| 2   | Producto 2 | Descripción del producto 2 azul | 19.99  | 50         |
| 3   | Producto 3 | Descripción del producto 3 rojo | 5.99   | 200        |

---
**Query #2 Listar 1 elemento por nombre.**

    select * from productos where nombre = 'Producto 1';

| id  | nombre     | descripcion                | precio | inventario |
| --- | ---------- | -------------------------- | ------ | ---------- |
| 1   | Producto 1 | Descripción del producto 1 | 10.99  | 100        |

---
**Query #3 Listar 1 elemento por id.**

    select * from productos where id = 1;

| id  | nombre     | descripcion                | precio | inventario |
| --- | ---------- | -------------------------- | ------ | ---------- |
| 1   | Producto 1 | Descripción del producto 1 | 10.99  | 100        |

---
**Query #4 Actualizar producto.**

    update productos
    set nombre = 'Producto 1 updated' 
    where id = 1;

There are no results to be displayed.

---
**Query #5**

    select * from productos where id = 1;

| id  | nombre             | descripcion                | precio | inventario |
| --- | ------------------ | -------------------------- | ------ | ---------- |
| 1   | Producto 1 updated | Descripción del producto 1 | 10.99  | 100        |

---
**Query #6 Eliminar producto**

    delete from productos where id = 2;

There are no results to be displayed.

---
**Query #7**

    select * from productos;

| id  | nombre             | descripcion                     | precio | inventario |
| --- | ------------------ | ------------------------------- | ------ | ---------- |
| 3   | Producto 3         | Descripción del producto 3 rojo | 5.99   | 200        |
| 1   | Producto 1 updated | Descripción del producto 1      | 10.99  | 100        |

---

[View on DB Fiddle](https://www.db-fiddle.com/)
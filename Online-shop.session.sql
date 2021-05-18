-- Создание таблиц
CREATE TABLE Addresses (
    address_id SERIAL PRIMARY KEY,
    country VARCHAR(20) NOT NULL,
    region VARCHAR(20) NOT NULL,
    district VARCHAR(20) NOT NULL,
    city VARCHAR(20) NOT NULL,
    street VARCHAR(20) NOT NULL,
    house VARCHAR(20) NOT NULL,
    postcode INT NOT NULL
);

CREATE TABLE Authorization_data (
    authorization_data_id SERIAL PRIMARY KEY,
    login VARCHAR(10) UNIQUE NOT NULL,
    hashpass VARCHAR(255) UNIQUE NOT NULL,
    salt VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(20) NOT NULL,
    registration_date TIMESTAMP NOT NULL,
    last_authorization_date TIMESTAMP
);

CREATE TABLE Positions (
    position_id SERIAL PRIMARY KEY,
    position_name VARCHAR(20) UNIQUE NOT NULL,
    description TEXT,
    responsobilities TEXT
);

CREATE TABLE Customers (
    customer_id SERIAL PRIMARY KEY,
    address_id INT,
    authorization_data_id INT UNIQUE NOT NULL,
    first_name VARCHAR(20),
    last_name VARCHAR(20),
    patronymic VARCHAR(20),
    gender VARCHAR(10),
    email VARCHAR(20),
    phone NUMERIC(18),

    CONSTRAINT fk_address
    FOREIGN KEY(address_id)
    REFERENCES Addresses(address_id)
    ON DELETE SET NULL,

    CONSTRAINT fk_authorization_data
    FOREIGN KEY(authorization_data_id)
    REFERENCES Authorization_data(authorization_data_id)
    ON DELETE SET NULL
);

CREATE TABLE Employees (
    employee_id SERIAL PRIMARY KEY,
    address_id INT,
    position_id INT NOT NULL,
    authorization_data_id INT UNIQUE NOT NULL,
    first_name VARCHAR(20),
    last_name VARCHAR(20),
    patronymic VARCHAR(20),
    gender VARCHAR(10),
    email VARCHAR(20),
    phone NUMERIC(18),

    CONSTRAINT fk_address
    FOREIGN KEY(address_id)
    REFERENCES Addresses(address_id)
    ON DELETE SET NULL,

    CONSTRAINT fk_authorization_data
    FOREIGN KEY(authorization_data_id)
    REFERENCES Authorization_data(authorization_data_id)
    ON DELETE SET NULL,

    CONSTRAINT fk_position
    FOREIGN KEY(position_id)
    REFERENCES Positions(position_id)
    ON DELETE SET NULL
);

CREATE TABLE Suppliers (
    supplier_id SERIAL PRIMARY KEY,
    address_id INT,
    company_name VARCHAR(20) NOT NULL,
    company_status VARCHAR(10) NOT NULL,

    CONSTRAINT fk_address
    FOREIGN KEY(address_id)
    REFERENCES Addresses(address_id)
    ON DELETE SET NULL
);

CREATE TABLE Agents (
    agent_id SERIAL PRIMARY KEY,
    supplier_id INT NOT NULL,
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(20) NOT NULL,
    patronymic VARCHAR(20) NOT NULL,
    gender VARCHAR(10),
    email VARCHAR(20),
    phone NUMERIC(18),

    CONSTRAINT fk_supplier
    FOREIGN KEY(supplier_id)
    REFERENCES Suppliers(supplier_id)
    ON DELETE SET NULL
);

CREATE TABLE Measure_units (
    measure_unit_id SERIAL PRIMARY KEY,
    measure_name VARCHAR(10) UNIQUE NOT NULL
);

CREATE TABLE Category (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(30) UNIQUE NOT NULL,
    description TEXT,
    features TEXT
);

CREATE TABLE Category_hierarchy (
    category_hierarchy_id INT NOT NULL,
    subcategory_hierarchy_id INT UNIQUE NOT NULL,

    CONSTRAINT pk_category_hierarchy
    PRIMARY KEY(category_hierarchy_id, subcategory_hierarchy_id),

    CONSTRAINT fk_category_hierarchy
    FOREIGN KEY(category_hierarchy_id)
    REFERENCES Category(category_id)
    ON DELETE SET NULL,

    CONSTRAINT fk_subcategory_hierarchy
    FOREIGN KEY(subcategory_hierarchy_id)
    REFERENCES Category(category_id)
    ON DELETE CASCADE
);

CREATE TABLE Products (
    product_id SERIAL PRIMARY KEY,
    supplier_id INT NOT NULL,
    category_id INT,
    measure_unit_id INT NOT NULL,
    product_name VARCHAR(30) NOT NULL,
    available BOOLEAN NOT NULL,
    description TEXT,
    storage_conditions TEXT,

    CONSTRAINT fk_supplier
    FOREIGN KEY(supplier_id)
    REFERENCES Suppliers(supplier_id)
    ON DELETE SET NULL,

    CONSTRAINT fk_category
    FOREIGN KEY(category_id)
    REFERENCES Category(category_id)
    ON DELETE SET NULL,

    CONSTRAINT fk_measure_unit
    FOREIGN KEY(measure_unit_id)
    REFERENCES Measure_units(measure_unit_id)
    ON DELETE SET NULL

);

CREATE TABLE Product_photos (
    product_photo_id SERIAL PRIMARY KEY,
    product_id INT NOT NULL,
    photo_name VARCHAR UNIQUE NOT NULL,
    url TEXT UNIQUE NOT NULL,
    alternative_text VARCHAR(255) NOT NULL,

    CONSTRAINT fk_product_id
    FOREIGN KEY(product_id)
    REFERENCES Products(product_id)
    ON DELETE SET NULL
);

CREATE TABLE Price_periods (
    price_period_id SERIAL PRIMARY KEY,
    price_period_name VARCHAR(20) NOT NULL,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP
);

CREATE TABLE Price_lists (
    price_list_id SERIAL PRIMARY KEY,
    price_period_id INT NOT NULL,
    product_id INT NOT NULL,
    PRICE MONEY NOT NULL,

    CONSTRAINT fk_price_period
    FOREIGN KEY(price_period_id)
    REFERENCES Price_periods(price_period_id)
    ON DELETE SET NULL,

    CONSTRAINT fk_product
    FOREIGN KEY(product_id)
    REFERENCES Products(product_id)
    ON DELETE SET NULL
);

CREATE TABLE Deliveries (
    delivery_id SERIAL PRIMARY KEY,
    delivery_type VARCHAR(30) UNIQUE NOT NULL,
    description TEXT,
    price MONEY NOT NULL
);

CREATE TABLE Statuses (
    status_id SERIAL PRIMARY KEY,
    status_name VARCHAR(20) UNIQUE NOT NULL
);

CREATE TABLE Orders (
    order_id SERIAL PRIMARY KEY,
    customer_id INT NOT NULL,
    employee_id INT,
    delivery_id INT NOT NULL,
    status_id INT NOT NULL,
    processing_date TIMESTAMP,
    posting_date TIMESTAMP,
    execution_date TIMESTAMP,
    full_quantity INT NOT NULL,
    full_price MONEY NOT NULL,

    CONSTRAINT fk_customer
    FOREIGN KEY(customer_id)
    REFERENCES Customers(customer_id)
    ON DELETE SET NULL,

    CONSTRAINT fk_employee
    FOREIGN KEY(employee_id)
    REFERENCES Employees(employee_id)
    ON DELETE SET NULL,

    CONSTRAINT fk_delivery
    FOREIGN KEY(delivery_id)
    REFERENCES Deliveries(delivery_id)
    ON DELETE SET NULL,

    CONSTRAINT fk_status
    FOREIGN KEY(status_id)
    REFERENCES Statuses(status_id)
    ON DELETE SET NULL
);

CREATE TABLE Orders_Products (
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price MONEY NOT NULL,

    CONSTRAINT pk_order
    PRIMARY KEY(order_id, product_id),

    CONSTRAINT fk_order
    FOREIGN KEY(order_id)
    REFERENCES Orders(order_id)
    ON DELETE SET NULL,

    CONSTRAINT fk_product
    FOREIGN KEY(product_id)
    REFERENCES Products(product_id)
    ON DELETE SET NULL
);

CREATE TABLE Shopping_carts (
    shopping_cart_id SERIAL PRIMARY KEY,
    customer_id INT UNIQUE NOT NULL,
    full_quantity INT NOT NULL,

    CONSTRAINT fk_customer
    FOREIGN KEY(customer_id)
    REFERENCES Customers(customer_id)
    ON DELETE SET NULL
);

CREATE TABLE Shopping_carts_Products(
    shopping_cart_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,

    CONSTRAINT pk_Shopping_carts_Products
    PRIMARY KEY(shopping_cart_id, product_id),

    CONSTRAINT fk_shopping_cart
    FOREIGN KEY(shopping_cart_id)
    REFERENCES Shopping_carts(shopping_cart_id)
    ON DELETE SET NULL,

    CONSTRAINT fk_product_id
    FOREIGN KEY(product_id)
    REFERENCES Products(product_id)
    ON DELETE SET NULL
);

-- Удаление всех таблиц в правильном порядке

DROP TABLE shopping_carts_products;
DROP TABLE shopping_carts;
DROP TABLE orders_products;
DROP TABLE orders;
DROP TABLE statuses;
DROP TABLE deliveries;
DROP TABLE price_lists;
DROP TABLE price_periods;
DROP TABLE product_photos;
DROP TABLE products;
DROP TABLE category_hierarchy;
DROP TABLE category;
DROP TABLE measure_units;
DROP TABLE agents;
DROP TABLE suppliers;
DROP TABLE employees;
DROP TABLE customers;
DROP TABLE positions;
DROP TABLE authorization_data;
DROP TABLE addresses;

-- Регестрация пользователя (1-ый этап)
INSERT INTO authorization_data (login, hashpass, salt, registration_date, last_authorization_date)
VALUES ('mdfdfen', '8e08792f2df38fb83c1c5ac4d4f277d164', 'ljsdfas', current_timestamp, current_timestamp);

INSERT INTO customers(authorization_data_id) 
VALUES (
    (SELECT authorization_data_id 
    FROM authorization_data 
    WHERE login = 'men' 
    AND hashpass = '8e08792f238fb83c1c5ac4d4f277d164')
    );

-- Регестрация пользователя (2-ой этап) - внесение дополнительной информации
SELECT address_id
FROM customers
WHERE authorization_data_id = '4';
      
-- Если адрес не создавался ранее:
INSERT INTO addresses (country, region, district, city, street, house, postcode)
VALUES ('Россия', 'Ставропольск', 'Благодарнен', 'Благодарный', 'Чапаева', '228', '356420');

UPDATE customers
SET address_id = (
    SELECT address_id 
    FROM addresses
    WHERE country = 'Россия'
    AND region = 'Ставропольск'
    AND district = 'Благодарнен'
    AND city = 'Благодарный'
    AND street = 'Чапаева'
    AND house = '228'
    AND postcode = '356420'),

    first_name = 'Александр',
    last_name = 'Лаптопов',
    patronymic = 'Андреевич',
    gender = 'мужской',
    email = 'alexander@bk.ru',
    phone = '89053334541'

WHERE authorization_data_id = 4;

-- Если адрес создавался ранее:
UPDATE addresses
SET country = 'USA',
    region = 'dfdfdf',
    district = 'dfdfd',
    city = 'dfdf',
    street = 'dfdf',
    house = '34',
    postcode = '234234'
WHERE 
address_id = 4;

UPDATE customers
SET 
    first_name = 'Александр',
    last_name = 'Лаптопов',
    patronymic = 'Андреевич',
    gender = 'мужской',
    email = 'alexander@bk.ru',
    phone = '89053334541'

WHERE authorization_data_id = 4;

-- Добавление новой должности
INSERT INTO positions (position_name, description, responsobilities)
VALUES ('content-manager', 'Человек, который управляет наполнением сайта контентом', 'писать тексты описаний, заполнять карточки товаров');

-- Процес авторизации (получения данных пользователя)
SELECT authorization_data_id, salt, hashpass 
FROM authorization_data
WHERE login = 'Мария';

-- Получение всех пользователей
SELECT customers.customer_id, customers.first_name, customers.last_name, customers.patronymic, customers.gender, customers.email, customers.phone, authorization_data.login, authorization_data.hashpass, authorization_data.salt, authorization_data.role, authorization_data.registration_date, authorization_data.last_authorization_date
FROM customers
INNER JOIN authorization_data
ON customers.authorization_data_id = authorization_data.authorization_data_id;

-- Получение одного польователя
SELECT customers.customer_id, customers.first_name, customers.last_name, customers.patronymic, customers.gender, customers.email, customers.phone, authorization_data.login, authorization_data.hashpass, authorization_data.salt, authorization_data.role, authorization_data.registration_date, authorization_data.last_authorization_date
FROM customers
INNER JOIN authorization_data
ON customers.authorization_data_id = authorization_data.authorization_data_id
WHERE customers.authorization_data_id = '4';

-- Удаление конкретного пользователя

DELETE FROM addresses
WHERE address_id = (SELECT address_id FROM customers WHERE authorization_data_id = 3);
DELETE FROM customers
WHERE authorization_data_id = 3;
DELETE FROM authorization_data
WHERE authorization_data_id = 3;

-- Удаление конкретного сотрудника
DELETE FROM addresses
WHERE address_id = (SELECT address_id FROM employees WHERE authorization_data_id = 8);
DELETE FROM employees
WHERE authorization_data_id = 8;
DELETE FROM authorization_data
WHERE authorization_data_id = 8;
 ------------------------------------

SELECT * FROM authorization_data;
SELECT * FROM customers;
SELECT * FROM employees;
SELECT * FROM positions;
SELECT * FROM addresses;
SELECT * FROM measure_units;
SELECT * FROM suppliers;
SELECT * FROM category;
SELECT * FROM category_hierarchy;
SELECT * FROM products;
SELECT * FROM product_photos;

ALTER TABLE employees
ALTER COLUMN address_id TYPE INT,
ALTER COLUMN position_id TYPE INT,
ALTER COLUMN authorization_data_id TYPE INT;

ALTER TABLE authorization_data
ADD COLUMN role VARCHAR(20) NOT NULL;

DELETE FROM addresses
WHERE address_id in (5, 6, 7, 8);
DELETE FROM category;

-- Вся информация по сотрудникам
SELECT employees.employee_id, positions.position_name, employees.first_name, employees.last_name, employees.patronymic, employees.gender, employees.email, employees.phone, authorization_data.login, authorization_data.hashpass, authorization_data.salt, authorization_data.role, authorization_data.registration_date, authorization_data.last_authorization_date 
FROM employees 
INNER JOIN authorization_data 
ON employees.authorization_data_id = authorization_data.authorization_data_id 
INNER JOIN positions
ON employees.position_id = positions.position_id
WHERE employees.authorization_data_id = 7;

-- *** ЕДИНИЦЫ ИЗМЕРЕНИЯ *** --

-- Добавление новых единиц измерение
INSERT INTO measure_units(measure_name)
VALUES ('штуки');

-- Получение конкретной единицу измерения
SELECT * 
FROM measure_units 
WHERE measure_unit_id = 1;

-- Удалить конкретную единицу измерения
DELETE FROM measure_units
WHERE measure_unit_id = 1;

-- Получить все единицы измерения
SELECT *
FROM measure_units

-- *** ПОСТАВЩИКИ *** --

-- Добавление нового поставщика
    SELECT address_id FROM addresses WHERE country = 'Китай' AND region = 'Ставропольск' AND district = 'Благодарнен' AND city = 'Благодарный'AND street = 'Чапаева' AND house = '228' AND postcode = '356420';
     
    -- если адреса нет в addresses
    INSERT INTO addresses (country, region, district, city, street, house, postcode)
    VALUES ('Китай', 'Ставропольск', 'Благодарнен', 'Благодарный', 'Чапаева', '228', '356420');

    INSERT INTO suppliers (address_id, company_name, company_status)
    VALUES ((SELECT address_id FROM addresses WHERE country = 'Китай' AND region = 'Ставропольск' AND district = 'Благодарнен' AND city = 'Благодарный'AND street = 'Чапаева' AND house = '228' AND postcode = '356420'), 'Apple', 'OOO');

    -- если есть
    INSERT INTO suppliers (address_id, company_name, company_status)
    VALUES ('12', 'Apple', 'OOO');


-- *** КАТЕГОРИИ *** --

-- Добавление новой категории
INSERT INTO category(category_name, description, features)
VALUES ('Сыры', 'вававафвфаывафывафывафыва', 'вдофлвоафыовал');

-- Если входит в какую-то категорию (является подкатегорией)
INSERT INTO category_hierarchy(category_hierarchy_id, subcategory_hierarchy_id)
VALUES ((SELECT category_id FROM category WHERE category_name = 'молочные продукты'), (SELECT category_id FROM category WHERE category_name = 'Сыры'));

-- Получить конкретную категорию
SELECT category.category_id, category.category_name, category.description, category.features, (SELECT category.category_name FROM category WHERE category_id = category_hierarchy.category_hierarchy_id) AS parent_category
FROM category 
LEFT OUTER JOIN category_hierarchy
ON category.category_id = category_hierarchy.subcategory_hierarchy_id
WHERE category.category_id = 2;

-- Удаление конкрентной категории
DELETE FROM category_hierarchy
WHERE category_hierarchy_id = 

-- *** Продукты *** --

-- Добавление продукта
INSERT INTO products (supplier_id, category_id, measure_unit_id, product_name, available, description, storage_conditions)
VALUES ()
RETURNING *;

INSERT INTO product_photos(product_id, photo_name, url, alternative_text)
VALUES ();

-- Получение определенного продукта
SELECT products.product_id, products.product_name, products.available, products.description, products.storage_conditions, category.category_name, suppliers.company_name, measure_units.measure_name
FROM products
LEFT OUTER JOIN suppliers
ON products.supplier_id = suppliers.supplier_id
LEFT OUTER JOIN category
ON products.category_id = category.category_id
LEFT OUTER JOIN measure_units
ON products.measure_unit_id = measure_units.measure_unit_id
WHERE product_id = 2;

SELECT * FROM product_photos
WHERE product_id = 1;

-- Удаление Продукта
SELECT photo_name FROM product_photos WHERE product_id = 1;

DELETE FROM product_photos WHERE product_id = 1;

DELETE FROM products WHERE product_id = 1;


-- Фильтрация продуктов

    -- По категории
SELECT products.product_id, products.product_name, products.available, products.description, products.storage_conditions, category.category_name, suppliers.company_name, measure_units.measure_name
FROM products
LEFT OUTER JOIN suppliers
ON products.supplier_id = suppliers.supplier_id
LEFT OUTER JOIN category
ON products.category_id = category.category_id
LEFT OUTER JOIN measure_units
ON products.measure_unit_id = measure_units.measure_unit_id
WHERE products.category_id = 9
OFFSET 0 ROWS
FETCH FIRST 2 ROW ONLY;

    --По поставщику
SELECT products.product_id, products.product_name, products.available, products.description, products.storage_conditions, category.category_name, suppliers.company_name, measure_units.measure_name
FROM products
LEFT OUTER JOIN suppliers
ON products.supplier_id = suppliers.supplier_id
LEFT OUTER JOIN category
ON products.category_id = category.category_id
LEFT OUTER JOIN measure_units
ON products.measure_unit_id = measure_units.measure_unit_id
WHERE products.category_id = 2
FETCH FIRST 2 ROW ONLY;

SELECT products.product_id, products.product_name, products.available, products.description, products.storage_conditions, category.category_name, suppliers.company_name, measure_units.measure_name
FROM products
LEFT OUTER JOIN suppliers
ON products.supplier_id = suppliers.supplier_id
LEFT OUTER JOIN category
ON products.category_id = category.category_id
LEFT OUTER JOIN measure_units
ON products.measure_unit_id = measure_units.measure_unit_id
WHERE products.supplier_id = 2
FETCH FIRST 2 ROW ONLY;

SELECT products.product_id, products.product_name, products.available, products.description, products.storage_conditions, category.category_name, suppliers.company_name, measure_units.measure_name
FROM products
LEFT OUTER JOIN suppliers
ON products.supplier_id = suppliers.supplier_id
LEFT OUTER JOIN category
ON products.category_id = category.category_id
LEFT OUTER JOIN measure_units
ON products.measure_unit_id = measure_units.measure_unit_id
WHERE products.category_id = 9 AND products.supplier_id = 1
FETCH FIRST 2 ROW ONLY;


SELECT products.product_id, products.product_name, products.available, products.description, products.storage_conditions, category.category_name, suppliers.company_name, measure_units.measure_name
FROM products
LEFT OUTER JOIN suppliers
ON products.supplier_id = suppliers.supplier_id
LEFT OUTER JOIN category
ON products.category_id = category.category_id
LEFT OUTER JOIN measure_units
ON products.measure_unit_id = measure_units.measure_unit_id
FETCH FIRST 2 ROW ONLY;

    -- Узнать количество продуктов, удовлетворяющих фильтрации
SELECT COUNT(*)
FROM products
WHERE products.category_id = 9 AND products.supplier_id = 1
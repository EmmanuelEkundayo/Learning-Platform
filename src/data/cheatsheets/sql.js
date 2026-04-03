const sql = {
  id: 'sql',
  title: 'SQL',
  color: 'amber',
  category: 'Backend',
  description: 'Queries, joins, aggregates, window functions, and schema design',
  sections: [
    {
      title: 'SELECT Queries',
      items: [
        {
          label: 'Basic SELECT',
          language: 'sql',
          code: `-- Select all columns
SELECT * FROM users;

-- Select specific columns
SELECT id, name, email FROM users;

-- Column aliases
SELECT
  first_name AS name,
  created_at AS "Joined Date"
FROM users;`,
          note: 'Avoid SELECT * in production queries - it returns more data than needed and breaks if columns change'
        },
        {
          label: 'DISTINCT and ORDER BY',
          language: 'sql',
          code: `-- Remove duplicates
SELECT DISTINCT country FROM users;

-- Order results
SELECT name, salary
FROM employees
ORDER BY salary DESC, name ASC;

-- Order by expression
SELECT name, created_at
FROM posts
ORDER BY created_at DESC;`,
        },
        {
          label: 'LIMIT and OFFSET (pagination)',
          language: 'sql',
          code: `-- First 10 rows
SELECT * FROM products
ORDER BY id
LIMIT 10;

-- Page 3 (items 21-30)
SELECT * FROM products
ORDER BY id
LIMIT 10 OFFSET 20;

-- SQL Server / Oracle syntax
-- SELECT TOP 10 * FROM products  (SQL Server)
-- FETCH NEXT 10 ROWS ONLY        (Oracle 12+)`,
          note: 'Always include ORDER BY when using LIMIT/OFFSET - without it, the order of rows is not guaranteed'
        },
        {
          label: 'CASE WHEN',
          language: 'sql',
          code: `-- Conditional column value
SELECT
  name,
  price,
  CASE
    WHEN price < 10    THEN 'Budget'
    WHEN price < 50    THEN 'Mid-range'
    WHEN price < 200   THEN 'Premium'
    ELSE 'Luxury'
  END AS price_tier
FROM products;

-- Conditional count
SELECT
  COUNT(*) AS total,
  COUNT(CASE WHEN active = true THEN 1 END) AS active_count
FROM users;`,
          note: 'CASE WHEN is the SQL equivalent of if/else - it can appear in SELECT, WHERE, ORDER BY, and GROUP BY'
        },
        {
          label: 'String and date functions',
          language: 'sql',
          code: `-- String functions
SELECT
  UPPER(name),
  LOWER(email),
  LENGTH(bio),
  SUBSTRING(phone, 1, 3),
  TRIM(name),
  CONCAT(first_name, ' ', last_name) AS full_name
FROM users;

-- Date functions (PostgreSQL)
SELECT
  NOW(),
  CURRENT_DATE,
  created_at::date,
  DATE_PART('year', created_at) AS year,
  created_at + INTERVAL '7 days' AS expires_at
FROM orders;`,
        },
        {
          label: 'Computed columns and expressions',
          language: 'sql',
          code: `SELECT
  name,
  quantity,
  unit_price,
  quantity * unit_price AS total_price,
  quantity * unit_price * 0.1 AS tax,
  ROUND(quantity * unit_price * 1.1, 2) AS total_with_tax
FROM order_items;`,
        }
      ]
    },
    {
      title: 'WHERE and Filtering',
      items: [
        {
          label: 'Comparison operators',
          language: 'sql',
          code: `SELECT * FROM products WHERE price > 100;
SELECT * FROM users WHERE age >= 18;
SELECT * FROM orders WHERE status != 'cancelled';
SELECT * FROM items WHERE quantity <> 0;  -- <> is same as !=`,
        },
        {
          label: 'AND, OR, NOT',
          language: 'sql',
          code: `-- AND requires all conditions
SELECT * FROM users
WHERE age >= 18 AND country = 'US' AND active = true;

-- OR requires any condition
SELECT * FROM products
WHERE category = 'electronics' OR category = 'computers';

-- NOT negates a condition
SELECT * FROM orders
WHERE NOT status = 'cancelled';

-- Use parentheses to control precedence
SELECT * FROM orders
WHERE (status = 'pending' OR status = 'processing') AND total > 100;`,
          note: 'AND has higher precedence than OR - always use parentheses when mixing them'
        },
        {
          label: 'IN and NOT IN',
          language: 'sql',
          code: `-- Match any value in a list
SELECT * FROM orders
WHERE status IN ('pending', 'processing', 'shipped');

-- Exclude values
SELECT * FROM users
WHERE country NOT IN ('US', 'CA', 'GB');

-- IN with a subquery
SELECT * FROM products
WHERE category_id IN (SELECT id FROM categories WHERE active = true);`,
          note: 'NOT IN with NULL values can produce unexpected results - consider NOT EXISTS instead'
        },
        {
          label: 'BETWEEN and LIKE',
          language: 'sql',
          code: `-- BETWEEN is inclusive on both ends
SELECT * FROM orders
WHERE total BETWEEN 50 AND 200;

SELECT * FROM events
WHERE event_date BETWEEN '2024-01-01' AND '2024-12-31';

-- LIKE pattern matching (% = any chars, _ = single char)
SELECT * FROM users WHERE name LIKE 'Al%';       -- starts with Al
SELECT * FROM users WHERE email LIKE '%@gmail%'; -- contains @gmail
SELECT * FROM users WHERE code LIKE 'A_C';       -- A + any char + C

-- ILIKE is case-insensitive (PostgreSQL)
SELECT * FROM products WHERE name ILIKE '%laptop%';`,
          note: 'LIKE patterns with a leading wildcard (%text) cannot use an index - they require a full table scan'
        },
        {
          label: 'IS NULL and IS NOT NULL',
          language: 'sql',
          code: `-- Find rows where column is NULL
SELECT * FROM users WHERE deleted_at IS NULL;
SELECT * FROM orders WHERE shipped_at IS NOT NULL;

-- COALESCE returns the first non-NULL value
SELECT
  name,
  COALESCE(phone, email, 'no contact') AS contact
FROM users;

-- NULLIF returns NULL if two values are equal
SELECT NULLIF(discount, 0) AS discount FROM products;`,
          note: 'Never use = NULL or != NULL - NULL comparisons always return NULL (unknown), not true or false. Use IS NULL'
        }
      ]
    },
    {
      title: 'JOIN Types',
      items: [
        {
          label: 'INNER JOIN - only matching rows',
          language: 'sql',
          code: `-- Returns rows that have a match in BOTH tables
SELECT
  orders.id AS order_id,
  users.name AS customer,
  orders.total
FROM orders
INNER JOIN users ON orders.user_id = users.id;

-- Shorthand: JOIN defaults to INNER JOIN
SELECT o.id, u.name, o.total
FROM orders o
JOIN users u ON o.user_id = u.id;`,
          note: 'INNER JOIN excludes rows from either table that have no match - use LEFT JOIN to keep all rows from the left table'
        },
        {
          label: 'LEFT JOIN - all left rows, matched right rows',
          language: 'sql',
          code: `-- Returns ALL rows from users, and matching orders (or NULL if none)
SELECT
  u.id,
  u.name,
  COUNT(o.id) AS order_count
FROM users u
LEFT JOIN orders o ON o.user_id = u.id
GROUP BY u.id, u.name;

-- Find users with NO orders
SELECT u.name
FROM users u
LEFT JOIN orders o ON o.user_id = u.id
WHERE o.id IS NULL;`,
          note: 'The WHERE o.id IS NULL pattern after a LEFT JOIN is the standard way to find rows with no related records'
        },
        {
          label: 'RIGHT JOIN - all right rows, matched left rows',
          language: 'sql',
          code: `-- Returns ALL rows from orders, matched user (or NULL)
-- RIGHT JOIN is rare - you can always rewrite as a LEFT JOIN
SELECT u.name, o.id AS order_id, o.total
FROM users u
RIGHT JOIN orders o ON u.id = o.user_id;

-- Equivalent LEFT JOIN (preferred)
SELECT u.name, o.id AS order_id, o.total
FROM orders o
LEFT JOIN users u ON u.id = o.user_id;`,
          note: 'Most developers avoid RIGHT JOIN and just flip the table order to use LEFT JOIN instead'
        },
        {
          label: 'FULL OUTER JOIN - all rows from both tables',
          language: 'sql',
          code: `-- Returns all rows from both tables
-- NULL fills columns where there is no match
SELECT
  u.name   AS user_name,
  o.id     AS order_id,
  o.total
FROM users u
FULL OUTER JOIN orders o ON u.id = o.user_id;
-- Users with no orders: order_id and total will be NULL
-- Orders with no user:  user_name will be NULL`,
          note: 'FULL OUTER JOIN is useful for data reconciliation - finding gaps in either table'
        },
        {
          label: 'Joining multiple tables',
          language: 'sql',
          code: `SELECT
  o.id       AS order_id,
  u.name     AS customer,
  p.name     AS product,
  oi.quantity,
  oi.unit_price
FROM orders o
JOIN users u        ON u.id = o.user_id
JOIN order_items oi ON oi.order_id = o.id
JOIN products p     ON p.id = oi.product_id
WHERE o.status = 'completed'
ORDER BY o.created_at DESC;`,
        },
        {
          label: 'Self JOIN',
          language: 'sql',
          code: `-- Join a table to itself (e.g., employees and their managers)
SELECT
  e.name   AS employee,
  m.name   AS manager
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id;`,
          note: 'Self joins require table aliases to distinguish the two references to the same table'
        }
      ]
    },
    {
      title: 'GROUP BY and Aggregates',
      items: [
        {
          label: 'Aggregate functions',
          language: 'sql',
          code: `SELECT
  COUNT(*)              AS total_orders,
  COUNT(DISTINCT user_id) AS unique_customers,
  SUM(total)            AS revenue,
  AVG(total)            AS average_order,
  MIN(total)            AS smallest_order,
  MAX(total)            AS largest_order
FROM orders
WHERE status = 'completed';`,
          note: 'COUNT(*) counts all rows. COUNT(column) counts non-NULL values. COUNT(DISTINCT column) counts unique non-NULL values'
        },
        {
          label: 'GROUP BY',
          language: 'sql',
          code: `-- Aggregate per group
SELECT
  category,
  COUNT(*) AS product_count,
  AVG(price) AS avg_price,
  SUM(stock) AS total_stock
FROM products
GROUP BY category
ORDER BY product_count DESC;`,
          note: 'Every column in SELECT that is not an aggregate function must appear in GROUP BY'
        },
        {
          label: 'HAVING - filter after grouping',
          language: 'sql',
          code: `-- WHERE filters before grouping, HAVING filters after
SELECT
  user_id,
  COUNT(*) AS order_count,
  SUM(total) AS lifetime_value
FROM orders
WHERE status = 'completed'       -- filter rows before grouping
GROUP BY user_id
HAVING SUM(total) > 500          -- filter groups after aggregation
ORDER BY lifetime_value DESC;`,
          note: 'HAVING is like WHERE but for groups - you can use aggregate functions in HAVING but not in WHERE'
        },
        {
          label: 'GROUP BY multiple columns',
          language: 'sql',
          code: `-- Sales broken down by year and month
SELECT
  DATE_PART('year', created_at)  AS year,
  DATE_PART('month', created_at) AS month,
  country,
  COUNT(*) AS orders,
  SUM(total) AS revenue
FROM orders
GROUP BY
  DATE_PART('year', created_at),
  DATE_PART('month', created_at),
  country
ORDER BY year, month, revenue DESC;`,
        },
        {
          label: 'ROLLUP - subtotals and grand totals',
          language: 'sql',
          code: `-- Generates subtotals for each group + a grand total row
SELECT
  country,
  category,
  SUM(total) AS revenue
FROM orders
JOIN products ON products.id = orders.product_id
GROUP BY ROLLUP (country, category)
ORDER BY country, category;

-- NULL in the output means "all" (subtotal/grand total row)`,
          note: 'ROLLUP is a shorthand for GROUP BY with multiple levels of aggregation - useful for reporting tables'
        }
      ]
    },
    {
      title: 'Subqueries and CTEs',
      items: [
        {
          label: 'Scalar subquery',
          language: 'sql',
          code: `-- Subquery returns a single value used in SELECT
SELECT
  name,
  price,
  price - (SELECT AVG(price) FROM products) AS diff_from_avg
FROM products;

-- Subquery in WHERE
SELECT * FROM orders
WHERE total > (SELECT AVG(total) FROM orders);`,
          note: 'A scalar subquery must return exactly one row and one column - if it returns more, it raises an error'
        },
        {
          label: 'IN subquery',
          language: 'sql',
          code: `-- Users who have placed at least one order
SELECT name FROM users
WHERE id IN (
  SELECT DISTINCT user_id FROM orders
  WHERE status = 'completed'
);

-- Products never ordered
SELECT name FROM products
WHERE id NOT IN (
  SELECT DISTINCT product_id FROM order_items
);`,
        },
        {
          label: 'EXISTS subquery',
          language: 'sql',
          code: `-- EXISTS is often faster than IN for large datasets
SELECT u.name
FROM users u
WHERE EXISTS (
  SELECT 1 FROM orders o
  WHERE o.user_id = u.id
  AND o.total > 1000
);

-- NOT EXISTS: users with no orders
SELECT u.name FROM users u
WHERE NOT EXISTS (
  SELECT 1 FROM orders o WHERE o.user_id = u.id
);`,
          note: 'EXISTS stops as soon as it finds the first matching row - more efficient than IN for correlated subqueries'
        },
        {
          label: 'CTE with WITH',
          language: 'sql',
          code: `-- Common Table Expression - reusable named result set
WITH high_value_customers AS (
  SELECT user_id, SUM(total) AS lifetime_value
  FROM orders
  WHERE status = 'completed'
  GROUP BY user_id
  HAVING SUM(total) > 1000
),
customer_details AS (
  SELECT u.name, u.email, h.lifetime_value
  FROM users u
  JOIN high_value_customers h ON h.user_id = u.id
)
SELECT * FROM customer_details
ORDER BY lifetime_value DESC;`,
          note: 'CTEs improve readability by naming intermediate result sets. You can chain multiple CTEs with commas'
        },
        {
          label: 'Recursive CTE',
          language: 'sql',
          code: `-- Traverse a hierarchy (e.g., category tree, org chart)
WITH RECURSIVE category_tree AS (
  -- Anchor: start with root categories
  SELECT id, name, parent_id, 0 AS depth
  FROM categories
  WHERE parent_id IS NULL

  UNION ALL

  -- Recursive: join children to their parents
  SELECT c.id, c.name, c.parent_id, ct.depth + 1
  FROM categories c
  JOIN category_tree ct ON ct.id = c.parent_id
)
SELECT id, name, depth FROM category_tree
ORDER BY depth, name;`,
          note: 'Recursive CTEs must have an anchor (base case) and a recursive member joined by UNION ALL'
        }
      ]
    },
    {
      title: 'INSERT, UPDATE, DELETE',
      items: [
        {
          label: 'INSERT single and multiple rows',
          language: 'sql',
          code: `-- Single row
INSERT INTO users (name, email, created_at)
VALUES ('Alice', 'alice@example.com', NOW());

-- Multiple rows in one statement
INSERT INTO tags (name, color)
VALUES
  ('design', 'blue'),
  ('backend', 'green'),
  ('frontend', 'orange');

-- Capture the inserted row
INSERT INTO users (name, email)
VALUES ('Bob', 'bob@example.com')
RETURNING id, created_at;`,
          note: 'RETURNING (PostgreSQL) retrieves the generated id or defaults without a second query'
        },
        {
          label: 'INSERT from SELECT',
          language: 'sql',
          code: `-- Copy rows from another table
INSERT INTO archived_orders (id, user_id, total, created_at)
SELECT id, user_id, total, created_at
FROM orders
WHERE created_at < NOW() - INTERVAL '1 year';

-- Create and populate in one step
CREATE TABLE top_products AS
SELECT id, name, price
FROM products
ORDER BY sales DESC
LIMIT 100;`,
        },
        {
          label: 'UPDATE',
          language: 'sql',
          code: `-- Basic update
UPDATE users
SET email = 'newemail@example.com', updated_at = NOW()
WHERE id = 42;

-- Update with a calculation
UPDATE order_items
SET subtotal = quantity * unit_price;

-- Update joining another table (PostgreSQL syntax)
UPDATE products p
SET stock = p.stock - oi.quantity
FROM order_items oi
WHERE oi.product_id = p.id
AND oi.order_id = 123;`,
          note: 'Always include a WHERE clause in UPDATE - omitting it updates every row in the table'
        },
        {
          label: 'DELETE',
          language: 'sql',
          code: `-- Delete specific rows
DELETE FROM sessions WHERE expires_at < NOW();

-- Delete with a subquery
DELETE FROM notifications
WHERE user_id IN (SELECT id FROM users WHERE deleted_at IS NOT NULL);

-- Delete and return deleted rows (PostgreSQL)
DELETE FROM cart_items
WHERE cart_id = 99
RETURNING product_id, quantity;`,
          note: 'Always include a WHERE clause in DELETE. Test with SELECT first using the same WHERE clause'
        },
        {
          label: 'UPSERT with ON CONFLICT',
          language: 'sql',
          code: `-- Insert or update if conflict on unique column (PostgreSQL)
INSERT INTO user_settings (user_id, theme, language)
VALUES (42, 'dark', 'en')
ON CONFLICT (user_id)
DO UPDATE SET
  theme = EXCLUDED.theme,
  language = EXCLUDED.language,
  updated_at = NOW();

-- Insert or do nothing on conflict
INSERT INTO email_subscriptions (email)
VALUES ('alice@example.com')
ON CONFLICT (email) DO NOTHING;`,
          note: 'EXCLUDED refers to the row that was proposed for insertion - use it to reference the new values in DO UPDATE'
        }
      ]
    },
    {
      title: 'Indexes',
      items: [
        {
          label: 'CREATE INDEX',
          language: 'sql',
          code: `-- Basic index on a single column
CREATE INDEX idx_users_email ON users (email);

-- Index creation does not block reads in PostgreSQL with CONCURRENTLY
CREATE INDEX CONCURRENTLY idx_orders_user_id ON orders (user_id);

-- Drop an index
DROP INDEX idx_users_email;`,
          note: 'Indexes speed up reads but slow down writes. Only index columns used in WHERE, JOIN ON, or ORDER BY clauses'
        },
        {
          label: 'UNIQUE INDEX',
          language: 'sql',
          code: `-- Enforce uniqueness at the database level
CREATE UNIQUE INDEX idx_users_email_unique ON users (email);

-- Multi-column unique constraint
CREATE UNIQUE INDEX idx_user_product ON reviews (user_id, product_id);
-- A user can only review each product once`,
          note: 'A UNIQUE constraint automatically creates a unique index. You can add unique indexes independently for more control'
        },
        {
          label: 'Composite index',
          language: 'sql',
          code: `-- Index on multiple columns
CREATE INDEX idx_orders_user_status ON orders (user_id, status);

-- Useful for queries filtering on both:
SELECT * FROM orders WHERE user_id = 42 AND status = 'pending';

-- Also useful for user_id alone (leftmost prefix rule)
-- NOT useful for status alone (no leftmost prefix)`,
          note: 'Column order matters in composite indexes - the index is usable for queries that filter on the leftmost columns'
        },
        {
          label: 'Partial index',
          language: 'sql',
          code: `-- Index only active users - smaller, faster index
CREATE INDEX idx_users_email_active
ON users (email)
WHERE active = true;

-- Index only non-null values
CREATE INDEX idx_orders_shipped_at
ON orders (shipped_at)
WHERE shipped_at IS NOT NULL;`,
          note: 'Partial indexes are smaller and faster than full indexes when queries consistently filter on a subset of rows'
        },
        {
          label: 'EXPLAIN ANALYZE',
          language: 'sql',
          code: `-- Show the query plan and actual execution stats
EXPLAIN ANALYZE
SELECT u.name, COUNT(o.id) AS order_count
FROM users u
LEFT JOIN orders o ON o.user_id = u.id
GROUP BY u.id
ORDER BY order_count DESC;

-- Key terms in output:
-- Seq Scan: full table scan (no index used)
-- Index Scan: index used - faster for selective queries
-- Nested Loop / Hash Join: join strategies
-- actual time=x..y rows=z: actual execution data`,
          note: 'EXPLAIN ANALYZE actually runs the query - use EXPLAIN (without ANALYZE) on destructive queries or large tables'
        }
      ]
    },
    {
      title: 'Transactions',
      items: [
        {
          label: 'BEGIN, COMMIT, ROLLBACK',
          language: 'sql',
          code: `BEGIN;

UPDATE accounts SET balance = balance - 500 WHERE id = 1;
UPDATE accounts SET balance = balance + 500 WHERE id = 2;

-- If both succeed
COMMIT;

-- If something went wrong
-- ROLLBACK;`,
          note: 'All statements inside a transaction either all succeed (COMMIT) or all fail (ROLLBACK) - they are atomic'
        },
        {
          label: 'Transaction with error handling (application layer)',
          language: 'sql',
          code: `-- Pseudo-code pattern used in most application ORMs
BEGIN;

  INSERT INTO orders (user_id, total) VALUES (42, 99.99) RETURNING id;
  -- Suppose id = 101

  INSERT INTO order_items (order_id, product_id, quantity)
  VALUES (101, 5, 2), (101, 8, 1);

  UPDATE products SET stock = stock - 2 WHERE id = 5;
  UPDATE products SET stock = stock - 1 WHERE id = 8;

COMMIT;
-- If any statement fails, the application rolls back`,
        },
        {
          label: 'SAVEPOINT',
          language: 'sql',
          code: `BEGIN;

INSERT INTO audit_log (action) VALUES ('start');
SAVEPOINT before_risky_op;

UPDATE inventory SET reserved = reserved + 10 WHERE id = 5;

-- If the update causes a problem:
ROLLBACK TO SAVEPOINT before_risky_op;
-- Only the update is undone, not the audit log insert

COMMIT;`,
          note: 'SAVEPOINTs let you partially roll back within a transaction without losing all earlier work'
        },
        {
          label: 'Isolation levels',
          language: 'sql',
          code: `-- Set isolation level for the current transaction
BEGIN ISOLATION LEVEL READ COMMITTED;
-- Default in most databases
-- Can see committed changes from other transactions

BEGIN ISOLATION LEVEL REPEATABLE READ;
-- Reads are consistent for the entire transaction
-- Prevents non-repeatable reads

BEGIN ISOLATION LEVEL SERIALIZABLE;
-- Strongest isolation - transactions appear to run sequentially
-- Prevents phantom reads and serialization anomalies`,
          note: 'Higher isolation levels prevent more anomalies but reduce concurrency. READ COMMITTED is the right default for most apps'
        },
        {
          label: 'Detecting and avoiding deadlocks',
          language: 'sql',
          code: `-- Deadlock: two transactions each waiting for the other's lock
-- Transaction 1:
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;  -- locks row 1
UPDATE accounts SET balance = balance + 100 WHERE id = 2;  -- waits for row 2

-- Transaction 2 (simultaneous):
BEGIN;
UPDATE accounts SET balance = balance - 50 WHERE id = 2;   -- locks row 2
UPDATE accounts SET balance = balance + 50 WHERE id = 1;   -- waits for row 1 -> deadlock!

-- Prevention: always acquire locks in the same order
-- Transaction 1 and 2 both lock row 1 first, then row 2`,
          note: 'Databases detect deadlocks and automatically roll back one of the transactions - the app should retry on deadlock errors'
        }
      ]
    },
    {
      title: 'Window Functions',
      items: [
        {
          label: 'ROW_NUMBER, RANK, DENSE_RANK',
          language: 'sql',
          code: `SELECT
  name,
  department,
  salary,
  ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) AS row_num,
  RANK()       OVER (PARTITION BY department ORDER BY salary DESC) AS rank,
  DENSE_RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS dense_rank
FROM employees;

-- ROW_NUMBER: 1,2,3,4 (no ties - always unique)
-- RANK:       1,1,3,4 (ties get same rank, next rank is skipped)
-- DENSE_RANK: 1,1,2,3 (ties get same rank, next rank is NOT skipped)`,
          note: 'DENSE_RANK is usually preferred over RANK for user-facing rankings'
        },
        {
          label: 'LAG and LEAD - access adjacent rows',
          language: 'sql',
          code: `SELECT
  month,
  revenue,
  LAG(revenue)  OVER (ORDER BY month) AS prev_month_revenue,
  LEAD(revenue) OVER (ORDER BY month) AS next_month_revenue,
  revenue - LAG(revenue) OVER (ORDER BY month) AS month_over_month_change
FROM monthly_sales
ORDER BY month;`,
          note: 'LAG accesses the previous row, LEAD accesses the next row - both return NULL at the boundaries'
        },
        {
          label: 'FIRST_VALUE and LAST_VALUE',
          language: 'sql',
          code: `SELECT
  name,
  department,
  salary,
  FIRST_VALUE(name) OVER (
    PARTITION BY department
    ORDER BY salary DESC
    ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
  ) AS highest_paid_in_dept
FROM employees;`,
          note: 'LAST_VALUE requires the explicit ROWS BETWEEN frame clause - by default the frame ends at the current row'
        },
        {
          label: 'Running totals and moving averages',
          language: 'sql',
          code: `SELECT
  order_date,
  daily_revenue,
  -- Running total (cumulative sum)
  SUM(daily_revenue) OVER (ORDER BY order_date) AS running_total,
  -- 7-day moving average
  AVG(daily_revenue) OVER (
    ORDER BY order_date
    ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
  ) AS moving_avg_7d
FROM daily_sales
ORDER BY order_date;`,
          note: 'Window functions compute results across a set of rows related to the current row without collapsing them into groups'
        },
        {
          label: 'PARTITION BY and OVER syntax',
          language: 'sql',
          code: `-- OVER() with no args: all rows are one window
SELECT name, salary, AVG(salary) OVER () AS company_avg FROM employees;

-- OVER (PARTITION BY dept): separate window per department
SELECT name, dept, salary,
  AVG(salary) OVER (PARTITION BY dept) AS dept_avg
FROM employees;

-- OVER (ORDER BY date): ordered window for running calculations
SELECT date, amount,
  SUM(amount) OVER (ORDER BY date) AS running_total
FROM transactions;

-- NTILE(n): divide rows into n equal buckets
SELECT name, salary,
  NTILE(4) OVER (ORDER BY salary) AS quartile
FROM employees;`,
        }
      ]
    },
    {
      title: 'Schema Design',
      items: [
        {
          label: 'CREATE TABLE with constraints',
          language: 'sql',
          code: `CREATE TABLE users (
  id          SERIAL PRIMARY KEY,
  email       VARCHAR(255) NOT NULL UNIQUE,
  name        VARCHAR(100) NOT NULL,
  age         INT CHECK (age >= 0 AND age <= 150),
  role        VARCHAR(20) NOT NULL DEFAULT 'user',
  active      BOOLEAN NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at  TIMESTAMPTZ
);`,
          note: 'SERIAL is PostgreSQL shorthand for an auto-incrementing integer. Use BIGSERIAL for tables expected to exceed 2 billion rows'
        },
        {
          label: 'Common data types',
          language: 'sql',
          code: `-- Integers
id    SERIAL           -- auto-increment int (PostgreSQL)
id    INT AUTO_INCREMENT -- MySQL
id    INTEGER          -- plain integer

-- Text
name  VARCHAR(255)     -- variable length with max
bio   TEXT             -- unlimited length

-- Numbers
price NUMERIC(10, 2)   -- exact decimal: 10 digits, 2 after point
score FLOAT            -- approximate floating point

-- Date and time
created_at  TIMESTAMP WITH TIME ZONE  -- timezone-aware (preferred)
birth_date  DATE
duration    INTERVAL                   -- PostgreSQL

-- Boolean and JSON
active  BOOLEAN
meta    JSONB    -- binary JSON in PostgreSQL (indexed, fast)`,
          note: 'Always use TIMESTAMPTZ (with timezone) instead of TIMESTAMP to avoid timezone bugs in multi-region apps'
        },
        {
          label: 'FOREIGN KEY',
          language: 'sql',
          code: `CREATE TABLE orders (
  id          SERIAL PRIMARY KEY,
  user_id     INT NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  status      VARCHAR(20) NOT NULL DEFAULT 'pending',
  total       NUMERIC(10, 2) NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ON DELETE options:
-- CASCADE:     delete child rows when parent is deleted
-- SET NULL:    set foreign key to NULL when parent is deleted
-- RESTRICT:    prevent parent deletion if children exist (default)
-- NO ACTION:   same as RESTRICT but checked at end of transaction`,
          note: 'Foreign keys enforce referential integrity at the database level - they prevent orphaned rows'
        },
        {
          label: 'ALTER TABLE',
          language: 'sql',
          code: `-- Add a column
ALTER TABLE users ADD COLUMN phone VARCHAR(20);

-- Add a column with a default
ALTER TABLE users ADD COLUMN verified BOOLEAN NOT NULL DEFAULT false;

-- Drop a column
ALTER TABLE users DROP COLUMN legacy_field;

-- Rename a column
ALTER TABLE users RENAME COLUMN username TO handle;

-- Change data type
ALTER TABLE products ALTER COLUMN price TYPE NUMERIC(12, 2);

-- Add a constraint
ALTER TABLE orders ADD CONSTRAINT chk_total CHECK (total >= 0);`,
          note: 'Some ALTER TABLE operations lock the table. Use tools like pg_repack or do migrations during low-traffic windows for large tables'
        },
        {
          label: 'Normalization patterns',
          language: 'sql',
          code: `-- Many-to-many: junction/pivot table
CREATE TABLE product_tags (
  product_id  INT NOT NULL REFERENCES products (id) ON DELETE CASCADE,
  tag_id      INT NOT NULL REFERENCES tags (id) ON DELETE CASCADE,
  PRIMARY KEY (product_id, tag_id)  -- composite primary key
);

-- Self-referential (tree structure)
CREATE TABLE categories (
  id        SERIAL PRIMARY KEY,
  name      VARCHAR(100) NOT NULL,
  parent_id INT REFERENCES categories (id)  -- null for root nodes
);`,
          note: 'Junction tables with composite primary keys prevent duplicate relationships between entities'
        },
        {
          label: 'Views and materialized views',
          language: 'sql',
          code: `-- View: virtual table computed on every access
CREATE VIEW active_users AS
SELECT id, name, email FROM users WHERE active = true AND deleted_at IS NULL;

SELECT * FROM active_users WHERE name LIKE 'A%';

-- Materialized view: result stored on disk, must be refreshed
CREATE MATERIALIZED VIEW monthly_revenue AS
SELECT
  DATE_TRUNC('month', created_at) AS month,
  SUM(total) AS revenue
FROM orders
WHERE status = 'completed'
GROUP BY 1;

REFRESH MATERIALIZED VIEW CONCURRENTLY monthly_revenue;`,
          note: 'Materialized views are ideal for expensive aggregations - refresh them on a schedule or after data changes'
        }
      ]
    }
  ]
}

export default sql

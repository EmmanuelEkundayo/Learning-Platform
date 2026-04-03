const databaseDesign = {
  id: 'database-design',
  title: 'Database Design',
  color: 'amber',
  category: 'Backend',
  description: 'Normalization, indexing, relationships, and architectural patterns for relational and NoSQL databases',
  sections: [
    {
      title: 'Normalization',
      items: [
        { label: '1NF - First Normal Form', language: 'text', code: `1. Atomic values (no multi-valued attributes)\n2. Unique column names\n3. Unique row order not required\n4. Each table has a primary key`, note: 'Avoid storing comma-separated lists in a single column' },
        { label: '2NF - Second Normal Form', language: 'text', code: `1. Meet all 1NF requirements\n2. No partial functional dependency\n3. Every non-key attribute depends on the ENTIRE primary key`, note: 'Applies to tables with composite primary keys' },
        { label: '3NF - Third Normal Form', language: 'text', code: `1. Meet all 2NF requirements\n2. No transitive functional dependency\n3. Non-key columns depend ONLY on the primary key, and nothing else`, note: 'Non-key columns should not depend on other non-key columns' },
        { label: 'Boyce-Codd Normal Form (BCNF)', language: 'text', code: `A stronger version of 3NF where every determinant is a candidate key` }
      ]
    },
    {
      title: 'Relationships',
      items: [
        { label: 'One-to-One (1:1)', language: 'sql', code: `-- Table users and users_profiles\n-- users_profiles has a unique foreign key to users.id`, note: 'Rare; often used for security or splitting large tables' },
        { label: 'One-to-Many (1:N)', language: 'sql', code: `-- Table orders and customers\n-- orders has a foreign key customer_id`, note: 'The most common relationship type' },
        { label: 'Many-to-Many (N:M)', language: 'sql', code: `-- Requires a junction/link table\n-- users <-> users_roles <-> roles`, note: 'The bridge table contains foreign keys to both parent tables' },
        { label: 'Self-referencing', language: 'sql', code: `-- Categories table with parent_id column\n-- parent_id references categories.id` }
      ]
    },
    {
      title: 'Key Constraints',
      items: [
        { label: 'Primary Key (PK)', language: 'sql', code: `id SERIAL PRIMARY KEY`, note: 'Uniquely identifies each row; cannot be NULL' },
        { label: 'Foreign Key (FK)', language: 'sql', code: `user_id INT REFERENCES users(id) ON DELETE CASCADE`, note: 'Maintains referential integrity between tables' },
        { label: 'Unique Constraint', language: 'sql', code: `CONSTRAINT email_unique UNIQUE(email)`, note: 'Ensures all values in a column are distinct' },
        { label: 'Check Constraint', language: 'sql', code: `CHECK (age >= 18)`, note: 'Ensures values meet a specific condition' }
      ]
    },
    {
      title: 'Indexing Strategies',
      items: [
        { label: 'B-Tree Index', language: 'sql', code: `CREATE INDEX idx_name ON users(name);`, note: 'Default index type; efficient for equality and range queries' },
        { label: 'Composite Index', language: 'sql', code: `CREATE INDEX idx_user_status ON orders(user_id, status);`, note: 'Useful for queries filtering on both columns; order matters (Leftmost Prefix Rule)' },
        { label: 'Covering Index', language: 'sql', code: `CREATE INDEX idx_covering ON users(id) INCLUDE (email);`, note: 'Returns the data directly from the index without a table heap fetch' },
        { label: 'Clustered Index', language: 'text', code: `Determines the physical order of data on the disk (one per table)` }
      ]
    },
    {
      title: 'ACID Properties',
      items: [
        { label: 'A - Atomicity', language: 'text', code: `"All or nothing" - transactions either complete fully or not at all` },
        { label: 'C - Consistency', language: 'text', code: `Transactions take the database from one valid state to another` },
        { label: 'I - Isolation', language: 'text', code: `Concurrent transactions do not interfere with each other` },
        { label: 'D - Durability', language: 'text', code: `Once a transaction is committed, it survives system crashes` }
      ]
    },
    {
      title: 'CAP Theorem',
      items: [
        { label: 'C - Consistency', language: 'text', code: `Every read receives the most recent write or an error` },
        { label: 'A - Availability', language: 'text', code: `Every request receives a non-error response` },
        { label: 'P - Partition Tolerance', language: 'text', code: `The system continues to operate despite nodes failing` },
        { label: 'The Rule', language: 'text', code: `Pick any two: CP, AP, or CA (though CA is rare in distributed systems)` }
      ]
    },
    {
      title: 'Scalability Patterns',
      items: [
        { label: 'Read Replicas', language: 'text', code: `Primary handles writes; replicas handle read traffic` },
        { label: 'Vertical Scaling', language: 'text', code: `Add more CPU/RAM to the existing server` },
        { label: 'Horizontal Partitioning (Sharding)', language: 'text', code: `Splitting data across multiple servers based on a shard key` },
        { label: 'Vertical Partitioning', language: 'text', code: `Splitting a single table into multiple tables with fewer columns` }
      ]
    },
    {
      title: 'Denormalization',
      items: [
        { label: 'Why Denormalize?', language: 'text', code: `Improving read performance by reducing joins in intensive read loads` },
        { label: 'Materialized Views', language: 'sql', code: `CREATE MATERIALIZED VIEW sales_summary AS ...`, note: 'Snapshots of a query that are persisted to disk' },
        { label: 'Computed Columns', language: 'sql', code: `total_price DECIMAL GENERATED ALWAYS AS (qty * price) STORED` }
      ]
    },
    {
      title: 'Naming Conventions',
      items: [
        { label: 'Snake Case', language: 'text', code: `user_profiles, created_at, order_id`, note: 'Standard for SQL databases' },
        { label: 'Plural vs Singular', language: 'text', code: `users (plural) or user (singular) - be consistent!`, note: 'Most frameworks (Rails, Django) prefer plural table names' },
        { label: 'Foreign Keys', language: 'text', code: `[singular_parent_table]_id (e.g., user_id)` }
      ]
    }
  ]
}

export default databaseDesign

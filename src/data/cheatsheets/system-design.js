const systemDesign = {
  id: 'system-design',
  title: 'System Design',
  color: 'amber',
  category: 'System Design',
  description: 'Scalability, caching, databases, CAP theorem, and common system blueprints',
  sections: [
    {
      title: 'Core Components',
      items: [
        {
          label: 'Load balancer',
          language: 'text',
          code: `Layer 4 (Transport): routes by IP/port, fast, no content inspection
Layer 7 (Application): routes by URL, headers, cookies, more flexible

Algorithms:
  Round Robin      - each server in turn
  Least Connections - send to least busy
  IP Hash          - same client always hits same server (sticky sessions)
  Weighted Round Robin - more traffic to beefier servers

Tools: Nginx, HAProxy, AWS ALB (L7), AWS NLB (L4)`,
          note: 'L7 load balancers can terminate TLS, inspect HTTP headers, and route by path or hostname'
        },
        {
          label: 'CDN (Content Delivery Network)',
          language: 'text',
          code: `Purpose: serve static assets from edge nodes close to the user

How it works:
  1. User requests /logo.png
  2. CDN edge checks its cache
  3. Cache HIT: return file instantly from edge
  4. Cache MISS: fetch from origin, cache it, return to user

Best for: images, CSS, JS bundles, fonts, video streams
Providers: Cloudflare, AWS CloudFront, Fastly, Akamai

Cache-Control: public, max-age=31536000, immutable`,
          note: 'Use content-hashed filenames (app.a1b2c3.js) so you can set long TTLs without stale file risk'
        },
        {
          label: 'Cache layer',
          language: 'text',
          code: `In-memory key-value stores sitting in front of the database

Redis:
  - Supports strings, hashes, lists, sets, sorted sets
  - Persistence (RDB snapshots, AOF logs)
  - Pub/sub, Lua scripting, transactions
  - Use for: sessions, rate limiting, leaderboards, queues

Memcached:
  - Simpler, pure cache, no persistence
  - Multi-threaded, slightly faster for plain get/set
  - Use when you only need simple string caching`,
          note: 'Redis is almost always preferred today because of its richer data structures and persistence options'
        },
        {
          label: 'Message queue',
          language: 'text',
          code: `Purpose: decouple services and handle async workloads

Producer  -->  Queue/Topic  -->  Consumer

Benefits:
  - Producer does not wait for consumer (async)
  - Absorbs traffic spikes (buffering)
  - Consumer can retry on failure
  - Easy fan-out to multiple consumers

Kafka: high throughput, persistent log, replay, partitions
RabbitMQ: flexible routing, exchanges, low latency
AWS SQS: managed, simple, at-least-once delivery
AWS SNS: fan-out pub/sub notifications`,
          note: 'Use queues whenever a task does not need to be completed synchronously within the HTTP request cycle'
        },
        {
          label: 'API gateway',
          language: 'text',
          code: `Single entry point for all client requests

Responsibilities:
  - Authentication / Authorization (JWT, OAuth)
  - Rate limiting and throttling
  - Request routing to microservices
  - SSL termination
  - Request/response transformation
  - Logging and monitoring

Tools: AWS API Gateway, Kong, Nginx, Envoy, Traefik`,
          note: 'Prevents each microservice from having to implement auth and rate limiting independently'
        },
        {
          label: 'Relational vs NoSQL databases',
          language: 'text',
          code: `Relational (SQL): PostgreSQL, MySQL
  - ACID guarantees
  - Structured schema, joins, foreign keys
  - Use when: data has clear relationships, strong consistency needed

Document (NoSQL): MongoDB, Firestore
  - Flexible schema, nested documents
  - Use when: schema evolves frequently, hierarchical data

Key-Value: Redis, DynamoDB
  - O(1) lookup by key
  - Use when: simple lookups, caching, sessions

Wide-Column: Cassandra, HBase
  - High write throughput, linear scale
  - Use when: time-series, IoT, write-heavy workloads`,
          note: 'Start with a relational database; switch to NoSQL only when you have a specific scaling or schema flexibility requirement'
        }
      ]
    },
    {
      title: 'Scalability Patterns',
      items: [
        {
          label: 'Horizontal vs vertical scaling',
          language: 'text',
          code: `Vertical scaling (scale up):
  - Replace server with a larger one (more CPU, RAM)
  - Simpler - no code changes
  - Hard ceiling: biggest machine available
  - Single point of failure

Horizontal scaling (scale out):
  - Add more servers, distribute load
  - Theoretically unlimited
  - Requires stateless application design
  - Needs load balancer in front`,
          note: 'Prefer horizontal scaling for web/app tiers; vertical scaling is fine for databases up to a point'
        },
        {
          label: 'Stateless application design',
          language: 'text',
          code: `Stateless: no session data stored on the server itself

Store state externally instead:
  - Sessions: Redis / database
  - Uploaded files: S3 / object storage
  - User preferences: database

Result: any server can handle any request
  - Load balancer can route freely
  - Rolling deploys are safe
  - Auto-scaling adds/removes servers freely`,
          note: 'If your app stores anything in memory that a second server would not have, it is stateful and cannot scale horizontally without sticky sessions'
        },
        {
          label: 'Database read replicas',
          language: 'text',
          code: `Primary (write) --> Replica 1 (read)
                 --> Replica 2 (read)
                 --> Replica 3 (read)

Reads go to replicas, writes go to primary
Replication is asynchronous - slight lag possible

Use when:
  - Read traffic far exceeds write traffic
  - Reports / analytics queries are slow
  - Offload backups to a replica

Replication lag: replicas may be milliseconds behind primary`,
          note: 'Route reporting and analytics queries to replicas to protect the primary for transactional writes'
        },
        {
          label: 'Sharding (horizontal partitioning)',
          language: 'text',
          code: `Split data across multiple database servers by a shard key

Example: user_id % 4
  Shard 0: user_ids 0, 4, 8, 12 ...
  Shard 1: user_ids 1, 5, 9, 13 ...
  Shard 2: user_ids 2, 6, 10, 14 ...
  Shard 3: user_ids 3, 7, 11, 15 ...

Shard key choices:
  - User ID: good if queries are per-user
  - Geographic region: good for global apps
  - Hash of ID: even distribution

Challenges: cross-shard joins are expensive, resharding is painful`,
          note: 'Choose a shard key that distributes load evenly and aligns with your most common query pattern'
        },
        {
          label: 'Auto-scaling rules',
          language: 'text',
          code: `Trigger scale-out when:
  - CPU > 70% for 5 minutes
  - Memory > 80%
  - Request queue depth > 100
  - Response latency p99 > 500ms

Trigger scale-in when:
  - CPU < 30% for 15 minutes (longer threshold to avoid flapping)

Cooldown period: 300 seconds between scaling events

AWS: EC2 Auto Scaling Groups with CloudWatch alarms
GCP: Managed Instance Groups with autoscaler
k8s: Horizontal Pod Autoscaler (HPA)`,
          note: 'Scale-in thresholds should be more conservative than scale-out thresholds to avoid thrashing'
        },
        {
          label: 'Consistent hashing',
          language: 'text',
          code: `Problem: adding/removing servers invalidates all shard assignments

Solution: arrange servers on a virtual ring (0 to 2^32)
  - Each server occupies a point on the ring
  - Each key hashes to a point on the ring
  - Key is served by the next server clockwise

Adding a server: only the keys between old and new server move
Removing a server: only that server's keys redistribute

Used in: Cassandra, DynamoDB, Memcached clusters`,
          note: 'Virtual nodes (vnodes) give each physical server multiple ring positions for more even distribution'
        },
        {
          label: 'Partitioning strategies',
          language: 'text',
          code: `Range partitioning:
  - Partition by value range (A-M on shard 1, N-Z on shard 2)
  - Easy range scans, but hotspots if data not uniform

Hash partitioning:
  - hash(key) % N determines partition
  - Even distribution, but no range scan support

List partitioning:
  - Explicit mapping (US -> shard 1, EU -> shard 2)
  - Good for geographic or categorical data

Composite partitioning:
  - Combine two strategies (range then hash within each range)`,
        }
      ]
    },
    {
      title: 'Caching Strategies',
      items: [
        {
          label: 'Cache-aside (lazy loading)',
          language: 'javascript',
          code: `async function getUser(userId) {
  // 1. Check cache first
  const cached = await redis.get(\`user:\${userId}\`)
  if (cached) return JSON.parse(cached)

  // 2. Cache miss - fetch from database
  const user = await db.query('SELECT * FROM users WHERE id = ?', [userId])

  // 3. Populate cache for next request
  await redis.setex(\`user:\${userId}\`, 3600, JSON.stringify(user))

  return user
}`,
          note: 'Most common pattern. Cache only gets populated on a miss, so cold start has no cache data'
        },
        {
          label: 'Write-through cache',
          language: 'javascript',
          code: `async function updateUser(userId, data) {
  // Write to database AND cache together in the same operation
  const user = await db.query(
    'UPDATE users SET name = ? WHERE id = ? RETURNING *',
    [data.name, userId]
  )

  // Immediately update cache - cache is never stale
  await redis.setex(\`user:\${userId}\`, 3600, JSON.stringify(user))

  return user
}`,
          note: 'Cache is always consistent with the database. Write latency increases slightly because both writes happen synchronously'
        },
        {
          label: 'Write-behind (write-back) cache',
          language: 'javascript',
          code: `async function updateUser(userId, data) {
  // 1. Write to cache immediately (fast response to client)
  await redis.setex(\`user:\${userId}\`, 3600, JSON.stringify(data))

  // 2. Queue async write to database - do not await
  writeQueue.push({ userId, data, timestamp: Date.now() })

  return data
}

// Background worker flushes queue to DB every 100ms
setInterval(async () => {
  const batch = writeQueue.splice(0, 100)
  if (batch.length) await db.batchUpdate(batch)
}, 100)`,
          note: 'Fastest writes, but risk of data loss if cache goes down before the async DB write completes'
        },
        {
          label: 'TTL and eviction policies',
          language: 'text',
          code: `TTL (Time To Live): auto-expire keys after N seconds
  redis.setex('key', 3600, value)  // expires in 1 hour

Eviction policies (when Redis memory is full):
  noeviction     - return error on write (default)
  allkeys-lru    - evict least recently used key (most common)
  allkeys-lfu    - evict least frequently used
  allkeys-random - evict random key
  volatile-lru   - LRU only among keys with TTL set
  volatile-ttl   - evict key with shortest TTL first

Set in redis.conf:
  maxmemory 256mb
  maxmemory-policy allkeys-lru`,
          note: 'allkeys-lru is the most common production choice - it works as a true cache, evicting cold data automatically'
        },
        {
          label: 'Cache stampede (thundering herd) prevention',
          language: 'javascript',
          code: `// Problem: 1000 requests all miss cache at the same time
// All 1000 hit the database simultaneously

// Solution 1: Mutex lock - only one request rebuilds the cache
async function getWithLock(key, fetchFn, ttl) {
  const cached = await redis.get(key)
  if (cached) return JSON.parse(cached)

  const lockKey = \`lock:\${key}\`
  const lock = await redis.set(lockKey, '1', 'NX', 'EX', 10)

  if (lock) {
    const data = await fetchFn()
    await redis.setex(key, ttl, JSON.stringify(data))
    await redis.del(lockKey)
    return data
  }

  // Another request holds the lock - wait and retry
  await sleep(50)
  return getWithLock(key, fetchFn, ttl)
}

// Solution 2: Probabilistic early expiration - refresh before TTL hits`,
          note: 'Cache stampede is especially dangerous for high-traffic keys like homepage data or trending content'
        },
        {
          label: 'Cache invalidation strategies',
          language: 'text',
          code: `Time-based (TTL):
  - Key expires automatically after N seconds
  - Simple but may serve stale data up to TTL duration

Event-based:
  - Explicitly delete or update cache when data changes
  - redis.del('user:123') after UPDATE users SET ...
  - Accurate but requires careful coordination

Tag-based:
  - Group related keys under a tag
  - Invalidate all keys under a tag at once
  - Example: invalidate all 'product-listing' tagged keys on product update

Versioning:
  - Include version in key: 'user:123:v5'
  - Bump version on change - old keys expire naturally`,
          note: '"There are only two hard things in Computer Science: cache invalidation and naming things" - Phil Karlton'
        }
      ]
    },
    {
      title: 'Database Selection',
      items: [
        {
          label: 'PostgreSQL - relational ACID',
          language: 'text',
          code: `Best for:
  - Complex relational data with joins
  - Financial transactions requiring ACID
  - Applications needing strong consistency
  - Rich querying with JSON support (JSONB)

Features: foreign keys, triggers, full-text search, window functions,
          CTEs, partial indexes, JSONB, PostGIS for geospatial

When to use: e-commerce, banking, ERP, most web apps

Avoid when: write throughput > ~10k writes/sec on a single node,
            schema is truly dynamic and unpredictable`,
        },
        {
          label: 'MongoDB - document store',
          language: 'text',
          code: `Best for:
  - Flexible or evolving schemas
  - Hierarchical / nested data (no joins needed)
  - Rapid prototyping
  - Content management systems, catalogs

Data model: BSON documents in collections
  {
    _id: ObjectId("..."),
    name: "Alice",
    address: { city: "NYC", zip: "10001" },
    tags: ["admin", "user"]
  }

When to use: CMS, product catalogs, user profiles, event logging
Avoid when: data has many relationships requiring joins`,
        },
        {
          label: 'Redis - in-memory data store',
          language: 'text',
          code: `Best for:
  - Caching (session store, page cache, query cache)
  - Real-time leaderboards (sorted sets)
  - Rate limiting (atomic increment with TTL)
  - Pub/sub messaging
  - Distributed locks

Data structures: string, list, set, sorted set, hash, stream

// Rate limiting example
const count = await redis.incr('rate:user:123')
await redis.expire('rate:user:123', 60)
if (count > 100) throw new Error('Rate limit exceeded')`,
          note: 'Redis data lives in RAM - fast but limited by memory. Use Redis as a cache/accelerator, not a primary data store'
        },
        {
          label: 'Cassandra - wide-column store',
          language: 'text',
          code: `Best for:
  - Very high write throughput (100k+ writes/sec)
  - Time-series data (IoT, metrics, logs)
  - Globally distributed, multi-region writes
  - No single point of failure required

Architecture: masterless ring, consistent hashing
Replication: configurable replication factor per datacenter
Consistency: tunable (ONE, QUORUM, ALL) per query

CREATE TABLE metrics (
  sensor_id uuid,
  timestamp timestamp,
  value double,
  PRIMARY KEY (sensor_id, timestamp)
) WITH CLUSTERING ORDER BY (timestamp DESC);

Avoid when: you need ACID transactions or complex joins`,
          note: 'Cassandra schema design is query-driven - model your tables around the queries you will run, not the entity relationships'
        },
        {
          label: 'Elasticsearch - search engine',
          language: 'text',
          code: `Best for:
  - Full-text search with ranking and relevance
  - Log aggregation and analytics (ELK stack)
  - Autocomplete and faceted search
  - Geospatial search

// Index a document
PUT /products/_doc/1
{ "name": "iPhone 15", "description": "Apple smartphone", "price": 999 }

// Full-text search
GET /products/_search
{ "query": { "match": { "description": "apple smartphone" } } }

// Aggregation
GET /logs/_search
{ "aggs": { "errors_per_hour": { "date_histogram": { "field": "@timestamp", "interval": "hour" } } } }`,
          note: 'Elasticsearch is eventually consistent and not suitable as a primary database - sync from PostgreSQL or MongoDB'
        },
        {
          label: 'Neo4j - graph database',
          language: 'text',
          code: `Best for:
  - Highly connected data where relationships are first-class
  - Social networks (friends of friends)
  - Recommendation engines
  - Fraud detection (connected transaction patterns)
  - Knowledge graphs

Query language: Cypher

// Find friends of Alice who like the same movies as Alice
MATCH (alice:User {name: 'Alice'})-[:FRIEND]->(friend)
MATCH (friend)-[:LIKES]->(movie)<-[:LIKES]-(alice)
RETURN friend.name, collect(movie.title) AS shared_movies

When to use: social graphs, routing, dependency graphs
Avoid when: data is tabular and relationships are secondary`,
          note: 'Graph traversal queries that would require many expensive JOINs in SQL are simple and fast in Neo4j'
        }
      ]
    },
    {
      title: 'URL Shortener Design',
      items: [
        {
          label: 'Requirements and capacity estimation',
          language: 'text',
          code: `Functional requirements:
  - POST /shorten   - accept long URL, return short code
  - GET /{code}     - redirect to original URL
  - GET /{code}/stats - view click analytics

Non-functional:
  - 100M URLs created per day
  - 10:1 read/write ratio -> 1B redirects per day
  - URLs stored for 5 years
  - Redirect latency < 10ms

Capacity:
  Write QPS: 100M / 86400 = ~1160 writes/sec
  Read QPS: ~11,600 reads/sec
  Storage: 100M * 365 * 5 * 500 bytes = ~90 TB over 5 years`,
        },
        {
          label: 'Short code generation',
          language: 'javascript',
          code: `// Base62 encoding: 0-9, a-z, A-Z (62 chars)
// 6 chars = 62^6 = ~56 billion unique codes

const BASE62 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

function toBase62(num) {
  let result = ''
  while (num > 0) {
    result = BASE62[num % 62] + result
    num = Math.floor(num / 62)
  }
  return result.padStart(6, '0')
}

// Option A: auto-increment ID from DB, encode to base62
// Option B: MD5/SHA256 hash of long URL, take first 6 chars (collision risk)
// Option C: random 6-char string (check uniqueness in DB)

// Option A is preferred: no collision, predictable, sortable`,
          note: 'Auto-increment ID from a database or distributed ID generator (Snowflake) is the most reliable approach'
        },
        {
          label: 'Data store for short code lookup',
          language: 'text',
          code: `Primary store: key-value database
  Key: short_code (e.g. "aB3kZ9")
  Value: original_url + metadata (created_at, user_id, expiry)

Options:
  DynamoDB: managed, auto-scaling, single-digit ms reads
  Redis: sub-millisecond for hot URLs (use as cache layer)
  PostgreSQL: fine at moderate scale with index on short_code

Schema (if using relational DB):
  CREATE TABLE urls (
    id          BIGSERIAL PRIMARY KEY,
    short_code  VARCHAR(8)   UNIQUE NOT NULL,
    long_url    TEXT         NOT NULL,
    user_id     BIGINT,
    created_at  TIMESTAMP    DEFAULT NOW(),
    expires_at  TIMESTAMP,
    click_count BIGINT       DEFAULT 0
  );
  CREATE INDEX idx_short_code ON urls (short_code);`,
        },
        {
          label: 'Caching hot URLs',
          language: 'text',
          code: `Cache layer: Redis in front of the database

On redirect request:
  1. Check Redis: GET short_code
  2. HIT: return URL immediately (< 1ms)
  3. MISS: query database, write to Redis with TTL, return URL

Cache key: short_code
Cache value: long_url (just the URL, small payload)
TTL: 24 hours (or based on access frequency)

Eviction policy: allkeys-lru
  - Hot URLs stay in cache
  - Cold URLs get evicted automatically

Estimated cache size:
  20% of URLs get 80% of traffic (Pareto principle)
  Cache the top 20% = 20M URLs * 500 bytes = 10 GB RAM`,
          note: 'A small Redis cache can absorb the vast majority of redirect traffic, keeping database load minimal'
        },
        {
          label: 'Analytics event stream',
          language: 'text',
          code: `Problem: updating click_count on every redirect = write hotspot

Solution: async analytics pipeline

On redirect:
  1. Return redirect immediately (do not wait for analytics)
  2. Publish event to Kafka asynchronously:
     { short_code, timestamp, ip, user_agent, referer }

Analytics consumer (separate service):
  1. Consumes Kafka topic
  2. Batches events and writes to analytics DB (Cassandra or BigQuery)
  3. Aggregates: clicks per hour, geo distribution, device breakdown

Benefits:
  - Redirect path stays < 10ms (no analytics write in critical path)
  - Analytics can be replayed from Kafka log
  - Analytics DB can be queried independently`,
        },
        {
          label: 'Custom aliases and expiry',
          language: 'javascript',
          code: `// POST /shorten
// Body: { long_url, custom_alias?, expires_in_days? }

async function shortenUrl(longUrl, customAlias, expiresInDays) {
  const shortCode = customAlias || toBase62(await getNextId())

  // Check uniqueness if custom alias
  if (customAlias) {
    const existing = await db.get('SELECT id FROM urls WHERE short_code = ?', [customAlias])
    if (existing) throw new Error('Alias already taken')
  }

  const expiresAt = expiresInDays
    ? new Date(Date.now() + expiresInDays * 86400 * 1000)
    : null

  await db.run(
    'INSERT INTO urls (short_code, long_url, expires_at) VALUES (?, ?, ?)',
    [shortCode, longUrl, expiresAt]
  )

  return \`https://short.ly/\${shortCode}\`
}`,
        }
      ]
    },
    {
      title: 'CAP Theorem',
      items: [
        {
          label: 'The three properties',
          language: 'text',
          code: `Consistency (C):
  Every read receives the most recent write or an error.
  All nodes in the cluster see the same data at the same time.

Availability (A):
  Every request receives a response (not an error),
  but the response might not contain the most recent write.

Partition Tolerance (P):
  The system continues operating even when network messages
  between nodes are dropped or delayed.

CAP theorem: in the presence of a network partition,
you can guarantee EITHER Consistency OR Availability, but NOT both.

Note: Partition tolerance is not optional in distributed systems -
network partitions happen. So the real choice is C vs A during a partition.`,
          note: 'The CAP theorem applies specifically during a network partition. When the network is healthy, most systems provide both C and A'
        },
        {
          label: 'CP systems - choose consistency',
          language: 'text',
          code: `CP systems: will refuse requests (return error) rather than
            return potentially stale data during a partition

Examples:
  Zookeeper   - distributed coordination, leader election
  HBase       - Hadoop database, strong consistency
  MongoDB     - with majority write concern
  Redis       - in single-primary mode
  etcd        - Kubernetes configuration store

When to choose CP:
  - Financial transactions (balances must be accurate)
  - Inventory systems (cannot oversell)
  - Leader election (only one node can be leader)
  - Any system where incorrect data is worse than no data`,
        },
        {
          label: 'AP systems - choose availability',
          language: 'text',
          code: `AP systems: will always return a response, but it might be
            slightly out of date during a network partition

Examples:
  DynamoDB    - eventual consistency by default
  Cassandra   - tunable consistency, AP by default
  CouchDB     - multi-master replication
  DNS         - propagation delay is acceptable

When to choose AP:
  - Social media feeds (slight staleness is fine)
  - Shopping product catalog (showing slightly old price is OK)
  - DNS resolution
  - Any system where availability is more important than perfect accuracy

Eventual consistency: given no new writes, all nodes will
eventually converge to the same value`,
          note: 'Many AP systems offer tunable consistency - you can request stronger consistency per query at the cost of latency'
        },
        {
          label: 'PACELC extension to CAP',
          language: 'text',
          code: `CAP only describes behavior during Partitions.
PACELC also describes the Latency vs Consistency tradeoff when no partition exists.

PACELC: if Partition (PA or PC), else Latency vs Consistency (EL or EC)

Examples:
  DynamoDB: PA/EL - available during partition, low latency otherwise
  Zookeeper: PC/EC - consistent during partition, consistent otherwise
  Cassandra: PA/EL by default, tunable per query
  MongoDB: PC/EC with majority write concern

Real world: even without partitions, a distributed system must
decide whether to wait for all replicas (higher consistency, higher latency)
or respond after one replica (lower latency, possible stale read)`,
        },
        {
          label: 'Consistency models spectrum',
          language: 'text',
          code: `Strongest to weakest:

Linearizability (strict consistency):
  - Operations appear instantaneous and globally ordered
  - Slowest, most expensive

Sequential consistency:
  - All nodes see operations in the same order
  - Order may not match real time

Causal consistency:
  - Operations that are causally related are seen in order
  - Concurrent operations may be seen in different orders

Eventual consistency:
  - Given no new writes, all nodes will converge
  - Fastest, most available
  - Used by DNS, shopping carts, social feeds`,
        },
        {
          label: 'Conflict resolution in AP systems',
          language: 'text',
          code: `When two nodes accept conflicting writes during a partition,
how do you resolve the conflict on merge?

Last Write Wins (LWW):
  - Keep the write with the latest timestamp
  - Simple but can lose data if clocks are skewed

Vector clocks:
  - Track causality with per-node counters
  - Detect true conflicts vs sequential updates
  - Used by DynamoDB, Riak

CRDTs (Conflict-free Replicated Data Types):
  - Data structures designed to merge without conflicts
  - G-Counter: increment-only counter, merge = take max per node
  - LWW-Register, OR-Set, etc.
  - Used by Redis CRDT enterprise, Figma multiplayer

Application-level merge:
  - Expose conflict to the application to resolve (CouchDB approach)`,
          note: 'Shopping carts use CRDT-style merging: during a partition, both carts accept adds, and on merge, union the items'
        }
      ]
    },
    {
      title: 'Estimation Cheatsheet',
      items: [
        {
          label: 'Storage units',
          language: 'text',
          code: `1 KB  = 10^3  bytes  = 1,000 bytes
1 MB  = 10^6  bytes  = 1,000 KB
1 GB  = 10^9  bytes  = 1,000 MB
1 TB  = 10^12 bytes  = 1,000 GB
1 PB  = 10^15 bytes  = 1,000 TB

Binary equivalents (what RAM/OS reports):
1 KiB = 2^10 = 1,024 bytes
1 MiB = 2^20 = 1,048,576 bytes
1 GiB = 2^30 = 1,073,741,824 bytes

For back-of-envelope: use powers of 10 (close enough)

Common sizes:
  ASCII char: 1 byte
  Unicode char: 2-4 bytes (UTF-8)
  UUID: 16 bytes (binary) / 36 bytes (string)
  Average tweet: ~300 bytes
  Average user profile: ~1 KB
  Average photo (compressed): ~300 KB
  1 minute of HD video: ~100 MB`,
        },
        {
          label: 'Latency reference numbers',
          language: 'text',
          code: `L1 cache reference:          1 ns
Branch misprediction:        5 ns
L2 cache reference:          7 ns
Mutex lock/unlock:          25 ns
Main memory (RAM) access:  100 ns
Compress 1KB with Snappy:   10 us   (10,000 ns)
Read 1MB from RAM:          250 us
SSD random read:            100 us
Read 1MB from SSD:          1 ms    (1,000 us)
Round trip in same DC:      500 us
Round trip CA to Netherlands: 150 ms
Read 1MB from HDD:          20 ms
HDD seek:                   10 ms

Key takeaways:
  RAM is 1000x faster than SSD
  SSD is 100x faster than HDD
  Same-DC network is 500us, cross-continent is 150ms`,
          note: 'These numbers are from Jeff Dean / Peter Norvig. Memorize the order of magnitude, not exact values'
        },
        {
          label: 'QPS estimation formula',
          language: 'text',
          code: `QPS = (Daily Active Users * Actions per day) / Seconds per day

Seconds per day: 86,400 (round to 10^5 = 100,000)

Examples:

Twitter-like feed:
  500M DAU * 10 reads/day / 100,000 = 50,000 QPS reads
  500M DAU * 1 tweet/day  / 100,000 = 5,000 QPS writes

URL shortener:
  100M URLs/day (writes) / 100,000 = 1,000 writes/sec
  10:1 read ratio -> 10,000 reads/sec

Instagram photos:
  1B DAU * 2 uploads/day / 100,000 = 20,000 uploads/sec

Peak QPS:
  Assume peak is 2-3x average QPS
  Design your system to handle peak load`,
          note: 'Interviewers want to see you reason through the numbers, not memorize them. Show your work step by step'
        },
        {
          label: 'Storage estimation formula',
          language: 'text',
          code: `Storage = Users * Data per user * Retention period

Examples:

Twitter messages (5 years):
  500M users * 10 tweets/day * 300 bytes * 365 days * 5 years
  = 500M * 10 * 300 * 1825
  = 2.7 * 10^15 bytes = ~2.7 PB

User profiles:
  1B users * 1 KB/profile = 1 TB

YouTube videos (new uploads per day):
  500 hours of video uploaded per minute
  = 500 * 60 minutes/hour * 100 MB/minute
  = 3,000,000 MB = 3 TB per hour of new video
  = 72 TB per day (before compression and encoding)`,
        },
        {
          label: 'Bandwidth estimation',
          language: 'text',
          code: `Bandwidth = QPS * Average response size

Examples:

Read-heavy API (JSON responses ~10 KB):
  10,000 QPS * 10 KB = 100 MB/s = 800 Mbps

Video streaming (5 Mbps per stream):
  100,000 concurrent viewers * 5 Mbps = 500 Gbps

Image serving (100 KB per image):
  50,000 QPS * 100 KB = 5 GB/s = 40 Gbps

Note: 1 Gbps NIC handles ~125 MB/s
      10 Gbps NIC handles ~1.25 GB/s
      CDN can handle Tbps across edge nodes`,
        },
        {
          label: 'Common traffic patterns',
          language: 'text',
          code: `DAU to QPS conversion table:

1M DAU,   10 req/day = 115 QPS
10M DAU,  10 req/day = 1,157 QPS     (~1K)
100M DAU, 10 req/day = 11,574 QPS    (~10K)
1B DAU,   10 req/day = 115,740 QPS   (~100K)

Single server limits (rough):
  Web server (Nginx):   ~10,000 req/sec
  App server (Node.js): ~1,000-5,000 req/sec
  PostgreSQL:           ~5,000-10,000 queries/sec
  Redis:                ~100,000 ops/sec
  Kafka:                ~1,000,000 messages/sec`,
          note: 'These are ballpark figures - actual numbers depend heavily on query complexity, payload size, and hardware'
        }
      ]
    },
    {
      title: 'API Design Patterns',
      items: [
        {
          label: 'REST API conventions',
          language: 'text',
          code: `Resources as nouns, HTTP verbs for actions:

GET    /users           - list users
GET    /users/123       - get user 123
POST   /users           - create a user
PUT    /users/123       - replace user 123 entirely
PATCH  /users/123       - partially update user 123
DELETE /users/123       - delete user 123

Nested resources:
GET    /users/123/posts - posts belonging to user 123
POST   /users/123/posts - create post for user 123

Status codes:
  200 OK, 201 Created, 204 No Content
  400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found
  409 Conflict, 422 Unprocessable Entity
  500 Internal Server Error, 503 Service Unavailable`,
        },
        {
          label: 'GraphQL',
          language: 'javascript',
          code: `// Single endpoint: POST /graphql

// Query (read)
query {
  user(id: "123") {
    name
    email
    posts(limit: 5) {
      title
      createdAt
    }
  }
}

// Mutation (write)
mutation {
  createPost(input: { title: "Hello", body: "World", userId: "123" }) {
    id
    title
    createdAt
  }
}

// Benefits: no over-fetching, no under-fetching, self-documenting schema
// Tradeoffs: caching harder (POST requests), N+1 query problem, complexity`,
          note: 'Use GraphQL when clients need flexible data shapes, like a mobile app needing fewer fields than a desktop app'
        },
        {
          label: 'gRPC',
          language: 'text',
          code: `Protocol: HTTP/2 with Protocol Buffers (binary, compact)

// service definition in .proto file
syntax = "proto3";

service UserService {
  rpc GetUser (GetUserRequest) returns (User);
  rpc ListUsers (ListUsersRequest) returns (stream User);  // server streaming
  rpc CreateUsers (stream CreateUserRequest) returns (Summary);  // client streaming
  rpc Chat (stream Message) returns (stream Message);  // bidirectional streaming
}

message GetUserRequest { string user_id = 1; }
message User { string id = 1; string name = 2; string email = 3; }

Advantages:
  - 5-10x smaller payload than JSON
  - Code generation for client/server in many languages
  - Streaming support built-in

Best for: internal microservice-to-microservice communication`,
          note: 'gRPC is excellent for internal services but browser support requires grpc-web proxy. Use REST or GraphQL for public APIs'
        },
        {
          label: 'API versioning strategies',
          language: 'text',
          code: `Option 1: URL path versioning (most common)
  GET /v1/users/123
  GET /v2/users/123

  Pros: explicit, easy to route, easy to test
  Cons: URL is not a pure resource identifier

Option 2: Query parameter
  GET /users/123?version=2
  Pros: easy to test in browser
  Cons: easy to forget, pollutes URLs

Option 3: Header versioning
  GET /users/123
  Accept: application/vnd.myapi.v2+json
  Pros: clean URLs
  Cons: harder to test, not visible in browser

Option 4: Hostname
  v1.api.example.com/users/123
  v2.api.example.com/users/123

Recommendation: URL path versioning for public APIs`,
          note: 'Never remove a version without a deprecation period and migration guide. Breaking changes are a trust issue'
        },
        {
          label: 'Pagination patterns',
          language: 'text',
          code: `Offset pagination:
  GET /posts?offset=20&limit=10
  Simple, but slow on large offsets (DB scans all rows)
  Results shift if items are added/deleted during pagination

Cursor-based pagination (recommended for feeds):
  GET /posts?cursor=eyJpZCI6MjB9&limit=10
  cursor is an encoded pointer to the last item seen

  Response: { data: [...], next_cursor: "eyJpZCI6MzB9", has_more: true }

  Advantages:
    - Consistent results even if data changes between pages
    - O(log n) instead of O(offset) - uses index seek
    - Works with real-time feeds

Keyset pagination:
  GET /posts?after_id=20&limit=10
  WHERE id > 20 ORDER BY id LIMIT 10
  Similar to cursor but key is explicit`,
          note: 'Use cursor-based pagination for any feed with frequent writes. Offset pagination is fine for admin tables with low write volume'
        },
        {
          label: 'Rate limiting',
          language: 'javascript',
          code: `// Fixed window: count requests per time window
// Problem: burst at window boundary (99 req at 11:59 + 99 req at 12:00 = 198 in 2 seconds)

// Sliding window log: store timestamp of each request
// Accurate but memory-intensive

// Token bucket (recommended):
// Bucket holds N tokens. Each request consumes 1 token.
// Tokens refill at a fixed rate. Allows burst up to bucket size.

// Redis implementation:
async function checkRateLimit(userId, limit, windowSec) {
  const key = \`ratelimit:\${userId}\`
  const count = await redis.incr(key)
  if (count === 1) await redis.expire(key, windowSec)
  if (count > limit) {
    throw new Error(\`Rate limit: \${limit} requests per \${windowSec}s\`)
  }
  return { remaining: limit - count, limit }
}

// Response headers (standard):
// X-RateLimit-Limit: 100
// X-RateLimit-Remaining: 45
// X-RateLimit-Reset: 1680000000`,
        }
      ]
    },
    {
      title: 'Message Queue Patterns',
      items: [
        {
          label: 'When to use a message queue',
          language: 'text',
          code: `Use a queue when:

1. Async processing: user action can complete before the work finishes
   - Send welcome email after signup (do not block HTTP response)
   - Resize image after upload
   - Generate PDF report

2. Decoupling services: producer does not need to know about consumers
   - Order service publishes "order.placed" event
   - Inventory, email, and analytics services each consume independently

3. Traffic spike buffering: queue absorbs bursts
   - Black Friday: 100x normal order volume
   - Queue smooths the spike, workers process at sustainable rate

4. Retry and reliability: failed jobs can be retried
   - Dead letter queue for messages that fail repeatedly`,
        },
        {
          label: 'Kafka architecture',
          language: 'text',
          code: `Core concepts:

Topic: named log of messages (like a table in a DB)
Partition: topic is split into partitions for parallelism
  - messages within a partition are ordered
  - partitions are distributed across brokers

Producer: writes messages to a topic partition
  - can specify partition key (same key -> same partition)

Consumer Group: group of consumers sharing a topic
  - each partition is consumed by exactly one consumer per group
  - add consumers to scale up (up to # of partitions)

Offset: position of a consumer in a partition log
  - consumers commit offsets to track progress
  - can replay from any offset

Retention: messages kept for N days (default 7)
  - consumers can re-read historical messages`,
          note: 'Kafka partition count is a key design decision - you cannot reduce partitions after creation, and more partitions enable more consumer parallelism'
        },
        {
          label: 'RabbitMQ exchanges and queues',
          language: 'text',
          code: `Architecture: Producer -> Exchange -> Queue -> Consumer

Exchange types:
  Direct:  route by exact routing key
    exchange.publish('user.created', message)
    queue bound to 'user.created' receives it

  Topic:   route by pattern matching
    queue bound to 'user.*' receives user.created, user.deleted
    queue bound to '#' receives everything

  Fanout:  broadcast to all bound queues
    one message -> all queues (pub/sub)

  Headers: route by message header attributes

Queue options:
  durable: survive broker restart
  exclusive: only one consumer
  auto-delete: delete when last consumer disconnects
  dead-letter-exchange: where failed messages go`,
        },
        {
          label: 'Work queue pattern',
          language: 'javascript',
          code: `// Work queue: distribute tasks among multiple workers
// Each task processed by exactly one worker

// Producer - web server
async function onImageUpload(imageId) {
  await channel.sendToQueue(
    'image-resize',
    Buffer.from(JSON.stringify({ imageId })),
    { persistent: true }  // survive broker restart
  )
}

// Worker (multiple instances can run in parallel)
channel.consume('image-resize', async (msg) => {
  const { imageId } = JSON.parse(msg.content.toString())
  try {
    await resizeImage(imageId)
    channel.ack(msg)  // mark as done
  } catch (err) {
    channel.nack(msg, false, true)  // requeue on failure
  }
}, { noAck: false })  // manual acknowledgment`,
          note: 'Always use manual acknowledgment (noAck: false). Auto-ack drops the message even if the worker crashes mid-processing'
        },
        {
          label: 'Pub/Sub and fan-out pattern',
          language: 'text',
          code: `Pub/Sub: one message delivered to ALL subscribers

Use case: "order.placed" event consumed by multiple services

                    +-> EmailService (send confirmation)
Order Service ----> +-> InventoryService (decrement stock)
(publisher)         +-> AnalyticsService (record conversion)
                    +-> FraudService (check for fraud)

Each service has its own queue bound to the same topic/exchange
Each service processes independently, can scale independently
Failure of one consumer does not affect others

In Kafka: multiple consumer groups subscribe to same topic
In RabbitMQ: fanout exchange with multiple queues bound
In AWS: SNS topic with multiple SQS queues subscribed`,
          note: 'Fan-out is more reliable than direct service calls because the publisher does not wait for or depend on any consumer'
        },
        {
          label: 'Dead letter queue and retry strategy',
          language: 'text',
          code: `Dead Letter Queue (DLQ): where failed messages go after max retries

Retry strategy with exponential backoff:
  Attempt 1: process immediately
  Attempt 2: wait 30 seconds
  Attempt 3: wait 5 minutes
  Attempt 4: wait 30 minutes
  Attempt 5: move to DLQ

DLQ handling:
  - Alert on-call when messages arrive in DLQ
  - Inspect message to understand failure cause
  - Fix the bug, then replay DLQ messages

AWS SQS:
  - Set VisibilityTimeout for processing time
  - Set MaxReceiveCount (e.g. 5) then route to DLQ
  - DLQ is just another SQS queue

Idempotency: consumers must handle duplicate delivery
  - At-least-once delivery is common (Kafka, SQS)
  - Store processed message IDs to deduplicate`,
          note: 'Design every message consumer to be idempotent - processing the same message twice should produce the same result as processing it once'
        }
      ]
    },
    {
      title: 'Monitoring and Reliability',
      items: [
        {
          label: 'SLI, SLO, and SLA',
          language: 'text',
          code: `SLI (Service Level Indicator): a measured metric
  - "Our API success rate over the last 30 days was 99.5%"
  - "Our p99 latency over the last hour was 320ms"
  - Measured by your monitoring system (Datadog, Prometheus)

SLO (Service Level Objective): your internal target
  - "We aim for 99.9% availability per month"
  - "We aim for p99 latency < 500ms"
  - Internal goal. If SLI misses SLO, the team has an incident.

SLA (Service Level Agreement): contractual commitment to customers
  - "We guarantee 99.9% uptime per month or you get a refund"
  - SLA should be less aggressive than SLO to give buffer
  - SLO: 99.9%, SLA: 99.5%

Error budget: allowed downtime before SLO is breached
  99.9% SLO = 0.1% budget = 43.8 minutes downtime per month`,
          note: 'Error budgets make SLOs actionable: when budget is nearly spent, freeze feature deploys and focus on reliability'
        },
        {
          label: 'The four golden signals (Google SRE)',
          language: 'text',
          code: `1. Latency
   - Time to serve a request (successful and failed separately)
   - Track p50, p95, p99 (not just average)
   - p99 > 500ms may indicate a problem average hides

2. Traffic
   - Volume of requests per second
   - Useful to understand scale and detect anomalies

3. Errors
   - Rate of requests that fail (5xx, timeouts, wrong results)
   - Error rate > 1% usually triggers an alert

4. Saturation
   - How "full" your service is (CPU %, memory %, queue depth)
   - Leading indicator - saturation precedes errors and high latency

Alert on: error rate, p99 latency, saturation
Dashboard: all four signals on a single pane of glass`,
        },
        {
          label: 'Structured logging',
          language: 'javascript',
          code: `// Bad: unstructured string log - hard to query and parse
console.log('User 123 paid $49.99 for order 456 at 2024-01-15T10:30:00Z')

// Good: structured JSON log - queryable in Datadog/Splunk/CloudWatch
const logger = {
  info: (msg, fields) => console.log(JSON.stringify({ level: 'info', msg, ...fields, ts: new Date().toISOString() })),
  error: (msg, fields) => console.log(JSON.stringify({ level: 'error', msg, ...fields, ts: new Date().toISOString() }))
}

logger.info('payment.processed', {
  user_id: 123,
  order_id: 456,
  amount_cents: 4999,
  currency: 'USD',
  duration_ms: 142,
  trace_id: 'abc-123-def'
})

// Query later: level:error AND user_id:123
// Alert on: count(level:error) > 50 in 5 minutes`,
          note: 'Always include a trace_id in logs so you can follow a single request through multiple services'
        },
        {
          label: 'Distributed tracing',
          language: 'text',
          code: `Problem: a slow request touches 8 microservices - which one is slow?

Solution: distributed tracing with trace IDs and spans

Trace: a single end-to-end request (one trace ID)
Span: a unit of work within a trace (service call, DB query)

Request flow with tracing:
  Browser -> API Gateway (span 1: 200ms)
           -> Auth Service (span 2: 20ms)
           -> User Service (span 3: 150ms) <-- slow!
               -> PostgreSQL (span 4: 140ms)  <-- the real culprit

Tools:
  Jaeger (open source)
  Zipkin (open source)
  AWS X-Ray
  Datadog APM
  OpenTelemetry (standard instrumentation library)

HTTP header propagation:
  X-Trace-Id: abc-123
  X-Span-Id: def-456`,
          note: 'OpenTelemetry is the vendor-neutral standard for instrumentation - instrument once, send to any backend'
        },
        {
          label: 'Alerting principles',
          language: 'text',
          code: `Good alerts are:
  - Actionable: on-call knows exactly what to do
  - Symptom-based: alert on user impact, not internal metrics
  - Not too noisy: alert fatigue makes engineers ignore alerts

Symptom vs cause:
  Good: "Error rate > 1% for 5 minutes" (user-facing symptom)
  Bad:  "CPU > 80%" (may or may not affect users)

Alert tiers:
  Page (wake someone up): SLO breach, complete outage, data loss
  Ticket (fix during business hours): elevated error rate, slow query
  Dashboard (monitor passively): cache hit rate, queue depth

Runbooks:
  Every alert should link to a runbook with:
    - What this alert means
    - Immediate mitigation steps
    - Escalation path`,
          note: 'The goal is to page someone only when immediate human action is required. Everything else is a ticket or dashboard'
        },
        {
          label: 'Circuit breaker pattern',
          language: 'javascript',
          code: `// Prevents cascading failures when a downstream service is down
// Without circuit breaker: all requests queue up and time out -> cascade failure

// States: CLOSED (normal) -> OPEN (failing) -> HALF-OPEN (testing recovery)

class CircuitBreaker {
  constructor(fn, { failureThreshold = 5, recoveryTimeout = 30000 } = {}) {
    this.fn = fn
    this.failureThreshold = failureThreshold
    this.recoveryTimeout = recoveryTimeout
    this.failures = 0
    this.state = 'CLOSED'
    this.nextAttempt = null
  }

  async call(...args) {
    if (this.state === 'OPEN') {
      if (Date.now() < this.nextAttempt) throw new Error('Circuit is OPEN')
      this.state = 'HALF-OPEN'
    }
    try {
      const result = await this.fn(...args)
      this.failures = 0
      this.state = 'CLOSED'
      return result
    } catch (err) {
      this.failures++
      if (this.failures >= this.failureThreshold) {
        this.state = 'OPEN'
        this.nextAttempt = Date.now() + this.recoveryTimeout
      }
      throw err
    }
  }
}`,
          note: 'Libraries: opossum (Node.js), Resilience4j (Java), Polly (.NET). In microservices, use a service mesh like Istio instead'
        }
      ]
    }
  ]
}

export default systemDesign

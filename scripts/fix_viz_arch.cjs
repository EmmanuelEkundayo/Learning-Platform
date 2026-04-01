const fs = require('fs'), path = require('path');
const dir = 'src/data/concepts';

function arch(layers, extra_steps) {
  const steps = [{ active_layer: -1, annotation: 'System overview — step through to trace the flow.' }];
  layers.forEach((l, i) => steps.push({ active_layer: i, annotation: extra_steps[i] || l.label + ' layer active.' }));
  return { layers, steps };
}

const configs = {
  'adapter-pattern': arch(
    [{ label: 'Client', items: ['Your Code'] }, { label: 'Adapter', items: ['Wrapper Class'] }, { label: 'Adaptee', items: ['Legacy/3rd-party API'] }],
    ['Client calls the target interface it expects.', 'Adapter translates the call — implements target, delegates to adaptee.', 'Adaptee runs using its own incompatible interface. Client never knows.']
  ),
  'api-design-principles': arch(
    [{ label: 'Client', items: ['Browser', 'Mobile', 'Service'] }, { label: 'API Layer', items: ['Versioning', 'Validation', 'Docs'] }, { label: 'Business Logic', items: ['Controllers', 'Services'] }, { label: 'Data', items: ['DB', 'Cache'] }],
    ['Client sends a well-formed HTTP request.', 'API layer enforces versioning, validates input, returns errors early.', 'Business logic processes the request.', 'Data layer persists or retrieves results.']
  ),
  'api-gateway': arch(
    [{ label: 'Clients', items: ['Browser', 'Mobile', 'CLI'] }, { label: 'Gateway', items: ['Auth', 'Rate Limit', 'Router', 'SSL Term'] }, { label: 'Services', items: ['User Svc', 'Order Svc', 'Payment Svc'] }, { label: 'Data', items: ['PostgreSQL', 'Redis', 'S3'] }],
    ['Client sends request to single gateway entry point.', 'Gateway authenticates, rate-limits, and routes to correct service.', 'Microservice handles domain logic.', 'Service reads/writes its own data store.']
  ),
  'api-pagination': arch(
    [{ label: 'Client', items: ['GET /items?cursor=X'] }, { label: 'API', items: ['Parse cursor', 'Apply limit'] }, { label: 'DB Query', items: ['WHERE id > X', 'LIMIT 20'] }, { label: 'Response', items: ['items[]', 'next_cursor'] }],
    ['Client requests page with cursor from previous response.', 'API decodes cursor and builds query.', 'DB fetches next N rows efficiently via index.', 'Response includes items and next cursor for subsequent page.']
  ),
  'api-versioning': arch(
    [{ label: 'Client', items: ['/v1/users', '/v2/users'] }, { label: 'Router', items: ['Version Detection', 'Route Table'] }, { label: 'v1 Handler', items: ['Legacy Schema'] }, { label: 'v2 Handler', items: ['New Schema'] }],
    ['Client specifies version via URL path, header, or query param.', 'Router detects version and dispatches to correct handler.', 'v1 handler maintains backward-compatible response.', 'v2 handler returns new schema without breaking old clients.']
  ),
  'canary-releases': arch(
    [{ label: 'Traffic', items: ['100% requests'] }, { label: 'Load Balancer', items: ['Routing Rules', '5% / 95% split'] }, { label: 'Canary', items: ['New v2', '5% traffic'] }, { label: 'Stable', items: ['Old v1', '95% traffic'] }],
    ['All traffic enters the load balancer.', 'LB splits by percentage — small slice goes to canary.', 'Canary runs new version. Metrics compared vs. stable.', 'Stable version serves the majority until canary is validated.']
  ),
  'cdn-basics': arch(
    [{ label: 'User', items: ['Browser'] }, { label: 'Edge PoP', items: ['Cache Hit?', 'Nearest DC'] }, { label: 'Origin', items: ['Web Server', 'Object Store'] }],
    ['User requests asset — DNS resolves to nearest CDN edge node.', 'Edge checks cache. HIT: serves immediately. MISS: fetches from origin.', 'Origin serves asset; edge caches it with TTL for future requests.']
  ),
  'cicd-pipelines': arch(
    [{ label: 'Dev', items: ['git push'] }, { label: 'CI', items: ['Build', 'Test', 'Lint'] }, { label: 'CD Staging', items: ['Deploy', 'Smoke Test'] }, { label: 'CD Prod', items: ['Blue/Green', 'Deploy'] }],
    ['Developer pushes code to feature branch.', 'CI runs: compile, unit tests, linting. Fails fast on errors.', 'Deploy to staging automatically. Run integration/smoke tests.', 'Approved build promoted to production with zero-downtime strategy.']
  ),
  'clean-architecture': arch(
    [{ label: 'Frameworks', items: ['React', 'Express', 'DB Driver'] }, { label: 'Interface Adapters', items: ['Controllers', 'Presenters', 'Gateways'] }, { label: 'Use Cases', items: ['Application Logic'] }, { label: 'Entities', items: ['Business Rules', 'Domain Models'] }],
    ['Outer ring: frameworks and I/O. Most volatile — can be swapped.', 'Adapters translate between use-case format and external format.', 'Use cases contain application-specific business rules.', 'Entities: core business logic, no dependencies. Most stable ring.']
  ),
  'command-pattern': arch(
    [{ label: 'Invoker', items: ['Button', 'Scheduler'] }, { label: 'Command', items: ['execute()', 'undo()'] }, { label: 'Receiver', items: ['Editor', 'DB', 'API'] }],
    ['Invoker holds a command object and calls execute() — no coupling to receiver.', 'Command object encapsulates the action, its params, and undo logic.', 'Receiver performs the actual work. Invoker never calls it directly.']
  ),
  'cors': arch(
    [{ label: 'Browser', items: ['Origin: A'] }, { label: 'Preflight', items: ['OPTIONS request', 'ACAO headers'] }, { label: 'Server', items: ['Allow list check', 'Response headers'] }, { label: 'Actual Request', items: ['GET / POST', 'With CORS headers'] }],
    ['Browser detects cross-origin request and sends OPTIONS preflight.', 'Preflight asks: can Origin A use method X with headers Y?', 'Server responds with Access-Control-Allow-Origin if origin permitted.', 'Browser sends actual request only if preflight was approved.']
  ),
  'cors-attacks': arch(
    [{ label: 'Attacker Site', items: ['evil.com'] }, { label: 'Victim Browser', items: ['Stored cookies', 'CORS fetch'] }, { label: 'Target API', items: ['Origin check', 'Policy'] }, { label: 'Defense', items: ['Allowlist', 'CSRF token'] }],
    ['Attacker page tries to make credentialed request to target API.', 'Browser sends request with victim\'s cookies automatically.', 'Target API must validate Origin header against allowlist.', 'SameSite cookies + strict CORS allowlist prevent exploitation.']
  ),
  'csrf': arch(
    [{ label: 'Attacker', items: ['Malicious form', 'img src trick'] }, { label: 'Victim Browser', items: ['Session cookie', 'Auto-attaches'] }, { label: 'Server', items: ['CSRF token check', 'SameSite cookie'] }, { label: 'Defense', items: ['Token validation', 'Origin check'] }],
    ['Attacker crafts a request that triggers a state-changing action.', 'Browser auto-attaches session cookies to cross-site requests.', 'Server must verify CSRF token in request body or custom header.', 'SameSite=Strict cookies and Origin validation block the attack.']
  ),
  'database-migrations': arch(
    [{ label: 'Dev', items: ['Write migration', '.sql / .js'] }, { label: 'Migration Tool', items: ['Knex / Flyway', 'Version table'] }, { label: 'DB Schema', items: ['Apply ALTER', 'Track version'] }, { label: 'Rollback', items: ['down()'] }],
    ['Developer writes versioned migration file — up() and down() methods.', 'Migration tool checks schema_versions table to find pending migrations.', 'Applies pending migrations in order. Each tracked in version table.', 'Rollback runs down() in reverse order to undo changes.']
  ),
  'database-normalization': arch(
    [{ label: 'Raw Table', items: ['Redundant data', 'Update anomalies'] }, { label: '1NF', items: ['Atomic values', 'No repeating groups'] }, { label: '2NF', items: ['Full key dependency'] }, { label: '3NF', items: ['No transitive deps'] }],
    ['Unnormalised: repeated data causes update/insert/delete anomalies.', '1NF: every cell is atomic, each row uniquely identified.', '2NF: non-key columns depend on the whole primary key, not part of it.', '3NF: non-key columns depend only on the key, nothing else.']
  ),
  'database-replication': arch(
    [{ label: 'App', items: ['Write → Primary', 'Read → Replica'] }, { label: 'Primary', items: ['Writes', 'WAL / binlog'] }, { label: 'Replica(s)', items: ['Async / Sync copy', 'Read-only'] }],
    ['App routes writes to primary, reads to replicas.', 'Primary commits write and appends to Write-Ahead Log.', 'Replicas stream and apply log entries — slight replication lag.']
  ),
  'database-scaling-patterns': arch(
    [{ label: 'App', items: ['Query router'] }, { label: 'Read Replicas', items: ['Replica 1', 'Replica 2'] }, { label: 'Shards', items: ['Shard A (0-50)', 'Shard B (51-100)'] }, { label: 'Cache', items: ['Redis'] }],
    ['App layer decides routing strategy based on query type.', 'Read replicas absorb read traffic — offload primary.', 'Shards split data horizontally — each shard owns a range.', 'Cache sits in front — hot rows served without hitting DB.']
  ),
  'database-sharding': arch(
    [{ label: 'App', items: ['Shard key: userId'] }, { label: 'Shard Router', items: ['Hash / Range map'] }, { label: 'Shard 0', items: ['userId 0–33%'] }, { label: 'Shard 1', items: ['userId 33–66%'] }, { label: 'Shard 2', items: ['userId 66–100%'] }],
    ['App provides shard key (e.g. userId) with every query.', 'Router applies hash or range function to determine target shard.', 'Shard 0 handles its partition independently.', 'Shard 1 handles its partition independently.', 'Cross-shard queries require scatter-gather — expensive, avoid.']
  ),
  'decorator-pattern': arch(
    [{ label: 'Client', items: ['Calls interface'] }, { label: 'Decorator C', items: ['Logging wrapper'] }, { label: 'Decorator B', items: ['Auth wrapper'] }, { label: 'Core Component', items: ['Real behaviour'] }],
    ['Client calls the outermost decorator — same interface as core.', 'Decorator C adds logging, calls inner.', 'Decorator B adds auth check, calls inner.', 'Core component runs its actual logic. Decorators stack without subclassing.']
  ),
  'dependency-injection': arch(
    [{ label: 'DI Container', items: ['Bindings', 'Lifecycle'] }, { label: 'Injected Into', items: ['Controller', 'Service'] }, { label: 'Dependencies', items: ['DB Repo', 'Email Svc', 'Logger'] }],
    ['DI container holds bindings: interface → implementation.', 'Container injects resolved dependencies into consumer constructors.', 'Dependencies are concrete implementations — swappable for tests.']
  ),
  'dependency-inversion': arch(
    [{ label: 'High-level', items: ['OrderService'] }, { label: 'Abstraction', items: ['IRepository interface'] }, { label: 'Low-level', items: ['PostgresRepo', 'MongoRepo'] }],
    ['High-level module defines what it needs via interface — no concrete deps.', 'Both high- and low-level modules depend on the abstraction.', 'Low-level implementations can be swapped without touching business logic.']
  ),
  'disaster-recovery': arch(
    [{ label: 'Primary Region', items: ['Live traffic', 'Primary DB'] }, { label: 'Replication', items: ['Async / Sync', 'Backup jobs'] }, { label: 'DR Region', items: ['Warm standby', 'Replica DB'] }, { label: 'Failover', items: ['DNS switch', 'Traffic reroute'] }],
    ['Primary region serves all traffic normally.', 'Continuous replication copies data to DR region within RPO target.', 'DR region runs warm standby — ready to accept traffic quickly.', 'On disaster: DNS updated, traffic rerouted to DR within RTO window.']
  ),
  'dns-resolution': arch(
    [{ label: 'Browser', items: ['example.com'] }, { label: 'OS Cache', items: ['hosts file', 'DNS cache'] }, { label: 'Recursive Resolver', items: ['ISP DNS'] }, { label: 'Root / TLD / Auth', items: ['.', '.com NS', 'example.com NS'] }],
    ['Browser requests example.com IP.', 'OS checks local cache and hosts file first. On miss, asks resolver.', 'Recursive resolver checks its own cache. On miss, begins traversal.', 'Resolver queries root → TLD → authoritative NS. Returns A record.']
  ),
  'docker-internals': arch(
    [{ label: 'Dockerfile', items: ['FROM', 'RUN', 'COPY'] }, { label: 'Image Layers', items: ['Layer cache', 'Read-only'] }, { label: 'Container', items: ['Writable layer', 'Namespaces', 'cgroups'] }, { label: 'Runtime', items: ['runc', 'containerd'] }],
    ['Dockerfile: each instruction creates an immutable image layer.', 'Layers cached — unchanged layers reuse cache on rebuild.', 'Container adds a thin writable layer on top of read-only image layers.', 'OCI runtime (runc) creates namespaces and cgroups to isolate the process.']
  ),
  'docker-networking': arch(
    [{ label: 'Container A', items: ['app:3000'] }, { label: 'Bridge Network', items: ['Virtual switch', 'docker0'] }, { label: 'Container B', items: ['db:5432'] }, { label: 'Host', items: ['Port mapping', '-p 3000:3000'] }],
    ['Container A connects to virtual bridge network on start.', 'Bridge network provides DNS — containers resolve each other by name.', 'Container B reachable by its service name within the network.', 'Host port mapping exposes container ports to the outside world.']
  ),
  'domain-driven-design': arch(
    [{ label: 'UI / API', items: ['Controllers', 'DTOs'] }, { label: 'Application Layer', items: ['Use Cases', 'Commands'] }, { label: 'Domain Layer', items: ['Aggregates', 'Entities', 'Value Objects'] }, { label: 'Infrastructure', items: ['Repositories', 'Event Bus'] }],
    ['UI/API: thin layer — translates HTTP to application commands.', 'Application layer orchestrates use cases without domain logic.', 'Domain layer contains all business rules — no framework dependencies.', 'Infrastructure: persistence, messaging — implements domain interfaces.']
  ),
  'facade-pattern': arch(
    [{ label: 'Client', items: ['Simple API call'] }, { label: 'Facade', items: ['HomeTheater.watchMovie()'] }, { label: 'Subsystems', items: ['Projector', 'Amplifier', 'StreamingPlayer', 'Lights'] }],
    ['Client calls one simple facade method.', 'Facade orchestrates multiple subsystem calls in the right order.', 'Subsystems do their work. Client never interacts with them directly.']
  ),
  'factory-pattern': arch(
    [{ label: 'Client', items: ['Requests product'] }, { label: 'Factory', items: ['create(type)', 'Registry map'] }, { label: 'Products', items: ['ConcreteA', 'ConcreteB', 'ConcreteC'] }],
    ['Client asks factory for an object by type — no new() calls in client code.', 'Factory uses registry or switch to instantiate the correct concrete class.', 'Concrete products all implement the same interface. Client code never changes.']
  ),
  'grpc': arch(
    [{ label: 'Client', items: ['Stub (generated)', 'Proto types'] }, { label: 'gRPC Channel', items: ['HTTP/2', 'Binary frames'] }, { label: 'Server', items: ['Service impl', 'Proto handler'] }],
    ['Client uses generated stub — calls look like local function calls.', 'Request serialised to Protobuf binary, sent over HTTP/2 multiplexed stream.', 'Server deserialises, runs handler, returns typed Protobuf response.']
  ),
  'helm-basics': arch(
    [{ label: 'Chart', items: ['templates/', 'values.yaml'] }, { label: 'Helm CLI', items: ['helm install', 'helm upgrade'] }, { label: 'Kubernetes API', items: ['Apply manifests'] }, { label: 'Release', items: ['Deployed objects', 'Revision history'] }],
    ['Chart: versioned package of Kubernetes YAML templates + default values.', 'Helm CLI renders templates with values, sends to Kubernetes API.', 'Kubernetes creates/updates resources (Deployments, Services, etc.).', 'Release stored in cluster — helm rollback uses revision history.']
  ),
  'hexagonal-architecture': arch(
    [{ label: 'Driving Adapters', items: ['HTTP Controller', 'CLI', 'Test'] }, { label: 'Input Ports', items: ['Use case interfaces'] }, { label: 'Domain Core', items: ['Business logic', 'Entities'] }, { label: 'Output Ports', items: ['Repo interface', 'Event interface'] }, { label: 'Driven Adapters', items: ['PostgreSQL', 'Kafka', 'SMTP'] }],
    ['Driving adapters (HTTP, CLI) trigger application use cases.', 'Input ports: interfaces defining what the application offers.', 'Domain core: pure business logic, no framework or I/O dependencies.', 'Output ports: interfaces the domain needs (repo, events).', 'Driven adapters implement output ports — swappable without touching domain.']
  ),
  'horizontal-vs-vertical-scaling': arch(
    [{ label: 'Traffic', items: ['Incoming load'] }, { label: 'Scale Up (Vertical)', items: ['Bigger instance', '32 CPU / 256 GB'] }, { label: 'Scale Out (Horizontal)', items: ['LB', 'Node 1', 'Node 2', 'Node 3'] }],
    ['Traffic grows beyond current capacity.', 'Vertical: upgrade the single machine — faster but has a ceiling and causes downtime.', 'Horizontal: add more machines behind a load balancer — theoretically unlimited.']
  ),
  'http-versions': arch(
    [{ label: 'HTTP/1.1', items: ['1 req/connection', 'Head-of-line blocking'] }, { label: 'HTTP/2', items: ['Multiplexed streams', 'Header compression', 'Server push'] }, { label: 'HTTP/3', items: ['QUIC / UDP', '0-RTT', 'Built-in TLS'] }],
    ['HTTP/1.1: one outstanding request per connection. 6-connection workaround needed.', 'HTTP/2: multiple requests in-flight on one TCP connection. HPACK header compression.', 'HTTP/3: QUIC over UDP eliminates TCP head-of-line blocking. Faster handshake.']
  ),
  'kubernetes-basics': arch(
    [{ label: 'kubectl', items: ['CLI / YAML'] }, { label: 'Control Plane', items: ['API Server', 'Scheduler', 'etcd'] }, { label: 'Worker Nodes', items: ['kubelet', 'kube-proxy', 'Pods'] }],
    ['kubectl submits desired state (YAML manifest) to the API server.', 'Control plane: scheduler picks node, controller reconciles actual vs desired.', 'kubelet on worker node pulls image and runs the pod containers.']
  ),
  'kubernetes-services-deployments': arch(
    [{ label: 'Deployment', items: ['Desired replicas', 'Rolling update'] }, { label: 'ReplicaSet', items: ['Actual pods', 'Self-heal'] }, { label: 'Pods', items: ['App container', 'Sidecar'] }, { label: 'Service', items: ['ClusterIP / LB', 'kube-proxy rules'] }],
    ['Deployment declares desired state: 3 replicas of image v2.', 'ReplicaSet ensures pod count matches. Replaces crashed pods automatically.', 'Pods are the smallest deployable unit — one or more containers sharing network.', 'Service provides stable DNS + virtual IP — load-balances across pod IPs via iptables.']
  ),
  'load-balancing': arch(
    [{ label: 'Clients', items: ['User 1', 'User 2', 'User 3'] }, { label: 'Load Balancer', items: ['Algorithm', 'Health checks'] }, { label: 'Server Pool', items: ['Server A', 'Server B', 'Server C'] }],
    ['All client traffic arrives at the load balancer.', 'LB applies algorithm (round-robin, least-conn, IP-hash) and checks health.', 'Request forwarded to a healthy server. Failed servers removed automatically.']
  ),
  'message-delivery-guarantees': arch(
    [{ label: 'Producer', items: ['Send + ack wait'] }, { label: 'Broker', items: ['Persist to log', 'Replicas'] }, { label: 'Consumer', items: ['Process', 'Commit offset'] }, { label: 'Dead Letter', items: ['Failed msgs'] }],
    ['Producer sends message, waits for broker ack (at-least-once if acks=all).', 'Broker persists to replicated log before acking.', 'Consumer processes and commits offset. Uncommitted = redelivered on restart.', 'After max retries, unprocessable messages routed to dead-letter queue.']
  ),
  'middleware-patterns': arch(
    [{ label: 'Request', items: ['HTTP req'] }, { label: 'MW 1', items: ['Logger'] }, { label: 'MW 2', items: ['Auth'] }, { label: 'MW 3', items: ['Rate Limit'] }, { label: 'Handler', items: ['Business logic'] }, { label: 'Response', items: ['HTTP res'] }],
    ['Request enters middleware chain.', 'Logger MW records request details, calls next().', 'Auth MW validates JWT, calls next() or returns 401.', 'Rate Limit MW checks quota, calls next() or returns 429.', 'Handler processes business logic and sends response.', 'Response flows back through middleware for post-processing.']
  ),
  'monorepo-vs-polyrepo': arch(
    [{ label: 'Monorepo', items: ['packages/', 'Shared tooling', 'Atomic commits'] }, { label: 'Build Tool', items: ['Nx / Turborepo', 'Affected detection'] }, { label: 'Polyrepo', items: ['Separate repos', 'Independent CI', 'Version contracts'] }],
    ['Monorepo: all packages in one repo. Refactors, shared code, atomic commits.', 'Build tool detects affected packages — only rebuilds what changed.', 'Polyrepo: independent versioning and deployment cadence per service.']
  ),
  'oauth2': arch(
    [{ label: 'User', items: ['Browser'] }, { label: 'Client App', items: ['Frontend', 'Backend'] }, { label: 'Auth Server', items: ['Authorize endpoint', 'Token endpoint'] }, { label: 'Resource Server', items: ['Protected API'] }],
    ['User clicks "Login with Google" — client redirects to auth server.', 'User authenticates and grants permissions on auth server consent screen.', 'Auth server issues access token (+ refresh token) to client backend.', 'Client sends Bearer token to resource server. Server validates and responds.']
  ),
  'orm-patterns': arch(
    [{ label: 'App Code', items: ['user.save()', 'User.findAll()'] }, { label: 'ORM Layer', items: ['Model mapping', 'Query builder'] }, { label: 'SQL Generated', items: ['INSERT INTO users...', 'SELECT * FROM...'] }, { label: 'Database', items: ['PostgreSQL', 'MySQL'] }],
    ['App code works with objects — no raw SQL.', 'ORM maps model methods to SQL, handles escaping and parameterization.', 'Generated SQL sent to the database driver.', 'Database executes query, results mapped back to model objects.']
  ),
  'postgresql-internals': arch(
    [{ label: 'Query', items: ['SQL string'] }, { label: 'Query Planner', items: ['Parse', 'Analyse', 'Plan'] }, { label: 'Executor', items: ['Seq scan / Index scan'] }, { label: 'Storage', items: ['Buffer pool', 'WAL', 'Heap pages'] }],
    ['SQL string received by parser — creates parse tree.', 'Planner analyses stats and chooses cheapest execution plan (seq vs index scan).', 'Executor runs the plan: fetches pages, applies filters, sorts.', 'Buffer pool caches hot pages. WAL ensures durability before commit.']
  ),
  'proxy-pattern': arch(
    [{ label: 'Client', items: ['Calls Subject'] }, { label: 'Proxy', items: ['Access control', 'Caching / Logging'] }, { label: 'Real Subject', items: ['Actual object'] }],
    ['Client holds a reference to the proxy, not the real subject.', 'Proxy intercepts the call — applies caching, access control, or logging.', 'Proxy forwards to real subject only when necessary.']
  ),
  'rabbitmq': arch(
    [{ label: 'Producer', items: ['Publish msg'] }, { label: 'Exchange', items: ['Direct / Topic / Fanout'] }, { label: 'Queue(s)', items: ['Durable queue', 'Bindings'] }, { label: 'Consumer(s)', items: ['Process', 'Ack'] }],
    ['Producer publishes message to an exchange, not directly to a queue.', 'Exchange routes message to bound queues based on type and routing key.', 'Queue durably stores messages until consumer acks.', 'Consumer processes message and sends ack — message deleted on ack.']
  ),
  'rate-limiting': arch(
    [{ label: 'Client', items: ['Requests'] }, { label: 'Rate Limiter', items: ['Token bucket', 'Sliding window'] }, { label: 'Counter Store', items: ['Redis', 'Per client key'] }, { label: 'Upstream', items: ['API / Service'] }],
    ['Client sends requests.', 'Rate limiter checks counter in Redis for client\'s key.', 'Under limit: forward. Over limit: return 429 Too Many Requests.', 'Upstream protected from overload. Counter resets per window.']
  ),
  'rest-principles': arch(
    [{ label: 'Client', items: ['Stateless request'] }, { label: 'Uniform Interface', items: ['Resource URI', 'HTTP verbs', 'Representations'] }, { label: 'Server', items: ['Process', 'Respond'] }, { label: 'Cache', items: ['Cache-Control headers'] }],
    ['Client sends self-contained request — no server session required.', 'Uniform interface: resource identified by URI, manipulated via standard verbs.', 'Server processes and returns representation (JSON/XML). No client state stored.', 'Response marked cacheable/non-cacheable via Cache-Control. Intermediaries can cache.']
  ),
  'retry-and-backoff': arch(
    [{ label: 'Client', items: ['Request'] }, { label: 'Retry Logic', items: ['Attempt 1', 'Attempt 2', 'Attempt 3'] }, { label: 'Backoff', items: ['1s', '2s', '4s + jitter'] }, { label: 'Upstream', items: ['503 / 429', 'Eventually 200'] }],
    ['Client sends initial request.', 'On transient failure (503/429), retry logic retries up to max attempts.', 'Exponential backoff + jitter spaces retries — avoids thundering herd.', 'Upstream recovers. Final attempt succeeds.']
  ),
  'reverse-proxy': arch(
    [{ label: 'Internet', items: ['Clients'] }, { label: 'Reverse Proxy', items: ['Nginx / Caddy', 'SSL Term', 'Compression'] }, { label: 'Backend Pool', items: ['App Server 1', 'App Server 2'] }],
    ['All traffic hits reverse proxy — backends never exposed directly.', 'Proxy terminates TLS, compresses, rate-limits, and forwards.', 'Backend servers receive plain HTTP from proxy\'s private network.']
  ),
  'saga-pattern': arch(
    [{ label: 'Orchestrator', items: ['Saga coordinator'] }, { label: 'Step 1', items: ['Reserve inventory', 'Compensate: release'] }, { label: 'Step 2', items: ['Charge payment', 'Compensate: refund'] }, { label: 'Step 3', items: ['Schedule delivery', 'Compensate: cancel'] }],
    ['Saga orchestrator starts and coordinates the distributed transaction.', 'Step 1 runs. On failure: compensating transaction releases inventory.', 'Step 2 runs. On failure: compensating transaction refunds payment.', 'Step 3 runs. All steps committed — saga complete.']
  ),
  'solid-principles': arch(
    [{ label: 'SRP', items: ['One reason to change'] }, { label: 'OCP', items: ['Open for extension'] }, { label: 'LSP', items: ['Substitutable subtypes'] }, { label: 'ISP', items: ['Lean interfaces'] }, { label: 'DIP', items: ['Depend on abstractions'] }],
    ['SRP: each class has one responsibility — one reason to be modified.', 'OCP: add new behaviour via extension (new classes), not modification.', 'LSP: subclasses must honour the contract of their parent class.', 'ISP: clients should not depend on methods they don\'t use.', 'DIP: high-level modules depend on interfaces, not concrete classes.']
  ),
  'ssl-termination': arch(
    [{ label: 'Client', items: ['HTTPS request'] }, { label: 'Terminator', items: ['Load Balancer', 'Decrypt TLS'] }, { label: 'Internal Network', items: ['Plain HTTP'] }, { label: 'Backend', items: ['App servers'] }],
    ['Client sends encrypted HTTPS request.', 'Load balancer / proxy holds the TLS certificate and decrypts traffic.', 'Decrypted traffic travels over the trusted internal network as HTTP.', 'Backend servers handle plain HTTP — no TLS overhead per server.']
  ),
  'strategy-pattern': arch(
    [{ label: 'Context', items: ['Uses strategy'] }, { label: 'Strategy Interface', items: ['execute(data)'] }, { label: 'Concrete Strategies', items: ['QuickSort', 'MergeSort', 'InsertionSort'] }],
    ['Context holds a reference to the current strategy object.', 'All strategies implement the same interface — context calls execute().', 'Concrete strategy runs its algorithm. Swap strategy at runtime without changing context.']
  ),
  'system-design-api-gateway': arch(
    [{ label: 'Clients', items: ['Web', 'Mobile', 'Partners'] }, { label: 'API Gateway', items: ['Auth', 'Rate Limit', 'SSL', 'Routing'] }, { label: 'Services', items: ['User', 'Orders', 'Search', 'Payments'] }, { label: 'Data Stores', items: ['Each service owns DB'] }],
    ['All external clients talk to the single gateway endpoint.', 'Gateway handles cross-cutting concerns: auth, TLS, rate limiting, routing.', 'Gateway routes to appropriate microservice by path/header.', 'Each microservice owns its data — no shared DB.']
  ),
  'system-design-video-streaming': arch(
    [{ label: 'Upload', items: ['Raw video file'] }, { label: 'Transcoding', items: ['FFmpeg workers', '360p/720p/1080p'] }, { label: 'CDN', items: ['Edge PoPs', 'HLS segments'] }, { label: 'Player', items: ['Adaptive bitrate'] }],
    ['User uploads raw video to object storage.', 'Transcoding pipeline generates multiple resolutions and HLS/DASH segments.', 'Segments pushed to CDN edge nodes close to users.', 'Player uses adaptive bitrate — switches quality based on bandwidth.']
  ),
  'tcp-vs-udp': arch(
    [{ label: 'TCP', items: ['3-way handshake', 'Ordered delivery', 'Retransmit'] }, { label: 'Use Cases', items: ['HTTP/1.1', 'SMTP', 'SSH', 'File transfer'] }, { label: 'UDP', items: ['No handshake', 'No order', 'No retransmit'] }, { label: 'Use Cases', items: ['DNS', 'Video call', 'Gaming', 'QUIC'] }],
    ['TCP: connection-oriented. SYN → SYN-ACK → ACK before any data.', 'TCP use cases: anything needing reliability and ordering.', 'UDP: connectionless. Fire and forget. Lower latency, no guarantees.', 'UDP use cases: real-time where fresh data beats old retransmit.']
  ),
  'tls-ssl-handshake': arch(
    [{ label: 'Client Hello', items: ['TLS version', 'Cipher suites', 'Random'] }, { label: 'Server Hello', items: ['Chosen cipher', 'Certificate', 'Random'] }, { label: 'Key Exchange', items: ['ECDHE params', 'Pre-master secret'] }, { label: 'Encrypted', items: ['Session keys', 'Application data'] }],
    ['Client Hello: advertises supported TLS versions and cipher suites.', 'Server Hello: selects cipher suite, sends certificate for authentication.', 'Key exchange: both sides derive session keys via ECDHE — no secret over wire.', 'Handshake complete. All application data encrypted with symmetric session keys.']
  ),
  'webhooks': arch(
    [{ label: 'Event', items: ['payment.completed'] }, { label: 'Provider', items: ['Stripe / GitHub', 'POST to URL'] }, { label: 'Your Server', items: ['Receive POST', 'Verify signature'] }, { label: 'Process', items: ['Update DB', 'Send email'] }],
    ['Event occurs on the provider\'s platform.', 'Provider sends HTTP POST to your registered webhook URL.', 'Your server verifies HMAC signature to authenticate the payload.', 'Process the event — update DB, trigger downstream actions.']
  ),
};

let updated = 0;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
files.forEach(f => {
  const fp = path.join(dir, f);
  const c = JSON.parse(fs.readFileSync(fp, 'utf8'));
  if (configs[c.slug]) {
    c.visualization.config = configs[c.slug];
    fs.writeFileSync(fp, JSON.stringify(c, null, 2));
    updated++;
  }
});
console.log('Architecture-diagram configs applied to', updated, 'files.');

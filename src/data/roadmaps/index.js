const roadmaps = [
  {
    id: "faang-interviews",
    slug: "faang-interviews",
    title: "Crack FAANG Interviews",
    description: "The exact concepts you need to master to pass technical interviews at top tech companies. Focused on high-frequency DSA patterns.",
    estimated_weeks: 8,
    difficulty: "advanced",
    category: "Career",
    color: "blue",
    phases: [
      {
        id: "faang-p1",
        title: "Arrays, Strings & Sorting",
        duration: "Week 1-2",
        description: "Core techniques for manipulating linear data structures and searching.",
        concepts: ["two-pointers-01", "sliding-window-01", "prefix-sum-01", "binary-search-01", "quicksort-01", "kadanes-algorithm-01"]
      },
      {
        id: "faang-p2",
        title: "Linked Lists & Trees",
        duration: "Week 3-4",
        description: "Moving from linear to hierarchical data structures.",
        concepts: ["reverse-linked-list-01", "merge-linked-lists-01", "bfs-tree-01", "dfs-preorder-01", "lowest-common-ancestor-01", "bst-operations-01"]
      },
      {
        id: "faang-p3",
        title: "Graphs & DP Mastery",
        duration: "Week 5-6",
        description: "Conquering the most challenging interview topics.",
        concepts: ["dijkstra-01", "topological-sort-kahns-01", "trie-01", "memoization-vs-tabulation-01", "coin-change-01", "dp-knapsack-01", "longest-common-subsequence-01"]
      },
      {
        id: "faang-p4",
        title: "System Design Basics",
        duration: "Week 7-8",
        description: "High-level architectural patterns for scale.",
        concepts: ["consistent-hashing-01", "load-balancing-01", "database-sharding-01", "system-design-rate-limiter-01", "cap-theorem-01", "api-gateway-01"]
      }
    ]
  },
  {
    id: "frontend-engineer-30days",
    slug: "frontend-engineer-30days",
    title: "Frontend Engineer in 30 Days",
    description: "Master the modern frontend stack from JS internals to advanced React patterns and performance.",
    estimated_weeks: 4,
    difficulty: "intermediate",
    category: "Frontend",
    color: "violet",
    phases: [
      {
        id: "fe-p1",
        title: "JS Core & Browser",
        duration: "Week 1",
        description: "How JavaScript and the browser execution environment work.",
        concepts: ["closures-js-01", "event-loop-browser-01", "promises-internals-01", "this-binding-01", "dom-internals-01", "critical-rendering-path-01"]
      },
      {
        id: "fe-p2",
        title: "CSS & Visual Performance",
        duration: "Week 2",
        description: "Layout engines, grid systems, and rendering optimization.",
        concepts: ["flexbox-algorithm-01", "css-grid-01", "reflow-vs-repaint-01", "css-custom-properties-01", "browser-caching-01"]
      },
      {
        id: "fe-p3",
        title: "React & State Mastery",
        duration: "Week 3",
        description: "Deep dive into React's reconciliation and hooks.",
        concepts: ["virtual-dom-reconciliation-01", "usestate-internals-01", "useeffect-internals-01", "react-fiber-01", "context-api-01", "react-query-01"]
      },
      {
        id: "fe-p4",
        title: "A11y, Testing & Perf",
        duration: "Week 4",
        description: "Making apps accessible, stable, and blazingly fast.",
        concepts: ["color-contrast-wcag-01", "aria-roles-01", "keyboard-navigation-01", "testing-pyramid-frontend-01", "code-splitting-strategies-01", "core-web-vitals-01"]
      }
    ]
  },
  {
    id: "backend-engineer-30days",
    slug: "backend-engineer-30days",
    title: "Backend Engineer in 30 Days",
    description: "Deep dive into APIs, Databases, Scalability, and Security fundamentals.",
    estimated_weeks: 4,
    difficulty: "intermediate",
    category: "Backend",
    color: "emerald",
    phases: [
      {
        id: "be-p1",
        title: "HTTP & API Design",
        duration: "Week 1",
        description: "Protocols, design principles, and modern communication.",
        concepts: ["http-versions-01", "rest-principles-01", "api-design-principles-01", "api-pagination-01", "grpc-01", "websockets-01"]
      },
      {
        id: "be-p2",
        title: "Databases & Storage",
        duration: "Week 2",
        description: "Optimizing queries and managing state at scale.",
        concepts: ["database-indexing-01", "database-transactions-01", "acid-properties-01", "database-sharding-01", "redis-data-structures-01", "sql-joins-01"]
      },
      {
        id: "be-p3",
        title: "Architecture & Queues",
        duration: "Week 3",
        description: "Decoupling services and handling async workloads.",
        concepts: ["message-queue-concepts-01", "kafka-architecture-01", "load-balancing-01", "cdn-basics-01", "consistent-hashing-01", "caching-strategies-frontend-01"]
      },
      {
        id: "be-p4",
        title: "Security & Ops",
        duration: "Week 4",
        description: "Authentication, safety, and deployment pipelines.",
        concepts: ["jwt-authentication-01", "owasp-top-10-01", "cors-01", "docker-internals-01", "cicd-pipelines-01", "secrets-management-01"]
      }
    ]
  },
  {
    id: "ml-fundamentals",
    slug: "ml-fundamentals",
    title: "ML Fundamentals",
    description: "From Linear Regression to Neural Networks. Everything you need for a solid ML foundation.",
    estimated_weeks: 6,
    difficulty: "intermediate",
    category: "ML",
    color: "yellow",
    phases: [
      {
        id: "ml-p1",
        title: "Math & Linear Models",
        duration: "Week 1-2",
        description: "The statistical bread and butter of ML.",
        concepts: ["linear-regression-01", "logistic-regression-01", "gradient-descent-01", "bias-variance-tradeoff-01", "feature-scaling-01"]
      },
      {
        id: "ml-p2",
        title: "Classical ML & Evaluation",
        duration: "Week 3-4",
        description: "Mastering practical algorithms and how to test them.",
        concepts: ["decision-tree-01", "random-forest-01", "xgboost-01", "svm-linear-01", "cross-validation-01", "overfitting-underfitting-01"]
      },
      {
        id: "ml-p3",
        title: "Neural Networks Core",
        duration: "Week 5-6",
        description: "The jump from classical ML to Deep Learning.",
        concepts: ["perceptron-01", "mlp-01", "backpropagation-01", "activation-functions-01", "loss-functions-01", "dropout-01"]
      }
    ]
  },
  {
    id: "system-design-mastery",
    slug: "system-design-mastery",
    title: "System Design Mastery",
    description: "Learn to design large-scale distributed systems like a Pro.",
    estimated_weeks: 4,
    difficulty: "advanced",
    category: "System Design",
    color: "rose",
    phases: [
      {
        id: "sd-p1",
        title: "Distributed Basics",
        duration: "Week 1",
        description: "Scalability, Consistency, and Availability.",
        concepts: ["load-balancing-01", "consistent-hashing-system-01", "cap-theorem-01", "eventual-consistency-01", "dns-resolution-01"]
      },
      {
        id: "sd-p2",
        title: "Data & Caching",
        duration: "Week 2",
        description: "Managing state across distributed clusters.",
        concepts: ["redis-caching-patterns-01", "database-replication-01", "database-sharding-01", "api-gateway-01", "reverse-proxy-01"]
      },
      {
        id: "sd-p3",
        title: "Case Studies",
        duration: "Week 3-4",
        description: "Designing real-world high-traffic systems.",
        concepts: ["system-design-news-feed-01", "system-design-chat-01", "system-design-url-shortener-01", "system-design-rate-limiter-01", "system-design-video-streaming-01"]
      }
    ]
  },
  {
    id: "fullstack-developer",
    slug: "fullstack-developer",
    title: "Become a Full-Stack Developer",
    description: "The complete journey from DOM manipulation to distributed system operations.",
    estimated_weeks: 8,
    difficulty: "intermediate",
    category: "Career",
    color: "indigo",
    phases: [
      {
        id: "fs-p1",
        title: "Web Foundation",
        duration: "Week 1-2",
        description: "JavaScript, HTML mechanics, and CSS layout.",
        concepts: ["closures-js-01", "dom-internals-01", "flexbox-algorithm-01", "css-grid-01", "event-loop-browser-01"]
      },
      {
        id: "fs-p2",
        title: "React Frontend",
        duration: "Week 3-4",
        description: "Building reactive UIs with modern patterns.",
        concepts: ["usestate-internals-01", "useeffect-internals-01", "context-api-01", "tailwind-internals-01", "core-web-vitals-01"]
      },
      {
        id: "fs-p3",
        title: "Node & SQL/NoSQL",
        duration: "Week 5-6",
        description: "Server-side logic, storage, and security.",
        concepts: ["rest-principles-01", "jwt-authentication-01", "database-transactions-01", "mongodb-aggregation-01", "owasp-top-10-01"]
      },
      {
        id: "fs-p4",
        title: "Deployment & Scale",
        duration: "Week 7-8",
        description: "Containerization and large-scale architectural patterns.",
        concepts: ["docker-internals-01", "cicd-pipelines-01", "consistent-hashing-01", "redis-data-structures-01"]
      }
    ]
  },
  {
    id: "data-structures-mastery",
    slug: "data-structures-mastery",
    title: "Data Structures Deep Dive",
    description: "Every essential data structure from beginner to ninja level.",
    estimated_weeks: 5,
    difficulty: "advanced",
    category: "Career",
    color: "cyan",
    phases: [
      {
        id: "ds-p1",
        title: "Basic Structures",
        duration: "Week 1",
        description: "Building blocks of memory storage.",
        concepts: ["doubly-linked-list-01", "hash-table-internals-01", "priority-queue-01", "deque-01", "bubble-sort-01", "insertion-sort-01"]
      },
      {
        id: "ds-p2",
        title: "Trees & Search",
        duration: "Week 2",
        description: "Hierarchical data and efficient lookup.",
        concepts: ["bst-operations-01", "avl-tree-01", "red-black-tree-01", "binary-search-01", "quicksort-01"]
      },
      {
        id: "ds-p3",
        title: "Graphs & Sets",
        duration: "Week 3",
        description: "Modeling connections and disjoint sets.",
        concepts: ["union-find-01", "trie-01", "lru-cache-01", "sparse-table-01", "topological-sort-kahns-01"]
      },
      {
        id: "ds-p4",
        title: "Advanced Data",
        duration: "Week 4-5",
        description: "Specialized structures for competitive programming and heavy scale.",
        concepts: ["segment-tree-01", "fenwick-tree-01", "splay-tree-01", "treap-01", "persistent-segment-tree-01", "bloom-filter-01"]
      }
    ]
  },
  {
    id: "ai-engineer",
    slug: "ai-engineer",
    title: "AI Engineer Path",
    description: "Go beyond basic ML. Master Transformers, LLMs, and RAG architectures.",
    estimated_weeks: 6,
    difficulty: "advanced",
    category: "ML",
    color: "violet",
    phases: [
      {
        id: "ai-p1",
        title: "Transformers & Seq2Seq",
        duration: "Week 1-2",
        description: "The architectural shift that powered modern AI.",
        concepts: ["attention-mechanism-01", "transformer-attention-01", "transformer-encoder-01", "transformer-decoder-01", "seq2seq-01"]
      },
      {
        id: "ai-p2",
        title: "The LLM Revolution",
        duration: "Week 3-4",
        description: "Training, finetuning, and scaling Large Language Models.",
        concepts: ["gpt-01", "bert-01", "rlhf-01", "mixture-of-experts-01", "quantization-01", "finetuning-vs-prompting-01"]
      },
      {
        id: "ai-p3",
        title: "Production RAG & Agents",
        duration: "Week 5-6",
        description: "Building reliable, data-augmented AI systems.",
        concepts: ["rag-retrieval-augmented-generation-01", "vector-databases-01", "vector-embeddings-faiss-01", "knowledge-distillation-01", "diffusion-models-01"]
      }
    ]
  }
];

export default roadmaps;

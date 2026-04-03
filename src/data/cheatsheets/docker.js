const docker = {
  id: 'docker',
  title: 'Docker and Kubernetes',
  color: 'blue',
  category: 'Backend',
  description: 'Container lifecycle, Dockerfiles, Compose, and Kubernetes workloads',
  sections: [
    {
      title: 'Docker CLI',
      items: [
        {
          label: 'Build and tag an image',
          language: 'bash',
          code: `docker build -t myapp:latest .
docker build -t myapp:1.0.0 -f Dockerfile.prod .
docker build --no-cache -t myapp:latest .
docker build --build-arg NODE_ENV=production -t myapp .`,
          note: '. is the build context (current directory); -f specifies an alternate Dockerfile'
        },
        {
          label: 'Run a container',
          language: 'bash',
          code: `docker run -d -p 8080:80 --name my-nginx nginx
docker run -it ubuntu bash                         # interactive terminal
docker run --rm alpine echo "hello"                # auto-remove on exit
docker run -e NODE_ENV=production myapp            # set env var
docker run -v $(pwd):/app -w /app node:18 npm test # bind mount + working dir`,
          note: '-d runs in background (detached); --rm removes container when it exits'
        },
        {
          label: 'List and inspect containers',
          language: 'bash',
          code: `docker ps              # running containers
docker ps -a           # all containers including stopped
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
docker inspect my-nginx                  # full JSON metadata
docker inspect --format '{{.NetworkSettings.IPAddress}}' my-nginx`,
          note: 'docker inspect outputs a full JSON object; use --format to extract specific fields'
        },
        {
          label: 'Stop, start, remove containers',
          language: 'bash',
          code: `docker stop my-nginx           # graceful stop (SIGTERM, then SIGKILL)
docker stop -t 30 my-nginx     # 30s grace period
docker kill my-nginx           # immediate SIGKILL
docker start my-nginx          # start a stopped container
docker restart my-nginx        # stop then start
docker rm my-nginx             # remove stopped container
docker rm -f my-nginx          # force remove running container
docker container prune         # remove all stopped containers`
        },
        {
          label: 'Logs and exec',
          language: 'bash',
          code: `docker logs my-nginx                    # print logs
docker logs -f my-nginx                 # follow (tail -f)
docker logs --tail 100 my-nginx         # last 100 lines
docker logs --since 1h my-nginx         # logs from last 1 hour

docker exec -it my-nginx bash           # open interactive shell
docker exec my-nginx cat /etc/nginx/nginx.conf`,
          note: 'If bash is not available try sh; Alpine-based images often only have sh'
        },
        {
          label: 'Images',
          language: 'bash',
          code: `docker pull node:18-alpine         # pull from Docker Hub
docker push myrepo/myapp:1.0.0    # push to registry
docker images                      # list local images
docker images -a                   # include intermediate layers
docker rmi myapp:latest            # remove image
docker image prune                 # remove dangling images
docker image prune -a              # remove all unused images
docker tag myapp:latest myapp:1.0.0  # tag existing image`
        },
        {
          label: 'Copy files and diff',
          language: 'bash',
          code: `docker cp my-nginx:/etc/nginx/nginx.conf ./nginx.conf  # container to host
docker cp ./nginx.conf my-nginx:/etc/nginx/nginx.conf  # host to container

docker diff my-nginx   # show filesystem changes (A=added, C=changed, D=deleted)
docker top my-nginx    # show running processes in container`
        }
      ]
    },
    {
      title: 'Dockerfile Instructions',
      items: [
        {
          label: 'FROM and ARG',
          language: 'dockerfile',
          code: `# Start from an official base image
FROM node:18-alpine

# ARG is available only during build
ARG NODE_ENV=production
ARG APP_VERSION=1.0.0

# Use ARG in ENV to persist into runtime
ENV NODE_ENV=\${NODE_ENV}
ENV APP_VERSION=\${APP_VERSION}`,
          note: 'Alpine images are much smaller than the default debian-based images'
        },
        {
          label: 'WORKDIR, COPY, and ADD',
          language: 'dockerfile',
          code: `WORKDIR /app

# COPY src dest (preferred for most cases)
COPY package*.json ./
COPY src/ ./src/

# ADD supports URLs and auto-extracts archives
ADD https://example.com/file.tar.gz /tmp/
ADD archive.tar.gz /app/

# Copy everything (use .dockerignore to exclude)
COPY . .`,
          note: 'Prefer COPY over ADD unless you need URL fetching or auto-extraction'
        },
        {
          label: 'RUN - execute commands',
          language: 'dockerfile',
          code: `# Combine RUN commands to reduce layers
RUN apt-get update && apt-get install -y \
    curl \
    git \
    && rm -rf /var/lib/apt/lists/*

# For Alpine
RUN apk add --no-cache curl git

# Install Node dependencies
RUN npm ci --only=production`,
          note: 'Chain commands with && in a single RUN to minimize layer count'
        },
        {
          label: 'CMD and ENTRYPOINT',
          language: 'dockerfile',
          code: `# CMD - default command, can be overridden at runtime
CMD ["node", "src/index.js"]
CMD ["npm", "start"]

# ENTRYPOINT - fixed executable, args appended
ENTRYPOINT ["docker-entrypoint.sh"]

# Combined: ENTRYPOINT is fixed, CMD provides default args
ENTRYPOINT ["node"]
CMD ["src/index.js"]
# Can override CMD: docker run myimage src/other.js`,
          note: 'Use exec form (JSON array) not shell form to receive signals correctly'
        },
        {
          label: 'EXPOSE, ENV, LABEL',
          language: 'dockerfile',
          code: `# Document which port the container listens on
EXPOSE 3000

# Runtime environment variables
ENV PORT=3000
ENV NODE_ENV=production

# Metadata labels
LABEL maintainer="team@example.com"
LABEL version="1.0.0"
LABEL description="My Node.js app"`,
          note: 'EXPOSE is documentation only; actual port binding is done with docker run -p'
        },
        {
          label: 'USER and HEALTHCHECK',
          language: 'dockerfile',
          code: `# Create and switch to non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Health check (Docker will mark container unhealthy if this fails)
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1`,
          note: 'Never run containers as root in production; always create a dedicated user'
        },
        {
          label: 'VOLUME',
          language: 'dockerfile',
          code: `# Declare a mount point for persistent data
VOLUME ["/app/data"]
VOLUME ["/var/log/app"]

# Docker auto-creates an anonymous volume at these paths`,
          note: 'VOLUME in Dockerfile creates anonymous volumes; use named volumes in Compose for persistence'
        },
        {
          label: 'Multi-stage build',
          language: 'dockerfile',
          code: `# Stage 1: build
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: production image (only copy build output)
FROM node:18-alpine AS production
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["node", "dist/index.js"]`,
          note: 'Multi-stage builds produce small final images by discarding build tools'
        }
      ]
    },
    {
      title: 'Docker Compose',
      items: [
        {
          label: 'Basic Compose file',
          language: 'yaml',
          code: `# docker-compose.yml
version: '3.9'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgres://user:pass@db:5432/mydb
    depends_on:
      - db
    restart: unless-stopped

  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: mydb
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:`
        },
        {
          label: 'image vs build',
          language: 'yaml',
          code: `services:
  # Use a pre-built image from registry
  redis:
    image: redis:7-alpine

  # Build from local Dockerfile
  app:
    build: .

  # Build with custom Dockerfile and context
  worker:
    build:
      context: ./worker
      dockerfile: Dockerfile.prod
      args:
        - NODE_ENV=production`
        },
        {
          label: 'Volumes and bind mounts',
          language: 'yaml',
          code: `services:
  app:
    volumes:
      # Named volume for persistent data
      - app_data:/app/data
      # Bind mount for local development
      - ./src:/app/src
      # Read-only bind mount
      - ./config:/app/config:ro

volumes:
  app_data:
    driver: local`,
          note: 'Named volumes persist across docker compose down; bind mounts sync with host filesystem'
        },
        {
          label: 'Networks',
          language: 'yaml',
          code: `services:
  app:
    networks:
      - frontend
      - backend

  db:
    networks:
      - backend

  nginx:
    networks:
      - frontend

networks:
  frontend:
    driver: bridge
  backend:
    driver: bridge
    internal: true  # no external internet access`,
          note: 'Services on the same network can reach each other by service name'
        },
        {
          label: 'Compose CLI commands',
          language: 'bash',
          code: `docker compose up -d              # start all services in background
docker compose up --build -d      # rebuild images then start
docker compose down               # stop and remove containers
docker compose down -v            # also remove volumes
docker compose ps                 # show service status
docker compose logs -f app        # follow logs for one service
docker compose exec app bash      # open shell in running service
docker compose restart app        # restart one service`
        },
        {
          label: 'Environment and env_file',
          language: 'yaml',
          code: `services:
  app:
    # Inline variables
    environment:
      NODE_ENV: production
      PORT: 3000

    # Load from a file (one KEY=value per line)
    env_file:
      - .env
      - .env.local`,
          note: '.env in the same directory as docker-compose.yml is auto-loaded for variable substitution'
        },
        {
          label: 'Health checks and depends_on condition',
          language: 'yaml',
          code: `services:
  db:
    image: postgres:15-alpine
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U user -d mydb"]
      interval: 10s
      timeout: 5s
      retries: 5

  app:
    build: .
    depends_on:
      db:
        condition: service_healthy`,
          note: 'depends_on with condition: service_healthy waits for the health check to pass'
        }
      ]
    },
    {
      title: 'Docker Networking',
      items: [
        {
          label: 'Network commands',
          language: 'bash',
          code: `docker network ls                          # list networks
docker network inspect bridge              # inspect a network
docker network create my-network           # create bridge network
docker network create --driver host host-net
docker network rm my-network               # remove network
docker network prune                       # remove unused networks`,
          note: 'Docker creates three default networks: bridge, host, and none'
        },
        {
          label: 'Default bridge network',
          language: 'bash',
          code: `# Containers on the default bridge network
# communicate by IP, not by name
docker run -d --name nginx nginx
docker run -d --name app myapp

# Containers cannot resolve each other by name on default bridge
# Use user-defined networks instead
docker network create my-net
docker run -d --network my-net --name nginx nginx
docker run -d --network my-net --name app myapp
# Now: curl http://nginx from app container works`,
          note: 'User-defined networks support container name DNS; the default bridge network does not'
        },
        {
          label: 'Host and none network',
          language: 'bash',
          code: `# Host network: container shares host's network stack
docker run --network host nginx
# nginx listens on port 80 of the host directly, no -p needed

# None network: completely isolated, no networking
docker run --network none alpine
# Useful for batch processing jobs that need no network`,
          note: '--network host is Linux only; not available on Docker Desktop (Mac/Windows)'
        },
        {
          label: 'Port mapping',
          language: 'bash',
          code: `docker run -p 8080:80 nginx          # host:container
docker run -p 127.0.0.1:8080:80 nginx  # bind to localhost only
docker run -p 80 nginx               # random host port mapped to 80
docker run -P nginx                  # map all EXPOSE'd ports randomly

# Check port mappings
docker port my-nginx`,
          note: 'Binding to 127.0.0.1 prevents external access even if firewall allows the port'
        },
        {
          label: 'Connect and disconnect containers',
          language: 'bash',
          code: `# Connect a running container to a network
docker network connect my-network my-container

# Disconnect
docker network disconnect my-network my-container

# Container can be on multiple networks simultaneously
docker run -d --network net1 --name app myapp
docker network connect net2 app`
        },
        {
          label: 'Container DNS',
          language: 'bash',
          code: `# On user-defined networks, containers resolve each other by name
docker network create app-net

docker run -d --network app-net --name redis redis:7
docker run -d --network app-net --name api myapi

# Inside the api container:
# ping redis           -> resolves to redis container IP
# curl http://redis:6379

# With network aliases
docker run -d --network app-net --network-alias cache redis:7`
        }
      ]
    },
    {
      title: 'Docker Volumes',
      items: [
        {
          label: 'Volume commands',
          language: 'bash',
          code: `docker volume create my-data           # create named volume
docker volume ls                       # list volumes
docker volume inspect my-data          # show volume details
docker volume rm my-data               # remove volume
docker volume prune                    # remove all unused volumes`,
          note: 'Named volumes are managed by Docker and persist across container restarts and removals'
        },
        {
          label: 'Named volume mount',
          language: 'bash',
          code: `# -v volumeName:/container/path
docker run -d \
  -v postgres_data:/var/lib/postgresql/data \
  -e POSTGRES_PASSWORD=secret \
  --name db \
  postgres:15-alpine`,
          note: 'If the volume does not exist, Docker creates it automatically'
        },
        {
          label: 'Bind mount',
          language: 'bash',
          code: `# -v /host/path:/container/path
docker run -d \
  -v $(pwd):/app \
  -v $(pwd)/logs:/app/logs \
  -w /app \
  node:18 node index.js

# Read-only bind mount
docker run -v $(pwd)/config:/app/config:ro myapp`,
          note: 'Bind mounts are ideal for development to sync local code changes into the container'
        },
        {
          label: '--mount syntax (explicit)',
          language: 'bash',
          code: `# Named volume with --mount
docker run --mount type=volume,source=my-data,target=/app/data myapp

# Bind mount with --mount
docker run --mount type=bind,source=$(pwd),target=/app,readonly myapp

# tmpfs mount (in-memory, not persisted)
docker run --mount type=tmpfs,target=/tmp,tmpfs-size=100m myapp`,
          note: '--mount is more verbose but clearer than -v; preferred for complex configurations'
        },
        {
          label: 'Backup and restore a volume',
          language: 'bash',
          code: `# Backup: tar volume contents to host
docker run --rm \
  -v my-data:/data \
  -v $(pwd):/backup \
  alpine tar czf /backup/my-data-backup.tar.gz -C /data .

# Restore
docker run --rm \
  -v my-data:/data \
  -v $(pwd):/backup \
  alpine tar xzf /backup/my-data-backup.tar.gz -C /data`
        },
        {
          label: 'Share volumes between containers',
          language: 'bash',
          code: `# Create a shared volume
docker volume create shared-logs

# Write container
docker run -d -v shared-logs:/logs --name app myapp

# Read container (e.g., log aggregator)
docker run -d -v shared-logs:/logs --name logshipper fluentd`
        }
      ]
    },
    {
      title: 'Kubectl Basics',
      items: [
        {
          label: 'Get resources',
          language: 'bash',
          code: `kubectl get pods                        # pods in default namespace
kubectl get pods -n kube-system         # pods in specific namespace
kubectl get pods -A                     # pods in all namespaces
kubectl get nodes                       # cluster nodes
kubectl get services                    # services
kubectl get deployments                 # deployments
kubectl get all                         # all resources in namespace
kubectl get pods -o wide                # extra columns (IP, node)
kubectl get pod my-pod -o yaml          # full YAML output`
        },
        {
          label: 'Describe and inspect',
          language: 'bash',
          code: `kubectl describe pod my-pod             # detailed info + events
kubectl describe node my-node
kubectl describe deployment my-app

# Events are the most useful part of describe output
# Look for "Warning" events when debugging pod failures`,
          note: 'kubectl describe is the first thing to run when a pod is not starting'
        },
        {
          label: 'Apply and delete manifests',
          language: 'bash',
          code: `kubectl apply -f deployment.yaml        # create or update
kubectl apply -f ./k8s/                 # apply all files in directory
kubectl apply -f https://raw.github.com/example/manifest.yaml

kubectl delete -f deployment.yaml       # delete resources defined in file
kubectl delete pod my-pod               # delete specific resource
kubectl delete deployment my-app        # delete deployment and its pods`,
          note: 'kubectl apply is idempotent - safe to run multiple times'
        },
        {
          label: 'Logs',
          language: 'bash',
          code: `kubectl logs my-pod                     # pod logs
kubectl logs -f my-pod                  # follow logs
kubectl logs --tail=100 my-pod          # last 100 lines
kubectl logs -p my-pod                  # previous container logs
kubectl logs my-pod -c my-container     # specific container in pod
kubectl logs -l app=my-app              # all pods with label`,
          note: 'kubectl logs -p (previous) is essential when a container crashes on startup'
        },
        {
          label: 'exec and port-forward',
          language: 'bash',
          code: `kubectl exec -it my-pod -- bash
kubectl exec -it my-pod -c sidecar -- sh   # specific container
kubectl exec my-pod -- cat /etc/config.yaml

# Forward local port to pod port (useful for debugging)
kubectl port-forward pod/my-pod 8080:80
kubectl port-forward svc/my-service 8080:80
kubectl port-forward deployment/my-app 8080:80`,
          note: 'port-forward creates a tunnel; traffic goes through the API server'
        },
        {
          label: 'Scale and rollout',
          language: 'bash',
          code: `kubectl scale deployment my-app --replicas=5
kubectl rollout status deployment/my-app
kubectl rollout history deployment/my-app
kubectl rollout undo deployment/my-app           # roll back
kubectl rollout undo deployment/my-app --to-revision=2
kubectl set image deployment/my-app app=myimage:2.0.0`,
          note: 'kubectl rollout undo is a fast recovery when a bad deploy goes out'
        },
        {
          label: 'Contexts and namespaces',
          language: 'bash',
          code: `kubectl config get-contexts               # list contexts
kubectl config use-context my-cluster     # switch cluster
kubectl config current-context

# Namespace shortcuts
kubectl get pods -n staging
kubectl config set-context --current --namespace=staging  # set default ns

# Install kubens for easy namespace switching
kubens staging`
        }
      ]
    },
    {
      title: 'Kubernetes Objects',
      items: [
        {
          label: 'Pod manifest',
          language: 'yaml',
          code: `apiVersion: v1
kind: Pod
metadata:
  name: my-pod
  labels:
    app: my-app
spec:
  containers:
    - name: app
      image: myapp:1.0.0
      ports:
        - containerPort: 3000
      env:
        - name: NODE_ENV
          value: production`,
          note: 'Pods are rarely created directly in production; use Deployments instead'
        },
        {
          label: 'Deployment',
          language: 'yaml',
          code: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
        - name: app
          image: myapp:1.0.0
          ports:
            - containerPort: 3000`,
          note: 'The selector.matchLabels must match template.metadata.labels exactly'
        },
        {
          label: 'Service types',
          language: 'yaml',
          code: `# ClusterIP (internal only, default)
apiVersion: v1
kind: Service
metadata:
  name: my-service
spec:
  type: ClusterIP
  selector:
    app: my-app
  ports:
    - port: 80
      targetPort: 3000

---
# NodePort (accessible on each node's IP)
spec:
  type: NodePort
  ports:
    - port: 80
      targetPort: 3000
      nodePort: 30080

---
# LoadBalancer (cloud provider creates external LB)
spec:
  type: LoadBalancer`
        },
        {
          label: 'ConfigMap',
          language: 'yaml',
          code: `apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  NODE_ENV: production
  LOG_LEVEL: info
  config.json: |
    {
      "featureFlags": {
        "darkMode": true
      }
    }`,
          note: 'ConfigMaps can be mounted as files or consumed as env vars'
        },
        {
          label: 'Secret',
          language: 'yaml',
          code: `apiVersion: v1
kind: Secret
metadata:
  name: app-secrets
type: Opaque
data:
  # Values must be base64 encoded
  DB_PASSWORD: c2VjcmV0cGFzc3dvcmQ=
  JWT_SECRET: bXlzdXBlcnNlY3JldA==

# Encode: echo -n 'mysecret' | base64
# Decode: echo 'bXlzdXBlcnNlY3JldA==' | base64 -d`,
          note: 'Secrets are only base64-encoded, not encrypted by default - use sealed-secrets or Vault for production'
        },
        {
          label: 'Ingress',
          language: 'yaml',
          code: `apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: my-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  rules:
    - host: myapp.example.com
      http:
        paths:
          - path: /api
            pathType: Prefix
            backend:
              service:
                name: api-service
                port:
                  number: 80
          - path: /
            pathType: Prefix
            backend:
              service:
                name: frontend-service
                port:
                  number: 80`,
          note: 'Ingress requires an Ingress Controller (nginx, traefik, etc.) to be installed'
        }
      ]
    },
    {
      title: 'Kubernetes YAML Structure',
      items: [
        {
          label: 'Resource requests and limits',
          language: 'yaml',
          code: `containers:
  - name: app
    image: myapp:1.0.0
    resources:
      requests:
        memory: "128Mi"
        cpu: "250m"
      limits:
        memory: "512Mi"
        cpu: "500m"`,
          note: 'requests is what the scheduler uses for placement; limits is the hard cap. 1000m = 1 CPU core'
        },
        {
          label: 'livenessProbe',
          language: 'yaml',
          code: `containers:
  - name: app
    livenessProbe:
      httpGet:
        path: /health
        port: 3000
      initialDelaySeconds: 15
      periodSeconds: 20
      timeoutSeconds: 5
      failureThreshold: 3`,
          note: 'If liveness fails, Kubernetes restarts the container. Use for detecting deadlocks.'
        },
        {
          label: 'readinessProbe',
          language: 'yaml',
          code: `containers:
  - name: app
    readinessProbe:
      httpGet:
        path: /ready
        port: 3000
      initialDelaySeconds: 5
      periodSeconds: 10
      failureThreshold: 3`,
          note: 'If readiness fails, pod is removed from Service endpoints but not restarted. Use for warmup.'
        },
        {
          label: 'Environment from ConfigMap and Secret',
          language: 'yaml',
          code: `containers:
  - name: app
    env:
      # Single value from ConfigMap
      - name: LOG_LEVEL
        valueFrom:
          configMapKeyRef:
            name: app-config
            key: LOG_LEVEL
      # Single value from Secret
      - name: DB_PASSWORD
        valueFrom:
          secretKeyRef:
            name: app-secrets
            key: DB_PASSWORD
    # All keys from ConfigMap as env vars
    envFrom:
      - configMapRef:
          name: app-config`
        },
        {
          label: 'Volume mounts from ConfigMap',
          language: 'yaml',
          code: `spec:
  volumes:
    - name: config-volume
      configMap:
        name: app-config
  containers:
    - name: app
      volumeMounts:
        - name: config-volume
          mountPath: /app/config
          readOnly: true`,
          note: 'Each key in the ConfigMap becomes a file in the mountPath directory'
        },
        {
          label: 'Labels and selectors',
          language: 'yaml',
          code: `metadata:
  name: my-app
  labels:
    app: my-app
    version: "1.0.0"
    environment: production
    tier: backend

# Select resources by label
# kubectl get pods -l app=my-app,environment=production`,
          note: 'Labels are the primary way Kubernetes links Services to Pods and Deployments to Pods'
        }
      ]
    },
    {
      title: 'Helm',
      items: [
        {
          label: 'Install and upgrade releases',
          language: 'bash',
          code: `helm install my-release bitnami/nginx       # install chart
helm install my-release ./my-chart          # install local chart
helm upgrade my-release bitnami/nginx       # upgrade existing release
helm upgrade --install my-release bitnami/nginx  # install if not exists, upgrade if it does
helm uninstall my-release                   # remove release and all resources`,
          note: 'helm upgrade --install is idempotent - safe for CI/CD pipelines'
        },
        {
          label: 'Override values',
          language: 'bash',
          code: `# Set individual values
helm install my-app ./chart --set service.port=8080
helm install my-app ./chart --set image.tag=1.2.0,replicas=3

# Use a values file
helm install my-app ./chart -f values.prod.yaml
helm install my-app ./chart -f values.yaml -f values.prod.yaml`,
          note: 'Later -f files override earlier ones; --set overrides everything'
        },
        {
          label: 'Inspect and template',
          language: 'bash',
          code: `helm list                               # list installed releases
helm list -n staging                    # in specific namespace
helm status my-release                  # release status
helm history my-release                 # revision history

# Preview rendered manifests without installing
helm template my-app ./chart -f values.yaml

# Show default values
helm show values bitnami/nginx`,
          note: 'helm template is invaluable for debugging what Helm will actually deploy'
        },
        {
          label: 'Rollback',
          language: 'bash',
          code: `helm history my-release            # show all revisions
helm rollback my-release 2         # roll back to revision 2
helm rollback my-release           # roll back to previous revision`,
          note: 'Helm keeps revision history; use helm history to find the revision to roll back to'
        },
        {
          label: 'Repo management',
          language: 'bash',
          code: `helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo add stable https://charts.helm.sh/stable
helm repo list
helm repo update                    # fetch latest chart lists
helm search repo nginx              # search for nginx charts
helm search hub wordpress           # search Artifact Hub`,
          note: 'Run helm repo update regularly to get the latest chart versions'
        },
        {
          label: 'values.yaml structure',
          language: 'yaml',
          code: `# values.yaml
replicaCount: 2

image:
  repository: myapp
  tag: "1.0.0"
  pullPolicy: IfNotPresent

service:
  type: ClusterIP
  port: 80

ingress:
  enabled: true
  host: myapp.example.com

resources:
  requests:
    cpu: 100m
    memory: 128Mi
  limits:
    cpu: 500m
    memory: 512Mi`,
          note: 'values.yaml provides defaults; override with -f or --set at install time'
        },
        {
          label: 'Helm chart template syntax',
          language: 'yaml',
          code: `# templates/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ .Release.Name }}-app
  labels:
    app: {{ .Chart.Name }}
    version: {{ .Chart.Version }}
spec:
  replicas: {{ .Values.replicaCount }}
  template:
    spec:
      containers:
        - name: app
          image: "{{ .Values.image.repository }}:{{ .Values.image.tag }}"
          {{- if .Values.resources }}
          resources:
            {{- toYaml .Values.resources | nindent 12 }}
          {{- end }}`,
          note: '{{ .Release.Name }} is the release name; {{ .Values.x }} reads from values.yaml'
        }
      ]
    },
    {
      title: 'Debugging Containers',
      items: [
        {
          label: 'Diagnose a failing pod',
          language: 'bash',
          code: `# Step 1: Check pod status and events
kubectl describe pod my-pod

# Step 2: Check logs (current container)
kubectl logs my-pod

# Step 3: Check previous container logs (if pod restarted)
kubectl logs -p my-pod

# Step 4: Check all container logs in the pod
kubectl logs my-pod --all-containers=true`,
          note: 'The Events section at the bottom of kubectl describe is usually where the root cause appears'
        },
        {
          label: 'Interactive debugging',
          language: 'bash',
          code: `# Shell into running container
kubectl exec -it my-pod -- bash

# If bash not available
kubectl exec -it my-pod -- sh

# Run a debug command directly
kubectl exec my-pod -- cat /etc/resolv.conf
kubectl exec my-pod -- env | grep DB_`,
          note: 'If the main container crashes too fast to exec into, use an ephemeral debug container'
        },
        {
          label: 'kubectl port-forward for local debugging',
          language: 'bash',
          code: `# Access pod directly
kubectl port-forward pod/my-pod 8080:3000

# Access via service (recommended, handles pod selection)
kubectl port-forward svc/my-service 8080:80

# Access database (postgres example)
kubectl port-forward svc/postgres 5432:5432`,
          note: 'port-forward is for debugging only; use Services and Ingress for real traffic'
        },
        {
          label: 'docker stats and inspect',
          language: 'bash',
          code: `docker stats                        # live resource usage for all containers
docker stats my-container           # single container
docker stats --no-stream            # snapshot, not live

docker inspect my-container         # full JSON metadata
docker inspect my-container | jq '.[0].NetworkSettings.Ports'
docker inspect --format '{{.State.Status}}' my-container`,
          note: 'docker stats shows CPU%, memory usage, network I/O, and block I/O in real time'
        },
        {
          label: 'Ephemeral debug containers (K8s 1.25+)',
          language: 'bash',
          code: `# Add a debug container to a running pod
kubectl debug -it my-pod --image=busybox --target=app

# Create a copy of the pod with a debug container
kubectl debug -it my-pod --image=ubuntu --copy-to=debug-pod

# Debug a node
kubectl debug node/my-node -it --image=ubuntu`,
          note: 'Useful when the main container has no shell (distroless images)'
        },
        {
          label: 'Common failure patterns',
          language: 'bash',
          code: `# CrashLoopBackOff: container crashes repeatedly
# -> kubectl logs -p my-pod (previous container logs)

# ImagePullBackOff: cannot pull image
# -> check image name/tag and registry credentials

# Pending pod: cannot be scheduled
# -> kubectl describe pod (look for Insufficient resources)

# OOMKilled: out of memory
# -> kubectl describe pod | grep -A5 "Last State"
# -> increase memory limit

# Check recent cluster events
kubectl get events --sort-by='.lastTimestamp' -A`
        }
      ]
    }
  ]
}

export default docker

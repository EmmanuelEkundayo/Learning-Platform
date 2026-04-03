const cloud = {
  id: 'cloud', title: 'Cloud & Deploy', color: 'violet',
  category: 'DevOps',
  description: 'Docker, Vercel, Railway, Nginx, and Linux deployment commands',
  sections: [
    {
      title: 'Docker Basics',
      items: [
        { label: 'Dockerfile', language: 'bash', code: `FROM node:20-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci --only=production\nCOPY . .\nEXPOSE 3000\nCMD ["node", "index.js"]`, note: 'Copy package.json first so npm ci layer is cached' },
        { label: 'Build and tag', language: 'bash', code: `# Build\ndocker build -t myapp:latest .\ndocker build -t myapp:1.0 --no-cache .\n\n# Multi-platform\ndocker buildx build --platform linux/amd64,linux/arm64 -t myapp .` },
        { label: 'Run containers', language: 'bash', code: `# Basic run\ndocker run myapp\n\n# Detached + port mapping\ndocker run -d -p 3000:3000 --name myapp myapp:latest\n\n# With env vars and volume\ndocker run -d \\\n  -p 3000:3000 \\\n  -e DATABASE_URL=postgres://... \\\n  -v $(pwd)/data:/app/data \\\n  --name myapp myapp:latest` },
        { label: 'Manage containers', language: 'bash', code: `docker ps              # running containers\ndocker ps -a           # all containers\ndocker stop myapp\ndocker start myapp\ndocker restart myapp\ndocker rm myapp        # remove stopped container\ndocker rm -f myapp     # force remove running\ndocker logs myapp      # view logs\ndocker logs -f myapp   # follow logs\ndocker exec -it myapp sh  # shell into container` },
        { label: 'Images and cleanup', language: 'bash', code: `docker images\ndocker pull node:20-alpine\ndocker push myrepo/myapp:latest\ndocker rmi myapp:latest\n\n# Cleanup\ndocker system prune     # remove unused everything\ndocker image prune      # remove dangling images\ndocker volume prune\ndocker container prune` },
      ]
    },
    {
      title: 'Docker Compose',
      items: [
        { label: 'docker-compose.yml', language: 'bash', code: `services:\n  app:\n    build: .\n    ports:\n      - "3000:3000"\n    environment:\n      - NODE_ENV=production\n      - DATABASE_URL=postgres://user:pass@db:5432/mydb\n    depends_on:\n      db:\n        condition: service_healthy\n    volumes:\n      - ./uploads:/app/uploads\n\n  db:\n    image: postgres:16\n    environment:\n      POSTGRES_DB: mydb\n      POSTGRES_USER: user\n      POSTGRES_PASSWORD: pass\n    volumes:\n      - pgdata:/var/lib/postgresql/data\n    healthcheck:\n      test: ["CMD", "pg_isready"]\n      interval: 5s\n      timeout: 5s\n      retries: 5\n\nvolumes:\n  pgdata:` },
        { label: 'Compose commands', language: 'bash', code: `docker compose up             # start all\ndocker compose up -d          # detached\ndocker compose up --build     # rebuild images\ndocker compose down           # stop + remove containers\ndocker compose down -v        # also remove volumes\ndocker compose logs -f        # follow all logs\ndocker compose logs app       # specific service\ndocker compose exec app sh    # shell into service\ndocker compose ps             # status\ndocker compose restart app` },
        { label: 'Networking', language: 'bash', code: `services:\n  app:\n    networks:\n      - frontend\n      - backend\n  db:\n    networks:\n      - backend\n  nginx:\n    networks:\n      - frontend\n\nnetworks:\n  frontend:\n  backend:\n    internal: true   # no external access`, note: 'Services on same network can reach each other by service name' },
        { label: 'Profiles and overrides', language: 'bash', code: `# docker-compose.yml (base)\n# docker-compose.override.yml (dev auto-applied)\n# docker-compose.prod.yml (explicit)\n\ndocker compose -f docker-compose.yml -f docker-compose.prod.yml up\n\n# Profiles\nservices:\n  mailhog:\n    image: mailhog/mailhog\n    profiles: [dev]\n\ndocker compose --profile dev up` },
      ]
    },
    {
      title: 'Vercel Deployment',
      items: [
        { label: 'Install and login', language: 'bash', code: `npm install -g vercel\nvercel login\n\n# Or use npx (no global install)\nnpx vercel login` },
        { label: 'Deploy', language: 'bash', code: `vercel               # preview deploy (prompts for config)\nvercel --prod        # production deploy\nvercel --yes         # skip prompts (use defaults)\n\n# Deploy specific directory\nvercel ./dist --prod\n\n# Link existing project\nvercel link` },
        { label: 'Environment variables', language: 'bash', code: `# Add via CLI\nvercel env add DATABASE_URL production\nvercel env add DATABASE_URL preview\nvercel env add DATABASE_URL development\n\n# List\nvercel env ls\n\n# Pull to local .env.local\nvercel env pull .env.local\n\n# Remove\nvercel env rm DATABASE_URL production` },
        { label: 'vercel.json config', language: 'bash', code: `{\n  "buildCommand": "npm run build",\n  "outputDirectory": "dist",\n  "installCommand": "npm ci",\n  "framework": "vite",\n  "rewrites": [\n    { "source": "/(.*)", "destination": "/index.html" }\n  ],\n  "headers": [\n    {\n      "source": "/api/(.*)",\n      "headers": [{ "key": "Cache-Control", "value": "no-store" }]\n    }\n  ]\n}`, note: 'rewrites: SPA fallback — serves index.html for all routes' },
        { label: 'Domains and aliases', language: 'bash', code: `vercel domains ls\nvercel domains add example.com\nvercel alias set my-deploy.vercel.app example.com\n\n# Inspect deployment\nvercel inspect\nvercel logs myapp.vercel.app` },
      ]
    },
    {
      title: 'Railway Deployment',
      items: [
        { label: 'Install and login', language: 'bash', code: `npm install -g @railway/cli\nrailway login\n\n# Or link existing project\nrailway link` },
        { label: 'Deploy and manage', language: 'bash', code: `railway up              # deploy current directory\nrailway up --detach     # deploy without following logs\nrailway status          # deployment status\nrailway logs            # view logs\nrailway logs --tail     # follow logs\nrailway open            # open project in browser\nrailway run <cmd>       # run command in Railway env` },
        { label: 'Environment variables', language: 'bash', code: `# Set variable\nrailway variables set DATABASE_URL=postgres://...\nrailway variables set API_KEY=secret123\n\n# List all\nrailway variables\n\n# Delete\nrailway variables delete API_KEY\n\n# Export to .env\nrailway variables --json > .env.json` },
        { label: 'Databases and services', language: 'bash', code: `# Add a database (Postgres, MySQL, Redis, MongoDB)\nrailway add                  # interactive menu\n\n# Connect variables automatically set:\n# PGHOST, PGPORT, PGDATABASE, PGUSER, PGPASSWORD\n# DATABASE_URL\n\n# Access database shell\nrailway connect postgres\nrailway connect redis` },
      ]
    },
    {
      title: 'Environment Variables',
      items: [
        { label: '.env file format', language: 'bash', code: `# .env file\nNODE_ENV=production\nPORT=3000\nDATABASE_URL=postgres://user:pass@host:5432/db\nAPI_KEY=sk-abc123\nJWT_SECRET=a-very-long-random-secret\n\n# Quoted strings (for spaces/special chars)\nAPP_NAME="My App Name"\n\n# Never commit .env to git!\n# Add .env to .gitignore` },
        { label: 'Node.js access', language: 'javascript', code: `// Built-in (Node 20+)\nconst port = process.env.PORT ?? 3000;\nconst dbUrl = process.env.DATABASE_URL;\n\n// With dotenv package\nimport 'dotenv/config';\n// or\nrequire('dotenv').config();\n\n// Validate required vars\nconst required = ['DATABASE_URL', 'JWT_SECRET'];\nrequired.forEach(key => {\n  if (!process.env[key]) throw new Error(\`Missing \${key}\`);\n});` },
        { label: 'Python access', language: 'python', code: `import os\nfrom dotenv import load_dotenv  # pip install python-dotenv\n\nload_dotenv()  # loads .env file\n\ndb_url = os.environ['DATABASE_URL']    # raises KeyError\ndb_url = os.environ.get('DATABASE_URL')  # None if missing\ndb_url = os.getenv('DATABASE_URL', 'sqlite:///dev.db')  # fallback\n\n# Validate required\nfor key in ['DATABASE_URL', 'SECRET_KEY']:\n    if not os.getenv(key):\n        raise RuntimeError(f"Missing required env var: {key}")` },
        { label: 'Vite / Frontend env vars', language: 'bash', code: `# .env files in Vite project\n.env                 # always loaded\n.env.local           # always loaded, git-ignored\n.env.development     # dev only\n.env.production      # prod only\n\n# Must be prefixed with VITE_ to be exposed to browser\nVITE_API_URL=https://api.example.com\nVITE_APP_TITLE=My App\n\n# Access in code\nimport.meta.env.VITE_API_URL` },
        { label: 'Secrets best practices', language: 'bash', code: `# .gitignore\n.env\n.env.local\n.env.*.local\n*.key\nsecrets/\n\n# Rotate secrets if leaked\n# Use different values per environment\n# Never log secrets even partially\n# Use a secret manager in production:\n# AWS Secrets Manager, HashiCorp Vault,\n# Doppler, 1Password Secrets Automation` },
      ]
    },
    {
      title: 'Nginx Config',
      items: [
        { label: 'Basic server block', language: 'bash', code: `server {\n    listen 80;\n    server_name example.com www.example.com;\n    root /var/www/html;\n    index index.html;\n\n    location / {\n        try_files $uri $uri/ /index.html;  # SPA fallback\n    }\n\n    location /api/ {\n        proxy_pass http://localhost:3000/;\n    }\n}` },
        { label: 'HTTPS with SSL', language: 'bash', code: `server {\n    listen 443 ssl http2;\n    server_name example.com;\n\n    ssl_certificate     /etc/letsencrypt/live/example.com/fullchain.pem;\n    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;\n    ssl_protocols TLSv1.2 TLSv1.3;\n\n    # Redirect HTTP to HTTPS\n    if ($scheme != "https") {\n        return 301 https://$host$request_uri;\n    }\n}` },
        { label: 'Reverse proxy', language: 'bash', code: `location /api/ {\n    proxy_pass         http://localhost:3000/;\n    proxy_http_version 1.1;\n    proxy_set_header   Host              $host;\n    proxy_set_header   X-Real-IP         $remote_addr;\n    proxy_set_header   X-Forwarded-For   $proxy_add_x_forwarded_for;\n    proxy_set_header   X-Forwarded-Proto $scheme;\n    proxy_set_header   Upgrade           $http_upgrade;\n    proxy_set_header   Connection        'upgrade';\n}` },
        { label: 'Gzip and caching', language: 'bash', code: `# Gzip compression\ngzip on;\ngzip_vary on;\ngzip_min_length 1024;\ngzip_types text/plain text/css application/json\n           application/javascript text/xml\n           application/xml application/xml+rss;\n\n# Cache static assets\nlocation ~* \\.(js|css|png|jpg|gif|ico|woff2)$ {\n    expires 1y;\n    add_header Cache-Control "public, immutable";\n}` },
        { label: 'Common commands', language: 'bash', code: `nginx -t                 # test config\nnginx -T                 # test + dump config\nsystemctl reload nginx   # reload (no downtime)\nsystemctl restart nginx\nsystemctl status nginx\n\n# Config locations\n/etc/nginx/nginx.conf          # main config\n/etc/nginx/sites-available/    # site configs\n/etc/nginx/sites-enabled/      # symlinked active sites\n\n# Enable site\nln -s /etc/nginx/sites-available/myapp /etc/nginx/sites-enabled/` },
      ]
    },
    {
      title: 'Linux Commands',
      items: [
        { label: 'File system', language: 'bash', code: `pwd               # current directory\nls -la            # list with hidden files + permissions\ncd /path/to/dir\ncd ~              # home directory\ncd -              # previous directory\nmkdir -p a/b/c    # create nested dirs\nrm -rf dir/       # remove directory recursively\ncp -r src/ dest/  # copy recursively\nmv old new        # move/rename\nln -s target link # symbolic link\nfind . -name "*.log" -newer file.txt` },
        { label: 'Text processing', language: 'bash', code: `cat file.txt\nhead -n 20 file.txt      # first 20 lines\ntail -n 50 file.txt      # last 50 lines\ntail -f app.log          # follow log in real-time\ngrep "error" app.log\ngrep -r "TODO" ./src     # recursive\ngrep -n "pattern" file   # with line numbers\nsed -i 's/old/new/g' file.txt  # in-place replace\nawk '{print $1}' file.txt      # print first column\nwc -l file.txt           # count lines` },
        { label: 'Permissions', language: 'bash', code: `# chmod: change file permissions\nchmod 644 file.txt     # rw-r--r--\nchmod 755 script.sh    # rwxr-xr-x\nchmod +x script.sh     # add execute\nchmod -R 755 dir/      # recursive\n\n# chown: change owner\nchown user:group file\nchown -R www-data:www-data /var/www/\n\n# Permission digits: 4=read 2=write 1=execute\n# 7=rwx 6=rw- 5=r-x 4=r-- 0=---` },
        { label: 'Process management', language: 'bash', code: `ps aux                   # list processes\nps aux | grep nginx      # filter\ntop                      # interactive process viewer\nhtop                     # nicer top\nkill -9 <pid>            # force kill by PID\npkill nginx              # kill by name\nkillall node\n\n# Background jobs\ncommand &                # run in background\nnohup command &          # persist after logout\njobs                     # list background jobs\nbg %1 / fg %1            # background/foreground` },
        { label: 'System and networking', language: 'bash', code: `df -h                    # disk usage\ndu -sh ./dir             # directory size\nfree -h                  # memory usage\nuname -a                 # system info\n\ncurl -I https://example.com    # headers only\ncurl -X POST url -d '{}' -H 'Content-Type: application/json'\nwget -O file.zip https://example.com/file.zip\n\nnetstat -tulpn           # open ports\nss -tulpn                # modern netstat\nlsof -i :3000            # what's using port 3000\nssh user@host\nssh-keygen -t ed25519 -C "email@example.com"` },
      ]
    },
    {
      title: 'Common Ports',
      items: [
        { label: 'Web and proxy', language: 'bash', code: `80    # HTTP\n443   # HTTPS\n8080  # HTTP alternate / dev servers\n8443  # HTTPS alternate\n3000  # Node.js / React dev\n5173  # Vite dev server\n4173  # Vite preview\n3001  # Express / alternate` },
        { label: 'Database ports', language: 'bash', code: `5432  # PostgreSQL\n3306  # MySQL / MariaDB\n27017 # MongoDB\n1433  # SQL Server\n1521  # Oracle\n9200  # Elasticsearch\n9300  # Elasticsearch (cluster)\n5984  # CouchDB` },
        { label: 'Cache and messaging', language: 'bash', code: `6379  # Redis\n11211 # Memcached\n5672  # RabbitMQ (AMQP)\n15672 # RabbitMQ management UI\n9092  # Kafka broker\n2181  # ZooKeeper\n4369  # RabbitMQ Erlang distribution` },
        { label: 'Dev tools and services', language: 'bash', code: `22    # SSH\n21    # FTP\n25    # SMTP\n587   # SMTP (submission)\n465   # SMTP SSL\n110   # POP3\n143   # IMAP\n8025  # MailHog SMTP\n8025  # MailHog web UI\n9090  # Prometheus\n3100  # Loki\n2375  # Docker daemon (unsecured)\n2376  # Docker daemon (TLS)` },
      ]
    },
  ]
}

export default cloud

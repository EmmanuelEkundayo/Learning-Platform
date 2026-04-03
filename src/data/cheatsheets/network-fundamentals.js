const networkFundamentals = {
  id: 'network-fundamentals',
  title: 'Network Fundamentals',
  color: 'blue',
  category: 'Backend',
  description: 'OSI model, TCP/IP, common protocols, ports, and web networking concepts',
  sections: [
    {
      title: 'OSI Model Layers',
      items: [
        { label: 'Layer 7 - Application', language: 'text', code: `HTTP, FTP, SMTP, DNS, SSH, Telnet`, note: 'Closest to the user; provides services for apps' },
        { label: 'Layer 6 - Presentation', language: 'text', code: `SSL/TLS, JPEG, GIF, MP3, ASCII`, note: 'Handles data translation and encryption' },
        { label: 'Layer 5 - Session', language: 'text', code: `NetBIOS, RPC, Sockets`, note: 'Manages sessions between applications' },
        { label: 'Layer 4 - Transport', language: 'text', code: `TCP, UDP`, note: 'Handles end-to-end communication and data flow control' },
        { label: 'Layer 3 - Network', language: 'text', code: `IP (IPv4, IPv6), ICMP, Router`, note: 'Manages logical addressing and routing' },
        { label: 'Layer 2 - Data Link', language: 'text', code: `Ethernet, MAC Address, Switch`, note: 'Provides physical addressing and error detection' },
        { label: 'Layer 1 - Physical', language: 'text', code: `Cables, Hubs, Repeater, Bits`, note: 'Transmission of raw bits over physical medium' }
      ]
    },
    {
      title: 'TCP vs UDP',
      items: [
        { label: 'TCP - Transmission Control Protocol', language: 'text', code: `1. Connection-oriented (3-way handshake)\n2. Reliability (retransmits lost packets)\n3. Ordered (segments arrive in order)\n4. Error-checked`, note: 'Used for HTTP, SSH, FTP, SMTP' },
        { label: 'UDP - User Datagram Protocol', language: 'text', code: `1. Connectionless (send and forget)\n2. Fast (low overhead)\n3. Unreliable (no retransmissions)\n4. Unordered`, note: 'Used for Streaming, Gaming, VoIp, DNS' },
        { label: '3-Way Handshake', language: 'text', code: `SYN -> SYN-ACK -> ACK`, note: 'The sequence for establishing a TCP connection' },
        { label: 'TCP vs UDP Comparison', language: 'text', code: `TCP: Reliable but slow\nUDP: Fast but lossy` }
      ]
    },
    {
      title: 'Common Ports',
      items: [
        { label: 'Web Protocols', language: 'text', code: `HTTP: 80\nHTTPS: 443\nHTTP3: 443 (UDP)` },
        { label: 'Remote Access', language: 'text', code: `SSH: 22\nTelnet: 23\nRDP: 3389` },
        { label: 'File & Email', language: 'text', code: `FTP: 21 (control)\nSMTP: 25\nIMAP: 143\nPOP3: 110` },
        { label: 'Database Ports', language: 'text', code: `MySQL: 3306\nPostgreSQL: 5432\nRedis: 6379\nMongoDB: 27017` },
        { label: 'Infrastructure', language: 'text', code: `DNS: 53 (UDP)\nDHCP: 67, 68` }
      ]
    },
    {
      title: 'HTTP Methods',
      items: [
        { label: 'GET', language: 'text', code: `Retrieves data from a resource (idempotent/safe)` },
        { label: 'POST', language: 'text', code: `Creates a new resource (non-idempotent)` },
        { label: 'PUT', language: 'text', code: `Updates an entire resource (idempotent)` },
        { label: 'PATCH', language: 'text', code: `Partially updates a resource (non-idempotent)` },
        { label: 'DELETE', language: 'text', code: `Removes a resource (idempotent)` },
        { label: 'OPTIONS', language: 'text', code: `Returns allowed methods (PREFLIGHT/safe)` }
      ]
    },
    {
      title: 'HTTP Status Codes',
      items: [
        { label: '1xx Informational', language: 'text', code: `100 Continue\n101 Switching Protocols` },
        { label: '2xx Success', language: 'text', code: `200 OK\n201 Created (POST)\n204 No Content` },
        { label: '3xx Redirection', language: 'text', code: `301 Moved Permanently\n302 Found (moved temporarily)\n304 Not Modified (caching)` },
        { label: '4xx Client Error', language: 'text', code: `400 Bad Request\n401 Unauthorized\n403 Forbidden\n404 Not Found\n429 Too Many Requests (rate limiting)` },
        { label: '5xx Server Error', language: 'text', code: `500 Internal Server Error\n502 Bad Gateway\n503 Service Unavailable\n504 Gateway Timeout` }
      ]
    },
    {
      title: 'DNS Resource Records',
      items: [
        { label: 'A Record', language: 'text', code: `Maps hostname to IPv4 address` },
        { label: 'AAAA Record', language: 'text', code: `Maps hostname to IPv6 address` },
        { label: 'CNAME Record', language: 'text', code: `Alias (one hostname to another domain)` },
        { label: 'MX Record', language: 'text', code: `Mail Exchange (handles email servers for a domain)` },
        { label: 'TXT Record', language: 'text', code: `Stores text info (often used for verification: SPF, DKIM)` },
        { label: 'NS Record', language: 'text', code: `Indicates the authoritative Name Servers for a domain` }
      ]
    },
    {
      title: 'IP Addressing',
      items: [
        { label: 'IPv4 Address', language: 'text', code: `32-bit (4 decimal segments: 192.168.1.1)`, note: 'approx. 4.3 billion addresses' },
        { label: 'IPv6 Address', language: 'text', code: `128-bit (8 hex segments: 2001:0db8:...)`, note: 'v6 solves the address exhaustion problem' },
        { label: 'Subnet Mask', language: 'text', code: `255.255.255.0 (/24 notation)`, note: 'Separates the network portion from the host portion' },
        { label: 'Public vs Private', language: 'text', code: `Private IPs (RFC 1918): 10.x, 172.16.x, 192.168.x`, note: 'Private addresses are not routable on the public internet' }
      ]
    },
    {
      title: 'Load Balancing',
      items: [
        { label: 'Layer 4 Load Balancing', language: 'text', code: `Based on Transport Layer (IP/Port only)`, note: 'Very fast as it doesnt inspect the data' },
        { label: 'Layer 7 Load Balancing', language: 'text', code: `Based on Application Layer (HTTP Headers, Cookies, URL)`, note: 'Allows for sophisticated routing rules' },
        { label: 'Algorithms', language: 'text', code: `Round Robin, Least Connections, IP Hash` }
      ]
    },
    {
      title: 'SSL/TLS Concepts',
      items: [
        { label: 'SSL/TLS Handshake', language: 'text', code: `1. Client Hello\n2. Server Hello + Certificate\n3. Authentication\n4. Key Exchange\n5. Symmetric Encryption begins` },
        { label: 'Public/Private Keys', language: 'text', code: `Asymmetric encryption establishes secure symmetric keys` },
        { label: 'Certificate Authority (CA)', language: 'text', code: `Trusted third-party (like Let's Encrypt) that signs certificates` }
      ]
    }
  ]
}

export default networkFundamentals

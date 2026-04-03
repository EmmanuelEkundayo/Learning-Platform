const python = {
  id: 'python', title: 'Python', color: 'emerald',
  category: 'Languages',
  description: 'Python 3 syntax, data structures, classes, and standard library',
  sections: [
    {
      title: 'Variables & Types',
      items: [
        { label: 'Basic types', language: 'python', code: `# Numbers\nx = 42         # int\ny = 3.14       # float\nz = 2 + 3j     # complex\nbig = 10_000_000  # underscores for readability\n\n# Booleans\nt = True\nf = False\n\n# None (null equivalent)\nval = None\n\n# Check type\ntype(x)        # <class 'int'>\nprint(type(x).__name__)  # 'int'` },
        { label: 'Type conversion', language: 'python', code: `int("42")          # 42\nint(3.9)           # 3 (truncates)\nfloat("3.14")      # 3.14\nstr(100)           # "100"\nbool(0)            # False\nbool("")           # False\nbool([])           # False\nbool(1)            # True\nbool("hello")      # True\nlist("abc")        # ['a', 'b', 'c']\ntuple([1,2,3])     # (1, 2, 3)` },
        { label: 'isinstance and type checks', language: 'python', code: `isinstance(42, int)           # True\nisinstance(42, (int, float))  # True\n\n# Check for None\nif val is None:\n    print("nothing")\n\nif val is not None:\n    print("something")\n\n# Walrus operator (Python 3.8+)\nif n := len(data):\n    print(f"Got {n} items")` },
        { label: 'Multiple assignment', language: 'python', code: `a = b = c = 0       # all = 0\na, b = 1, 2         # tuple unpacking\na, b = b, a         # swap\nfirst, *rest = [1, 2, 3, 4]   # first=1, rest=[2,3,4]\n*init, last = [1, 2, 3, 4]    # init=[1,2,3], last=4\na, _, b = (1, 2, 3)           # skip middle` },
      ]
    },
    {
      title: 'Strings',
      items: [
        { label: 'f-strings', language: 'python', code: `name = "Alice"\nage = 30\n\nf"Hello {name}"                # Hello Alice\nf"{age:03d}"                   # 030 (padded)\nf"{3.14159:.2f}"               # 3.14\nf"{name!r}"                    # 'Alice' (repr)\nf"{2**10:,}"                   # 1,024 (comma sep)\nf"{'left':<10}|{'right':>10}"  # alignment` },
        { label: 'String methods', language: 'python', code: `s = "  Hello, World!  "\n\ns.strip()             # "Hello, World!"\ns.lower()             # "  hello, world!  "\ns.upper()             # "  HELLO, WORLD!  "\ns.replace("Hello", "Hi")   # "  Hi, World!  "\ns.split(", ")         # ['  Hello', 'World!  ']\n", ".join(["a","b","c"])  # "a, b, c"\ns.startswith("  H")  # True\ns.find("World")       # 9` },
        { label: 'String slicing', language: 'python', code: `s = "Hello, World!"\n\ns[0]       # 'H'\ns[-1]      # '!'\ns[0:5]     # 'Hello'\ns[7:]      # 'World!'\ns[:5]      # 'Hello'\ns[::2]     # every other char\ns[::-1]    # reversed: '!dlroW ,olleH'\ns[7:12]    # 'World'` },
        { label: 'Multiline strings', language: 'python', code: `text = """\nLine one\nLine two\nLine three\n"""\n\n# Continued string (no newline)\nquery = (\n    "SELECT * FROM users "\n    "WHERE active = true "\n    "LIMIT 10"\n)\n\ndocstring = """\nFunction description.\n\nArgs:\n    x: input value\n"""` },
      ]
    },
    {
      title: 'Lists',
      items: [
        { label: 'List operations', language: 'python', code: `lst = [1, 2, 3]\n\nlst.append(4)        # [1,2,3,4]\nlst.extend([5,6])    # [1,2,3,4,5,6]\nlst.insert(0, 0)     # [0,1,2,3,4,5,6]\nlst.remove(3)        # removes first 3\nlst.pop()            # removes & returns last\nlst.pop(0)           # removes & returns index 0\nlst.index(2)         # index of value 2\nlst.count(2)         # occurrences of 2\nlst.sort()\nlst.sort(reverse=True)\nlst.reverse()` },
        { label: 'List slicing', language: 'python', code: `lst = [0, 1, 2, 3, 4, 5]\n\nlst[1:4]     # [1, 2, 3]\nlst[:3]      # [0, 1, 2]\nlst[3:]      # [3, 4, 5]\nlst[-2:]     # [4, 5]\nlst[::2]     # [0, 2, 4]\nlst[::-1]    # [5, 4, 3, 2, 1, 0]\n\n# Copy\ncopy = lst[:]\ncopy = list(lst)\n\n# Replace slice\nlst[1:3] = [10, 20]` },
        { label: 'List comprehension', language: 'python', code: `# Basic\nsquares = [x**2 for x in range(10)]\n\n# With condition\nevens = [x for x in range(20) if x % 2 == 0]\n\n# Nested\nmatrix = [[i*j for j in range(1,4)] for i in range(1,4)]\n\n# Flatten\nflat = [item for sublist in matrix for item in sublist]\n\n# Transformation\nnames = [name.strip().title() for name in raw_names if name]` },
        { label: 'sorted and sort', language: 'python', code: `# sorted: returns new list\nsorted([3,1,2])                    # [1, 2, 3]\nsorted([3,1,2], reverse=True)      # [3, 2, 1]\nsorted(users, key=lambda u: u.age) # by attribute\nsorted(words, key=str.lower)       # case-insensitive\nsorted(pairs, key=lambda x: (x[1], x[0])) # multi-key\n\n# sort: in-place\nlst.sort(key=lambda x: x['name'])` },
      ]
    },
    {
      title: 'Dictionaries',
      items: [
        { label: 'Creating and accessing', language: 'python', code: `# Create\nd = {'name': 'Alice', 'age': 30}\nd = dict(name='Alice', age=30)\n\n# Access\nd['name']              # 'Alice' (KeyError if missing)\nd.get('name')          # 'Alice'\nd.get('city', 'N/A')   # 'N/A' (default)\n\n# Membership\n'name' in d            # True\n'city' not in d        # True\n\n# All keys/values/pairs\nlist(d.keys())\nlist(d.values())\nlist(d.items())` },
        { label: 'Updating and deleting', language: 'python', code: `d = {'a': 1, 'b': 2}\n\nd['c'] = 3             # add or update\nd.update({'c': 30, 'd': 4})\nd.update(e=5)          # kwargs syntax\n\ndel d['a']\nremoved = d.pop('b')   # remove and return\nd.pop('z', None)       # safe pop with default\nd.clear()              # remove all entries` },
        { label: 'Dict comprehension', language: 'python', code: `# Basic\nsquares = {x: x**2 for x in range(6)}\n\n# Filtered\neven_sq = {x: x**2 for x in range(10) if x % 2 == 0}\n\n# Swap keys and values\ninverted = {v: k for k, v in original.items()}\n\n# From lists\nkeys = ['a', 'b', 'c']\nvals = [1, 2, 3]\nd = dict(zip(keys, vals))  # or {k:v for k,v in zip(keys,vals)}` },
        { label: 'defaultdict and Counter', language: 'python', code: `from collections import defaultdict, Counter\n\n# defaultdict\ndd = defaultdict(list)\ndd['a'].append(1)   # no KeyError\ndd['a'].append(2)\n# dd == {'a': [1, 2]}\n\n# Counter\nc = Counter('abracadabra')\nc.most_common(3)    # [('a', 5), ('b', 2), ('r', 2)]\nc['a']              # 5\nCounter([1,1,2,3]) + Counter([1,2,2]) # combine` },
      ]
    },
    {
      title: 'Sets & Tuples',
      items: [
        { label: 'Sets', language: 'python', code: `s = {1, 2, 3}\ns = set([1, 2, 2, 3])  # {1, 2, 3} — deduplicates\n\ns.add(4)\ns.discard(4)      # no error if missing\ns.remove(4)       # KeyError if missing\n\na = {1, 2, 3, 4}\nb = {3, 4, 5, 6}\na | b   # union:        {1,2,3,4,5,6}\na & b   # intersection: {3, 4}\na - b   # difference:   {1, 2}\na ^ b   # symmetric diff:{1,2,5,6}` },
        { label: 'Tuples', language: 'python', code: `t = (1, 2, 3)\nt = 1, 2, 3    # parens optional\nt = (42,)      # single-element tuple (comma needed)\n\n# Access (same as list)\nt[0]           # 1\nt[-1]          # 3\nt[1:]          # (2, 3)\n\n# Unpacking\nx, y, z = t\na, *rest = t\n\n# Immutable — cannot reassign elements`, note: 'Tuples are hashable (can be dict keys); lists are not' },
        { label: 'Named tuples', language: 'python', code: `from collections import namedtuple\n\nPoint = namedtuple('Point', ['x', 'y'])\np = Point(3, 4)\np.x, p.y    # 3, 4\np[0], p[1]  # 3, 4\n\n# dataclass alternative (Python 3.7+)\nfrom dataclasses import dataclass\n\n@dataclass\nclass Point:\n    x: float\n    y: float\n\np = Point(3.0, 4.0)\nprint(p)  # Point(x=3.0, y=4.0)` },
        { label: 'frozenset', language: 'python', code: `# Immutable set — hashable, usable as dict key\nfs = frozenset([1, 2, 3])\n\ncache = {}\ncache[frozenset([1,2,3])] = 'result'\n\n# Supports set operations\nfs1 = frozenset({1,2})\nfs2 = frozenset({2,3})\nfs1 & fs2  # frozenset({2})` },
      ]
    },
    {
      title: 'Functions',
      items: [
        { label: '*args and **kwargs', language: 'python', code: `def log(*args, **kwargs):\n    print("args:", args)\n    print("kwargs:", kwargs)\n\nlog(1, 2, 3, sep=",", end="")\n# args: (1, 2, 3)\n# kwargs: {'sep': ',', 'end': ''}\n\n# Unpacking into function call\ndef add(a, b, c): return a+b+c\nnums = [1, 2, 3]\nadd(*nums)\nopts = {'b': 2, 'c': 3}\nadd(1, **opts)` },
        { label: 'Lambda', language: 'python', code: `# Lambda: single-expression anonymous function\ndouble = lambda x: x * 2\nadd    = lambda x, y: x + y\n\n# Common uses\nsorted(items, key=lambda x: x[1])\nfilter(lambda x: x > 0, nums)\nmap(lambda x: x.strip(), strings)\n\n# Prefer def for anything non-trivial`, note: 'Lambdas have no statements, no assignments, no annotations' },
        { label: 'Decorators', language: 'python', code: `import functools\n\ndef timer(func):\n    @functools.wraps(func)  # preserve __name__, __doc__\n    def wrapper(*args, **kwargs):\n        import time\n        start = time.time()\n        result = func(*args, **kwargs)\n        print(f"{func.__name__}: {time.time()-start:.3f}s")\n        return result\n    return wrapper\n\n@timer\ndef slow_function():\n    pass` },
        { label: 'Type hints', language: 'python', code: `from typing import Optional, Union, list, dict\n\ndef greet(name: str) -> str:\n    return f"Hello {name}"\n\ndef process(\n    items: list[int],\n    config: dict[str, str] | None = None\n) -> list[str]:\n    ...\n\n# Python 3.10+ union syntax\ndef func(x: int | float | None) -> str: ...` },
      ]
    },
    {
      title: 'Classes',
      items: [
        { label: 'Class definition', language: 'python', code: `class BankAccount:\n    interest_rate = 0.02   # class variable\n\n    def __init__(self, owner: str, balance: float = 0):\n        self.owner = owner       # instance variable\n        self._balance = balance  # convention: protected\n\n    def deposit(self, amount: float) -> None:\n        self._balance += amount\n\n    def __repr__(self) -> str:\n        return f"BankAccount({self.owner!r}, {self._balance})"` },
        { label: 'Inheritance', language: 'python', code: `class SavingsAccount(BankAccount):\n    def __init__(self, owner, balance=0):\n        super().__init__(owner, balance)\n        self.interest_earned = 0\n\n    def apply_interest(self):\n        gain = self._balance * self.interest_rate\n        self.deposit(gain)\n        self.interest_earned += gain\n\n# Multiple inheritance\nclass C(A, B):\n    pass\n# Method Resolution Order (MRO)\nC.__mro__` },
        { label: 'Dunder methods', language: 'python', code: `class Vector:\n    def __init__(self, x, y):\n        self.x, self.y = x, y\n\n    def __repr__(self): return f"Vector({self.x}, {self.y})"\n    def __str__(self):  return f"({self.x}, {self.y})"\n    def __add__(self, other): return Vector(self.x+other.x, self.y+other.y)\n    def __len__(self):  return 2\n    def __eq__(self, other): return self.x==other.x and self.y==other.y\n    def __hash__(self): return hash((self.x, self.y))` },
        { label: '@property, @classmethod, @staticmethod', language: 'python', code: `class Circle:\n    def __init__(self, radius):\n        self._radius = radius\n\n    @property\n    def radius(self): return self._radius\n\n    @radius.setter\n    def radius(self, val):\n        if val < 0: raise ValueError("negative radius")\n        self._radius = val\n\n    @classmethod\n    def from_diameter(cls, d): return cls(d / 2)\n\n    @staticmethod\n    def area_of(r): return 3.14159 * r ** 2` },
      ]
    },
    {
      title: 'Comprehensions',
      items: [
        { label: 'List, dict, set comprehensions', language: 'python', code: `# List\n[x**2 for x in range(10)]\n[x for x in lst if x > 0]\n\n# Dict\n{k: v for k, v in pairs}\n{s: len(s) for s in words}\n\n# Set\n{x % 10 for x in range(100)}\n\n# With condition (ternary)\n[x if x > 0 else 0 for x in nums]` },
        { label: 'Generator expressions', language: 'python', code: `# Like list comp but lazy — use () not []\ntotal = sum(x**2 for x in range(1000))   # no intermediate list\n\n# Use in any iterable context\nmax(len(s) for s in strings)\n','.join(str(x) for x in nums)\nall(x > 0 for x in nums)\nany(x < 0 for x in nums)\n\ngen = (x**2 for x in range(10))\nnext(gen)   # 0\nnext(gen)   # 1`, note: 'Generators are memory-efficient for large sequences' },
        { label: 'Nested comprehensions', language: 'python', code: `# Flatten 2D list\nmatrix = [[1,2],[3,4],[5,6]]\nflat = [x for row in matrix for x in row]  # [1,2,3,4,5,6]\n\n# Build 2D structure\ngrid = [[r*c for c in range(1,4)] for r in range(1,4)]\n# [[1,2,3],[2,4,6],[3,6,9]]\n\n# Cartesian product\npairs = [(x,y) for x in [1,2] for y in ['a','b']]` },
        { label: 'walrus in comprehension', language: 'python', code: `# Use := to capture a value\nresults = [\n    transformed\n    for x in data\n    if (transformed := expensive(x)) is not None\n]\n\n# Filter and use computed value\neven_sq = [\n    sq for x in range(20)\n    if (sq := x**2) % 2 == 0\n]` },
      ]
    },
    {
      title: 'File I/O',
      items: [
        { label: 'Reading files', language: 'python', code: `# Read entire file\nwith open('file.txt', 'r', encoding='utf-8') as f:\n    content = f.read()\n\n# Read lines\nwith open('file.txt') as f:\n    lines = f.readlines()   # list of strings with \\n\n    lines = [l.rstrip() for l in f]  # strip newlines\n\n# Read one line at a time\nwith open('large.txt') as f:\n    for line in f:\n        process(line.strip())` },
        { label: 'Writing files', language: 'python', code: `# Write (overwrites)\nwith open('out.txt', 'w', encoding='utf-8') as f:\n    f.write("Hello World\\n")\n    f.writelines(["line1\\n", "line2\\n"])\n\n# Append\nwith open('log.txt', 'a') as f:\n    f.write(f"{timestamp}: {message}\\n")\n\n# Write binary\nwith open('img.png', 'wb') as f:\n    f.write(bytes_data)` },
        { label: 'JSON', language: 'python', code: `import json\n\n# Read JSON file\nwith open('data.json') as f:\n    data = json.load(f)\n\n# Write JSON file\nwith open('out.json', 'w') as f:\n    json.dump(data, f, indent=2)\n\n# String conversion\ntext = json.dumps({'key': 'value'}, indent=2)\ndata = json.loads(text)\n\n# Handle dates (custom encoder)\njson.dumps(obj, default=str)` },
        { label: 'CSV', language: 'python', code: `import csv\n\n# Read CSV\nwith open('data.csv', newline='') as f:\n    reader = csv.DictReader(f)  # uses header row as keys\n    rows = list(reader)\n\n# Write CSV\nfields = ['name', 'age', 'city']\nwith open('out.csv', 'w', newline='') as f:\n    writer = csv.DictWriter(f, fieldnames=fields)\n    writer.writeheader()\n    writer.writerows(data)` },
      ]
    },
    {
      title: 'Built-in Functions',
      items: [
        { label: 'Iteration helpers', language: 'python', code: `# range\nrange(10)       # 0..9\nrange(2, 10)    # 2..9\nrange(0, 10, 2) # 0,2,4,6,8\n\n# enumerate\nfor i, val in enumerate(lst, start=1):\n    print(i, val)\n\n# zip\nfor name, score in zip(names, scores):\n    print(f"{name}: {score}")\n\ndict(zip(keys, values))   # build dict` },
        { label: 'Functional tools', language: 'python', code: `# map\nlist(map(str, [1,2,3]))         # ['1','2','3']\nlist(map(int, '123'.split()))   # [1,2,3]\n\n# filter\nlist(filter(None, [0,'',1,2]))  # [1,2]\nlist(filter(lambda x: x>0, nums))\n\n# sorted with key\nsorted(data, key=lambda x: x['age'], reverse=True)\n\nfrom functools import reduce\nreduce(lambda a,b: a*b, [1,2,3,4])  # 24` },
        { label: 'Math and comparison', language: 'python', code: `abs(-5)          # 5\nround(3.14159, 2) # 3.14\nmin(3, 1, 4)     # 1\nmax(3, 1, 4)     # 4\nsum([1,2,3])     # 6\npow(2, 10)       # 1024\ndivmod(10, 3)    # (3, 1) — quotient, remainder\n\nimport math\nmath.sqrt(16)    # 4.0\nmath.ceil(3.2)   # 4\nmath.floor(3.9)  # 3\nmath.log2(1024)  # 10.0` },
        { label: 'Introspection', language: 'python', code: `len([1,2,3])      # 3\ntype(42)          # <class 'int'>\nid(obj)           # memory address\nrepr(obj)         # developer string\ndir(obj)          # list attributes/methods\nhasattr(obj, 'name')\ngetattr(obj, 'name', default)\nsetattr(obj, 'name', value)\ncallable(obj)     # True if obj is callable\nhelp(str.join)    # docs in REPL` },
      ]
    },
  ]
}

export default python

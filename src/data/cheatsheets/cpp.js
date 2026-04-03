const cpp = {
  id: 'cpp',
  title: 'C++',
  color: 'blue',
  category: 'Languages',
  description: 'Systems programming, memory management, STL, and modern C++ features',
  sections: [
    {
      title: 'Basic Syntax',
      items: [
        { label: 'Hello World', language: 'cpp', code: `#include <iostream>\n\nint main() {\n  std::cout << "Hello, World!" << std::endl;\n  return 0;\n}`, note: 'std::endl both inserts a newline and flushes the buffer' },
        { label: 'Variable Types', language: 'cpp', code: `int a = 10;           -- 4 bytes\ndouble b = 10.5;      -- 8 bytes\nchar c = 'A';         -- 1 byte\nbool d = true;        -- 1 byte\nfloat e = 1.5f;       -- 4 bytes`, note: 'Suffix f represents a float literal; otherwise it defaults to double' },
        { label: 'Constants', language: 'cpp', code: `const int MAX = 100;     -- run-time constant\nconstexpr int SIZE = 10; -- compile-time constant\n#define PI 3.14          -- preprocessor macro`, note: 'Prefer constexpr over const or #define for compile-time constants' },
        { label: 'Input / Output', language: 'cpp', code: `int age;\nstd::cout << "Enter age: ";\nstd::cin >> age;\nstd::cerr << "Error!";    -- unbuffered error output\nstd::clog << "Log!";      -- buffered log output` },
      ]
    },
    {
      title: 'Control Flow',
      items: [
        { label: 'If / Else', language: 'cpp', code: `if (x > 0) {\n  // do A\n} else if (x < 0) {\n  // do B\n} else {\n  // do C\n}`, note: 'C++17 allows init-statements in if: if (int x = get(); x > 0)' },
        { label: 'Switch Case', language: 'cpp', code: `switch (value) {\n  case 1:\n    // do 1\n    break;\n  case 2:\n    // do 2\n    [[fallthrough]];\n  default:\n    // default\n}`, note: 'fallthrough attribute explicitly tells the compiler and other devs that missing break is intentional' },
        { label: 'Loops', language: 'cpp', code: `for (int i = 0; i < 10; ++i) { ... }\nwhile (condition) { ... }\ndo { ... } while (condition);\n\n// Range-based for (C++11)\nfor (const auto& x : vec) { ... }`, note: 'Range-based for is preferred for iterating over STL containers' },
        { label: 'Ternary Operator', language: 'cpp', code: `int max = (a > b) ? a : b;` }
      ]
    },
    {
      title: 'Functions',
      items: [
        { label: 'Declaration', language: 'cpp', code: `int add(int a, int b);              -- prototype\n\nint add(int a, int b) {             -- definition\n  return a + b;\n}` },
        { label: 'Default Arguments', language: 'cpp', code: `void print(string msg = "None");`, note: 'Default values must be at the end of the parameter list' },
        { label: 'Overloading', language: 'cpp', code: `int add(int a, int b);\ndouble add(double a, double b);`, note: 'Functions can have the same name if they have different parameter types or counts' },
        { label: 'Lambda Functions (C++11)', language: 'cpp', code: `auto sum = [](int a, int b) { return a + b; };\n\n// With capture\nint x = 10;\nauto add_x = [x](int a) { return a + x; };`, note: '[=] captures all by value, [&] captures all by reference' }
      ]
    },
    {
      title: 'Pointers & References',
      items: [
        { label: 'Pointers', language: 'cpp', code: `int x = 10;\nint* ptr = &x;     -- address of x\n*ptr = 20;         -- dereference (change x to 20)\nptr = nullptr;     -- null pointer (C++11)`, note: 'nullptr is safer than NULL or 0 in modern C++' },
        { label: 'References', language: 'cpp', code: `int x = 10;\nint& ref = x;      -- ref is an alias for x\nref = 30;          -- x is now 30`, note: 'References cannot be null and must be initialized when declared' },
        { label: 'Pass by Reference', language: 'cpp', code: `void update(int& val) { val += 10; }\nvoid print(const string& s) { ... }`, note: 'Pass by const reference to avoid unnecessary copying of large objects' },
        { label: 'Smart Pointers (C++11)', language: 'cpp', code: `#include <memory>\n\nstd::unique_ptr<int> u = std::make_unique<int>(10);\nstd::shared_ptr<int> s = std::make_shared<int>(20);\nstd::weak_ptr<int> w = s;`, note: 'Modern C++: prefer smart pointers over raw pointers to avoid memory leaks' }
      ]
    },
    {
      title: 'Classes & Objects',
      items: [
        { label: 'Class definition', language: 'cpp', code: `class Rectangle {\nprivate:\n  int width, height;\npublic:\n  Rectangle(int w, int h) : width(w), height(h) {}  -- init list\n  int getArea() const { return width * height; }\n};`, note: 'Classes default to private access; structs default to public' },
        { label: 'Constructors', language: 'cpp', code: `Rectangle r(10, 5);         -- stack allocation\nRectangle* pr = new Rectangle(10, 5); -- heap allocation` },
        { label: 'Rule of Three/Five', language: 'cpp', code: `// If you define one, you likely need all:\n~MyClass();                  -- Destructor\nMyClass(const MyClass&);      -- Copy Constructor\noperator=(const MyClass&);    -- Copy Assignment\nMyClass(MyClass&&);           -- Move Constructor (C++11)\noperator=(MyClass&&);         -- Move Assignment (C++11)` },
        { label: 'this pointer', language: 'cpp', code: `this->width = w;` }
      ]
    },
    {
      title: 'Inheritance & Poly',
      items: [
        { label: 'Inheritance', language: 'cpp', code: `class Square : public Rectangle {\npublic:\n  Square(int s) : Rectangle(s, s) {}\n};`, note: 'public inheritance is the standard for "is-a" relationships' },
        { label: 'Virtual Functions', language: 'cpp', code: `class Shape {\npublic:\n  virtual void draw() { ... }\n  virtual ~Shape() {}        -- virtual destructor\n};`, note: 'Always make destructors virtual in base classes if you use polymorphism' },
        { label: 'Pure Virtual / Interface', language: 'cpp', code: `virtual void draw() = 0;`, note: 'A class with at least one pure virtual function is "abstract"' },
        { label: 'override / final (C++11)', language: 'cpp', code: `void draw() override { ... }\nvoid draw() final { ... }`, note: 'override ensures you are actually overriding a base function; final prevents further overrides' }
      ]
    },
    {
      title: 'Standard Template Library (STL)',
      items: [
        { label: 'std::vector - dynamic array', language: 'cpp', code: `#include <vector>\n\nvector<int> v = {1, 2, 3};\nv.push_back(4);\nv.pop_back();\nsize_t s = v.size();` },
        { label: 'std::map - associative array', language: 'cpp', code: `#include <map>\n\nmap<string, int> ages;\nages["Alice"] = 25;\nif (ages.count("Bob")) { ... }` },
        { label: 'std::unordered_map - hash table', language: 'cpp', code: `#include <unordered_map>\n\nunordered_map<int, string> map;`, note: 'O(1) average time complexity for access, compared to O(log n) for std::map' },
        { label: 'std::set - unique elements', language: 'cpp', code: `#include <set>\n\nset<int> s; s.insert(10);` },
        { label: 'std::stack / std::queue', language: 'cpp', code: `stack<int> st; st.push(1); st.pop();\nqueue<int> q; q.push(1); q.pop();` }
      ]
    },
    {
      title: 'Memory Management',
      items: [
        { label: 'new and delete', language: 'cpp', code: `int* p = new int(10);\ndelete p;\n\nint* arr = new int[10];\ndelete[] arr;`, note: 'Always match new with delete, and new[] with delete[]' },
        { label: 'RAII', language: 'cpp', code: `// Resource Acquisition Is Initialization\n// Manage resources in constructors/destructors\n// std::lock_guard, std::unique_ptr are RAII wrappers` },
        { label: 'Stack vs Heap', language: 'cpp', code: `int stackVar = 10;           -- automatic memory\nint* heapVar = new int(10);  -- manual memory` },
        { label: 'Memory alignment', language: 'cpp', code: `alignas(16) char buffer[1024];` }
      ]
    },
    {
      title: 'Modern C++ Features',
      items: [
        { label: 'auto keyword', language: 'cpp', code: `auto x = 10;           -- int\nauto& y = x;          -- int&`, note: 'auto deduces the type from the initializer' },
        { label: 'Structured Bindings (C++17)', language: 'cpp', code: `auto [x, y] = myPair;\nfor (const auto& [key, val] : myMap) { ... }` },
        { label: 'Optional (C++17)', language: 'cpp', code: `#include <optional>\n\nstd::optional<int> getVal(bool s) {\n  if (s) return 42;\n  return std::nullopt;\n}` },
        { label: 'String View (C++17)', language: 'cpp', code: `#include <string_view>\n\nvoid print(std::string_view sv);`, note: 'Non-owning reference to a string; efficient as it avoids allocation' }
      ]
    }
  ]
}

export default cpp

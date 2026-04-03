const java = {
  id: 'java',
  title: 'Java',
  color: 'orange',
  category: 'Languages',
  description: 'OOP, collections, generics, streams, lambdas, and modern Java features',
  sections: [
    {
      title: 'Basic Syntax',
      items: [
        {
          label: 'Primitive types',
          language: 'java',
          code: `int age = 25;
long population = 8_000_000_000L;
double price = 19.99;
boolean isActive = true;
char grade = 'A';`,
          note: 'Use long literal suffix L and underscores in numeric literals for readability'
        },
        {
          label: 'Parsing strings to numbers',
          language: 'java',
          code: `int n = Integer.parseInt("42");
double d = Double.parseDouble("3.14");
long l = Long.parseLong("9999999999");`,
          note: 'Throws NumberFormatException if the string is not a valid number'
        },
        {
          label: 'Converting values to String',
          language: 'java',
          code: `String s1 = String.valueOf(42);
String s2 = String.valueOf(3.14);
String s3 = Integer.toString(100);
String s4 = "" + 42; // implicit conversion`,
        },
        {
          label: 'Console output',
          language: 'java',
          code: `System.out.println("Hello, World!");   // print with newline
System.out.print("No newline");         // print without newline
System.out.printf("Name: %s, Age: %d%n", name, age); // formatted`,
        },
        {
          label: 'Reading input with Scanner',
          language: 'java',
          code: `import java.util.Scanner;

Scanner sc = new Scanner(System.in);
String line = sc.nextLine();
int n = sc.nextInt();
double d = sc.nextDouble();
sc.close();`,
          note: 'Call nextLine() after nextInt() to consume the leftover newline character'
        },
        {
          label: 'Casting',
          language: 'java',
          code: `// widening - automatic
int i = 42;
double d = i;

// narrowing - explicit cast required
double pi = 3.14159;
int truncated = (int) pi; // 3

// object casting
Object obj = "hello";
String s = (String) obj;`,
        },
        {
          label: 'Autoboxing and unboxing',
          language: 'java',
          code: `// autoboxing: primitive -> wrapper
Integer boxed = 42;
List<Integer> list = new ArrayList<>();
list.add(5); // int autoboxed to Integer

// unboxing: wrapper -> primitive
int unboxed = boxed;
int sum = list.get(0) + 1; // Integer unboxed`,
          note: 'Unboxing a null Integer throws NullPointerException'
        },
      ]
    },
    {
      title: 'Control Flow',
      items: [
        {
          label: 'if / else if / else',
          language: 'java',
          code: `int score = 85;
if (score >= 90) {
  System.out.println("A");
} else if (score >= 80) {
  System.out.println("B");
} else {
  System.out.println("C or below");
}`,
        },
        {
          label: 'switch expression (Java 14+)',
          language: 'java',
          code: `String day = "MONDAY";
String type = switch (day) {
  case "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY" -> "Weekday";
  case "SATURDAY", "SUNDAY" -> "Weekend";
  default -> "Unknown";
};`,
          note: 'Arrow case syntax avoids fall-through; switch expressions return a value'
        },
        {
          label: 'Enhanced for-each loop',
          language: 'java',
          code: `int[] nums = {1, 2, 3, 4, 5};
for (int n : nums) {
  System.out.println(n);
}

List<String> names = List.of("Alice", "Bob");
for (String name : names) {
  System.out.println(name);
}`,
        },
        {
          label: 'while and do-while',
          language: 'java',
          code: `int i = 0;
while (i < 5) {
  System.out.println(i);
  i++;
}

// do-while executes body at least once
int j = 0;
do {
  System.out.println(j);
  j++;
} while (j < 5);`,
        },
        {
          label: 'break with label',
          language: 'java',
          code: `outer:
for (int i = 0; i < 3; i++) {
  for (int j = 0; j < 3; j++) {
    if (i == 1 && j == 1) {
      break outer; // exits both loops
    }
    System.out.println(i + "," + j);
  }
}`,
          note: 'Labeled break/continue targets an outer loop by its label'
        },
        {
          label: 'Stream.forEach iteration',
          language: 'java',
          code: `List<String> names = List.of("Alice", "Bob", "Carol");

// lambda
names.stream().forEach(name -> System.out.println(name));

// method reference (preferred)
names.forEach(System.out::println);`,
        },
      ]
    },
    {
      title: 'OOP',
      items: [
        {
          label: 'Class declaration with fields and constructor',
          language: 'java',
          code: `public class Person {
  private String name;
  private int age;

  public Person(String name, int age) {
    this.name = name;
    this.age = age;
  }

  public String getName() { return name; }
  public int getAge()     { return age; }
}`,
        },
        {
          label: 'this and super',
          language: 'java',
          code: `public class Animal {
  String sound;
  Animal(String sound) { this.sound = sound; }
}

public class Dog extends Animal {
  String breed;
  Dog(String breed) {
    super("Woof");   // call parent constructor
    this.breed = breed;
  }
}`,
        },
        {
          label: 'extends and @Override',
          language: 'java',
          code: `public class Shape {
  public double area() { return 0; }
  public String toString() { return "Shape"; }
}

public class Circle extends Shape {
  private double radius;
  Circle(double r) { this.radius = r; }

  @Override
  public double area() { return Math.PI * radius * radius; }
}`,
          note: '@Override causes a compile error if no matching method exists in the parent'
        },
        {
          label: 'implements interface',
          language: 'java',
          code: `public interface Drawable {
  void draw();
  default String getColor() { return "black"; } // default method
}

public class Square implements Drawable {
  @Override
  public void draw() {
    System.out.println("Drawing a square");
  }
}`,
        },
        {
          label: 'Access modifiers',
          language: 'java',
          code: `public class Example {
  public    int pubField    = 1; // accessible everywhere
  protected int protField   = 2; // accessible in package + subclasses
  int           pkgField    = 3; // package-private (default)
  private   int privField   = 4; // accessible within this class only
}`,
        },
        {
          label: 'final and static',
          language: 'java',
          code: `public class MathUtils {
  public static final double PI = 3.14159265358979; // constant

  public static int square(int n) { // utility method - no instance needed
    return n * n;
  }
}

// Usage - no object required
double pi = MathUtils.PI;
int sq = MathUtils.square(5);`,
          note: 'static members belong to the class, not to any instance'
        },
      ]
    },
    {
      title: 'Collections',
      items: [
        {
          label: 'ArrayList',
          language: 'java',
          code: `import java.util.ArrayList;

ArrayList<String> list = new ArrayList<>();
list.add("Alice");
list.add("Bob");
list.add(1, "Carol");       // insert at index 1
String first = list.get(0);
list.remove("Bob");          // remove by value
list.remove(0);              // remove by index
int size = list.size();
boolean has = list.contains("Alice");`,
        },
        {
          label: 'LinkedList as deque',
          language: 'java',
          code: `import java.util.LinkedList;

LinkedList<Integer> deque = new LinkedList<>();
deque.addFirst(1);   // push to front
deque.addLast(2);    // push to back
int front = deque.peekFirst();
int back  = deque.peekLast();
deque.removeFirst();
deque.removeLast();`,
          note: 'LinkedList implements both List and Deque interfaces'
        },
        {
          label: 'HashMap',
          language: 'java',
          code: `import java.util.HashMap;

HashMap<String, Integer> map = new HashMap<>();
map.put("apple", 3);
map.put("banana", 5);
int count = map.get("apple");          // 3
boolean has = map.containsKey("grape"); // false
map.getOrDefault("grape", 0);          // 0 if absent

for (Map.Entry<String, Integer> entry : map.entrySet()) {
  System.out.println(entry.getKey() + ": " + entry.getValue());
}`,
        },
        {
          label: 'HashSet',
          language: 'java',
          code: `import java.util.HashSet;

HashSet<String> set = new HashSet<>();
set.add("a");
set.add("b");
set.add("a");           // duplicate - ignored
boolean has = set.contains("a"); // true
set.remove("b");
int size = set.size();  // 1`,
          note: 'HashSet provides O(1) average add/contains/remove; no duplicates, no ordering'
        },
        {
          label: 'ArrayDeque as stack and queue',
          language: 'java',
          code: `import java.util.ArrayDeque;

// Use as stack (LIFO)
ArrayDeque<Integer> stack = new ArrayDeque<>();
stack.push(1); stack.push(2); stack.push(3);
int top = stack.peek(); // 3
stack.pop();            // removes 3

// Use as queue (FIFO)
ArrayDeque<Integer> queue = new ArrayDeque<>();
queue.offer(1); queue.offer(2); queue.offer(3);
int front = queue.peek(); // 1
queue.poll();             // removes 1`,
          note: 'ArrayDeque is faster than Stack and LinkedList for both stack and queue operations'
        },
        {
          label: 'PriorityQueue (min-heap)',
          language: 'java',
          code: `import java.util.PriorityQueue;
import java.util.Collections;

// min-heap (default)
PriorityQueue<Integer> minHeap = new PriorityQueue<>();
minHeap.offer(5); minHeap.offer(1); minHeap.offer(3);
int min = minHeap.peek(); // 1
minHeap.poll();           // removes 1

// max-heap
PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());
maxHeap.offer(5); maxHeap.offer(1);
int max = maxHeap.peek(); // 5`,
        },
      ]
    },
    {
      title: 'Generics',
      items: [
        {
          label: 'Generic collection types',
          language: 'java',
          code: `List<String> names = new ArrayList<>();
Map<String, Integer> scores = new HashMap<>();
Set<Double> values = new HashSet<>();
Queue<Integer> queue = new LinkedList<>();`,
          note: 'Type parameter prevents ClassCastException at runtime by catching errors at compile time'
        },
        {
          label: 'Bounded type parameter',
          language: 'java',
          code: `public <T extends Comparable<T>> T max(T a, T b) {
  return a.compareTo(b) >= 0 ? a : b;
}

// works with any Comparable type
int    m1 = max(3, 7);         // 7
String m2 = max("apple", "banana"); // "banana"`,
        },
        {
          label: 'Wildcard - unbounded',
          language: 'java',
          code: `// accepts List of any type
public void printList(List<?> list) {
  for (Object item : list) {
    System.out.println(item);
  }
}`,
          note: 'Wildcard <?> means "unknown type" - you can read but not add elements'
        },
        {
          label: 'Upper bounded wildcard',
          language: 'java',
          code: `// accepts List<Number>, List<Integer>, List<Double>, etc.
public double sumList(List<? extends Number> list) {
  double sum = 0;
  for (Number n : list) sum += n.doubleValue();
  return sum;
}`,
          note: 'Use "extends" to read from a collection of a type and its subtypes'
        },
        {
          label: 'Lower bounded wildcard',
          language: 'java',
          code: `// accepts List<Integer>, List<Number>, List<Object>
public void addIntegers(List<? super Integer> list) {
  list.add(1);
  list.add(2);
  list.add(3);
}`,
          note: 'Use "super" to write into a collection - PECS: Producer Extends, Consumer Super'
        },
        {
          label: 'Generic class and method',
          language: 'java',
          code: `// Generic class
public class Pair<A, B> {
  private A first;
  private B second;
  public Pair(A first, B second) { this.first = first; this.second = second; }
  public A getFirst()  { return first; }
  public B getSecond() { return second; }
}

// Generic static method
public static <T> List<T> repeat(T item, int times) {
  List<T> result = new ArrayList<>();
  for (int i = 0; i < times; i++) result.add(item);
  return result;
}`,
        },
      ]
    },
    {
      title: 'Exception Handling',
      items: [
        {
          label: 'try / catch / finally',
          language: 'java',
          code: `try {
  int result = 10 / 0;
  System.out.println(result);
} catch (ArithmeticException e) {
  System.out.println("Math error: " + e.getMessage());
} finally {
  System.out.println("Always runs - good for cleanup");
}`,
          note: 'finally runs even if an exception is thrown or a return is executed'
        },
        {
          label: 'Multi-catch (Java 7+)',
          language: 'java',
          code: `try {
  String s = null;
  s.length();
} catch (NullPointerException | IllegalArgumentException e) {
  System.out.println("Caught: " + e.getClass().getSimpleName());
}`,
          note: 'Multi-catch reduces duplication when handling different exceptions the same way'
        },
        {
          label: 'throws declaration',
          language: 'java',
          code: `import java.io.IOException;

// caller must handle or declare IOException
public void readFile(String path) throws IOException {
  java.nio.file.Files.readAllBytes(java.nio.file.Path.of(path));
}`,
          note: 'throws in the method signature declares checked exceptions for the caller to handle'
        },
        {
          label: 'throw new exception',
          language: 'java',
          code: `public int divide(int a, int b) {
  if (b == 0) {
    throw new IllegalArgumentException("Divisor cannot be zero");
  }
  return a / b;
}`,
        },
        {
          label: 'Custom exception',
          language: 'java',
          code: `public class InsufficientFundsException extends RuntimeException {
  private final double amount;

  public InsufficientFundsException(double amount) {
    super("Insufficient funds: need " + amount + " more");
    this.amount = amount;
  }

  public double getAmount() { return amount; }
}

// usage
throw new InsufficientFundsException(50.00);`,
          note: 'Extending RuntimeException makes it unchecked - no throws declaration required'
        },
        {
          label: 'try-with-resources',
          language: 'java',
          code: `import java.io.*;

// resource is auto-closed at end of try block
try (BufferedReader br = new BufferedReader(new FileReader("file.txt"))) {
  String line;
  while ((line = br.readLine()) != null) {
    System.out.println(line);
  }
} catch (IOException e) {
  e.printStackTrace();
}`,
          note: 'Resource must implement AutoCloseable; close() is called even if an exception occurs'
        },
      ]
    },
    {
      title: 'Streams API',
      items: [
        {
          label: 'stream() and filter()',
          language: 'java',
          code: `import java.util.List;
import java.util.stream.Collectors;

List<Integer> nums = List.of(1, 2, 3, 4, 5, 6);
List<Integer> evens = nums.stream()
    .filter(n -> n % 2 == 0)
    .collect(Collectors.toList());
// [2, 4, 6]`,
        },
        {
          label: 'map() and collect()',
          language: 'java',
          code: `List<String> names = List.of("alice", "bob", "carol");
List<String> upper = names.stream()
    .map(String::toUpperCase)
    .collect(Collectors.toList());
// ["ALICE", "BOB", "CAROL"]

List<Integer> lengths = names.stream()
    .map(String::length)
    .collect(Collectors.toList());
// [5, 3, 5]`,
        },
        {
          label: 'reduce()',
          language: 'java',
          code: `List<Integer> nums = List.of(1, 2, 3, 4, 5);

int sum = nums.stream()
    .reduce(0, Integer::sum); // 15

int product = nums.stream()
    .reduce(1, (a, b) -> a * b); // 120`,
          note: 'First argument to reduce() is the identity value (starting value)'
        },
        {
          label: 'sorted(), distinct(), limit()',
          language: 'java',
          code: `List<Integer> nums = List.of(5, 3, 1, 4, 1, 2, 3);

List<Integer> result = nums.stream()
    .distinct()              // remove duplicates: [5,3,1,4,2]
    .sorted()                // natural order: [1,2,3,4,5]
    .limit(3)                // first 3: [1,2,3]
    .collect(Collectors.toList());`,
        },
        {
          label: 'flatMap()',
          language: 'java',
          code: `List<List<Integer>> nested = List.of(
    List.of(1, 2), List.of(3, 4), List.of(5)
);

List<Integer> flat = nested.stream()
    .flatMap(List::stream)
    .collect(Collectors.toList());
// [1, 2, 3, 4, 5]`,
          note: 'flatMap() maps each element to a stream and then flattens all streams into one'
        },
        {
          label: 'Collectors.groupingBy()',
          language: 'java',
          code: `import java.util.Map;
import java.util.stream.Collectors;

List<String> words = List.of("ant", "bee", "ape", "bat", "cat");

Map<Character, List<String>> byFirstLetter = words.stream()
    .collect(Collectors.groupingBy(w -> w.charAt(0)));
// {a=[ant, ape], b=[bee, bat], c=[cat]}`,
        },
      ]
    },
    {
      title: 'Multithreading',
      items: [
        {
          label: 'Thread using Runnable (preferred)',
          language: 'java',
          code: `Runnable task = () -> {
  System.out.println("Running in: " + Thread.currentThread().getName());
};

Thread t = new Thread(task);
t.start();
t.join(); // wait for thread to finish`,
          note: 'Implementing Runnable is preferred over extending Thread because Java is single-inheritance'
        },
        {
          label: 'synchronized method and block',
          language: 'java',
          code: `public class Counter {
  private int count = 0;

  // only one thread can execute at a time
  public synchronized void increment() {
    count++;
  }

  public void incrementBlock() {
    synchronized (this) { // synchronized block - finer grained
      count++;
    }
  }
}`,
        },
        {
          label: 'volatile keyword',
          language: 'java',
          code: `public class StopFlag {
  private volatile boolean running = true; // visible to all threads

  public void stop() { running = false; }

  public void run() {
    while (running) {
      // do work
    }
  }
}`,
          note: 'volatile guarantees visibility but not atomicity - use AtomicInteger for counters'
        },
        {
          label: 'ExecutorService with thread pool',
          language: 'java',
          code: `import java.util.concurrent.*;

ExecutorService executor = Executors.newFixedThreadPool(4);

for (int i = 0; i < 10; i++) {
  final int taskId = i;
  executor.submit(() -> System.out.println("Task " + taskId));
}

executor.shutdown();
executor.awaitTermination(10, TimeUnit.SECONDS);`,
          note: 'Always shut down the executor or threads will keep the JVM alive'
        },
        {
          label: 'Future.get() for async result',
          language: 'java',
          code: `ExecutorService exec = Executors.newSingleThreadExecutor();

Future<Integer> future = exec.submit(() -> {
  Thread.sleep(1000);
  return 42;
});

// blocks until result is available (or times out)
int result = future.get(5, TimeUnit.SECONDS);
System.out.println("Result: " + result);
exec.shutdown();`,
        },
        {
          label: 'CountDownLatch',
          language: 'java',
          code: `import java.util.concurrent.CountDownLatch;

CountDownLatch latch = new CountDownLatch(3); // count of 3

for (int i = 0; i < 3; i++) {
  new Thread(() -> {
    System.out.println("Worker done");
    latch.countDown(); // decrement count
  }).start();
}

latch.await(); // main thread waits until count reaches 0
System.out.println("All workers finished");`,
          note: 'Useful for waiting on multiple concurrent tasks to complete before proceeding'
        },
      ]
    },
    {
      title: 'Java 8 Plus',
      items: [
        {
          label: 'Lambda expressions',
          language: 'java',
          code: `// single parameter - parens optional
Runnable r = () -> System.out.println("Hello");

// two parameters
Comparator<Integer> cmp = (a, b) -> a - b;

// block body
BinaryOperator<Integer> add = (a, b) -> {
  int result = a + b;
  return result;
};`,
          note: 'Lambdas implement functional interfaces (interfaces with exactly one abstract method)'
        },
        {
          label: 'Optional',
          language: 'java',
          code: `Optional<String> present = Optional.of("hello");
Optional<String> empty   = Optional.empty();

present.isPresent();          // true
present.get();                // "hello"
empty.orElse("default");      // "default"
empty.orElseGet(() -> "gen"); // lazy default

present.ifPresent(s -> System.out.println(s.toUpperCase()));

Optional<Integer> length = present.map(String::length); // Optional[5]`,
          note: 'Optional.of() throws NullPointerException on null; use Optional.ofNullable() to allow null'
        },
        {
          label: 'Method references',
          language: 'java',
          code: `// static method reference
Function<String, Integer> parse = Integer::parseInt;

// instance method reference (unbound)
Function<String, String> upper = String::toUpperCase;

// instance method reference (bound)
String prefix = "Hello";
Predicate<String> startsWith = prefix::equals;

// constructor reference
Supplier<ArrayList<String>> create = ArrayList::new;`,
        },
        {
          label: 'LocalDate and LocalDateTime',
          language: 'java',
          code: `import java.time.*;

LocalDate today = LocalDate.now();
LocalDate date  = LocalDate.of(2024, 3, 15);
LocalDate next  = date.plusDays(10);

LocalDateTime now = LocalDateTime.now();
LocalDateTime dt  = LocalDateTime.of(2024, 3, 15, 10, 30);

long days = ChronoUnit.DAYS.between(date, next); // 10`,
          note: 'java.time classes are immutable and thread-safe; prefer them over Date/Calendar'
        },
        {
          label: 'var keyword (Java 10+)',
          language: 'java',
          code: `var list    = new ArrayList<String>(); // inferred: ArrayList<String>
var map     = new HashMap<String, Integer>();
var message = "Hello, World!";        // inferred: String

for (var entry : map.entrySet()) {
  System.out.println(entry.getKey() + "=" + entry.getValue());
}`,
          note: 'var is local variable type inference - type is still static and checked at compile time'
        },
        {
          label: 'record class (Java 16+)',
          language: 'java',
          code: `// compact immutable data class
public record Point(int x, int y) {}

// record auto-generates: constructor, getters, equals, hashCode, toString
Point p = new Point(3, 4);
int x = p.x();     // accessor (not getX)
int y = p.y();
System.out.println(p); // Point[x=3, y=4]`,
          note: 'Records cannot extend classes (but can implement interfaces) and fields are final by default'
        },
      ]
    },
    {
      title: 'String Methods',
      items: [
        {
          label: 'Basic string operations',
          language: 'java',
          code: `String s = "Hello, World!";
int len        = s.length();         // 13
char c         = s.charAt(0);        // 'H'
String sub     = s.substring(7);     // "World!"
String sub2    = s.substring(7, 12); // "World"
int idx        = s.indexOf("World"); // 7
boolean has    = s.contains("World");// true`,
        },
        {
          label: 'Prefix / suffix checks and case',
          language: 'java',
          code: `String s = "Hello, World!";
boolean sw = s.startsWith("Hello"); // true
boolean ew = s.endsWith("!");       // true
String up  = s.toUpperCase();       // "HELLO, WORLD!"
String lo  = s.toLowerCase();       // "hello, world!"`,
        },
        {
          label: 'replace and split',
          language: 'java',
          code: `String s = "one,two,three";
String replaced = s.replace(",", " - "); // "one - two - three"
String[] parts  = s.split(",");          // ["one", "two", "three"]

String csv = String.join(", ", parts);   // "one, two, three"`,
        },
        {
          label: 'trim and strip',
          language: 'java',
          code: `String s = "  hello  ";
String trimmed  = s.trim();    // "hello" - removes ASCII whitespace
String stripped = s.strip();   // "hello" - Unicode-aware (Java 11+)
String sl = s.stripLeading();  // "hello  "
String st = s.stripTrailing(); // "  hello"`,
          note: 'strip() is preferred over trim() in Java 11+ as it handles all Unicode whitespace'
        },
        {
          label: 'String.format',
          language: 'java',
          code: `String name = "Alice";
int age = 30;
double gpa = 3.85;

String msg = String.format("Name: %s, Age: %d, GPA: %.2f", name, age, gpa);
// "Name: Alice, Age: 30, GPA: 3.85"

// Java 15+ text block alternative
String json = """
    {
      "name": "%s",
      "age": %d
    }
    """.formatted(name, age);`,
        },
        {
          label: 'StringBuilder for efficient concatenation',
          language: 'java',
          code: `StringBuilder sb = new StringBuilder();
sb.append("Hello");
sb.append(", ");
sb.append("World");
sb.insert(5, "!");      // insert at index 5
sb.delete(5, 6);        // delete char at index 5
sb.reverse();
String result = sb.toString();`,
          note: 'Use StringBuilder in loops; String concatenation in a loop creates O(n^2) objects'
        },
      ]
    },
  ]
}

export default java

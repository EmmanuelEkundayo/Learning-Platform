const designPatterns = {
  id: 'design-patterns',
  title: 'Design Patterns',
  color: 'violet',
  category: 'System Design',
  description: 'Common solutions to software design problems: creational, structural, and behavioral patterns',
  sections: [
    {
      title: 'Creational Patterns',
      items: [
        { label: 'Singleton', language: 'javascript', code: `class Singleton {\n  constructor() {\n    if (!Singleton.instance) Singleton.instance = this;\n    return Singleton.instance;\n  }\n}`, note: 'Ensures a class has only one instance and provides a global access point' },
        { label: 'Factory Method', language: 'javascript', code: `class Creator {\n  static create(type) {\n    if (type === 'A') return new ProductA();\n    return new ProductB();\n  }\n}`, note: 'Defines an interface for creating objects, but lets subclasses decide which class to instantiate' },
        { label: 'Builder', language: 'javascript', code: `class UserBuilder {\n  setName(name) { this.name = name; return this; }\n  setAge(age) { this.age = age; return this; }\n  build() { return new User(this); }\n}`, note: 'Separates the construction of a complex object from its representation' },
        { label: 'Prototype', language: 'javascript', code: `const proto = { greet() { ... } };\nconst obj = Object.create(proto);`, note: 'Creates new objects by copying an existing object (the prototype)' }
      ]
    },
    {
      title: 'Structural Patterns',
      items: [
        { label: 'Adapter', language: 'javascript', code: `class Adapter {\n  constructor(legacy) { this.legacy = legacy; }\n  request() { return this.legacy.oldRequest(); }\n}`, note: 'Allows interfaces that are incompatible to work together' },
        { label: 'Decorator', language: 'javascript', code: `@log\nclass Example { ... }\n// or wrap function\nconst decorated = decorator(original);`, note: 'Attaches additional responsibilities to an object dynamically' },
        { label: 'Facade', language: 'javascript', code: `class ApiFacade {\n  constructor() { this.auth = new Auth(); this.db = new DB(); }\n  save(data) { if (this.auth.check()) this.db.insert(data); }\n}`, note: 'Provides a simplified interface to a library, a framework, or any other complex set of classes' },
        { label: 'Proxy', language: 'javascript', code: `const proxy = new Proxy(target, {\n  get: (obj, prop) => { ... }\n});`, note: 'Provides a surrogate or placeholder for another object to control access' }
      ]
    },
    {
      title: 'Behavioral Patterns',
      items: [
        { label: 'Observer', language: 'javascript', code: `class Subject {\n  subscribe(fn) { this.subs.push(fn); }\n  notify(data) { this.subs.forEach(fn => fn(data)); }\n}`, note: 'Defines a one-to-many dependency so that when one object changes state, all its dependents are notified' },
        { label: 'Strategy', language: 'javascript', code: `class Context { setStrategy(s) { this.s = s; } exec() { this.s.do(); } }\nconst s1 = { do() { ... } };`, note: 'Defines a family of algorithms, encapsulates each one, and makes them interchangeable' },
        { label: 'Command', language: 'javascript', code: `class Command { constructor(r) { this.r = r; } execute() { this.r.op(); } }`, note: 'Encapsulates a request as an object, allowing you to parameterize clients with different requests' },
        { label: 'Chain of Responsibility', language: 'javascript', code: `handlerA.setNext(handlerB).setNext(handlerC);\nhandlerA.handle(request);`, note: 'Passes requests along a chain of handlers; any handler can decide to process or pass' }
      ]
    },
    {
      title: 'Behavioral (Cont.)',
      items: [
        { label: 'State', language: 'javascript', code: `class State { handle(ctx) { ... } }\nclass Context { setState(s) { this.s = s; } request() { this.s.handle(this); } }`, note: 'Allows an object to alter its behavior when its internal state changes' },
        { label: 'Template Method', language: 'javascript', code: `class Base {\n  template() { this.step1(); this.step2(); }\n  step1() { throw new Error('implement'); }\n}`, note: 'Defines the skeleton of an algorithm in the superclass but lets subclasses override specific steps' },
        { label: 'Mediator', language: 'javascript', code: `class ChatRoom { send(msg, user) { ... } }`, note: 'Reduces direct communications between objects and forces them to collaborate via a mediator object' },
        { label: 'Iterator', language: 'javascript', code: `const it = { next() { ... }, hasNext() { ... } };`, note: 'Lets you traverse elements of a collection without exposing its underlying representation' }
      ]
    },
    {
      title: 'SOLID Principles',
      items: [
        { label: 'S - Single Responsibility', language: 'text', code: `A class should have only one reason to change`, note: 'Each class should do one thing and do it well' },
        { label: 'O - Open/Closed', language: 'text', code: `Software entities should be open for extension, but closed for modification`, note: 'Use inheritance or composition to add behavior' },
        { label: 'L - Liskov Substitution', language: 'text', code: `Subtypes must be substitutable for their base types`, note: 'Derived classes must not break the parent class contract' },
        { label: 'I - Interface Segregation', language: 'text', code: `Clients should not be forced to depend on interfaces they do not use`, note: 'Prefer many small specific interfaces over one large general interface' },
        { label: 'D - Dependency Inversion', language: 'text', code: `High-level modules should not depend on low-level modules. Both should depend on abstractions`, note: 'Depend on interfaces, not concretion' }
      ]
    },
    {
      title: 'Architectural Patterns',
      items: [
        { label: 'MVC (Model-View-Controller)', language: 'text', code: `Model: Data logic\nView: UI logic\nController: Glue (handles input)` },
        { label: 'Microservices', language: 'text', code: `Independently deployable, small, modular services communicating over network` },
        { label: 'Event-Driven', language: 'text', code: `Architecture based on production, detection, consumption of, and reaction to events` },
        { label: 'Layered (N-Tier)', language: 'text', code: `Presentation -> Business -> Persistence -> Database` }
      ]
    }
  ]
}

export default designPatterns

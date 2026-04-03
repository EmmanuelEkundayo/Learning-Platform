const testing = {
  id: 'testing',
  title: 'Testing',
  color: 'emerald',
  category: 'Career',
  description: 'Unit testing with Jest, integration testing with RTL, and end-to-end testing with Cypress',
  sections: [
    {
      title: 'Testing Pyramid',
      items: [
        { label: 'Unit Tests', language: 'javascript', code: `test('sum(1, 2) is 3', () => { expect(sum(1, 2)).toBe(3); });`, note: 'Fast, isolated, and numerous; tests individual functions or classes' },
        { label: 'Integration Tests', language: 'javascript', code: `test('form submits correctly', () => { ... render(Form); fireEvent.submit(); ... });`, note: 'Verifies that multiple components or systems work together correctly' },
        { label: 'E2E (End-to-End)', language: 'javascript', code: `cy.visit('/'); cy.get('input').type('user'); cy.get('button').click();`, note: 'Tests the application from a user perspective; slow and expensive' },
        { label: 'Static Analysis', language: 'text', code: `ESLint, TypeScript, Prettier`, note: 'The base of the pyramid - catches syntax and logical errors instantly' }
      ]
    },
    {
      title: 'Jest Basics',
      items: [
        { label: 'Basic Test', language: 'javascript', code: `test('description', () => {\n  // Arrange, Act, Assert\n});` },
        { label: 'Describe Blocks', language: 'javascript', code: `describe('math module', () => {\n  test('add', () => { ... });\n  test('sub', () => { ... });\n});`, note: 'Groups related tests for better reporting and lifecycle management' },
        { label: 'Lifecycles', language: 'javascript', code: `beforeEach(() => { ... });\nafterEach(() => { ... });\nbeforeAll(() => { ... });\nafterAll(() => { ... });`, note: 'Setup and teardown logic for each test or the whole suite' },
        { label: 'Skipping & Focusing', language: 'javascript', code: `test.only('...', () => {});   -- run ONLY this test\ntest.skip('...', () => {});   -- skip this test` }
      ]
    },
    {
      title: 'Jest Matchers',
      items: [
        { label: 'Equality', language: 'javascript', code: `expect(v).toBe(42);         -- partial equality (===)\nexpect(obj).toEqual({ a: 1 }); -- deep equality` },
        { label: 'Truthiness', language: 'javascript', code: `expect(v).toBeNull();\nexpect(v).toBeDefined();\nexpect(v).toBeTruthy();\nexpect(v).toBeFalsy();` },
        { label: 'Numbers & Strings', language: 'javascript', code: `expect(v).toBeGreaterThan(10);\nexpect(v).toMatch(/regex/);\nexpect(arr).toContain('item');` },
        { label: 'Exceptions', language: 'javascript', code: `expect(() => call()).toThrow();`, note: 'The function must be wrapped in a closure to catch the error' }
      ]
    },
    {
      title: 'Mocking & Spies',
      items: [
        { label: 'Mock Function', language: 'javascript', code: `const mockFn = jest.fn();\nmockFn.mockReturnValue(42);\nmockFn.mockResolvedValue('ok');`, note: 'Creates a fake function that tracks calls' },
        { label: 'Mock Module', language: 'javascript', code: `jest.mock('axios');\naxios.get.mockResolvedValue({ data: {} });`, note: 'Replaces an entire module with mocks (useful for APIs)' },
        { label: 'SpyOn', language: 'javascript', code: `const spy = jest.spyOn(console, 'log').mockImplementation(() => {});`, note: 'Wraps an existing method while keeping the original behavior unless mocked' },
        { label: 'Assertions for Mocks', language: 'javascript', code: `expect(mockFn).toHaveBeenCalled();\nexpect(mockFn).toHaveBeenCalledWith(arg1);\nexpect(mockFn).toHaveBeenCalledTimes(2);` }
      ]
    },
    {
      title: 'React Testing Library',
      items: [
        { label: 'Rendering', language: 'jsx', code: `render(<Button>Click</Button>);\nconst btn = screen.getByRole('button');`, note: 'Renders the component into a virtual DOM (JSDOM)' },
        { label: 'Querying', language: 'jsx', code: `getByRole('button')      -- Throws if not found\nqueryByText('Log out')   -- returns null if not found\nfindByLabelText('User') -- returns Promise (async)` },
        { label: 'Events', language: 'jsx', code: `fireEvent.click(btn);\n// Recommended (use-event package)\nawait user.type(input, 'hello');`, note: 'Use user-event for more realistic event simulation' },
        { label: 'Waiting (Async)', language: 'jsx', code: `await waitFor(() => expect(screen.getByText('Done')).toBeInTheDocument());` }
      ]
    },
    {
      title: 'Cypress E2E',
      items: [
        { label: 'Basic Commands', language: 'javascript', code: `cy.visit('/'); cy.url().should('include', '/home');\ncy.get('.btn').click();` },
        { label: 'Interacting with Inputs', language: 'javascript', code: `cy.get('input[name=user]').type('admin');\ncy.get('select').select('Value');\ncy.get('[type="checkbox"]').check();` },
        { label: 'Assertions', language: 'javascript', code: `cy.get('h1').should('have.text', 'Welcome');\ncy.get('li').should('have.length', 3);\ncy.get('.error').should('not.be.visible');` },
        { label: 'Custom Commands', language: 'javascript', code: `Cypress.Commands.add('login', (u, p) => { ... });` }
      ]
    },
    {
      title: 'TDD vs BDD',
      items: [
        { label: 'TDD (Test-Driven)', language: 'text', code: `1. Red (Write failing test)\n2. Green (Write code to pass)\n3. Refactor (Improve code)`, note: 'Focuses on implementation specifics' },
        { label: 'BDD (Behavior-Driven)', language: 'text', code: `Given [Context]\nWhen [Action]\nThen [Outcome]`, note: 'Focuses on user behavior and features; often uses Cucumber/Gherkin' }
      ]
    },
    {
      title: 'General Concepts',
      items: [
        { label: 'Code Coverage', language: 'text', code: `Statement, Branch, Function, and Line coverage`, note: 'High coverage does not guarantee high quality; test logic, not lines' },
        { label: 'Mocks vs Stubs', language: 'text', code: `Stub: Returns specific data\nMock: Tracks how it was called\nSpy: Wrapper around real object` },
        { label: 'Snapshots', language: 'javascript', code: `expect(tree).toMatchSnapshot();`, note: 'Catch unintended UI changes - review diffs carefully!' }
      ]
    }
  ]
}

export default testing

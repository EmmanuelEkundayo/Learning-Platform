const regex = {
  id: 'regex',
  title: 'Regex',
  color: 'rose',
  category: 'Career',
  description: 'Character classes, quantifiers, lookaround, and language-specific implementations',
  sections: [
    {
      title: 'Character Classes',
      items: [
        { label: 'Basic classes', language: 'regex', code: `.       -- any character except newline\n\\d      -- any digit [0-9]\n\\D      -- any non-digit [^0-9]\n\\w      -- word character [a-zA-Z0-9_]\n\\W      -- non-word character\n\\s      -- whitespace (space, tab, newline)\n\\S      -- non-whitespace`, note: 'Use uppercase for the inverse of the lowercase class' },
        { label: 'Custom sets', language: 'regex', code: `[aeiou]     -- any vowel\n[^aeiou]    -- any non-vowel\n[a-z]       -- lowercase letters\n[A-Z]       -- uppercase letters\n[0-9]       -- digits\n[a-zA-Z]    -- any letter`, note: 'Dash (-) defines a range. Caret (^) inside brackets means NOT' },
        { label: 'POSIX classes', language: 'regex', code: `[[:alnum:]]  -- alphanumeric\n[[:alpha:]]  -- alphabetic\n[[:digit:]]  -- digits\n[[:lower:]]  -- lowercase\n[[:upper:]]  -- uppercase\n[[:punct:]]  -- punctuation`, note: 'Mainly used in Linux/Unix tools like grep and sed' },
        { label: 'Escaping', language: 'regex', code: `\\.          -- literal dot\n\\*          -- literal asterisk\n\\\\          -- literal backslash\n\\[          -- literal open bracket\n\\^          -- literal caret`, note: 'Precede special characters with a backslash to match them literally' },
      ]
    },
    {
      title: 'Anchors & Boundaries',
      items: [
        { label: 'String anchors', language: 'regex', code: `^           -- start of string\n$           -- end of string\n\\A          -- absolute start of string\n\\Z          -- absolute end of string`, note: '^ and $ depend on multiline mode; \\A and \\Z are always start/end of the whole string' },
        { label: 'Word boundaries', language: 'regex', code: `\\b          -- word boundary (start or end of word)\n\\B          -- not a word boundary\n\\bcat\\b      -- matches 'cat' but not 'concatenate'`, note: '\\b is a zero-width assertion between a \\w and a \\W character' },
        { label: 'Line anchors (Multiline)', language: 'regex', code: `(?m)^       -- start of every line\n(?m)$       -- end of every line`, note: 'In multiline mode, ^ and $ match after and before newlines' }
      ]
    },
    {
      title: 'Quantifiers',
      items: [
        { label: 'Basic quantifiers', language: 'regex', code: `*           -- 0 or more\n+           -- 1 or more\n?           -- 0 or 1 (optional)\n{n}         -- exactly n\n{n,}        -- n or more\n{n,m}       -- between n and m`, note: 'Quantifiers apply to the single character or group preceding them' },
        { label: 'Greedy vs Lazy', language: 'regex', code: `.*          -- greedy (matches as much as possible)\n.*?         -- lazy (matches as little as possible)\n.+?         -- lazy 1 or more\n.{2,5}?     -- lazy range`, note: 'Append ? to a quantifier to make it lazy' },
        { label: 'Possessive quantifiers', language: 'regex', code: `.*+         -- match all and never backtrack\n.++         -- match 1+ and never backtrack\n.?+         -- match 0 or 1 and never backtrack`, note: 'Rarely used; prevents backtracking for performance (Java, PHP, Ruby)' }
      ]
    },
    {
      title: 'Groups & Capturing',
      items: [
        { label: 'Capturing groups', language: 'regex', code: `(abc)       -- capture group\n\\1          -- backreference to group 1\n(a)(b)\\2\\1  -- matches 'abba'`, note: 'Groups are numbered 1, 2, 3... from left to right based on their opening parenthesis' },
        { label: 'Non-capturing groups', language: 'regex', code: `(?:abc)      -- group without capturing\n(?:red|blue) -- useful for alternation without creating a backreference`, note: 'Use non-capturing groups for better performance if you do not need to extract the match' },
        { label: 'Named groups', language: 'regex', code: `(?<name>abc) -- define named group (JS/Python)\n\\k<name>     -- backreference to named group\n(?P<name>abc) -- define named group (Python)`, note: 'Named groups make complex regex much more readable' }
      ]
    },
    {
      title: 'Lookaround (Assertions)',
      items: [
        { label: 'Positive lookahead', language: 'regex', code: `q(?=u)       -- 'q' followed by 'u' (but 'u' is not part of match)\n\\d+(?=\\s)    -- digits followed by a space`, note: 'Lookaheads are zero-width: they "peek" forward without consuming characters' },
        { label: 'Negative lookahead', language: 'regex', code: `q(?!u)       -- 'q' NOT followed by 'u'\n(?!password) -- assert string doesn't start with 'password'`, note: 'Commonly used to exclude certain patterns' },
        { label: 'Positive lookbehind', language: 'regex', code: `(?<=@)admin  -- 'admin' preceded by '@'\n(?<=\\$)\\d+   -- digits preceded by '$'`, note: 'Lookbehind support varies; some engines require fixed-length patterns' },
        { label: 'Negative lookbehind', language: 'regex', code: `(?<!-)10     -- '10' NOT preceded by '-'\n(?<!https?:)// -- '//' NOT preceded by http or https`, note: 'Used to check what comes BEFORE the match' }
      ]
    },
    {
      title: 'Common Patterns',
      items: [
        { label: 'Email validation', language: 'regex', code: `^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$`, note: 'A simple, practical email regex. Real-world validation is often more complex.' },
        { label: 'Password strength', language: 'regex', code: `^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$`, note: 'Requires: 1 upper, 1 lower, 1 digit, 1 special, min 8 chars' },
        { label: 'URLs', language: 'regex', code: `https?:\\/\\/(?:www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b(?:[-a-zA-Z0-9()@:%_\\+.~#?&//=]*)` },
        { label: 'IP (IPv4)', language: 'regex', code: `^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$` },
        { label: 'Dates (YYYY-MM-DD)', language: 'regex', code: `^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$` }
      ]
    },
    {
      title: 'JavaScript',
      items: [
        { label: 'Creating regex', language: 'javascript', code: `const re = /pattern/g;           -- literal\nconst re = new RegExp('pat', 'g'); -- constructor` },
        { label: 'test() and exec()', language: 'javascript', code: `re.test('string');               -- returns true/false\nconst match = re.exec('string'); -- returns match array or null` },
        { label: 'String methods', language: 'javascript', code: `'abc'.match(/a/);                 -- ['a']\n'abc'.replace(/a/, 'x');           -- 'xbc'\n'a,b,c'.split(/,/);              -- ['a', 'b', 'c']\n'abc'.search(/b/);                -- 1` },
        { label: 'Flags', language: 'javascript', code: `g -- global (all matches)\ni -- case-insensitive\nm -- multiline (^/$ match start/end of line)\ns -- dotAll (. matches \\n)\nu -- unicode support\ny -- sticky (matches from lastIndex)` }
      ]
    },
    {
      title: 'Python',
      items: [
        { label: 're module', language: 'python', code: `import re\npattern = re.compile(r'pattern')\nmatch = pattern.search('string')` },
        { label: 'Common methods', language: 'python', code: `re.search(pat, str)     -- first match anywhere\nre.match(pat, str)      -- match only from start\nre.findall(pat, str)    -- list of all match strings\nre.finditer(pat, str)   -- iterator of match objects` },
        { label: 'Substitution', language: 'python', code: `re.sub(r'\\d', '#', 'Age 25')  -- 'Age ##'\nre.subn(...)                 -- returns (new_str, num_subs)` },
        { label: 'Raw strings', language: 'python', code: `r'\\d\\s'                    -- use r prefix to avoid escaping backslashes`, note: 'Always use r"" for regex in Python to prevent escaping issues' }
      ]
    },
    {
      title: 'Flags & Modifiers',
      items: [
        { label: 'Inline flags', language: 'regex', code: `(?i)caseless      -- ignore case\n(?s)dotall        -- dot matches newline\n(?m)multiline     -- ^ and $ work on lines\n(?x)comment       -- ignore whitespace and allow # comments` },
        { label: 'Group local flags', language: 'regex', code: `(?-i)case-sensitive -- turns off -i for this group only\n(?i:group)          -- set flag i for this group only` },
        { label: 'Verbose mode (x)', language: 'regex', code: `(?x)\n^ \\d{3}    # Area code\n  - \\d{3}  # Prefix\n  - \\d{4}  # Extension\n$`, note: 'Verbose mode allows multiline regex with comments' }
      ]
    }
  ]
}

export default regex

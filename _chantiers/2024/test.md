---
hidden: true
layout: chantier
title: test
created:  1970-01-01 00:00
ended: 1970-01-01 00:00
modified: 1970-01-01 00:00
highlighted: true
result: [test, test]
tech: [tech1, tech2, tech3]
result: [web]
permalink: /test
href:
  - ["ext", "→", "http://localhost:4000", "http://localhost:4000"]
description: |
    Consequat adipiscing cillum aute eu. Cillum aute eu nulla nulla enim sed, tempor. Nulla nulla enim sed, tempor nulla veniam. Sed tempor nulla veniam exercitation. Nulla, veniam exercitation laboris eiusmod. Laboris eiusmod, excepteur amet. Amet, velit commodo culpa. Culpa quis non ex consequat.

    Adipiscing cillum aute eu nulla. Aute eu nulla nulla enim sed tempor. Nulla nulla enim sed, tempor nulla veniam. Sed tempor nulla veniam exercitation. Nulla, veniam exercitation laboris eiusmod. Laboris eiusmod, excepteur amet. Amet, velit commodo culpa. Culpa quis non ex consequat. Non ex consequat veniam elit excepteur tempor.

    Cillum aute eu nulla nulla enim sed, tempor. Nulla nulla enim sed, tempor nulla veniam. Sed tempor nulla veniam exercitation. Nulla, veniam exercitation laboris eiusmod. Laboris eiusmod, excepteur amet. Amet, velit commodo culpa. Culpa quis non ex consequat. Non ex consequat veniam elit excepteur tempor. Consequat veniam elit excepteur tempor cillum dolor.
---

<p class="blink" style="background: var(--accent-color); text-align: center;">This project is intended for testing purposes only.</p>

# This is h1…

## …and h2…

### …and h3.

This is body, in _italic_, and **bold**.

> ☞ <span style="font-family: Garamond">_This is a quote_</span>

<h1 style="font-family: Garamond">This is serif</h1>

```txt
This is a code block.
```

### JavaScript
```javascript
function greetUser(name) {
    const message = `Hello, ${name}!`;
    console.log(message);
    return message;
}

/* Call the function */
greetUser("World");
```

### Python
```python
def calculate_fibonacci(n):
    """Calculate the nth Fibonacci number"""
    if n <= 1:
        return n
    else:
        return calculate_fibonacci(n-1) + calculate_fibonacci(n-2)

# Example usage
for i in range(10):
    print(f"F({i}) = {calculate_fibonacci(i)}")
```
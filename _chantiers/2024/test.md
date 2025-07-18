---
hidden: true
layout: chantier
title: test
started: 2030-08-05 19:07
ended: 2030-08-05 19:07
modified: 2024-08-04 19:07
featured: true
labels: [test, test]
tech: [tech1, tech2, tech3]
permalink: /test
href:
  - ["ext", "→", "http://localhost:4000", "http://localhost:4000"]
description: |
    Consequat adipiscing cillum aute eu. Cillum aute eu nulla nulla enim sed, tempor. Nulla nulla enim sed, tempor nulla veniam. Sed tempor nulla veniam exercitation. Nulla, veniam exercitation laboris eiusmod. Laboris eiusmod, excepteur amet. Amet, velit commodo culpa. Culpa quis non ex consequat.

    Adipiscing cillum aute eu nulla. Aute eu nulla nulla enim sed tempor. Nulla nulla enim sed, tempor nulla veniam. Sed tempor nulla veniam exercitation. Nulla, veniam exercitation laboris eiusmod. Laboris eiusmod, excepteur amet. Amet, velit commodo culpa. Culpa quis non ex consequat. Non ex consequat veniam elit excepteur tempor.

    Cillum aute eu nulla nulla enim sed, tempor. Nulla nulla enim sed, tempor nulla veniam. Sed tempor nulla veniam exercitation. Nulla, veniam exercitation laboris eiusmod. Laboris eiusmod, excepteur amet. Amet, velit commodo culpa. Culpa quis non ex consequat. Non ex consequat veniam elit excepteur tempor. Consequat veniam elit excepteur tempor cillum dolor.
---

<p class="blink">This project is intended for testing purposes only.</p>

# This is h1 level…

## … and h2

This is body, in _italic_, and **bold**.

> ☞ <span style="font-family: Garamond">_This is a quote_</span>

<h1 style="font-family: Garamond">This is serif</h1>

```txt
This is a code block.
```

## Jekyll Syntax Highlighting Examples

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

### Ruby
```ruby
class BlogPost
  attr_accessor :title, :content, :published_at
  
  def initialize(title, content)
    @title = title
    @content = content
    @published_at = Time.now
  end
  
  # Check if post is recent
  def recent?
    @published_at > 1.week.ago
  end
end

# Create a new blog post
post = BlogPost.new("Jekyll Syntax Highlighting", "This is awesome!")
puts "Recent post: #{post.recent?}"
```

### HTML
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Jekyll Syntax Highlighting</title>
</head>
<body>
    <header>
        <h1>Welcome to My Blog</h1>
    </header>
    <main>
        <article class="blog-post">
            <h2>{{ page.title }}</h2>
            <p>{{ page.description }}</p>
        </article>
    </main>
</body>
</html>
```

### CSS
```css
/* Modern CSS with custom properties */
:root {
  --primary-color: #007acc;
  --secondary-color: #ff6b6b;
  --font-family: 'Inter', sans-serif;
}

.blog-post {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  font-family: var(--font-family);
}

.blog-post h2 {
  color: var(--primary-color);
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  margin-bottom: 1rem;
}

/* Responsive design */
@media (max-width: 768px) {
  .blog-post {
    padding: 1rem;
  }
}
```

### YAML (Jekyll Front Matter)
```yaml
---
layout: post
title: "Understanding Jekyll Syntax Highlighting"
date: 2024-01-15 10:30:00 +0000
categories: [jekyll, web-development]
tags: [syntax-highlighting, rouge, markdown]
author: developer
featured: true
excerpt: "Learn how to use Jekyll's built-in syntax highlighting"
---
```


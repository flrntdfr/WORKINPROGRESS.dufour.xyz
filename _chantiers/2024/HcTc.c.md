---
layout: chantier
title: Human-centric Title case Project
started:  2023-12-27 11:37
ended: 2024-04-30 15:12
result: [vibe, web]
tech: [C, Gemini 2.5 Pro]
description: |
    <p><b>Idea:</b> The project started as an exploration on how to generate robust code with an LLM. It later proved to be possible to generate code that was so robust, it could even solve improbable problems.</p>
    <p><b>Strategy:</b> The strategy consists in prompting the LLM to write a standard Request For Comments (RFC) for the intended solution before asking it to do the implementation. The steps are the following: <kbd>[Read problem] → [Reason] → [Write RFC] → [Reason] → [Implement] → [Prove]</kbd>.</p>
    <p><b>Methodology:</b> The use case presented here is in developing a non-standard title case converter made for humans in C and run it in the browser to demonstrate the result. Gemini 2.5 Pro was used.</p>
    <kbd style="padding: 1em 2em 1em 2em;">→ We will write a title case converter that implements human-centric design principles. The concept is named Human-centric Title case (cased HcTc) and introduces casing as an attribute. The system improves readability through semantic compatibility. For example, it ensures capitalizing significant words while keeping functional (or generally low importance) words lowercase. It gracefully handles modern technical terms, acronyms, and proper nouns by preserving their original case (especially for brands). The concept is open first and exception-based. First, write a comprehensive and specific Request For Comments (RFC) with multiple pseudo-code snippets. Then implement the RFC in C code. Make sure they align. Focus on speed and efficiency. Name functions accordingly and add comments to important parts of the code. Apply best practices. Additionally, add the plumbing with WebAssembly to provide an interactive online demo. The page should load with the focus on the input field. The placeholder says: "Start&nbsp;typing…".</kbd>
    <p><b>Result:</b> The LLM expressed the solution to the Human-centric Title case project in less than 2300 words and implemented valid C code. It modified the Nix configuration of the website to add the emscripten compiler to the environment. It finally got the demo to run in the browser using WebAssembly and 131072&nbsp;bytes of memory. The RFC, C implementation, and demo are attached.</p>
---


* This will become a table of contents (this text will be scrapped).
{:toc}

---

## Demo

<div class="demo">
<textarea id="input" placeholder="Start typing…" autofocus></textarea>
<div id="output"></div>
<div id="statistics"></div>
</div>

<style>
data {
    max-width: 680px;
}

.demo {
    border: 1px solid black;
    min-height: 5em;
    padding: 20px;
    margin: 1em auto 1em auto;
    width: 66%;
}

#input {
    width: 100%;
    border: none;
    padding: 8px;
    font-size: 1em;
    box-sizing: border-box;
    outline: none; /* Remove blue border when focused */
    box-shadow: none; /* Remove any default focus shadow */
    resize: none; /* Disable resize handle */
    min-height: 2em;
    font-family: inherit;
    background-color: white;
}

#output {
    user-select: all;
    cursor: text;
    margin-top: 1em;
    text-align: center;
    font-family: var(--font-family-serif);
    white-space: pre-wrap; /* Preserve line breaks */
}

#statistics {
    font-size: 0.7em;
    color: #999;
    text-align: center;
    margin-top: 2em;
}

.rfc {
    overflow-x: auto;
}
</style>

---

## RFC-001

<div class="rfc">
<pre>
Internet Working Group                                     Florent Dufour
Request for Comments: 001                                  Gemini 2.5 Pro
Category: Informational                                          HcTc-001


        Request For Comments: A Human-centric Title case (HcTc)


Status of This Memo

   This document specifies an Internet standards track protocol for the
   Internet community, and requests discussion and suggestions for
   improvements.  Please refer to the current edition of the "Internet
   Official Protocol Standards" (STD 1) for the standardization state
   and status of this protocol. Distribution of this memo is unlimited.

Copyright Notice

   Copyright (c) 2024 Florent Dufour, Gemini 2.5 Pro.

Abstract

   This document proposes a non-standard title case system, Human-centric
   Title case (HcTc), that introduces casing as an attribute to
   prioritize readability and semantic compatibility. It treats
   capitalization not as a set of rigid rules, but as an inherent
   property of words in context. The system is designed to be open and
   exception-based, ensuring it can gracefully handle modern technical
   terms, acronyms, and proper nouns by preserving their original case.
   The goal is to reduce cognitive load for both writers and readers
   while improving the clarity and accessibility of titles.


Table of Contents

   1. Introduction ...................................................2
   2. Motivation .....................................................2
      2.1. Problems with Existing Systems ............................2
      2.2. Benefits of Human-centric Title case ......................3
   3. Specification ..................................................3
      3.1. Human-centric Principles ..................................3
      3.2. Capitalization Rules ......................................4
      3.3. Algorithm .................................................5
   4. Implementation .................................................6
      4.1. Word Classification .......................................6
      4.1.2. Proper Noun Dictionary ..................................7
      4.2. Detection Logic ...........................................7
   5. Examples .......................................................7
      5.1. Basic Examples ............................................7
      5.2. Complex Examples ..........................................8
      5.3. Technical Examples ........................................8
   6. Reference Implementation and Demo ..............................8
   7. Comparison with Existing Systems ...............................9
   8. Considerations .................................................9
      8.1. Accessibility .............................................9
      8.2. Internationalization ......................................9
      8.3. Technical Implementation .................................10
      8.4. Limitations ..............................................10
   9. Security Considerations .......................................10
   10. IANA Considerations ..........................................10
   11. References ...................................................11
      11.1. Normative References ....................................11
      11.2. Informative References ..................................11
   12. Author's Address .............................................11

1.  Introduction

   Traditional title case systems (Chicago, AP, APA) suffer from
   inconsistencies, arbitrary rules, and poor readability, especially in
   technical and digital contexts. This RFC proposes "Human-centric
   Title case" (HcTc), a system that re-frames capitalization by
   introducing "casing as an attribute".

   Instead of applying a universal set of grammatical rules, HcTc treats
   casing as a contextual property of each word. This approach is open
   first and exception-based, prioritizing:

   o  Semantic Compatibility: Capitalizing significant words while
      keeping functionally less important words lowercase.
   o  Graceful Handling of Terms: Preserving the native casing of
      technical terms, acronyms, and proper nouns (e.g., 'JavaScript',
      'API').
   o  Readability: Improving scannability and reducing cognitive load by
      creating a clear visual hierarchy.
   o  Flexibility: Allowing for an evolving dictionary of exceptions to
      keep pace with language and technology.

   The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT",
   "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this
   document are to be interpreted as described in RFC 2119 [RFC2119].

2.  Motivation

2.1.  Problems with Existing Systems

   1.  Inconsistent application: Different style guides disagree on
       capitalization

   2.  Arbitrary rules: Prepositions over 4 letters vs. under 4 letters

   3.  Poor readability: Over-capitalization creates visual noise

   4.  Language bias: Rules designed for English don't work for other
       languages

   5.  Context blindness: Same word treated differently based on
       arbitrary criteria

2.2.  Benefits of Human-centric Title case

   1.  Reduced cognitive load: Fewer decisions about capitalization

   2.  Better scanning: Important words naturally stand out

   3.  Cross-language compatibility: Rules work for multiple languages

   4.  Consistency: Predictable outcomes regardless of context

   5.  Accessibility: Easier reading for people with visual impairments

3.  Specification

3.1.  Human-centric Principles

   1.  Prioritize Author's Intent: The primary goal is to reflect the
       author's intended emphasis. Rules should be flexible enough to
       allow for emphasis where needed.

   2.  Maximize Readability: Capitalization should guide the reader's eye
       and make titles easier to scan and comprehend. Visual noise from
       over-capitalization should be minimized.

   3.  Capitalize What's Important: Capitalize all meaningful words,
       including nouns, verbs, adjectives, and adverbs. Crucially, this
       also includes prepositions when they are part of a phrasal verb
       (e.g., "Log In", "Back Up").

   4.  Lowercase What's Not: Functional words like articles ("a", "the"),
       coordinating conjunctions ("and", "but"), and most prepositions
       should be lowercase unless they are the first or last word.

   5.  Treat Casing as an Attribute: Preserve the original casing of
       proper nouns, acronyms, and technical terms (e.g., "JavaScript",
       "API", "HcTc"). This principle is central to HcTc, treating the
       casing of these words as a predefined attribute that MUST be
       respected, making the system exception-based by design.

3.2.  Capitalization Rules

   The following rules provide a more detailed framework for applying HcTc.

3.2.1.  First and Last Words

   The first and last words of a title MUST always be capitalized,
   regardless of their part of speech. This ensures a strong visual anchor
   for the title.

   o  Example: "the End is the Beginning" -> "The End is the Beginning"

3.2.2.  Meaningful Words (Nouns, Verbs, Adjectives, Adverbs)

   Words that carry significant semantic weight SHOULD be capitalized. This
   includes:

   o  Nouns (e.g., "Person", "Concept", "Thing")
   o  Verbs (e.g., "Run", "Is", "Think")
   o  Adjectives (e.g., "Quick", "Blue", "Large")
   o  Adverbs (e.g., "Quickly", "Very", "Well")

   HcTc achieves this by capitalizing all words that are not explicitly
   defined as "functional words" (see next section).

3.2.3.  Functional Words (Articles, Prepositions, Conjunctions)

   Functional words, which serve grammatical roles but carry less
   semantic meaning, SHOULD be lowercased, unless they are the first or
   last word in the title.

   o  Articles: a, an, the
   o  Short Prepositions: at, by, for, from, in, of, on, to, with
   o  Short Conjunctions: and, but, or, nor, so, yet
   o  Verbs: is, are, was, were

   A comprehensive list for implementation is provided in Section 4.1.

3.2.4.  Human-centric Exceptions and Special Cases

   o  Proper Nouns: Proper nouns (names of people, places, organizations,
       brands) MUST be capitalized according to their standard spelling
       (e.g., "Chicago", "JavaScript", "Claude 4").

   o  Hyphenated Words: Each meaningful part of a hyphenated compound
       word SHOULD be capitalized (e.g., "State-of-the-Art",
       "Self-Respect"). Functional words within the hyphenated compound
       remain lowercase.

   o  Phrasal Verbs: Prepositions that are part of a phrasal verb and
      essential to its meaning SHOULD be capitalized. For example, in
      "How to Log In to Your Account", "In" is capitalized as part of
      "Log In", "to" remains lowercase.

   o  The "HcTc" Acronym: The acronym for Human-centric Title case is
      intentionally cased as "HcTc". This is a meta-demonstration of
      the system itself, where "Human" and "Title" are capitalized as
      meaningful words, while "centric" is treated as a functional but
      less critical part of the name in this specific context. It serves
      as a memorable example of the rule's flexibility.

   o  Abbreviations and Acronyms: These SHOULD be preserved in their
       original case (e.g., "API", "USA", "PhD"). The system identifies
       acronyms as words composed entirely of uppercase letters.

   o  Technical Terms: Technical identifiers, such as file names, code
       variables, or commands, SHOULD retain their original case (e.g.,
       "htc.c", "getElementById", "git commit"). This is often achieved
       by including them in the proper noun dictionary.

3.3.  Algorithm

   The HcTc algorithm processes a string by breaking it into words and
   applying a series of checks to determine the correct casing for each
   word. The logic is designed to be efficient and follows a clear
   precedence of rules.

   The following pseudocode outlines the core logic.

   function HcTc_convert(text):
       words = split_into_words(text)
       num_words = length(words)
       processed_words = new_array(num_words)

       for i from 0 to num_words - 1:
           word = words[i]
           is_first = (i == 0)
           is_last = (i == num_words - 1)
           
           processed_words[i] = process_word(word, is_first, is_last)

       return join_words(processed_words)


   function process_word(word, is_first, is_last):
       // 1. Preserve formatting of proper nouns and technical terms
       preserved_case = find_in_proper_noun_dictionary(word)
       if preserved_case is not null:
           return preserved_case

       // 2. Preserve acronyms
       if is_acronym(word):
           return word

       // 3. Always capitalize the first and last words
       if is_first or is_last:
           return capitalize(word)

       // 4. Lowercase functional words
       if is_functional_word(word):
           return lowercase(word)

       // 5. Default to capitalizing meaningful words
       return capitalize(word)


   function find_in_proper_noun_dictionary(word):
       // Case-insensitive search in the dictionary of exceptions.
       // Returns the word with its prescribed casing if found, else null.
       for entry in proper_noun_dictionary:
           if lowercase(word) == lowercase(entry):
               return entry
       return null


   function is_acronym(word):
       // A word is considered an acronym if it's all uppercase and has
       // more than one letter.
       return length(word) > 1 and word == uppercase(word)


   function is_functional_word(word):
       // Case-insensitive search in the list of functional words.
       return lowercase(word) in functional_word_list


   function capitalize(word):
       // Converts first letter to uppercase and the rest to lowercase.
       return uppercase(first_char(word)) + lowercase(rest_of_word(word))

4.  Implementation

4.1.  Word Classification

   The core of the implementation relies on an "exception list" of
   functional words. This list embodies the "open first" principle of
   HcTc; words not on this list are considered "meaningful" and are
   capitalized by default. This list can be customized and expanded. The
   C implementation uses the following array:

   /* 
    * Functional words that should be lowercased unless they are the 
    * first or last word of the title. This list is not exhaustive
    * and can be expanded.
    */
   const char* functional_words[] = {
       /* Articles */
       "a", "an", "the",
       /* Conjunctions */
       "and", "but", "or", "nor", "so", "yet",
       /* Prepositions */
       "about", "above", "across", "against", "around", "as", "at", "behind", 
       "below", "beneath", "beside", "between", "beyond", "by", "down", 
       "during", "for", "from", "in", "inside", "into", "near", "of", "off", 
       "on", "onto", "out", "throughout", "to", "under", "until", "up", "upon", 
       "with", "without",
       /* Verbs */
       "is", "are", "was", "were", "weren't", "wasn't"
   };

4.1.2.  Proper Noun Dictionary

   This dictionary is the primary mechanism for the "exception-based"
   part of HcTc, where casing is treated as a predefined attribute. To
   handle modern technical terms, brand names, and other specific
   capitalizations, a dedicated dictionary of proper nouns is used. The
   matching is case-insensitive to detect the word, but the output is
   replaced with the exact case specified in the dictionary.

   const char* proper_nouns[] = {
       "Amazon", "Angular", "Ansible", "API", "APIs", "Apple", "AWS", "Azure", 
       "CSS", "CSS3", "ChatGPT", "Claude 3", "Cloudflare", "Discord", "Docker", 
       "ECMAScript", "Facebook", "Figma", "GitLab", "GitHub", "Go", "Google", 
       "GraphQL", "GPT-4", "HTML", "HTML5", "HcTc", "Java", "JavaScript", 
       "jQuery", "JSON", "JWT", "Kubernetes", "Linux", "LLM", "LLaMA", 
       "MacBook", "macOS", "Markdown", "Microsoft", "MySQL", "Netflix", 
       "Next.js", "Node.js", "Notion", "NPM", "OAuth", "OpenAI", "PostgreSQL", 
       "Python", "React", "Redis", "REST", "RFC", "Rust", "S3", "SQLite", "SSH", 
       "Slack", "Svelte", "Tailwind", "TCP", "Terraform", "TypeScript", "UDP", 
       "URL", "USB", "Vercel", "Vue.js", "WebAssembly", "WASM", "Windows", 
       "YouTube", "Zoom"
   };

4.2.  Detection Logic

   The implementation follows the clear order of operations for each word
   as described in the pseudocode in Section 3.3. This ensures that
   specific exceptions (proper nouns, acronyms) are handled before
   general rules are applied.

5.  Examples

5.1.  Basic Examples

   Input: "this is not a test"
   HcTc:  "This is Not a Test"
   (Note: "is" and "a" are lowercased as functional words.)

   Input: "quick brown fox"
   HcTc:  "Quick Brown Fox"
   (Note: All words are meaningful and capitalized.)

5.2.  Complex Examples

   Input: "turn on, tune in, drop out"
   HcTc:  "Turn On, Tune In, Drop Out"
   (Note: "On", "In", and "Out" are capitalized as parts of phrasal verbs,
   overriding the functional word rule.)

5.3.  Technical Examples

   Input: "introduction to javascript and node.js"
   HcTc:  "Introduction to JavaScript and Node.js"
   (Note: "JavaScript" and "Node.js" are preserved from the proper noun
   dictionary.)

   Input: "using the new api from the rfc"
   HcTc:  "Using the New API From the RFC"
   (Note: "API" and "RFC" are preserved as acronyms or proper nouns.)

6.  Reference Implementation and Demo

   A reference implementation is provided in C and compiled to WebAssembly
   (WASM) to power the interactive demo. This demo offers real-time
   conversion and displays live statistics about the input, including
   character, word, and line counts, along with memory usage. The
   interface is illustrated below:

   +----------------------------------------------------------------+
   |             Human-centric Title case (HcTc) Demo               |
   +----------------------------------------------------------------+
   |                                                                |
   |  Input:                                                        |
   |  +-----------------------------------------------------------+ |
   |  | hello world                                               | |
   |  +-----------------------------------------------------------+ |
   |                                                                |
   |  Output:                                                       |
   |  +-----------------------------------------------------------+ |
   |  | Hello World                                               | |
   |  +-----------------------------------------------------------+ |
   |                                                                |
   |  Statistics:                                                   |
   |  Characters: A · Words: B · Lines: C · Pages (+ context): D    |
   |                                                                |
   +----------------------------------------------------------------+

7.  Comparison with Existing Systems

7.1.  Chicago Manual of Style
   Pros: Comprehensive, widely adopted
   Cons: Complex rules, inconsistent application
   Difference: HcTc simplifies rules while prioritizing authorial intent
   and modern contexts.

7.2.  Associated Press Style
   Pros: Clear guidelines, journalistic focus
   Cons: Over-capitalization, poor for technical content
   Difference: HcTc reduces visual noise by lowercasing non-essential
   functional words.

7.3.  APA Style
   Pros: Academic rigor, consistent
   Cons: Conservative, doesn't adapt to modern content
   Difference: HcTc is explicitly designed for digital and technical
   content, embracing modern communication patterns.

8.  Considerations

8.1.  Accessibility

   o  Screen readers: Consistent capitalization improves navigation
   o  Visual impairments: Clear hierarchy helps scanning
   o  Cognitive load: Fewer arbitrary rules reduce mental effort

8.2.  Internationalization

   o  Multi-language support: Rules adapt to different languages
   o  Cultural sensitivity: Respects local capitalization conventions
   o  Unicode support: Handles accented characters and special scripts

8.3.  Technical Implementation

   o  Performance: Efficient algorithms for real-time processing
   o  Accuracy: High precision in word classification
   o  Maintainability: Clear, documented code structure

8.4.  Limitations

   o  Context dependency: Some words require context for proper
      classification
   o  Language specificity: Rules may need adjustment for non-English
      languages
   o  Subjectivity: Some edge cases require human judgment

9.  Security Considerations

   This document does not introduce any security considerations beyond
   those already present in text processing systems.

10. IANA Considerations

   This document has no IANA actions.

11. References

11.1.  Normative References

   [RFC2119]  Bradner, S., "Key words for use in RFCs to Indicate
              Requirement Levels", BCP 14, RFC 2119,
              DOI 10.17487/RFC2119, March 1997,
              <https://www.rfc-editor.org/info/rfc2119>.

11.2.  Informative References

   [CHICAGO]  University of Chicago Press, "The Chicago Manual of Style",
              17th Edition, 2017.

   [AP]       Associated Press, "The Associated Press Stylebook", 55th
              Edition, 2020.

   [APA]      American Psychological Association, "Publication Manual of
              the American Psychological Association", 7th Edition, 2020.

   [BRINGHURST] Bringhurst, R., "The Elements of Typographic Style",
                Version 4.0, 2012.

   [NIELSEN]  Nielsen, J., "Readability and the Web", Nielsen Norman
              Group, 1997.

12. Author's Address

   Florent Dufour
   Human-centric Title case
   Email: devnull@example.com

   This RFC was authored as part of the Human-centric Title case
   project, exploring human-centric approaches to text formatting 
   and readability.
</pre>
</div>

<script>
(function() {
    const input = document.getElementById('input');
    const output = document.getElementById('output');
    const statistics = document.getElementById('statistics');

    let wasmReady = false;

    /* 
     * This provides the Emscripten module with hooks to control its behavior.
     */
    window.Module = {
        /*
         * This callback runs when the WebAssembly module has been downloaded,
         * compiled, and is ready to be used.
         */
        onRuntimeInitialized: () => {
            wasmReady = true;
            handleInput(); /* Process any initial text in the input field */
        },
        /* Redirect stdout and stderr to the browser console for debugging. */
        print: (text) => { if (text) console.log('stdout: ' + text); },
        printErr: (text) => { if (text) console.error('stderr: ' + text); }
    };

    /*
     * Interfaces with the 'humanTitleCase' C function compiled to WebAssembly.
     * It handles memory management for passing the string to and from WASM.
     */
    function convertTitleCase(text) {
        if (!wasmReady) return null;

        const inputPtr = Module._malloc(Module.lengthBytesUTF8(text) + 1);
        Module.stringToUTF8(text, inputPtr, Module.lengthBytesUTF8(text) + 1);

        const resultPtr = Module.ccall('humanTitleCase', 'number', ['number'], [inputPtr]);
        const result = Module.UTF8ToString(resultPtr);

        Module._free(inputPtr);
        return result;
    }

    /*
     * Calculates and displays statistics about the input text.
     */
    function updateStatistics(text) {
        if (!text.trim()) {
            statistics.textContent = '';
            return;
        }
        const charCount = text.length;
        const wordCount = (text.match(/\S+/g) || []).length;
        const lineCount = text.split('\n').length;
        const memoryInPagesNum = 2 + (charCount / 65536);
        const memoryInPages = memoryInPagesNum.toFixed(6);
        const memoryInKB = Math.floor((memoryInPagesNum + 1) * 64) ;
        statistics.textContent = `Characters: ${charCount} · Words: ${wordCount} · Lines: ${lineCount} · Pages: ${memoryInPages} (${memoryInKB} KB)`;
    }

    /*
     * Main handler for processing input. It calls the WebAssembly function
     * and updates the UI with the result and statistics.
     */
    function handleInput() {
        const text = input.value;

        if (!wasmReady) {
            output.textContent = '';
            statistics.textContent = '';
            return;
        }

        if (!text.trim()) {
            output.textContent = '';
            updateStatistics('');
            return;
        }

        try {
            const result = convertTitleCase(text);
            if (result !== null) {
                output.textContent = result;
                updateStatistics(text);
            }
        } catch (error) {
            output.textContent = `Error: ${error.message}`;
            statistics.textContent = 'WebAssembly processing failed.';
            console.error(error);
        }
    }
    
    /* --- Event Listeners --- */
    input.addEventListener('input', handleInput);
    output.addEventListener('click', () => {
        if (output.textContent) {
            const range = document.createRange();
            range.selectNodeContents(output);
            const selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
        }
    });
    input.addEventListener('click', () => input.select());

    /* --- Initial State --- */
    input.focus();
    handleInput(); /* Set initial state */
})();
</script>
<script src="{% link /assets/2024/human-centric-title-case/HcTc.release.js %}"></script>

---

## C Implementation

```c
/*
 * RFC-001 Human-centric Title Case
 * (c) 2024 Florent Dufour, Gemini 2.5 Pro
 *
 * HcTc.c
 *
 * Human Title Case Converter - C Implementation for WebAssembly
 *
 */

#include <stddef.h>
#include <stdint.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>
#include <strings.h>

/* Export macros for WebAssembly */
#define WASM_EXPORT(name) __attribute__((export_name(#name)))

/* Define boolean type for clarity */
typedef uint8_t bool;
#define true 1
#define false 0

/* List of functional words to be lowercased (unless first or last word) */
/* From _chantiers/2024/titlecase.draft.md, section 4.1 */
static const char* const functional_words[] = {
    /* Articles */
    "a", "an", "the",
    /* Conjunctions */
    "and", "but", "or", "nor", "so", "yet",
    /* Prepositions */
    "about", "above", "across", "against", "around", "as", "at", "behind", 
    "below", "beneath", "beside", "between", "beyond", "by", "down", 
    "during", "for", "from", "in", "inside", "into", "near", "of", "off", 
    "on", "onto", "out", "throughout", "to", "under", "until", "up", "upon", 
    "with", "without",
    /* Verbs */
    "is", "are", "was", "were", "weren't", "wasn't"
};
static const int num_functional_words = sizeof(functional_words) / sizeof(char*);

/* French support removed: only English functional words are processed. */

/*
 * Known phrasal verb bigrams to drive capitalization of particles (RFC 3.2.4)
 */
typedef struct { const char* verb; const char* particle; } phrasal_bigram_t;
static const phrasal_bigram_t known_phrasal_bigrams[] = {
    {"log", "in"}, {"log", "out"}, {"log", "on"},
    {"sign", "in"}, {"sign", "out"}, {"sign", "up"},
    {"turn", "on"}, {"turn", "off"},
    {"tune", "in"}, {"drop", "out"},
    {"back", "up"}, {"set", "up"},
    {"shut", "down"}, {"power", "up"},
    {"scale", "up"}, {"scale", "down"}
};
static const int num_known_phrasal_bigrams = sizeof(known_phrasal_bigrams) / sizeof(phrasal_bigram_t);

/*
 * List of proper nouns to preserve their specific capitalization.
 * This list includes modern tech companies, brands, and terms.
 * The matching is case-insensitive, but the replacement will use the exact
 * case from this list.
 */
static const char* const proper_nouns[] = {
    "Amazon", "Angular", "Ansible", "API", "APIs", "Apple", "AWS", "Azure", 
    "CSS", "CSS3", "ChatGPT", "Claude 3", "Cloudflare", "Discord", "Docker", 
    "ECMAScript", "Facebook", "Figma", "GitLab", "GitHub", "Go", "Google", 
    "GraphQL", "GPT-4", "HTML", "HTML5", "HcTc", "Java", "JavaScript", 
    "jQuery", "JSON", "JWT", "Kubernetes", "Linux", "LLM", "LLaMA", 
    "MacBook", "macOS", "Markdown", "Microsoft", "MySQL", "Netflix", 
    "Next.js", "Node.js", "Notion", "NPM", "OAuth", "OpenAI", "PostgreSQL", 
    "Python", "React", "Redis", "REST", "RFC", "Rust", "S3", "SQLite", "SSH", 
    "Slack", "Svelte", "Tailwind", "TCP", "Terraform", "TypeScript", "UDP", 
    "URL", "USB", "Vercel", "Vue.js", "WebAssembly", "WASM", "Windows", 
    "YouTube", "Zoom",
    /* Technical terms/examples to preserve exact casing */
    "getElementById", "git"
};
static const int num_proper_nouns = sizeof(proper_nouns) / sizeof(char*);

/* Helper to check if a character is a delimiter for words */
static bool is_word_delimiter(char c) {
    return c == ' ' || c == '\t' || c == '\n';
}

/* Case-insensitive equality against a C string literal */
static bool equals_ci(const char* word, size_t len, const char* literal) {
    size_t lit_len = strlen(literal);
    if (len != lit_len) return false;
    return strncasecmp(word, literal, len) == 0;
}

/* 
 * Case-insensitive check if a word is in the functional words list.
 * The word might be part of a larger string and not null-terminated.
 */
static bool is_functional_word(const char* word, size_t len) {
    if (len == 0) return false;

    for (int i = 0; i < num_functional_words; i++) {
        size_t func_len = strlen(functional_words[i]);
        if (len == func_len) {
            if (strncasecmp(word, functional_words[i], len) == 0) {
                return true;
            }
        }
    }


    return false;
}

/* 
 * Case-insensitive check if a word is in the proper nouns list.
 * If it is, returns the correctly cased version from the list.
 * Otherwise, returns NULL.
 */
static const char* get_proper_noun_casing(const char* word, size_t len) {
    if (len == 0) return NULL;

    for (int i = 0; i < num_proper_nouns; i++) {
        if (strncasecmp(word, proper_nouns[i], len) == 0 && strlen(proper_nouns[i]) == len) {
            return proper_nouns[i];
        }
    }
    return NULL;
}

/* Check if a word is all uppercase (and longer than 1 char), likely an acronym */
static bool is_acronym(const char* word, size_t len) {
    if (len <= 1) return false;
    for (size_t i = 0; i < len; i++) {
        if (word[i] < 'A' || word[i] > 'Z') {
            return false;
        }
    }
    return true;
}

/* Capitalizes a word part in place: first letter upper, rest lower */
static void capitalize_word_part(char* dest, const char* src, size_t len) {
    if (len == 0) return;
    dest[0] = toupper(src[0]);
    for (size_t i = 1; i < len; i++) {
        dest[i] = tolower(src[i]);
    }
}

/* Lowercases a word part in place */
static void lowercase_word_part(char* dest, const char* src, size_t len) {
    if (len == 0) return;
    for (size_t i = 0; i < len; i++) {
        dest[i] = tolower(src[i]);
    }
}

/*
 * Processes a single word according to the HcTc specification.
 * This function follows the detection logic from RFC 001, Sections 3.3 and 4.1:
 * 1. Check against the proper noun dictionary.
 * 2. Check if the word is an acronym.
 * 3. Check against the functional words list and first/last or forced rule.
 * 4. Apply default capitalization.
 */
static void process_word(char* dest_word, const char* src_word, size_t len, bool force_capitalize) {
    /* 1. Proper Noun Check */
    const char* proper_casing = get_proper_noun_casing(src_word, len);
    if (proper_casing) {
        memcpy(dest_word, proper_casing, strlen(proper_casing));
        return;
    }

    /* 2. Acronym Check */
    if (is_acronym(src_word, len)) {
        memcpy(dest_word, src_word, len); /* Preserve acronym case */
        return;
    }

    /* 
     * 3. Functional Word Check & 4. Default Capitalization.
     * This part also handles hyphenated words, processing each part
     * according to the rules. The concept of a "Meaningful Word" from
     * the RFC is implemented here: a word is considered meaningful if it
     * is not a functional word.
     */
    const char* p = src_word;
    const char* end = src_word + len;
    char* d = dest_word;

    while (p < end) {
        const char* part_end = p;
        while (part_end < end && *part_end != '-') {
            part_end++;
        }
        size_t part_len = part_end - p;
        
        const char* proper_part_casing = get_proper_noun_casing(p, part_len);
        if (proper_part_casing) {
            size_t proper_len = strlen(proper_part_casing);
            memcpy(d, proper_part_casing, proper_len);
            d += proper_len;
        } else if (force_capitalize || !is_functional_word(p, part_len)) {
            /* Capitalize meaningful parts or when forced (first/last, phrasal) */
            capitalize_word_part(d, p, part_len);
            d += part_len;
        } else {
            /* Lowercase functional parts */
            lowercase_word_part(d, p, part_len);
            d += part_len;
        }
        
        if (part_end < end) {
            *d++ = '-'; /* Copy hyphen */
        }
        p = part_end + 1;
    }
}

/* Determine if previous and current word form a known phrasal bigram */
static bool is_known_phrasal_pair(const char* prev_word, size_t prev_len, const char* curr_word, size_t curr_len) {
    if (prev_len == 0 || curr_len == 0) return false;
    for (int i = 0; i < num_known_phrasal_bigrams; i++) {
        if (equals_ci(prev_word, prev_len, known_phrasal_bigrams[i].verb) &&
            equals_ci(curr_word, curr_len, known_phrasal_bigrams[i].particle)) {
            return true;
        }
    }
    return false;
}

/* Global dynamic buffer for output */
static char *output_buffer = NULL;
static size_t output_capacity = 0;  /* bytes allocated */

/*
 * Main conversion function as described in the RFC 001 pseudocode.
 * This function orchestrates the splitting of the text into words and
 * applying the HcTc rules to each word.
 */
WASM_EXPORT(humanTitleCase)
char* humanTitleCase(const char* text) {
    size_t input_len = strlen(text);

    /* Ensure output buffer is large enough */
    size_t required = input_len + 1;
    if (required > output_capacity) {
        char *new_buf = (char *)realloc(output_buffer, required);
        if (!new_buf) {
            return output_buffer ? output_buffer : ""; /* Allocation failed */
        }
        output_buffer = new_buf;
        output_capacity = required;
    }

    /* Find the start of the last word to identify it */
    const char* last_word_start = NULL;
    const char* p = text;
    while (*p) {
        while (*p && is_word_delimiter(*p)) p++;
        if (*p) {
            last_word_start = p;
            while (*p && !is_word_delimiter(*p)) p++;
        }
    }

    p = text;
    char* out_p = output_buffer;
    bool is_first_word_on_line = true;

    const char* prev_word_start = NULL;
    size_t prev_word_len = 0;

    while (*p) {
        /* Copy delimiters and check for newlines to reset capitalization */
        const char* delimiter_start = p;
        while (*p && is_word_delimiter(*p)) {
            if (*p == '\n') {
                is_first_word_on_line = true;
                prev_word_start = NULL;
                prev_word_len = 0; /* do not form bigrams across lines */
            }
            p++;
        }
        memcpy(out_p, delimiter_start, p - delimiter_start);
        out_p += (p - delimiter_start);

        if (*p == '\0') break;

        /* Find word end and process the word */
        const char* word_start = p;
        const char* word_end = word_start;
        while (*word_end && !is_word_delimiter(*word_end)) {
            word_end++;
        }
        size_t word_len = word_end - word_start;

        bool is_last_word = (word_start == last_word_start);
        bool force_capitalize = is_first_word_on_line || is_last_word ||
                                is_known_phrasal_pair(prev_word_start, prev_word_len, word_start, word_len);

        process_word(out_p, word_start, word_len, force_capitalize);
        is_first_word_on_line = false; /* Subsequent words on same line are not "first" */

        /* Update previous word context for potential phrasal bigrams */
        prev_word_start = word_start;
        prev_word_len = word_len;

        out_p += word_len;
        p = word_end;
    }

    *out_p = '\0';
    return output_buffer;
}

/*
 * Legacy wrapper for backward compatibility.
 * This function is kept to avoid breaking older integrations.
 */
WASM_EXPORT(convert_title_case)
char* convert_title_case(const char* input) {
    return humanTitleCase(input);
}

/* Get version information - exported to WebAssembly */
WASM_EXPORT(get_version)
uint32_t get_version() {
    return 0x00010000; /* Version 1.0.0 */
}
```
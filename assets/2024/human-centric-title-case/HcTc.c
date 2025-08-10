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
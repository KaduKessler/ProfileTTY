# Security policy

## Reporting a vulnerability

Please report security problems privately through GitHub:
[Report a vulnerability](https://github.com/KaduKessler/profiletty/security/advisories/new).

Do not open a public issue for a vulnerability.

This is a one-person project. I will reply as soon as I can, with no guaranteed response time.

## Supported versions

Only the latest version on `main` receives fixes.

## Scope

ProfileTTY runs locally. It reads a JSON file and a text file and writes SVG files. It has no runtime dependencies, makes no network calls and handles no tokens.

In scope:

- Input that makes the generator write invalid or unsafe SVG, for example by getting around the XML escaping.

Not a vulnerability, but worth knowing: the `ascii` field is a file path. It can point to any file you can read, so review a profile JSON from someone else before you generate.

Out of scope: how GitHub or a browser renders the generated SVGs.

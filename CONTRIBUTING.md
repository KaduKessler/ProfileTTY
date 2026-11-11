# Contributing

Use Node.js 26 LTS (or Node.js 24.12+). No dependency installation is required.

1. Create a branch for your change.
2. Keep rendering local and deterministic: no network calls or tokens.
3. Keep your own cards in `local/` (ignored by Git), for example `npm run card -- local/profile.json local/out`. Run `npm test` and `npm run build`. CI also checks that `docs/` matches `examples/`; regenerate it with `npm run docs`.
4. Check both generated SVGs, including long values and XML characters.
5. Explain the behavior changed and how you checked it in your pull request.

Code contributions are made under the MIT license.

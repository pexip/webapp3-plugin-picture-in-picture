# Changelog

## 1.0.1

### Security

- Updated `@pexip/plugin-api` to `22.4.1` to address CVE-2026-41907 in its `uuid` dependency.

### Removed

- Unused dev dependencies: `eslint`, `eslint-config-love`, `eslint-config-prettier` and `prettier`.
- The `lint` and `test` npm scripts, which had no configuration or dependencies behind them.

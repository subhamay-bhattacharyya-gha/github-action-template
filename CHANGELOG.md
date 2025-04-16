# Changelog

---

## [1.0.0] - 2025-04-16

### 🎉 Initial Release

- Initial release of the repository.
- Included core workflows, README, and examples for reusable actions

### 🚀 Added

- Added support for dynamic GitHub Action inputs using environment variables
- Introduced CloudFormation linting step with GitHub summary output
- Integrated reusable workflow template for CI builds

### 🐛 Fixed

- Resolved issue with missing environment variables in reusable workflows
- Fixed invalid JSON output error in `detect-services` job

### 🔄 Changed

- Updated default AWS region to `us-east-1` for consistency
- Refactored Lambda and Glue job builders into separate parallel jobs

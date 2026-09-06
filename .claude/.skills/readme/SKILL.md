---
name: readme
description: README documentation guidelines and best practices
category: project-specific
command: Reference
tags: [documentation, readme, markdown]
---

# README Skill

README documentation guidelines and best practices for the GitHub Action template.

## Overview

The README.md is the first thing users see. It should clearly communicate:
- What the project does
- How to use it
- How to contribute
- Where to get help

## Key File: README.md

Located at repository root: [README.md](../../../README.md)

## Essential Sections

A good README includes these sections in order:

### 1. Title & Badge Section

```markdown
# GitHub Action Template

[![Build Status](badge-url)](link)
[![License: MIT](badge-url)](link)
```

Quick status indicators at top.

### 2. Description

Brief explanation of what this project is:

```markdown
A template repository for creating reusable composite GitHub Actions with:
- Automated semantic versioning
- Conventional commit support
- GitHub Workflows included
```

### 3. Quick Start / Usage

How users get started immediately:

```markdown
## Quick Start

### As a Composite Action

```yaml
- uses: user/github-action-template@v1.0.0
  with:
    param-name: value
```

### As a Reusable Workflow

```yaml
jobs:
  pipeline:
    uses: user/repo/.github/workflows/workflow.yaml@main
    with:
      environment: dev
```
```

### 4. Features / Capabilities

What this action/workflow provides:

```markdown
## Features

- ✅ Automated version management
- ✅ Python environment setup
- ✅ GitHub API integration
- ✅ Reusable workflows
```

### 5. Inputs & Outputs

For composite actions:

```markdown
## Inputs

| Input | Required | Default | Description |
|-------|----------|---------|-------------|
| `python-version` | No | `3.11` | Python version |
| `issue-number` | Yes | — | GitHub issue number |

## Outputs

| Output | Description |
|--------|-------------|
| `status` | Action status (success/failure) |
```

### 6. Installation / Setup

Development setup instructions:

```markdown
## Installation

```bash
# Clone repository
git clone https://github.com/user/repo.git
cd repo

# Install dependencies
npm ci

# Set up git hooks
npm run prepare
```
```

### 7. Usage Examples

Real-world usage patterns:

```markdown
## Usage Examples

### Basic Usage

```yaml
- uses: user/action@main
  with:
    python-version: "3.11"
```

### Advanced Configuration

```yaml
- uses: user/action@main
  with:
    python-version: "3.11"
    debug: true
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```
```

### 8. Configuration / Options

Detailed configuration guide:

```markdown
## Configuration

### Environment Variables

- `GITHUB_TOKEN` — GitHub API token (required)
- `DEBUG` — Enable debug logging (optional)

### Conditional Steps

Use `if:` to run steps conditionally:

```yaml
- run: command
  if: github.event_name == 'push'
```
```

### 9. Development

For contributors:

```markdown
## Development

```bash
# Run tests
npm test

# Run linter
npm run lint

# Create commit
npm run commit

# Trigger release (automatic on main)
```

See [CONTRIBUTING.md](../../../CONTRIBUTING.md) for details.
```

### 10. API Reference (if applicable)

Document available actions/functions:

```markdown
## API Reference

### action.yaml

Composite action that:
1. Sets up Python
2. Posts comments to GitHub issues
3. Returns action status

See [action.yaml](action.yaml) for full definition.
```

### 11. Troubleshooting

Common issues and solutions:

```markdown
## Troubleshooting

### Action fails with "Permission denied"

Ensure workflow has correct permissions:

```yaml
permissions:
  contents: read
  issues: write
```

### Version not updating

Use conventional commits:
- `feat:` for features
- `fix:` for bug fixes
- See [CLAUDE.md](../../../CONTRIBUTING.md) for details
```

### 12. Contributing

Link to contribution guidelines:

```markdown
## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

Process:
1. Fork repository
2. Create feature branch
3. Make changes
4. Create pull request
5. Get review and merge

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed steps.
```

### 13. License

```markdown
## License

This project is licensed under the [MIT License](LICENSE).
```

### 14. Support & Help

```markdown
## Support

- 📖 [Documentation](CLAUDE.md)
- 🐛 [Report Issues](https://github.com/user/repo/issues)
- 💬 [Discussions](https://github.com/user/repo/discussions)
- 📧 Contact: email@example.com
```

## Formatting Guidelines

### Markdown Best Practices

- **Use headers** for structure (# > ## > ###)
- **Bold key terms** for emphasis
- **Use code blocks** for examples (```language)
- **Use tables** for structured data
- **Use lists** for multiple items
- **Link internally** to related files
- **Add emojis** for visual interest (optional)

### Code Examples

Always specify language in code blocks:

````markdown
```yaml
# YAML example
name: Example
```

```bash
# Bash example
npm install
```

```javascript
// JavaScript example
const action = require('action');
```
````

### Links

```markdown
# Internal links
[CONTRIBUTING.md](CONTRIBUTING.md)
[action.yaml](./action.yaml)

# External links
[GitHub Actions Docs](https://docs.github.com/actions)
```

## Content Quality

### Do's

✅ Keep README focused on the main purpose  
✅ Use clear, simple language  
✅ Provide working examples  
✅ Update when features change  
✅ Include links to related docs  
✅ Add examples for common use cases  
✅ Be welcoming to new users  

### Don'ts

❌ Don't make it too long (keep under 500 lines)  
❌ Don't mix multiple projects in one README  
❌ Don't include outdated examples  
❌ Don't require extensive background knowledge  
❌ Don't forget to update after changes  

## Template Structure

```markdown
# Project Name

[Badges]

[One-line description]

## Features

[Key capabilities]

## Quick Start

[Minimal working example]

## Installation

[Setup instructions]

## Usage

[How to use]

## Configuration

[Available options]

## Development

[Contributing basics]

## Troubleshooting

[Common issues]

## Contributing

[Link to CONTRIBUTING.md]

## License

[License info]

## Support

[Getting help]
```

## Keeping README Updated

- Update when adding features
- Update examples after changes
- Add troubleshooting for reported issues
- Review before each release
- Link to CHANGELOG.md for changes

## Tools & Resources

### Markdown Validation

```bash
# Check markdown syntax
npm run lint
```

### Badge Services

- Build status: shields.io
- License: choosealicense.com
- Version: img.shields.io

### README Generators

- readme-md-generator
- Standard README

## Related Files

- [CONTRIBUTING.md](../../../CONTRIBUTING.md) — Contribution guidelines
- [CHANGELOG.md](../../../CHANGELOG.md) — Version history
- [CLAUDE.md](../../../CLAUDE.md) — Project structure
- [LICENSE](../../../LICENSE) — License information

## Examples

### Good README Characteristics

- Scannable (headers, lists, bold text)
- Actionable (clear next steps)
- Complete (covers main use cases)
- Accurate (examples actually work)
- Linked (to related documentation)
- Welcoming (friendly, inclusive tone)

## Maintenance Schedule

- After merging significant features: Update README
- After adding new workflow: Document in README
- Before release: Review README for accuracy
- Quarterly: Review for outdated info

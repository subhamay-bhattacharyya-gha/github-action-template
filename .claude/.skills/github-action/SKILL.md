---
name: github-action
description: Composite GitHub Action definition and configuration
category: project-specific
command: Reference
tags: [action, github-actions, composite, automation]
---

# GitHub Action Skill

Composite GitHub Action definition and configuration for this repository.

## Overview

This repository serves as a **Composite GitHub Action** template. It defines reusable actions that can be called from other repositories' workflows.

## What is a Composite Action?

A composite action bundles multiple shell commands or other GitHub Actions into a single, reusable action. It's defined in `action.yaml` at the repository root.

## Key File: action.yaml

The composite action is defined in [action.yaml](../../../action.yaml) with:

### Structure

```yaml
name: Action Name
description: Brief description
inputs:
  param_name:
    description: Parameter description
    required: true/false
    default: default-value
outputs:
  output_name:
    description: Output description
    value: ${{ steps.step-id.outputs.value }}
runs:
  using: composite
  steps:
    - run: command
      shell: bash
      env:
        VAR_NAME: value
```

### Current Action

The template action:
- Sets up Python environment
- Posts comments to GitHub issues via API
- Uses `GITHUB_TOKEN` for authentication

### Inputs

Define action inputs that callers provide:
```yaml
inputs:
  python-version:
    description: Python version to install
    required: false
    default: "3.11"
  issue-number:
    description: GitHub issue number
    required: true
```

### Outputs

Define values the action produces:
```yaml
outputs:
  status:
    description: Action completion status
    value: ${{ steps.run.outputs.status }}
```

### Steps

Sequential steps executed when action is called:
```yaml
steps:
  - name: Setup Python
    run: |
      python --version
    shell: bash
```

## Using the Action

### From Another Repository

```yaml
# .github/workflows/use-action.yml
jobs:
  use-custom-action:
    runs-on: ubuntu-latest
    steps:
      - uses: subhamay-bhattacharyya-gha/github-action-template@main
        with:
          python-version: "3.11"
          issue-number: 42
```

### With Secrets/Tokens

Pass GitHub token via environment variable:
```yaml
steps:
  - uses: your-org/your-action@main
    env:
      GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## Modifying the Action

### Adding Inputs

Edit `action.yaml`:
```yaml
inputs:
  new-param:
    description: Parameter description
    required: true
    default: value
```

Use in steps:
```yaml
- run: echo ${{ inputs.new-param }}
  shell: bash
```

### Adding Outputs

Define in `action.yaml`:
```yaml
outputs:
  result:
    description: Result description
    value: ${{ steps.step-name.outputs.result }}
```

### Adding Steps

Add new step to `runs.steps`:
```yaml
- name: Step name
  run: |
    command here
  shell: bash
  env:
    VAR: value
```

## Best Practices

- Keep steps focused and reusable
- Use environment variables for configuration
- Always set shell type (bash, pwsh, sh)
- Document inputs and outputs clearly
- Test with `/run` before publishing
- Use meaningful step names
- Handle errors gracefully

## Testing the Action

```bash
# Test locally (if possible)
/run

# Verify GitHub API calls work
# Check permissions in action.yaml match workflow permissions
```

## Security Considerations

- Never hardcode secrets
- Pass tokens via environment variables
- Use minimal required permissions
- Validate all inputs
- Escape special characters in GitHub API calls

## Related Files

- [action.yaml](../../../action.yaml) — Action definition
- [CLAUDE.md](../../../CLAUDE.md) — Project structure and rules
- `.github/workflows/` — Example workflows using actions

## Publishing the Action

When ready to publish:
1. Use conventional commits for version bumps
2. Merge to `main` → Semantic release publishes
3. Action available as `user/repo@version-tag`

---
name: github-reusable-workflow
description: Reusable GitHub Workflow definition and configuration
category: project-specific
command: Reference
tags: [workflow, github-actions, reusable, ci-cd]
---

# GitHub Reusable Workflow Skill

Reusable GitHub Workflow definition and configuration for this repository.

## Overview

This repository includes a **Reusable Workflow** that other repositories can call from their own workflows. It provides a complete CI/CD pipeline template.

## What is a Reusable Workflow?

A reusable workflow is a workflow file that can be called from other repositories' workflows. It's defined with `workflow_call` trigger and provides a standardized pipeline.

## Key File: .github/workflows/workflow.yaml

The reusable workflow is defined in [workflow.yaml](../../../.github/workflows/workflow.yaml) with:

### Trigger

```yaml
on:
  workflow_call:
    inputs:
      environment:
        required: false
        default: dev
        type: string
      debug:
        required: false
        default: false
        type: boolean
    secrets:
      github_token:
        required: true
```

### Accepts

- **Inputs:**
  - `environment` — Target environment (dev, staging, prod)
  - `debug` — Enable debug logging
- **Secrets:**
  - `github_token` — GitHub API token for access

## Workflow Structure

### Sequential Jobs

The workflow runs in sequence:

1. **Setup Job**
   - Checkout code
   - Setup Node.js environment
   - Cache npm dependencies for speed

2. **Build & Test Jobs** (Parallel)
   - Build job: Compile/bundle code
   - Test job: Run test suite
   - Both run after setup completes

3. **Validate Job**
   - Ensures all previous jobs succeeded
   - Final validation step
   - Marks workflow as complete

### Job Dependencies

```
Setup
  ├→ Build
  ├→ Test
  └→ Validate (after Build & Test complete)
```

## Using the Workflow

### From Another Repository

Create workflow that calls this reusable workflow:

```yaml
# .github/workflows/ci.yml
name: CI Pipeline
on: [push, pull_request]

jobs:
  run-template-workflow:
    uses: subhamay-bhattacharyya-gha/github-action-template/.github/workflows/workflow.yaml@main
    with:
      environment: dev
      debug: false
    secrets:
      github_token: ${{ secrets.GITHUB_TOKEN }}
```

### With Different Environments

```yaml
jobs:
  dev-pipeline:
    uses: your-org/repo/.github/workflows/workflow.yaml@main
    with:
      environment: dev
    secrets:
      github_token: ${{ secrets.GITHUB_TOKEN }}

  prod-pipeline:
    uses: your-org/repo/.github/workflows/workflow.yaml@main
    with:
      environment: prod
    secrets:
      github_token: ${{ secrets.GITHUB_TOKEN }}
```

## Modifying the Workflow

### Adding Inputs

Edit `workflow.yaml`:
```yaml
on:
  workflow_call:
    inputs:
      new-input:
        required: true
        type: string
        description: Input description
```

Use in jobs:
```yaml
jobs:
  job-name:
    runs-on: ubuntu-latest
    steps:
      - run: echo ${{ inputs.new-input }}
```

### Adding Jobs

Add new job to workflow:
```yaml
jobs:
  new-job:
    needs: [setup]  # Declare dependencies
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: command
```

### Adding Steps

Add step to existing job:
```yaml
steps:
  - name: Step name
    run: |
      command here
```

## Artifacts

The workflow retains artifacts for 1 day by default:
- Build artifacts (compiled output)
- Coverage reports (test coverage data)

Access artifacts in dependent jobs:
```yaml
- uses: actions/download-artifact@v4
  with:
    name: build
```

## Environment Variables

Set environment variables per job or step:

```yaml
jobs:
  job-name:
    env:
      NODE_ENV: development
    steps:
      - run: npm test
        env:
          DEBUG: true
```

## Caching

Workflow caches npm dependencies:
```yaml
- uses: actions/setup-node@v4
  with:
    cache: npm
```

This speeds up subsequent runs by avoiding re-downloads.

## Best Practices

- Keep jobs focused and reusable
- Use job dependencies clearly (`needs: [job1, job2]`)
- Cache dependencies for speed
- Set meaningful timeout limits
- Use concurrency to limit parallel runs
- Document all inputs and outputs
- Test workflow locally with `act` if needed

## Permissions

Ensure calling workflows have correct permissions:
```yaml
permissions:
  contents: read
  issues: write
  pull-requests: write
```

## Testing the Workflow

```bash
# Verify syntax
/code-review

# Test workflow definition
git push  # Trigger GitHub Actions
```

## Security Considerations

- Pass secrets explicitly (don't hard-code)
- Use minimal required permissions
- Validate all workflow inputs
- Review logs for exposed secrets
- Use OIDC tokens when available

## Related Files

- [.github/workflows/workflow.yaml](../../../.github/workflows/workflow.yaml) — Workflow definition
- [action.yaml](../../../action.yaml) — Composite action called by workflow
- [CLAUDE.md](../../../CLAUDE.md) — Project structure and rules

## Monitoring Workflows

Monitor workflow runs in GitHub:
- Actions tab shows all workflow executions
- View job logs for debugging
- Check artifact storage
- Monitor execution times

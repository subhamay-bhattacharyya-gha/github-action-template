# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a **GitHub Action template repository** that serves as a base for creating composite GitHub Actions. The action is designed to be reusable and includes automated versioning via semantic-release.

**Key characteristics:**

- Composite GitHub Action (defined in `action.yaml`) if this repository is used to create GitHub Action
- GitHub Reusable Workflow (defined in `.github/workflows/workflow.yaml`) if this repository is used to create GitHub Reusable Workflow
- Automated semantic versioning and releases
- Custom semantic-release plugins for release automation
- Conventional commits with commitizen
- Automated workflows for branch creation and release

## Project Structure

```text
.claude/
├── settings.json                 # Claude Code workspace settings
├── settings.local.json           # Local overrides for settings
└── statusline-command.sh         # Custom statusline command
.devcontainer/
└── devcontainer.json             # Dev container setup (Node.js 20)
.github/
├── workflows/
│   ├── release.yaml              # Semantic release on push to main
│   ├── create-branch.yaml        # Auto-create feature branches
│   └── notify.yaml               # Notification workflow
├── ISSUE_TEMPLATE/
│   ├── bug_report.md             # Bug report issue template
│   └── feature_request.md        # Feature request issue template
├── PULL_REQUEST_TEMPLATE.md      # Pull request template with guidelines
├── CODEOWNERS                    # Code ownership assignments
└── dependabot.yaml               # Dependency update configuration
scripts/plugins/
├── release.config.js             # Semantic-release configuration
├── prepare.js                    # Updates version during release
├── analyze-commits.js            # Custom commit analysis
├── generate-notes.js             # Release notes generation
├── publish.js                    # Publishing logic
└── verify-conditions.js          # Pre-release verification
action.yaml                       # Composite action definition
.releaserc.json                   # Semantic-release config
package.json                      # Dependencies and scripts
package-lock.json                 # Locked versions
CHANGELOG.md                      # Auto-generated changelog
README.md                         # Project documentation
CODE_OF_CONDUCT.md                # Community code of conduct
CONTRIBUTING.md                   # Contribution guidelines
LICENSE                           # Project license
.gitignore                        # Git ignore rules
CLAUDE.md                         # Guidance for Claude Code
```

## Development Commands

### Install dependencies

```bash
npm ci
```

### Trigger semantic release (usually automatic on main)

```bash
npm run release
```

### Use commitizen for conventional commits

```bash
npx cz commit
```

## Key Files to Understand

### `action.yaml`

- Defines the composite action interface: inputs, outputs, and steps
- Current action: Sets up Python and posts comments to GitHub issues via API
- When modifying: Update input/output definitions and add/remove steps as needed
- Uses `shell: bash` for most steps
- Secrets/tokens passed via environment variables (e.g., `GITHUB_TOKEN`)

### `.github/workflows/workflow.yaml`

- Reusable workflow template that can be called from other repositories
- Triggered via `workflow_call` trigger for external consumption
- Accepts inputs: `environment` (default: dev), `debug` flag
- Accepts secrets: `github_token` for GitHub API access
- Organized into sequential jobs: setup → build/test → validate
- Setup job caches npm dependencies for faster subsequent runs
- Build and test jobs run in parallel after setup completes
- Validate job ensures all previous jobs succeeded before marking workflow as complete
- Artifacts (build, coverage) are retained for 1 day by default

### Release Flow

The semantic-release workflow runs on every push to `main`:

1. **Analyze commits** → determine version bump (major/minor/patch)
2. **Generate notes** → create release notes
3. **Update changelog** → commit to CHANGELOG.md
4. **Publish** → create GitHub release, tag commit
5. **Git commit** → push version bump and changelog

For a release to trigger:

- Commits must follow conventional format: `feat:` (minor), `fix:` (patch), `BREAKING CHANGE:` (major)
- Custom analyzer in `analyze-commits.js` looks for commits starting with `feat` or `fix`

## Conventional Commits

This repo uses conventional commits to drive semantic versioning:

- `feat: ...` → MINOR version bump (0.1.0 → 0.2.0)
- `fix: ...` → PATCH version bump (0.1.0 → 0.1.1)
- `BREAKING CHANGE: ...` → MAJOR version bump (0.1.0 → 1.0.0)
- Other commits (chore, docs, etc.) → no release

Use `npx cz commit` to create formatted commits interactively.

## Workflows

### `release.yaml` (Automatic)

- Triggers: Push to `main` branch
- Runs: `npm ci` → `npx semantic-release`
- Permissions: contents (tags/commits), issues, pull-requests
- Creates: GitHub releases, version tags, changelog updates

### `create-branch.yaml` (Automatic)

- Triggers: Issue assigned
- Uses: `subhamay-bhattacharyya-gha/create-branch-action@main`
- Creates feature branch with naming pattern: `{type}/GHA-{issue-number}-{slug}` (e.g., `feature/GHA-58-add-claude` or `bug/GHA-42-fix-auth`)

### `notify.yaml`

- This GitHub Action Reusable workflow sends a Slack notification whenever an issue / pull request if\s opened.

## Rules & Requirements

### `package.json`

- **Must contain** the current repository name in the `name` field (e.g., `github-action-template`)
- **Must contain** a description of the repository in the `description` field
- Defines all project dependencies and development tools
- Contains scripts for common tasks: `npm ci`, `npm test`, `npm run build`, `npm run release`
- Version field is automatically updated by semantic-release during releases
- Locked dependency versions are maintained in `package-lock.json`

### `scripts/plugins/release.config.js`

- **Must be** the entry point for semantic-release configuration
- **Must chain** plugins in order: commit-analyzer → release-notes-generator → changelog → git → github
- **Must configure** the assets list (currently `CHANGELOG.md`) to determine what gets committed during release
- **Must include** all branches in the branches list where releases should run (e.g., `main`, release branches)

## Testing & Validation

When modifying the action:

1. Test steps locally if possible (e.g., bash scripts)
2. Update action.yaml if changing inputs/outputs
3. Verify GitHub API calls work with appropriate permissions in `action.yaml` and workflows
4. Use conventional commits when ready to test release flow
5. Check CHANGELOG.md and GitHub releases after merge to main

## Dev Container

A dev container is configured with:

- Base image: Ubuntu (via mcr.microsoft.com/devcontainers/base:ubuntu)
- Node.js 20 (feature)
- GitHub Copilot extension pre-installed

Use with: `code --remote-container-url <repo>`

## Current Branch

The main branch is the release branch; all feature work should branch from here and merge back via PR.

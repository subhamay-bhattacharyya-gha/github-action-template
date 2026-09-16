# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a **GitHub Action template repository** for creating composite GitHub Actions and reusable workflows. The repository includes:

- **Composite GitHub Action** (`action.yaml`) — a reusable action that can be published and versioned
- **Reusable Workflow** (`.github/workflows/workflow.yaml`) — a callable workflow for external use
- **Semantic versioning** via `semantic-release` with custom plugins
- **Conventional commits** with `commitizen` to drive automated versioning
- **Claude Code integration** via GitHub Actions for AI-assisted development

## Project Structure

```
.claude/
├── .rules/                       # Guidance rules for specific files
│   ├── package-json.md
│   └── release-config.md
├── .skills/                      # Reusable skill guides
│   ├── contribution/SKILL.md      # Contribution workflow
│   ├── package-json/SKILL.md      # Dependency management
│   ├── readme/SKILL.md            # Documentation guidelines
│   └── SKILLS_INDEX.md            # Skill reference
├── settings.json                 # Claude Code workspace settings
└── settings.local.json           # Local overrides

.devcontainer/
└── devcontainer.json             # Dev container (Node.js 20)

.github/
├── workflows/
│   ├── release.yaml              # Semantic release (auto on main)
│   ├── workflow.yaml             # Reusable workflow template
│   ├── create-branch.yaml        # Auto-create feature branches
│   ├── notify.yaml               # Notification workflow
│   ├── claude.yaml               # Claude Code integration
│   └── claude-code-review.yaml   # Claude Code Review integration
├── PULL_REQUEST_TEMPLATE.md      # PR template
├── ISSUE_TEMPLATE/
│   ├── bug_report.md
│   └── feature_request.md
├── CODEOWNERS                    # Code ownership
└── dependabot.yaml               # Dependency updates

scripts/plugins/                  # Semantic-release custom plugins
├── release.config.js             # Main configuration
├── prepare.js                    # Pre-release preparation
├── analyze-commits.js            # Commit analysis
├── generate-notes.js             # Release notes generation
├── publish.js                    # Publishing logic
└── verify-conditions.js          # Pre-release checks

action.yaml                       # Composite action definition
.releaserc.json                   # Semantic-release config
package.json                      # Dependencies & scripts
package-lock.json                 # Locked versions
CHANGELOG.md                      # Auto-generated changelog
README.md                         # Project documentation
CONTRIBUTING.md                   # Contribution guidelines
CODE_OF_CONDUCT.md                # Community code of conduct
LICENSE                           # Project license
.gitignore                        # Git ignore rules
```

## Common Development Commands

### Initial Setup
```bash
npm ci                            # Install dependencies (preferred over npm install)
```

### Creating Commits
```bash
npx cz commit                     # Interactive conventional commit (recommended)
git commit -m "feat: description" # Direct conventional commit
```

### Releases
```bash
npm run release                   # Trigger semantic-release (usually automatic on main)
```

### Usage in GitHub Actions
```bash
# Trigger semantic release workflow
git push origin main              # Pushes to main → release.yaml runs → semantic-release executes
```

## Architecture & Key Files

### `action.yaml` — Composite Action Definition

- **Purpose:** Defines the action interface consumed by GitHub Workflows
- **Key Components:**
  - **Inputs:** Configure what consumers can pass to the action (e.g., `github-token`, custom inputs)
  - **Outputs:** Define what the action exposes after execution
  - **Steps:** Composite steps run in order; bash steps use `shell: bash` and can access inputs via `${{ inputs.input-name }}`
- **Token Handling:** GitHub tokens passed via `env:` → `GITHUB_TOKEN` (not via script args)
- **Current Implementation:** Sets up Python, posts GitHub API comments to issues
- **When Modifying:**
  - Update input/output schema when changing action interface
  - Add/remove steps as functionality changes
  - Keep step names descriptive for workflow visibility
  - Use environment variables for sensitive data (tokens, secrets)

### `.github/workflows/workflow.yaml` — Reusable Workflow Template

- **Purpose:** Callable workflow for use by external repositories
- **Trigger:** `workflow_call` — enables other repos to call this workflow
- **Inputs & Secrets:**
  - `environment` (string, default: `dev`) — deployment environment
  - `debug` (boolean, default: `false`) — enable debug logging
  - `github_token` (secret, required) — GitHub API access
- **Job Structure:**
  1. **setup** → Checkout, install dependencies, cache npm
  2. **build** & **test** → Run in parallel after setup completes
  3. **validate** → Ensure all previous jobs succeeded
- **Artifact Management:** Build and coverage artifacts retained for 1 day
- **When Modifying:**
  - Add new jobs after setup for optimal parallelization
  - Update input definitions if changing the callable interface
  - Keep validation job as final gate before marking workflow complete

### Release Flow & Semantic Versioning

**Trigger:** Every push to `main` branch runs `release.yaml` → `npm run release`

**Version Bumping Rules:**
- `feat: ...` → **MINOR** bump (e.g., 0.1.0 → 0.2.0)
- `fix: ...` → **PATCH** bump (e.g., 0.1.0 → 0.1.1)
- `BREAKING CHANGE:` → **MAJOR** bump (e.g., 0.1.0 → 1.0.0)
- Other commits (chore, docs, etc.) → No release

**Custom Plugin Chain** (`scripts/plugins/release.config.js`):
1. `@semantic-release/commit-analyzer` — Analyzes commits to determine version bump
2. `@semantic-release/release-notes-generator` — Generates release notes
3. `@semantic-release/changelog` — Updates CHANGELOG.md
4. `@semantic-release/git` — Commits version changes and pushes tag
5. `@semantic-release/github` — Creates GitHub release and tag

**Creating a Release:**
1. Make changes on a feature branch
2. Create PR and merge to `main` with conventional commit (use `npx cz commit`)
3. Push triggers `release.yaml` → semantic-release runs automatically
4. GitHub release, tag, and changelog are created and pushed
5. Version in `package.json` is auto-updated

### `.github/workflows/create-branch.yaml` — Auto-Branch Creation

- **Trigger:** Issue assigned to someone
- **Action:** Creates feature branch with naming pattern `{type}/GHA-{issue-number}-{slug}`
- **Examples:**
  - `feature/GHA-58-add-claude-code-setup`
  - `bug/GHA-42-fix-authentication`
- **Branch Type Inference:** Determined by issue labels or description keywords

### Claude Code Integration

#### `claude.yaml` — Interactive Claude Code Workflow

- **Trigger:** GitHub comments/reviews containing `@claude`
- **Permissions:** Read code, write issues/PRs, read CI results
- **Behavior:** Runs Claude Code interactively in response to mentions
- **Use Cases:**
  - Ask Claude to implement features: `@claude implement user login`
  - Request code reviews: `@claude review this change`
  - Debug issues: `@claude why is this test failing?`

#### `claude-code-review.yaml` — Automated Code Review

- **Trigger:** Every PR opened/updated (ready_for_review, reopened)
- **Behavior:** Automatically runs `/code-review` on PR diffs
- **Output:** Posts review findings as PR comment
- **Configuration:** Currently set to default review level (can customize with `claude_args`)

## File-Specific Rules

### `package.json`

See `.claude/.rules/package-json.md` for details. Key requirements:
- **Must** have `name` field = repository name (e.g., `github-action-template`)
- **Must** have descriptive `description` field
- Version is auto-updated by semantic-release; do not manually edit
- All npm scripts should be documented in CONTRIBUTING.md

### `scripts/plugins/release.config.js`

See `.claude/.rules/release-config.md` for details. Key requirements:
- **Must** be entry point for semantic-release configuration
- **Must** chain plugins in correct order (analyzer → notes → changelog → git → github)
- **Must** configure `assets` list (typically `["CHANGELOG.md"]`) for commits
- **Must** specify `branches` array (e.g., `["main"]`) where releases should run

## Conventional Commits & Commitizen

This repository enforces conventional commit format for semantic versioning to work automatically:

```
type(scope): subject

body
footer
```

**Types:** `feat`, `fix`, `chore`, `docs`, `style`, `refactor`, `test`, `perf`

**Examples:**
```bash
npx cz commit                      # Interactive, guided commit
git commit -m "feat: add Python setup to action"
git commit -m "fix: correct GitHub API endpoint"
git commit -m "BREAKING CHANGE: remove deprecated input"
```

**Why It Matters:**
- Drives automatic semantic versioning
- Creates clean, machine-readable changelog
- Enables automated release workflows
- Improves code history quality

## Workflow Integration with Claude Code

### Using Claude to Modify Action Logic

1. Update `action.yaml` for new inputs/outputs
2. Modify corresponding bash scripts in steps
3. Run conventional commit: `npx cz commit -m "feat: add X to action"`
4. Push to main → automatic release and version bump

### Testing Action Changes

1. Local testing: Run action steps manually if possible
2. Test GitHub API calls with appropriate token permissions
3. Verify workflow.yaml calls the action correctly
4. Use `/code-review` if available on your branch for feedback

### Reviewing PR Changes

1. PR automatically triggers `claude-code-review.yaml`
2. Claude Code Review posts findings as PR comment
3. Address findings and push updates
4. Review runs again on subsequent commits

## Development Best Practices

**Before Committing:**
- Use `npx cz commit` for conventional format (not `git commit -m`)
- Verify your change doesn't break existing action inputs/outputs
- Check that GitHub API calls have appropriate permissions

**Before Merging to Main:**
- Ensure conventional commit is used (drives automatic release)
- Let CI workflows pass (they're not skippable)
- Claude Code Review has had a chance to comment (optional but recommended)

**When Working with Semantic-Release:**
- Never manually edit `version` field in package.json
- Never manually create git tags
- The release workflow handles everything automatically
- Just merge PRs with conventional commits to main

## Related Skills

For detailed guidance on specific topics, see `.claude/.skills/`:

- **[Contribution](./contribution/SKILL.md)** — Full development workflow
- **[Package.json](./package-json/SKILL.md)** — Dependency management
- **[README](./readme/SKILL.md)** — Documentation guidelines

## Dev Container

A pre-configured dev container is available with:
- Ubuntu base image
- Node.js 20
- GitHub Copilot extension (if user has license)

Use: `code --remote-container-url <repo>` or open in VS Code Dev Containers

## Questions?

- **How do I create a proper commit?** → Use `npx cz commit` for interactive guided commit
- **How do I trigger a release?** → Merge a PR to main with conventional commit; automatic
- **How do I add new action inputs?** → Update `action.yaml` inputs section, then implement logic
- **How do I test locally?** → Run bash scripts from action steps manually; `action.yaml` runs them
- **What's Claude Code doing?** → See `claude.yaml` and `claude-code-review.yaml`; tag `@claude` in issues/PRs

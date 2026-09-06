---
name: skills-index
description: Index of available Claude skills for this GitHub Action template
metadata:
  type: reference
---

# Skills Index

Reference guide for the five core skills in this GitHub Action template repository.

## Available Skills

### 1. [Contribution](./contribution/SKILL.md)
**Category:** Project-specific  
**Description:** Guidelines and workflow for contributing to the project

Covers:
- Development setup and prerequisites
- Branch naming conventions
- Development workflow (from issue to merge)
- Testing and code quality
- Documentation guidelines
- Bug reporting process

**Quick Start:** See [CONTRIBUTING.md](../../CONTRIBUTING.md)

---

### 2. [GitHub Action](./github-action/SKILL.md)
**Category:** Project-specific  
**Description:** Composite GitHub Action definition and configuration

Covers:
- What composite actions are
- action.yaml structure and syntax
- Inputs and outputs definition
- Step configuration
- Using actions in other repositories
- Modifying action components
- Testing and security

**File:** [action.yaml](../../action.yaml)

---

### 3. [GitHub Reusable Workflow](./github-reusable-workflow/SKILL.md)
**Category:** Project-specific  
**Description:** Reusable GitHub Workflow definition and configuration

Covers:
- What reusable workflows are
- workflow.yaml structure
- Workflow triggers and inputs
- Job dependencies and sequencing
- Using workflows from other repositories
- Artifacts and caching
- Environment configuration

**File:** [.github/workflows/workflow.yaml](../../.github/workflows/workflow.yaml)

---

### 4. [Package.json](./package-json/SKILL.md)
**Category:** Project-specific  
**Description:** Package.json configuration and requirements

Covers:
- Required fields (name, description, version)
- Dependency management
- Available npm scripts
- Semantic versioning strategy
- Conventional commits integration
- Best practices and troubleshooting

**File:** [package.json](../../package.json)

---

### 5. [README](./readme/SKILL.md)
**Category:** Project-specific  
**Description:** README documentation guidelines and best practices

Covers:
- Essential sections for a good README
- Documentation structure
- Markdown formatting guidelines
- Code examples and usage patterns
- Links and references
- Keeping documentation updated

**File:** [README.md](../../README.md)

---

## Quick Reference Table

| Skill | Purpose | Main File |
|-------|---------|-----------|
| Contribution | Contribution workflow & guidelines | CONTRIBUTING.md |
| GitHub Action | Composite action definition | action.yaml |
| GitHub Reusable Workflow | Workflow definition & usage | .github/workflows/workflow.yaml |
| Package.json | Dependencies & npm configuration | package.json |
| README | Documentation structure | README.md |

---

## Usage Guide

### For Developers Contributing Code
1. Read [Contribution](./contribution/SKILL.md) skill
2. Follow branch naming and workflow
3. Use conventional commits (`npm run commit`)
4. Ensure all tests pass

### For Modifying the Action
1. Read [GitHub Action](./github-action/SKILL.md) skill
2. Edit [action.yaml](../../action.yaml)
3. Add/modify inputs, outputs, or steps
4. Test with `/run`
5. Commit and push

### For Setting Up Workflows
1. Read [GitHub Reusable Workflow](./github-reusable-workflow/SKILL.md) skill
2. Configure [workflow.yaml](../../.github/workflows/workflow.yaml)
3. Define jobs and steps
4. Test workflow execution
5. Document in README

### For Managing Dependencies
1. Read [Package.json](./package-json/SKILL.md) skill
2. Use `npm ci` for installation
3. Keep metadata fields accurate (name, description)
4. Use conventional commits for versioning
5. Run security audits regularly

### For Documenting the Project
1. Read [README](./readme/SKILL.md) skill
2. Update [README.md](../../README.md) with:
   - Quick start examples
   - Usage patterns
   - Configuration options
   - Troubleshooting guide
3. Link to related documentation
4. Keep examples working and current

---

## Key Relationships

```
README.md
├── Links to CONTRIBUTING.md
├── Links to CLAUDE.md
└── Shows examples using action.yaml & workflow.yaml

action.yaml
└── Used by .github/workflows/
    └── Called from other repositories

package.json
├── Defines version (auto-updated by semantic-release)
├── Defines scripts (including npm run commit)
└── Manages dependencies

CONTRIBUTING.md
├── References package.json scripts
├── References branch naming from automation
└── Links to CLAUDE.md

.github/workflows/workflow.yaml
├── References action.yaml
└── Triggered on pushes to main
```

---

## Best Practices Summary

### Code Quality
✅ Run code review before PRs  
✅ Use conventional commits  
✅ Keep tests passing  
✅ Follow branch naming convention  

### Documentation
✅ Update README with new features  
✅ Keep examples working  
✅ Link related documentation  
✅ Use clear, simple language  

### Automation
✅ Use `npm run commit` for commits  
✅ Let semantic-release manage versions  
✅ Verify workflows pass before merge  
✅ Monitor GitHub Actions runs  

### Security
✅ Use tokens via environment variables  
✅ Keep dependencies updated  
✅ Run security audits  
✅ Validate workflow inputs  

---

## Related Documentation

- [CLAUDE.md](../../CLAUDE.md) — Complete project guidance
- [CONTRIBUTING.md](../../CONTRIBUTING.md) — Full contribution guidelines
- [CHANGELOG.md](../../CHANGELOG.md) — Version history and changes
- [LICENSE](../../LICENSE) — Project license

---

## Questions?

- **How to contribute?** → See [Contribution](./contribution/SKILL.md)
- **How to modify the action?** → See [GitHub Action](./github-action/SKILL.md)
- **How to set up workflows?** → See [GitHub Reusable Workflow](./github-reusable-workflow/SKILL.md)
- **How to manage deps?** → See [Package.json](./package-json/SKILL.md)
- **How to document?** → See [README](./readme/SKILL.md)

---

*Last updated: 2026-09-06*

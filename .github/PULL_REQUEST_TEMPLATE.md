# Pull Request

## Description

<!-- Brief description of what this PR does -->

## Type of Change

- [ ] New demo application
- [ ] Bug fix
- [ ] Feature enhancement
- [ ] Documentation update
- [ ] Infrastructure/tooling change
- [ ] Other (please describe):

## Monorepo Structure Checklist

If adding a new demo, ensure you've followed the 5-level structure:

- [ ] Placed in correct path: `apps/<framework>/<document>/<type>/<implementation>/<library-or-solution>/<demo>/`
- [ ] Updated `package.json` with scoped name: `@apps/<framework>-<document>-<library-or-solution>-<demo>`
- [ ] Created comprehensive README.md in the demo directory
- [ ] Verified build passes: `pnpm --filter <package-name> build`
- [ ] Verified dev server runs: `pnpm --filter <package-name> dev`

## Deployment Checklist

If this demo should be deployed:

- [ ] Added/updated Vercel project configuration
- [ ] Updated GitHub Actions workflows (if applicable)
- [ ] Verified deployment paths in CI/CD configs

## Testing

- [ ] Tested locally with `pnpm -w install && pnpm -w build`
- [ ] Verified all affected apps still build
- [ ] Tested dev servers for affected apps

## Documentation

- [ ] Updated relevant documentation (if needed)
- [ ] Added demo to `master-sample-app` (if applicable)
- [ ] Updated deployment docs (if applicable)

## Related Issues

<!-- Link to any related issues: Fixes #123, Relates to #456 -->

## Screenshots/Videos

<!-- If applicable, add screenshots or videos demonstrating the changes -->

## Additional Context

<!-- Any additional context or information reviewers should know -->

---

## For Reviewers

### Demo Location

**Path**: `apps/<framework>/<document>/<type>/<implementation>/<library-or-solution>/<demo>/`

**Package name**: `@apps/<...>`

### How to Test

```bash
# Install dependencies
pnpm -w install

# Run the specific demo
pnpm --filter @apps/<package-name> dev

# Build the specific demo
pnpm --filter @apps/<package-name> build
```

### Structure Verification

The demo follows the 5-level hierarchy:

1. **Framework**: <!-- e.g., react -->
2. **Document**: <!-- e.g., canvas, crdt, comments -->
3. **Type**: <!-- e.g., text-editors, screen-recording -->
4. **Implementation**: <!-- libraries or custom-implementation -->
5. **Library/Solution**: <!-- e.g., reactflow, tiptap, basic -->
6. **Demo**: <!-- e.g., reactflow-master-app -->

---

**Documentation**: See [README_MONOREPO.md](../README_MONOREPO.md) and [docs/structure.md](../docs/structure.md) for more details on the monorepo structure.


# Publishing Guide

Step-by-step guide to publish `react-ui-pip` to npm.

## Prerequisites

1. npm account (sign up at https://www.npmjs.com)
2. Verified email on npm
3. npm CLI installed

## Pre-publish Checklist

- [ ] Update version in `package.json`
- [ ] Update `CHANGELOG.md` with changes
- [ ] Update repository URLs in `package.json`
- [ ] Add your name/email to `author` field in `package.json`
- [ ] Test build locally: `npm run build`
- [ ] Verify `dist/` folder contains compiled files
- [ ] Review `README.md` for accuracy
- [ ] Ensure `LICENSE` file is present

## First-Time Setup

### 1. Login to npm

```bash
npm login
```

Enter your:
- Username
- Password
- Email
- One-time password (if 2FA enabled)

### 2. Verify login

```bash
npm whoami
```

Should display your npm username.

## Publishing Steps

### 1. Update package.json

```json
{
  "name": "react-ui-pip",
  "version": "1.0.0",
  "author": "Harpinder Singh",
  "repository": {
    "type": "git",
    "url": "https://github.com/harpinderdev/react-ui-pip.git"
  }
}
```

### 2. Install dependencies

```bash
npm install
```

### 3. Build the package

```bash
npm run build
```

Verify the `dist/` folder:
```bash
ls -la dist/
```

Should contain:
- `index.js` (CommonJS)
- `index.mjs` (ES Module)
- `index.d.ts` (TypeScript types)
- `index.d.mts` (ESM types)

### 4. Test the package locally (optional)

```bash
npm pack
```

This creates a `.tgz` file you can install in another project:

```bash
cd /path/to/test-project
npm install /path/to/react-ui-pip/react-ui-pip-1.0.0.tgz
```

### 5. Publish to npm

```bash
npm publish
```

For scoped packages (e.g., `@username/react-ui-pip`):

```bash
npm publish --access public
```

### 6. Verify publication

Visit: https://www.npmjs.com/package/react-ui-pip

Or install it:

```bash
npm install react-ui-pip
```

## Updating the Package

### Patch version (bug fixes)

```bash
npm version patch
# 1.0.0 -> 1.0.1
npm publish
```

### Minor version (new features)

```bash
npm version minor
# 1.0.1 -> 1.1.0
npm publish
```

### Major version (breaking changes)

```bash
npm version major
# 1.1.0 -> 2.0.0
npm publish
```

## Automated Publishing with GitHub Actions

Create `.github/workflows/publish.yml`:

```yaml
name: Publish to npm

on:
  release:
    types: [created]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          registry-url: 'https://registry.npmjs.org'
      - run: npm ci
      - run: npm run build
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

Add `NPM_TOKEN` to GitHub repository secrets.

## Package Naming

If `react-ui-pip` is taken, consider:

- `@harpinderdev/react-ui-pip` (scoped)
- `react-portal-pip`
- `react-floating-pip`
- `react-ui-picture-in-picture`
- `react-draggable-pip`

Check availability:

```bash
npm search react-ui-pip
```

## Unpublishing (Within 72 hours)

```bash
npm unpublish react-ui-pip@1.0.0
```

⚠️ **Warning:** You cannot republish the same version after unpublishing.

## Best Practices

1. **Semantic versioning:** Follow semver strictly
2. **Changelog:** Always update `CHANGELOG.md`
3. **Git tags:** Tag releases in git
   ```bash
   git tag v1.0.0
   git push --tags
   ```
4. **Test before publish:** Use `npm pack` to test locally
5. **README badges:** Add npm version badge
6. **Documentation:** Keep docs up-to-date
7. **Deprecation:** Use `npm deprecate` instead of unpublishing

## Post-Publication

1. Create a GitHub release matching the npm version
2. Share on Twitter, Reddit (r/reactjs), Dev.to
3. Add to Awesome React lists
4. Update personal portfolio/website
5. Monitor issues and PRs

## Package Stats

Track downloads and stats:
- https://npm-stat.com/charts.html?package=react-ui-pip
- https://www.npmtrends.com/react-ui-pip

## Support

For npm publishing issues:
- npm documentation: https://docs.npmjs.com/
- npm support: https://www.npmjs.com/support

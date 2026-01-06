# Contributing to react-ui-pip

Thank you for considering contributing to react-ui-pip! This document provides guidelines for contributing to the project.

## Development Setup

1. Clone the repository:
```bash
git clone https://github.com/harpinderdev/react-ui-pip.git
cd react-ui-pip
```

2. Install dependencies:
```bash
npm install
```

3. Start development mode:
```bash
npm run dev
```

4. Build the package:
```bash
npm run build
```

## Project Structure

```
react-ui-pip/
├── src/
│   ├── Pip.tsx           # Main Pip component
│   ├── PipContainer.tsx  # Container component
│   ├── types.ts          # TypeScript types
│   ├── utils.ts          # Utility functions
│   └── index.ts          # Public exports
├── example/              # Usage examples
├── dist/                 # Built files (generated)
└── package.json
```

## Guidelines

### Code Style

- Use TypeScript for all code
- Follow existing code formatting
- Use meaningful variable and function names
- Add JSDoc comments for public APIs

### Commits

- Use clear, descriptive commit messages
- Follow conventional commits format:
  - `feat:` for new features
  - `fix:` for bug fixes
  - `docs:` for documentation
  - `refactor:` for code refactoring
  - `test:` for tests
  - `chore:` for maintenance

### Pull Requests

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/amazing-feature`)
3. Make your changes
4. Test your changes thoroughly
5. Commit your changes (`git commit -m 'feat: add amazing feature'`)
6. Push to the branch (`git push origin feat/amazing-feature`)
7. Open a Pull Request

### Testing

Before submitting a PR:
- Ensure the build succeeds: `npm run build`
- Test with Next.js App Router
- Test with Next.js Pages Router
- Verify SSR safety
- Check TypeScript types

## Feature Requests

Open an issue with:
- Clear description of the feature
- Use cases and motivation
- Proposed API (if applicable)

## Bug Reports

Open an issue with:
- Description of the bug
- Steps to reproduce
- Expected vs actual behavior
- Environment details (React version, Next.js version, etc.)

## Questions

For questions, please open a discussion on GitHub rather than an issue.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

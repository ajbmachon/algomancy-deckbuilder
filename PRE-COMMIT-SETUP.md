# Pre-Commit Setup for Algomancy Deckbuilder

This document explains how to use the pre-commit hooks configured for the Algomancy Deckbuilder project. These hooks automatically check and fix code quality issues before each commit.

## What's Included

Our pre-commit configuration includes the following tools:

1. **Basic Checks**:
   - Trailing whitespace removal
   - End-of-file fixing
   - YAML and JSON validation
   - Prevention of large file commits
   - Line ending normalization

2. **ESLint**:
   - JavaScript and Svelte code linting
   - Code quality checks
   - Best practice enforcement

3. **Prettier**:
   - Code formatting for JavaScript, Svelte, JSON, CSS, and HTML
   - Consistent code style across the project

4. **Stylelint**:
   - CSS style checking and fixing
   - Enforces consistent CSS styling

## Installation

The pre-commit hooks are automatically installed when you run `npm install` due to the prepare script in package.json. However, if you need to install them manually:

1. Ensure you have pre-commit installed globally:
   ```bash
   pip install pre-commit
   ```
   or
   ```bash
   brew install pre-commit
   ```

2. Install the hooks:
   ```bash
   pre-commit install
   ```

## Usage

The hooks will run automatically when you try to commit changes. If any issues are found:

1. The commit will be aborted
2. Issues will be displayed in the terminal
3. Many issues will be fixed automatically

After fixes are applied, you'll need to stage the changes and try committing again:

```bash
git add .
git commit -m "Your commit message"
```

## Running Manually

You can also run the hooks manually on all files:

```bash
pre-commit run --all-files
```

Or on specific files:

```bash
pre-commit run --files path/to/file1.js path/to/file2.svelte
```

## Skipping Hooks

In rare cases where you need to bypass the hooks (not recommended):

```bash
git commit -m "Your commit message" --no-verify
```

## Updating Hooks

To update the hooks to their latest versions:

```bash
pre-commit autoupdate
```

## Configuration

The pre-commit configuration is stored in `.pre-commit-config.yaml`. The linting and formatting rules are defined in:

- `.eslintrc.cjs` for ESLint
- `.prettierrc` for Prettier
- Stylelint uses the standard configuration

## Troubleshooting

If you encounter any issues with the pre-commit hooks:

1. Make sure you have the latest dependencies with `npm install`
2. Try reinstalling the hooks with `pre-commit install --force`
3. Check if the reported issues are valid and fix them manually if necessary

For persistent issues, you may need to check versions of ESLint, Prettier, or Stylelint and their configurations.

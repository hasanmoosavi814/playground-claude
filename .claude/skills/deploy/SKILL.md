---
name: deploy
description: Deploy this app to staging by running the full test suite, building the production bundle, and pushing the current commit to the staging branch. Use when the user asks to deploy, ship, release, or push to staging.
---

# Deploy

Deploy the current commit to staging. The three steps run **in order** and each
one is a **gate**: if a step fails, stop immediately, report what failed, and do
**not** run any later step. Never push code that did not pass tests and build.

## Instructions

### Step 0: Preflight
- Confirm the working tree state with `git status --short`. If there are
  uncommitted changes, tell the user — the deploy pushes the **current commit**
  (`HEAD`), so uncommitted work will not be included. Let them decide whether to
  commit first before you continue; do not commit on their behalf.
- Note the current branch and short SHA so the final summary can report exactly
  what was deployed.

### Step 1: Run all tests
Run the test suite:

```bash
npm test
```

This is the first gate. A non-zero exit **aborts the deploy**. Note that this
repo may not have a test runner configured yet — in that case `npm test` exits
with "Missing script: test", which counts as a **failed gate**, not a skip. Do
not work around it, do not substitute another command, and do not proceed to the
build. Report that tests are unconfigured/failing and stop.

### Step 2: Build the production bundle
Only if Step 1 passed:

```bash
npm run build
```

This is the second gate — it verifies the production bundle compiles. If the
build fails, stop and report the build error. Do not push.

### Step 3: Push to the staging branch
Only if Steps 1 and 2 both passed, push the current commit to the `staging`
branch:

```bash
git push origin HEAD:staging
```

Pushing to staging is an outward-facing action. Before running it, briefly state
what is about to be pushed (the branch/SHA from Step 0 → `staging`). If the push
is rejected (e.g. non-fast-forward), report the error rather than force-pushing —
do not add `--force` unless the user explicitly asks.

### Step 4: Report
Summarize the outcome: tests passed, build succeeded, and the commit that was
pushed to `staging`. If any step failed, the summary is just that step's failure
and the fact that nothing was pushed.

## Notes
- The step order (test → build → push) is deliberate: it prevents a broken commit
  from ever reaching staging.
- The staging branch name is `staging`. If the project's staging branch is ever
  renamed, update the `git push` target in Step 3.

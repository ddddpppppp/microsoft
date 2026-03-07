# Detail Page Responsive Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make the product detail page feel stable, readable, and touch-friendly across mobile, tablet, and desktop breakpoints without changing the core DOM structure or data behavior.

**Architecture:** Keep the existing Lit component intact and implement the improvement as a CSS-first responsive pass inside `frontend/src/pages/detail-page.js`. Limit JS changes to interaction polish only when CSS alone cannot resolve a usability issue, and verify the result with a production build plus lint diagnostics.

**Tech Stack:** Lit, Vite, plain CSS inside component styles

---

### Task 1: Document and prepare the responsive scope

**Files:**
- Modify: `docs/plans/2026-03-07-detail-page-responsive-design.md`
- Modify: `docs/plans/2026-03-07-detail-page-responsive.md`

**Step 1: Write the failing test**

No automated CSS test harness exists for this page today. Treat the production build and lint diagnostics as the verification baseline for this implementation pass.

**Step 2: Run test to verify it fails**

Not applicable because there is no UI test runner configured for this component.

**Step 3: Write minimal implementation**

Capture the intended breakpoints, accessibility polish, and layout targets in these plan documents before changing the page.

**Step 4: Run test to verify it passes**

Confirm the plan files exist and describe the intended implementation accurately.

**Step 5: Commit**

Do not commit unless explicitly requested by the user.

### Task 2: Refine the responsive layout in `detail-page.js`

**Files:**
- Modify: `frontend/src/pages/detail-page.js`

**Step 1: Write the failing test**

No automated test exists for the CSS behavior. Use the build plus lint verification after the change.

**Step 2: Run test to verify it fails**

Not applicable because there is no targeted test file for this component.

**Step 3: Write minimal implementation**

- Improve base interactive states and wrapping behavior.
- Refine tablet and mobile breakpoints.
- Make screenshot behavior more touch-friendly.
- Improve review, sidebar, and related-card readability on narrow screens.
- Add reduced-motion handling and visible focus states.

**Step 4: Run test to verify it passes**

Run:

`npm run build`

Expected:

- Vite production build succeeds without syntax errors.
- Layout-related changes do not introduce lint diagnostics in `frontend/src/pages/detail-page.js`.

**Step 5: Commit**

Do not commit unless explicitly requested by the user.

### Task 3: Verify the final state

**Files:**
- Modify: `frontend/src/pages/detail-page.js`

**Step 1: Write the failing test**

Use verification commands rather than an automated UI test.

**Step 2: Run test to verify it fails**

Not applicable because this repository does not include a dedicated component test harness for the page.

**Step 3: Write minimal implementation**

If build or lint issues appear, make the smallest possible correction in `frontend/src/pages/detail-page.js`.

**Step 4: Run test to verify it passes**

Run:

- `npm run build`
- IDE lints for `frontend/src/pages/detail-page.js`

Expected:

- Build passes.
- No new lint issues are introduced.

**Step 5: Commit**

Do not commit unless explicitly requested by the user.

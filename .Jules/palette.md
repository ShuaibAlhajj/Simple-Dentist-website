## 2025-05-14 - Mobile Navigation Accessibility & Bug Fixes

**Learning:** Interactive elements like mobile menu toggles require explicit ARIA attributes (`aria-expanded`, `aria-controls`) to be accessible to screen reader users. Additionally, inconsistent file paths for shared assets (like `main.js`) can lead to broken functionality on specific pages if not standardized.

**Action:** Always ensure interactive toggles have appropriate ARIA states and verify that shared scripts are correctly linked using the established project structure (e.g., `assets/js/main.js` instead of root `main.js`).

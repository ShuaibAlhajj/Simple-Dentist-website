## 2025-05-14 - Mobile Navigation Accessibility & Bug Fixes

**Learning:** Interactive elements like mobile menu toggles require explicit ARIA attributes (`aria-expanded`, `aria-controls`) to be accessible to screen reader users. Additionally, inconsistent file paths for shared assets (like `main.js`) can lead to broken functionality on specific pages if not standardized.

**Action:** Always ensure interactive toggles have appropriate ARIA states and verify that shared scripts are correctly linked using the established project structure (e.g., `assets/js/main.js` instead of root `main.js`).

## 2025-05-14 - Form Synchronization and Modal Accessibility

**Learning:** Micro-UX improvements to form validation logic (like splitting a 'name' field) must be carefully synchronized between JavaScript controllers and HTML views. Additionally, accessible modals require specific ARIA roles (`dialog`, `aria-modal`) and labels, while delight is added through smooth transitions that must be triggered after the element is removed from `hidden` state.

**Action:** Always verify that element IDs used in validation logic exist in the corresponding HTML. When implementing modal transitions, use a small `setTimeout` to allow the browser to register the state change before applying entry animations.

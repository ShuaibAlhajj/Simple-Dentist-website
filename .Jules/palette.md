## 2025-05-14 - Mobile Navigation Accessibility & Bug Fixes

**Learning:** Interactive elements like mobile menu toggles require explicit ARIA attributes (`aria-expanded`, `aria-controls`) to be accessible to screen reader users. Additionally, inconsistent file paths for shared assets (like `main.js`) can lead to broken functionality on specific pages if not standardized.

**Action:** Always ensure interactive toggles have appropriate ARIA states and verify that shared scripts are correctly linked using the established project structure (e.g., `assets/js/main.js` instead of root `main.js`).

## 2025-05-14 - Form Synchronization and Modal Accessibility

**Learning:** Micro-UX improvements to form validation logic (like splitting a 'name' field) must be carefully synchronized between JavaScript controllers and HTML views. Additionally, accessible modals require specific ARIA roles (`dialog`, `aria-modal`) and labels, while delight is added through smooth transitions that must be triggered after the element is removed from `hidden` state.

**Action:** Always verify that element IDs used in validation logic exist in the corresponding HTML. When implementing modal transitions, use a small `setTimeout` to allow the browser to register the state change before applying entry animations.

## 2025-05-14 - Centralized Form Feedback and Validation

**Learning:** Centralizing form validation (`setError`) and success feedback (`showSuccessModal`) in a shared script ensures a consistent user experience across different forms (Appointment vs. Contact). Using the `novalidate` attribute on forms is crucial when implementing custom client-side validation to prevent browser-default tooltips from clashing with custom UI.

**Action:** Always use a `novalidate` attribute on `<form>` tags when using custom JS validation, and use shared utility functions for recurring UI patterns like success modals.

## 2026-05-20 - Enhanced Form Accessibility and Focus Management

**Learning:** Accessible forms require more than just visual feedback; they must include ARIA attributes (`aria-invalid`, `aria-describedby`) linked to error messages to inform assistive technology users. Furthermore, focus management is a critical part of UX—ensuring that error states and new modal windows correctly move the keyboard focus prevents "focus traps" and provides clear guidance on the next required action.

**Action:** When implementing custom validation, always synchronize ARIA states with visual errors and explicitly manage focus for both error states and modal entries to maintain an intuitive keyboard flow.

## 2026-05-21 - Improving Global Accessibility with Aria-Labels and Navigation Aids

**Learning:** Micro-UX enhancements like adding a 'Back to Top' button significantly improve navigation on long pages, while descriptive `aria-label` attributes for social media links are essential for providing context to screen reader users who would otherwise encounter ambiguous abbreviations or single-letter links.

**Action:** Consistently audit footer links for descriptive accessibility labels and consider adding navigation aids (like 'Back to Top') for any page with substantial vertical content to enhance the overall user experience.

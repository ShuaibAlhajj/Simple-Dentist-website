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

## 2026-05-21 - Navigation Delight and Programmatic UI Injection

**Learning:** Micro-UX enhancements like 'Back to Top' buttons can be programmatically injected via shared scripts to provide consistent utility across long-form content without cluttering individual HTML files. Additionally, mobile navigation becomes significantly more intuitive when links automatically dismiss the menu, preventing users from having to manually toggle it closed after navigating to a section or page.

**Action:** For multi-page static sites, use centralized JS to inject global UI utilities like scroll helpers. Ensure mobile menus listen for link clicks to provide a seamless transition between pages or sections.

## 2026-05-22 - Precise Navigation Logic and Robust Attribute Management

**Learning:** Dynamic navigation highlighting in static multi-page sites can easily lead to "active traps" where multiple links (like 'Home' and a subpage) appear active simultaneously if matching logic is too broad (e.g., using `endsWith`). Furthermore, when programmatically creating interactive elements, using `setAttribute('aria-label', ...)` is more reliable for screen reader compatibility than directly setting the `ariaLabel` property.

**Action:** Implement exact string matching for navigation state logic. Always prefer `setAttribute` for defining ARIA attributes on programmatically injected DOM elements to ensure consistent assistive technology support.

## 2026-05-23 - Contextual Form Pre-filling and Browser Autocomplete

**Learning:** Users benefit significantly from contextual transitions (e.g., passing intent from a service list to a booking form) and browser-level assistance (`autocomplete`), which reduce cognitive load and form abandonment. Synchronizing form options with the rest of the site is critical for this "seamless" feel.

**Action:** When designing multi-page funnels, always look for opportunities to carry user intent through query parameters and ensure all standard form fields use appropriate `autocomplete` tokens. Verify that form dropdowns stay synchronized with the marketing copy.

## 2026-05-24 - Interactive Accordion and Smooth Height Transitions

**Learning:** Interactive accordions with smooth height transitions are best achieved using semantic `<button>` triggers with `aria-expanded` and the Tailwind CSS Grid transition pattern (`grid-rows-[0fr]` to `grid-rows-[1fr]`). Event delegation at the container level allows for efficient management of "single-open" behavior, which reduces cognitive load for the user.

**Action:** Use semantic triggers and manage ARIA states programmatically. Apply the Tailwind Grid pattern with an inner `min-h-0` container to ensure reliable 0px collapse, and use border/shadow highlights to provide clear visual feedback for the active state.

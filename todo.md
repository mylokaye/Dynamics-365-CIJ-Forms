# Documentation Improvements Todo List

## High Priority

- [x] 1. Create a "Form Attributes Reference" page documenting ALL `data-*` attributes
  - ✅ Created comprehensive form-attributes-reference.md
  - ✅ Documented all data-* attributes from raw form
  - ✅ Added quick reference tables

- [x] 2. Remove all mention of custom styling (Tailwind), stick to CSS only
  - ✅ Updated technical-reference.md (removed Tailwind, added CSS examples)
  - ✅ Updated styling-forms.md (expanded CSS examples)
  - ✅ Removed all Tailwind references

- [x] 3. Document the layout/section/container system with examples
  - ✅ Added comprehensive layout system documentation
  - ✅ Included hierarchy diagram
  - ✅ Added multi-column layout examples
  - ✅ Documented required classes and responsive behavior

- [x] 4. Add phone field documentation with examples
  - ✅ Added phone field to form elements table
  - ✅ Documented phone-specific attributes and patterns
  - ✅ Added CSS styling examples
  - ✅ Listed common phone field logical names

- [x] 5. Explain Consent vs Topic blocks clearly
  - ✅ Added comprehensive Consent & Topic Blocks section
  - ✅ Explained difference between Purpose and Topic
  - ✅ Provided complete code examples
  - ✅ Added compliance best practices
  - ✅ Linked to Microsoft Learn documentation

- [ ] 6. Add submission handling documentation (DEFERRED - will come back to this)
  - Default behavior
  - Custom confirmations
  - Redirects

- [x] 7. Document all form element types including Image and Divider
  - ✅ Updated form elements table with all types
  - ✅ Added detailed Image element documentation
  - ✅ Added detailed Divider element documentation
  - ✅ Included all input, selection, and content elements

- [ ] 8. Add field validation guide (NOT RIGHT NOW)
  - Patterns
  - Custom validation

## Medium Priority

- [ ] 9. Complete the custom fields documentation
  - How to create fields without D365 mapping

- [ ] 10. Add more detail about the `data-options` attribute format
  - For TwoOptionFormField
  - For OptionSetFormField

- [ ] 11. Explain the prefill functionality
  - What `data-prefill="prefill"` does
  - When to use it

- [ ] 12. Document captcha configuration
  - Language settings
  - How to add/configure

## Nice to Have

- [ ] 13. Add troubleshooting for common styling issues

- [ ] 14. Include before/after examples of customization

- [ ] 15. Add a "complete annotated form" example with comments explaining each part

## Notes

- **NEVER change the raw contact form example (Raw/contact.html)**
- Focus on CSS-based styling only, no Tailwind
- Prioritize clarity and completeness over brevity

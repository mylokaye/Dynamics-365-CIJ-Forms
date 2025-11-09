# Dynamics 365 Customer Insights - Journeys Forms

Comprehensive documentation and examples for creating and customizing Dynamics 365 Customer Insights - Journeys marketing forms.

## 📖 Overview

This repository provides detailed technical documentation, HTML examples, and best practices for working with Dynamics 365 Customer Insights - Journeys forms. Whether you're a developer, marketer, or solution architect, you'll find resources to help you create, customize, and optimize your forms.

## 🚀 Quick Start

1. **Browse the examples**: Check out the complete form examples in the [`Raw/`](Raw/) directory
2. **Read the documentation**: Start with the [Technical Reference](Documentation/technical-reference.md) for a comprehensive overview
3. **Customize your forms**: Learn how to style forms with our [Styling Guide](Documentation/styling-forms.md)
4. **Add interactivity**: Explore the [JavaScript API Reference](Documentation/javascript-api.md) for advanced customization

## 📚 Documentation

### Getting Started
- **[Editing Forms](Documentation/editing-forms.md)** - How to edit, publish, and manage forms in D365
- **[Styling Forms](Documentation/styling-forms.md)** - CSS customization and theming guide
- **[Form Capture](Documentation/form-capture.md)** - Connect existing HTML forms to D365

### Reference Guides
- **[Technical Reference](Documentation/technical-reference.md)** - Complete technical documentation covering:
  - Form element types and structure
  - Layout system and responsive design
  - Consent and topic blocks
  - Accessibility requirements
  - Default CSS styling

- **[Form Attributes Reference](Documentation/form-attributes-reference.md)** - Comprehensive guide to all `data-*` attributes

### Advanced Customization
- **[JavaScript API](Documentation/javascript-api.md)** - Complete API reference including:
  - Form creation API
  - Lookup field manipulation
  - React component integration
  - Custom events and lifecycle hooks
  - Code examples and troubleshooting

- **[Advanced Customization](Documentation/advanced-customization.md)** - Custom JavaScript and progressive enhancement techniques

## 📂 Repository Structure

```
Dynamics-365-forms/
├── Documentation/              # Complete documentation suite
│   ├── editing-forms.md       # Form editing guide
│   ├── styling-forms.md       # CSS styling guide
│   ├── form-capture.md        # Form capture documentation
│   ├── technical-reference.md # Comprehensive technical reference
│   ├── advanced-customization.md # Custom JavaScript guide
│   ├── javascript-api.md      # JavaScript API reference
│   └── form-attributes-reference.md # Data attributes reference
├── Raw/                       # HTML form examples
│   ├── contact.html          # Complete contact form example
│   └── lead.html             # Complete lead form example
├── README.md                  # This file
└── LICENSE                    # Apache License 2.0
```

## 💡 Examples

### Contact Form Example
A complete, accessible contact form for capturing detailed contact information:
- [View Contact Form HTML](Raw/contact.html)
- **Entity Type**: Contact records
- **Standard Fields**: firstname, lastname, email (all required), phone, job title
- **Custom Fields**: 7 custom fields (text, textarea, multi-select, dropdown, radio, checkbox, datetime)
- **Prefill**: All fields support prefilling for known contacts
- **Purpose Type**: Transactional consent + Marketing topic subscription
- **Example Layout**: Single-column consent blocks, form title/description header, privacy message, footer
- **Accessibility**: Includes aria-label and semantic HTML5

### Lead Form Example
A streamlined lead capture form optimized for lead generation:
- [View Lead Form HTML](Raw/lead.html)
- **Entity Type**: Lead records
- **Standard Fields**: firstname, lastname (required), email
- **Custom Fields**: 7 custom fields (text, textarea, number, multi-select, dropdown, radio, checkbox, datetime)
- **Prefill**: Selective prefilling (firstname and email only)
- **Purpose Type**: Commercial purpose consent + Marketing topic subscription
- **Example Layout**: Two-column consent blocks, compact design without header/footer
- **Additional Features**: Event-specific CSS for sessions and passes

### Key Differences Between Lead and Contact Forms
| Feature | Contact Form | Lead Form |
|---------|-------------|-----------|
| **Entity Type** | Contact records | Lead records |
| **Standard Fields** | 5 fields (includes phone & job title) | 3 fields |
| **Required Fields** | firstname, lastname, email | lastname only |
| **Prefill Strategy** | All fields prefilled | Selective prefilling |
| **Consent Purpose** | Transactional | Commercial |

**Note**: Layout features (columns, headers, footers) and structural elements are interchangeable between all form types. The layouts shown in these examples are just implementation choices and can be customized for any form regardless of entity type.

## 🔑 Key Features Covered

- ✅ **Form Structure** - Required HTML structure and hierarchy
- ✅ **Layout System** - Responsive sections, containers, and columns
- ✅ **Field Types** - Text, email, phone, date, dropdown, checkboxes, and more
- ✅ **Compliance** - GDPR-compliant consent and topic management
- ✅ **Styling** - CSS customization and theming
- ✅ **JavaScript API** - Programmatic form control and events
- ✅ **Accessibility** - WCAG 2.1 AA compliance guidelines
- ✅ **Best Practices** - Production-ready patterns and examples

## 🛠️ Use Cases

### For Developers
- Understand the form HTML structure and required attributes
- Implement custom JavaScript for dynamic form behavior
- Integrate forms with React and other frameworks
- Handle form events and validation

### For Marketers
- Learn how to edit and publish forms
- Understand form capture for existing forms
- Manage consent and topic subscriptions
- Test changes safely with cache bypass techniques

### For Designers
- Customize form appearance with CSS
- Apply brand colors, fonts, and styling
- Create responsive mobile-friendly forms
- Ensure accessibility compliance

## 📋 Requirements

- Dynamics 365 Customer Insights - Journeys subscription
- Domain authentication configured (for external hosting)
- Basic knowledge of HTML, CSS, and JavaScript (for customization)

## 🤝 Contributing

Contributions are welcome! Please ensure:
- Documentation is clear and complete
- Code examples are tested and functional
- Changes maintain consistency with existing content
- All links are valid and functional

## 📄 License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## 🔗 Additional Resources

- [Microsoft Learn - Dynamics 365 Customer Insights](https://learn.microsoft.com/en-us/dynamics365/customer-insights/)
- [Form Events Documentation](https://learn.microsoft.com/en-us/dynamics365/customer-insights/journeys/developer/realtime-marketing-form-client-side-extensibility)
- [Compliance Settings Guide](https://learn.microsoft.com/en-us/dynamics365/customer-insights/journeys/real-time-marketing-compliance-settings)

## 📞 Support

For issues or questions:
- Check the documentation in the `Documentation/` directory
- Review the HTML examples in the `Raw/` directory
- Consult Microsoft's official documentation

---

**Note**: The HTML examples in the `Raw/` directory are reference implementations and should not be modified. Use them as templates for your own forms.

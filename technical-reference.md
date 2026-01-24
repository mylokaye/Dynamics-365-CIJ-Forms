# Technical Reference

## Overview

This technical documentation provides in-depth details on how Dynamics 365 Customer Insights forms work, including requirements, structure, and implementation details.

### Complete Form Example

[View Complete Example](https://pattens-tech.github.io/dynamics-365-forms/templates/contact-form.html)

---

## Table of Contents

1. [Glossary](#glossary)
   - [CDN Caching](#cdn-caching)
   - [Domain Authentication](#domain-authentication)
   - [Form Capture](#form-capture)
   - [Journey ID](#journey-id)
   - [Rate Limiting](#rate-limiting)
   - [Logical Name](#logical-name)
   - [Target Audience](#target-audience)
2. [Form Element Types](#form-element-types)
3. [Default Form Fields](#default-form-fields)
4. [Form Structure Requirements](#form-structure-requirements)
   - [Header Structure](#header-structure)
   - [Body Structure (Form)](#body-structure-form)
   - [Body Structure (Thank You Modal)](#body-structure-thank-you-modal)
5. [Default CSS Styling](#default-css-styling)
   - [Typography](#typography)
   - [Form Fields](#form-fields)
   - [Buttons](#buttons)
   - [Customization](#customization)
6. [Accessibility Requirements](#accessibility-requirements)
   - [Core Principles](#core-principles)
   - [Accessibility Checklist](#accessibility-checklist)

---

## Glossary

### CDN Caching
**Content Delivery Network (CDN) Caching** refers to how D365 forms are distributed globally for fast loading. When you publish or edit a form, changes are cached across Microsoft's CDN servers worldwide. This means:
- Changes take **up to 10 minutes** to propagate globally
- Forms load faster for end users
- You can bypass caching for testing using `#d365mkt-nocache` parameter

**Learn more**: [Editing Forms - Testing Changes Safely](editing-forms.md#testing-changes-safely)

### Domain Authentication
**Domain Authentication** is the process of authorizing specific domains to host and submit D365 forms. For security, forms only work on pre-approved domains.

**Setup location**: Settings > Domain Authentication

**Requirements**:
- Add your domain to the allowed list
- Complete DNS verification
- Allow 24 hours for propagation

**Note**: Microsoft's built-in hosting domain is pre-approved by default.

### Form Capture
**Form Capture** allows you to connect existing HTML forms (not built in D365) to Dynamics 365 Customer Insights. Instead of rebuilding your form, you add a capture script that maps your form fields to D365 attributes.

**Use cases**:
- Existing forms with complex custom logic
- Forms that send data to multiple systems
- Gradual migration to D365

**Requirements**: Solution version 1.1.35355 or higher

**Learn more**: [Form Capture Guide](form-capture.md)

### Journey ID
**Journey ID** is a unique identifier used to track form interactions and link them to specific customer journeys in D365. Forms use this ID instead of cookies to:
- Identify known users
- Track form visits and submissions
- Connect form data to customer journey analytics

**Privacy note**: No cookies are used; journey-id is passed as a parameter.

### Rate Limiting
**Rate Limiting** is a security measure that restricts the number of form requests to prevent abuse and DDoS attacks.

**Current limits**:
- **2,000 requests per minute** per organization
- Translates to approximately 100-500 valid submissions per minute

**When exceeded**: Additional requests are temporarily blocked. Consider implementing client-side throttling for high-traffic forms.

### Logical Name
**Logical Name** is the internal database field name in Dynamics 365 (e.g., `emailaddress1` for the email field, `firstname` for first name). When mapping form fields, you must use the exact logical name, which is case-sensitive.

**Finding logical names**: Settings > Customizations > Entities > Fields

**Common logical names**:
- Email: `emailaddress1`
- Phone: `telephone1` or `mobilephone`
- Company: `companyname`

### Target Audience
**Target Audience** refers to the D365 entity (e.g., Contact, Lead) that form submissions will create or update. This is specified using the `data-targetaudience` attribute in form HTML.

**Common values**:
- `contact` - For contact records
- `lead` - For lead records

---

## Form Element Types

### Required Form Elements

| Element | `data-editorblocktype` | Purpose | Wrapper Class |
|---------|----------------------|---------|---------------|
| Submit button | `SubmitButton` | Form submission (required) | `.submitButtonWrapper` |

### Input Fields

| Element | `data-editorblocktype` | Purpose | Wrapper Class |
|---------|----------------------|---------|---------------|
| Text field | `TextFormField` | Single-line text input | `.textFormFieldBlock` |
| Text area | `TextAreaFormField` | Multi-line text input | `.textFormFieldBlock` |
| Email field | `TextFormField` | Email address input (use `type="email"`) | `.textFormFieldBlock` |
| Phone field | `TextFormField` | Phone number input (use `type="tel"`) | `.phoneFormFieldBlock` |
| Date/Time field | `DateTimeFormField` | Date and time picker | `.dateTimeFormFieldBlock` |
| Lookup field | `LookupFormField` | Entity lookup/search | `.lookupFormFieldBlock` |

### Selection Fields

| Element | `data-editorblocktype` | Purpose | Wrapper Class |
|---------|----------------------|---------|---------------|
| Dropdown | `OptionSetFormField` | Single-select dropdown | `.optionSetFormFieldBlock` |
| Radio buttons | `TwoOptionFormField` | Two-option radio button group | `.twoOptionFormFieldBlock` |
| Checkbox (single) | `TwoOptionFormField` | Single checkbox (yes/no) | `.twoOptionFormFieldBlock` |
| Multi-select | `MultiOptionSetFormField` | Multiple checkbox options | `.multiOptionSetFormFieldBlock` |

### Consent & Topics

| Element | `data-editorblocktype` | Purpose | Wrapper Class |
|---------|----------------------|---------|---------------|
| Consent checkbox | `Consent` | Purpose-based consent | `.consentBlock` |
| Topic checkbox | `Topic` | Topic subscription | `.consentBlock` |

### Content & Layout

| Element | `data-editorblocktype` | Purpose | Notes |
|---------|----------------------|---------|-------|
| Text | `Text` | Static text, headings, paragraphs | Use `<h1>`, `<h2>`, `<p>` tags |
| Image | `Image` | Display images | Requires `data-image-file-id` |
| Divider | `Divider` | Visual separator line | Creates `<hr>` element |

### Optional Form Elements

| Element | `data-editorblocktype` | Purpose |
|---------|----------------------|---------|
| Captcha | `Captcha` | CAPTCHA verification |
| Reset button | `ResetButton` | Form reset |
| Forward to friend | `ForwardToFriendBlock` | Email sharing functionality |
| Event sessions | `Sessions` | Event registration options |
| Event speakers | `Speakers` | Event speaker information |
| Event about | `About` | Event description |

---

## Default Form Fields

### Contacts & Leads

These may differ depending on your D365 customizations:

| Field | Logical name |
|-------|--------------|
| Contact / First Name | firstname |
| Contact / Last Name | lastname |
| Contact / Email | emailaddress1 |
| Lead / First Name | firstname |
| Lead / Last Name | lastname |
| Lead / Email | emailaddress1 |
| Lead / Mobile phone | mobilephone |
| Lead / Company name | companyname |

### Field Properties

Each form field supports:

| Property | Description | Example |
|----------|-------------|---------|
| Placeholder | Text shown when field is empty | "Enter your email" |
| Default Value | Pre-filled value | "newsletter@example.com" |
| Required | Makes field mandatory | true/false |
| Validation | Input validation rule | Custom RegExp |
| Hidden | Hide field from view | true/false |

---

## Form Element Examples

### Phone Field

Phone fields include special formatting and validation for phone numbers.

```html
<div class="phoneFormFieldBlock"
     data-editorblocktype="TextFormField"
     data-targetproperty="mobilephone"
     data-prefill="prefill">
    <label title="Mobile Phone" for="mobilephone-1670339972245">Phone number</label>
    <input id="mobilephone-1670339972245"
           type="tel"
           name="mobilephone"
           placeholder="Enter your phone number"
           title="Mobile Phone"
           pattern="(\+[\(]?[0-9]{1,4}|[\(]?00[0-9]{0,2}|[\(]?011[0-9]?|[\(]?010[0-9]?)[\)]?([ \-\(\)]*[0-9][ \-\(\)]*){3,16}"
           value="">
</div>
```

**Phone Field Features**:
- Uses `.phoneFormFieldBlock` wrapper class (different from standard text fields)
- Input type should be `type="tel"` for mobile keyboard support
- Pattern validation for international phone formats
- Supports country code prefixes

**CSS for Phone Fields**:
```css
.phoneFormFieldBlock {
    padding: 20px 30px;
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.phoneFormFieldBlock input {
    font-size: 14px;
    padding: 6px 8px;
    background-color: #faf9f8;
    border: 1px solid #e1dfdd;
    border-radius: 2px;
    width: 100%;
}
```

**Common Phone Field Logical Names**:
- `telephone1` - Business phone
- `mobilephone` - Mobile phone
- `telephone2` - Home phone

---

### Image Element

Display images within your form using the Image block.

```html
<div data-editorblocktype="Image"
     style="margin: 10px;"
     data-image-file-id="6228de52-03bc-f011-bbd3-7c1e522e1eab">
    <div align="Center" class="imageWrapper" style="">
        <img src="https://assets-gbr.mkt.dynamics.com/[org-id]/digitalassets/images/6228de52-03bc-f011-bbd3-7c1e522e1eab?ts=638981350953764583"
             style="max-height: 100%; max-width: 100%; box-sizing: border-box; display: block;"
             alt="Form image">
    </div>
</div>
```

**Image Block Requirements**:
- `data-editorblocktype="Image"` - Identifies as image block
- `data-image-file-id` - GUID of image stored in D365 Digital Assets
- Image must be uploaded to D365 first

**Uploading Images**:
1. Navigate to **Customer Insights - Journeys** > **Assets** > **Digital Assets**
2. Click **New** > **Upload**
3. Select your image file
4. Copy the asset ID (GUID) for use in `data-image-file-id`

**Image Styling**:
```css
.imageWrapper {
    text-align: center;
    margin: 20px 10px;
}

.imageWrapper img {
    max-width: 100%;
    height: auto;
    border-radius: 8px; /* Optional: rounded corners */
}
```

**Best Practices**:
- Use web-optimized images (JPEG, PNG, WebP)
- Recommended max width: 1200px
- Include descriptive `alt` text for accessibility
- Consider mobile display when sizing images

---

### Divider Element

Add visual separation between form sections using dividers.

```html
<div data-editorblocktype="Divider" style="margin: 20px 10px;">
    <div class="dividerWrapper" align="center">
        <table style="padding: 0px; margin: 0px; width: 100%; border-collapse: collapse;"
               role="presentation" cellpadding="0" cellspacing="0">
            <tbody>
                <tr style="padding: 0px;">
                    <th style="margin:0px; padding: 0px; vertical-align:top;
                               border-top-width: 2px; border-top-style: solid;
                               border-top-color: #e1dfdd;">
                        <p style="margin: 0px; padding: 0px; line-height: 0px; width: 100%;">
                            <span><!--[if gte mso 9]><br/><![endif]-->&nbsp;</span>
                        </p>
                    </th>
                </tr>
            </tbody>
        </table>
    </div>
</div>
```

**Customizing Divider Appearance**:

```css
/* Change divider color */
div[data-editorblocktype="Divider"] th {
    border-top-color: #0078d4;
}

/* Change divider thickness */
div[data-editorblocktype="Divider"] th {
    border-top-width: 3px;
}

/* Change divider style */
div[data-editorblocktype="Divider"] th {
    border-top-style: dashed; /* solid, dashed, dotted, double */
}

/* Add spacing around divider */
div[data-editorblocktype="Divider"] {
    margin: 32px 10px;
}
```

**Simple Alternative**:
For simpler markup, you can use an HTML `<hr>` tag with custom styling:

```html
<div data-editorblocktype="Divider">
    <hr style="border: none; border-top: 2px solid #e1dfdd; margin: 20px 0;">
</div>
```

---

### Text Area Field

Multi-line text input for longer responses.

```html
<div class="textFormFieldBlock"
     data-editorblocktype="TextAreaFormField"
     data-targetproperty="description"
     data-prefill="prefill"
     data-required="required">
    <label title="Description" for="description-1762538242721">Description</label>
    <textarea id="description-1762538242721"
              name="description"
              placeholder="Enter your message"
              title="Description"
              cols="20"
              rows="5"
              maxlength="2000"
              required></textarea>
</div>
```

**Text Area Styling**:
```css
.textFormFieldBlock textarea {
    resize: vertical; /* Allow vertical resizing only */
    height: 120px;
    min-height: 80px;
    max-height: 300px;
}
```

---

### Dropdown (OptionSet) Field

Single-select dropdown menu.

```html
<div class="optionSetFormFieldBlock"
     data-editorblocktype="OptionSetFormField"
     data-prefill="prefill">
    <label title="Industry" class="block-label" for="industry-1762538187215">Industry</label>
    <select id="industry-1762538187215" name="industrycode" title="Industry">
        <option value="" disabled="" hidden="">Select</option>
        <option id="industry-1" value="1" selected="">Technology</option>
        <option id="industry-2" value="2">Finance</option>
        <option id="industry-3" value="3">Healthcare</option>
        <option id="industry-4" value="4">Education</option>
    </select>
</div>
```

**Dropdown Features**:
- First option is typically a placeholder ("Select...")
- Selected option marked with `selected=""`
- Values correspond to D365 option set values

---

### Multi-Select Checkbox Group

Multiple checkbox options for selecting multiple values.

```html
<div class="multiOptionSetFormFieldBlock"
     data-editorblocktype="MultiOptionSetFormField"
     data-prefill="prefill">
    <label title="Interests" class="block-label" for="interests-1762538172904">Interests</label>
    <fieldset id="interests-1762538172904" name="interests" title="Interests">
        <div>
            <input id="interests-1" name="interests" title="Product Updates" type="checkbox" value="1">
            <label for="interests-1" title="Product Updates">Product Updates</label>
        </div>
        <div>
            <input id="interests-2" name="interests" title="Events" type="checkbox" value="2">
            <label for="interests-2" title="Events">Events</label>
        </div>
        <div>
            <input id="interests-3" name="interests" title="Newsletter" type="checkbox" value="3">
            <label for="interests-3" title="Newsletter">Newsletter</label>
        </div>
    </fieldset>
</div>
```

---

### Radio Button Group (Two-Option Field)

Two mutually exclusive options presented as radio buttons.

```html
<div class="twoOptionFormFieldBlock"
     data-editorblocktype="TwoOptionFormField"
     data-options='[{"value":"1","label":"Yes"},{"value":"0","label":"No"}]'
     data-prefill="prefill">
    <label title="Subscribe" class="block-label" for="subscribe-1762538193890">Subscribe to newsletter?</label>
    <div id="subscribe-1762538193890" class="radiobuttons">
        <div>
            <input id="subscribe-1" name="subscribe" title="Yes" type="radio" value="1" checked="">
            <label for="subscribe-1" title="Yes">Yes</label>
        </div>
        <div>
            <input id="subscribe-0" name="subscribe" title="No" type="radio" value="0">
            <label for="subscribe-0" title="No">No</label>
        </div>
    </div>
</div>
```

---

### Single Checkbox (Two-Option Field)

Single checkbox for yes/no or opt-in scenarios.

```html
<div class="twoOptionFormFieldBlock"
     data-editorblocktype="TwoOptionFormField"
     data-options='[{"value":"1","label":"Yes"},{"value":"0","label":"No"}]'
     data-prefill="prefill">
    <div class="twooption_checkbox">
        <div>
            <input id="checkbox-1" name="fieldname" title="Field label" type="checkbox" value="1">
            <label title="Field label" class="block-label" for="checkbox-1">I agree to the terms</label>
        </div>
    </div>
</div>
```

---

## Form Structure Requirements

Both header and body structures are required for forms to function.

### Form Hierarchy

```
├─→ Entire file
│   ├─→ Header (Dynamics 365 tags)
│   ├─→ Header (Style, Fonts)
│   ├─→ Body (Form)
│   │   ├─→ Layout Container (data-layout="true")
│   │   │   ├─→ Section (data-section="true")
│   │   │   │   └─→ Column Container (data-container="true")
│   │   │   │       └─→ Form Elements (fields, buttons, etc.)
│   │   │   └─→ Additional Sections...
│   └─→ Body (Thank you modal)
```

### Understanding the Layout System

Dynamics 365 forms use a structured hierarchy to organize content:

**1. Layout Container** (`data-layout="true"`)
- The outermost wrapper for all form content
- Defines the overall form width and alignment
- Required for the form to function properly
- Must include `data-layout-version="v2"`

**2. Sections** (`data-section="true"`)
- Major divisions within the form
- Used to group related content
- Controls vertical spacing and layout behavior
- Can contain one or more column containers

**3. Column Containers** (`data-container="true"`)
- Defines column widths within sections
- Enables multi-column layouts
- Specified using `data-container-width` (percentage-based)
- Contains actual form elements (fields, text, buttons)

**4. Form Elements**
- Individual fields, text blocks, buttons, etc.
- Identified by `data-editorblocktype`
- Must be inside a column container

### Layout System Example

```html
<!-- Layout Container -->
<div data-layout="true" data-layout-version="v2" style="margin: auto; max-width: 600px;">

    <!-- Section 1: Form Header -->
    <div data-section="true" class="emptyContainer columns-equal-class wrap-section"
         style="padding: 88px 10px 0px; display: flex;">

        <!-- Full-width container -->
        <div class="columnContainer" data-container="true" data-container-width="100"
             style="width: 580px;">
            <div data-editorblocktype="Text" style="margin: 10px">
                <h1>Contact Us</h1>
            </div>
        </div>
    </div>

    <!-- Section 2: Form Fields -->
    <div data-section="true" class="emptyContainer columns-equal-class wrap-section"
         style="padding: 0px; display: flex;">

        <!-- Full-width container -->
        <div class="columnContainer" data-container="true" data-container-width="100"
             style="width: 600px;">

            <!-- Form field -->
            <div class="textFormFieldBlock" data-editorblocktype="TextFormField"
                 data-targetproperty="firstname" data-required="required">
                <label for="firstname">First Name</label>
                <input id="firstname" type="text" name="firstname" required>
            </div>

        </div>
    </div>

</div>
```

### Multi-Column Layout

To create side-by-side fields, use multiple containers with adjusted widths:

```html
<!-- Section with two columns -->
<div data-section="true" class="emptyContainer columns-equal-class wrap-section"
     style="padding: 0px; display: flex;">

    <!-- Left column (50% width) -->
    <div class="columnContainer" data-container="true" data-container-width="50"
         style="width: 300px;">
        <div class="textFormFieldBlock" data-editorblocktype="TextFormField"
             data-targetproperty="firstname">
            <label for="firstname">First Name</label>
            <input id="firstname" type="text" name="firstname">
        </div>
    </div>

    <!-- Right column (50% width) -->
    <div class="columnContainer" data-container="true" data-container-width="50"
         style="width: 300px;">
        <div class="textFormFieldBlock" data-editorblocktype="TextFormField"
             data-targetproperty="lastname">
            <label for="lastname">Last Name</label>
            <input id="lastname" type="text" name="lastname">
        </div>
    </div>

</div>
```

### Required Classes

| Class | Purpose | Required On |
|-------|---------|-------------|
| `marketingForm` | Main form class, applies default styles | `<form>` |
| `emptyContainer` | Section wrapper | Section divs |
| `columns-equal-class` | Ensures equal column heights | Section divs |
| `wrap-section` | Enables responsive wrapping | Section divs |
| `columnContainer` | Container class | Container divs |

### Responsive Behavior

The layout system automatically adapts to mobile devices:

- **Desktop**: Columns display side-by-side based on specified widths
- **Tablet/Mobile** (< 768px): Columns stack vertically for better readability

To customize mobile behavior, add CSS:

```css
@media only screen and (max-width: 768px) {
    [data-layout="true"] {
        max-width: 100%;
        padding: 20px 16px;
    }

    div[data-section="true"] {
        padding: 16px 0;
    }
}
```

### Best Practices

1. **Always use the full hierarchy**: Layout → Section → Container → Elements
2. **Set explicit widths**: While `data-container-width` provides percentages, inline styles with pixel/percentage widths ensure consistency
3. **One form per page**: Don't nest multiple `data-layout="true"` containers
4. **Consistent section padding**: Maintain visual rhythm with consistent spacing
5. **Test responsiveness**: Preview forms on different screen sizes

**See Also**: [Form Attributes Reference](form-attributes-reference.md) for detailed attribute documentation

### Header Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Required: Dynamics 365 meta tags -->
    <meta type="xrm/designer/setting" name="type" value="marketing-designer-content-editor-document">
    <meta type="xrm/designer/setting" name="layout-editable" value="marketing-designer-layout-editable">

    <!-- Required: HTML document setup -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="referrer" content="never">

    <title>Marketing Form</title>

    <!-- Optional: Custom fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">

    <style>
        /* Default form styles are automatically included by D365 */
        /* Add custom CSS here to override default styles */
    </style>
</head>
```

### Body Structure (Form)

```html
<body>
  <main>
    <form aria-label="Contact Form" class="marketingForm">
      <div data-layout="true" data-layout-version="v2" style="margin: auto; max-width: 600px;">

        <!-- Form intro section -->
        <div data-section="true" class="emptyContainer columns-equal-class wrap-section" style="padding: 88px 10px 0px; display: flex;">
          <div class="columnContainer" data-container="true" data-container-width="100" style="width: 580px;">
            <div data-editorblocktype="Text" style="margin: 10px">
              <h1>Contact us</h1>
            </div>
            <div data-editorblocktype="Text" style="margin: 10px">
              <p>We'd love to hear from you</p>
            </div>
          </div>
        </div>

        <!-- Form fields section -->
        <div data-section="true" class="emptyContainer columns-equal-class wrap-section" style="padding: 0px; display: flex;">
          <div class="columnContainer" data-container="true" data-container-width="100" style="width: 600px;">

            <!-- First Name -->
            <div class="textFormFieldBlock" data-editorblocktype="TextFormField"
                 data-targetproperty="firstname" data-required="required" data-prefill="prefill">
              <label title="First Name" for="firstname-1669975306869">First name</label>
              <input id="firstname-1669975306869" type="text" name="firstname"
                     placeholder="Enter your first name" title="First Name" maxlength="50" required="required">
            </div>

            <!-- Last Name -->
            <div class="textFormFieldBlock" data-editorblocktype="TextFormField"
                 data-targetproperty="lastname" data-required="required" data-prefill="prefill">
              <label title="Last Name" for="lastname-1669976849422">Last name</label>
              <input id="lastname-1669976849422" type="text" name="lastname"
                     placeholder="Enter your last name" title="Last Name" maxlength="50" required="required">
            </div>

            <!-- Email -->
            <div class="textFormFieldBlock" data-editorblocktype="TextFormField"
                 data-targetproperty="emailaddress1" data-required="required" data-prefill="prefill">
              <label title="Email" for="emailaddress1-1669977007902">Email</label>
              <input id="emailaddress1-1669977007902" type="email" name="emailaddress1"
                     placeholder="Enter your email address" title="Email" required="required">
            </div>

          </div>
        </div>

        <!-- Submit button section -->
        <div data-section="true" class="emptyContainer columns-equal-class wrap-section" style="padding: 0px; display: flex;">
          <div class="columnContainer" data-container="true" data-container-width="100" style="width: 600px;">
            <div data-editorblocktype="SubmitButton" class="submitButtonWrapper">
              <button class="submitButton" type="submit"><span>Submit</span></button>
            </div>
          </div>
        </div>

      </div>
    </form>
  </main>
</body>
```

### Body Structure (Thank You Modal)

**Note**: D365 handles form submission responses automatically. Custom thank you messages are configured in the form settings within D365, not in the HTML.

For custom post-submission behavior, use the JavaScript API:

```javascript
document.addEventListener('d365mkt-afterformsubmit', function(event) {
    console.log('Form submitted successfully');
    // Add custom logic here
});
```

See [Advanced Customization](advanced-customization.md) for more details on form events.

---

## Default CSS Styling

Dynamics 365 forms include default CSS styling that handles responsive design, field layouts, and visual appearance.

### Typography

Default typography uses Segoe UI font family:

```css
.marketingForm {
    font-family: "Segoe UI", Arial, sans-serif;
    font-size: 14px;
    color: #000;
}

.marketingForm h1 {
    font-size: 28px;
    line-height: 1.25;
    text-align: center;
}

.marketingForm h2 {
    font-size: 22px;
    line-height: 1.25;
    color: #333;
}

.marketingForm p {
    font-size: 14px;
    line-height: 1.25;
}
```

### Form Fields

Field blocks use consistent styling:

```css
.textFormFieldBlock,
.dateTimeFormFieldBlock,
.optionSetFormFieldBlock {
    padding: 20px 30px;
    display: flex;
    flex-direction: column;
    gap: 16px;
}

/* Labels */
.textFormFieldBlock label {
    font-size: 16px;
    font-weight: 600;
    color: #323130;
}

/* Input fields */
.textFormFieldBlock input,
.marketingForm textarea {
    font-size: 14px;
    padding: 6px 8px;
    background-color: #faf9f8;
    border: 1px solid #e1dfdd;
    border-radius: 2px;
    width: 100%;
}
```

### Buttons

Submit button default styling:

```css
.submitButton {
    font-family: "Segoe UI", Arial, sans-serif;
    font-weight: 700;
    font-size: 16px;
    line-height: 22px;
    background-color: #2266e3;
    border: none;
    border-radius: 4px;
    color: #ffffff;
    padding: 10px 20px;
    cursor: pointer;
}
```

### Customization

To customize styling, add a `<style>` block in the form header to override default styles:

```html
<style>
    /* Custom brand colors */
    .submitButton {
        background-color: #0078d4;
    }

    /* Custom field styling */
    .textFormFieldBlock input {
        border-radius: 8px;
        border-color: #0078d4;
    }

    /* Custom typography */
    .marketingForm h1 {
        color: #0078d4;
        font-size: 32px;
    }
</style>
```

**See Also**: [Styling Forms](styling-forms.md) for detailed customization examples.

---

## Consent & Topic Blocks

### Understanding Purposes and Topics

Dynamics 365 Customer Insights uses a compliance framework with **Purposes** and **Topics** to manage customer consent preferences.

**Purposes** define the **reason** for contact:
- **Transactional**: Essential communications (order confirmations, password resets)
- **Commercial**: Marketing and promotional content

**Topics** define the **subject** of communications:
- Marketing updates
- Product announcements
- Event invitations
- Newsletter subscriptions

**Key Difference**:
- **Purpose (Consent)**: *Why* you're contacting them (required by law)
- **Topic**: *What* you're sending them (customer preference)

### When to Use Each

| Use Consent Block | Use Topic Block |
|-------------------|-----------------|
| Legal compliance required (GDPR, CAN-SPAM) | Customer preference management |
| Required for any commercial communications | Optional, adds granularity |
| Purpose-level consent | Topic-level subscription |
| Binary: opted in or opted out | Multiple topics per customer |

**Best Practice**: Use **both** - Consent block for legal compliance, Topic blocks for customer preferences.

### Consent Block (Purpose-Based)

Used to collect consent for a specific communication purpose.

```html
<div data-editorblocktype="Consent"
     class="consentBlock"
     data-required="false"
     data-compliancesettingsid="7f4a6355-1811-4cde-bde3-fee8c85f56b1"
     data-compliancesettingsname="Company"
     data-purposeid="10000000-0000-0000-0000-000000000001"
     data-purposename="Transactional"
     data-channels="Email,Text"
     data-optinwhenchecked="true"
     data-prefill="prefill">
    <div>
        <input type="checkbox"
               id="consentCheckbox-1762538096737"
               name="msdynmkt_purposeid;channels;optinwhenchecked"
               value="10000000-0000-0000-0000-000000000001;Email,Text;true">
        <label id="consentCheckbox-1762538096737-label" for="consentCheckbox-1762538096737">
            <p>I agree to receive transactional communications via email and text</p>
        </label>
    </div>
</div>
```

**Default Purpose IDs**:
- `10000000-0000-0000-0000-000000000001` - **Transactional**
- `10000000-0000-0000-0000-000000000003` - **Commercial**

**Consent Block Features**:
- Captures legal consent
- Required for GDPR compliance
- Stored at the purpose level
- Can specify multiple channels (Email, Text, Phone)

---

### Topic Block (Subscription-Based)

Used to collect preferences for specific marketing topics.

```html
<div class="consentBlock"
     data-editorblocktype="Topic"
     data-required="false"
     data-compliancesettingsid="7f4a6355-1811-4cde-bde3-fee8c85f56b1"
     data-compliancesettingsname="Company"
     data-purposeid="10000000-0000-0000-0000-000000000003"
     data-purposename="Commercial"
     data-topicid="b5cfd151-c1ac-f011-bbd3-7c1e522e1eab"
     data-topicname="Marketing"
     data-channels="Email,Text"
     data-optinwhenchecked="true"
     data-prefill="prefill">
    <div>
        <input type="checkbox"
               id="consentTopicCheckbox-1762538218782"
               name="msdynmkt_topicid;channels;optinwhenchecked"
               value="b5cfd151-c1ac-f011-bbd3-7c1e522e1eab;Email,Text;true">
        <label id="consentTopicCheckbox-1762538218782-label" for="consentTopicCheckbox-1762538218782">
            <p>Send me marketing updates and newsletters</p>
        </label>
    </div>
</div>
```

**Topic Block Features**:
- Captures specific content preferences
- Allows granular subscription management
- Customer can subscribe to multiple topics
- Requires a parent purpose (usually "Commercial")

---

### Setting Up Purposes and Topics

#### Creating Custom Topics

1. Navigate to **Customer Insights - Journeys** > **Settings** > **Customer engagement** > **Compliance profiles**
2. Select your compliance profile
3. Go to the **Topics** tab
4. Click **+ New topic**
5. Configure:
   - **Name**: Display name (e.g., "Product Updates")
   - **Purpose**: Select "Commercial" or custom purpose
   - **Default consent**: Opt-in or opt-out
   - **Channels**: Email, Text, Custom

6. Save and copy the Topic ID (GUID) for use in forms

#### Finding IDs

**Purpose ID**:
- Navigate to **Settings** > **Data Management** > **Compliance Settings**
- View the compliance profile
- Default purposes have standard GUIDs

**Topic ID**:
- Navigate to **Compliance Profiles** > **Topics**
- Select the topic
- Copy the ID from the URL or topic details

---

### Compliance Best Practices

1. **Always include consent for commercial communications**
   - Required by GDPR, CAN-SPAM, and other regulations
   - Use a clear, affirmative action (checkbox)

2. **Be specific and transparent**
   - Clearly state what customers are opting into
   - Mention channels (email, text)
   - Provide link to privacy policy

3. **Pre-filling consent**
   - Can pre-fill data fields, but **never** pre-check consent boxes
   - Consent must be actively given

4. **Channel specification**
   - Always specify channels: `data-channels="Email,Text"`
   - Matches customer expectations

5. **Opt-in vs. Opt-out**
   - Most regions require **opt-in** (checkbox unchecked by default)
   - Use `data-optinwhenchecked="true"` for opt-in
   - Use `data-optinwhenchecked="false"` for opt-out

---

### Example: Complete Consent Section

```html
<!-- Privacy message header -->
<div data-editorblocktype="Text" style="margin: 20px 30px 12px">
    <p>
        <span style="font-size: 16px; font-weight: 600; line-height: 22px">
            Privacy & Communications
        </span>
    </p>
</div>

<!-- Purpose consent (required for commercial comms) -->
<div data-editorblocktype="Consent" class="consentBlock" data-required="true"
     data-purposeid="10000000-0000-0000-0000-000000000003"
     data-purposename="Commercial"
     data-channels="Email"
     data-optinwhenchecked="true">
    <div>
        <input type="checkbox" id="consent-commercial"
               name="msdynmkt_purposeid;channels;optinwhenchecked"
               value="10000000-0000-0000-0000-000000000003;Email;true">
        <label for="consent-commercial">
            <p>I agree to receive commercial communications from [Company Name]</p>
        </label>
    </div>
</div>

<!-- Topic: Product updates -->
<div data-editorblocktype="Topic" class="consentBlock" data-required="false"
     data-purposeid="10000000-0000-0000-0000-000000000003"
     data-topicid="b5cfd151-c1ac-f011-bbd3-7c1e522e1eab"
     data-topicname="Product Updates"
     data-channels="Email"
     data-optinwhenchecked="true">
    <div>
        <input type="checkbox" id="topic-products"
               name="msdynmkt_topicid;channels;optinwhenchecked"
               value="b5cfd151-c1ac-f011-bbd3-7c1e522e1eab;Email;true">
        <label for="topic-products">
            <p>Product updates and announcements</p>
        </label>
    </div>
</div>

<!-- Topic: Events -->
<div data-editorblocktype="Topic" class="consentBlock" data-required="false"
     data-purposeid="10000000-0000-0000-0000-000000000003"
     data-topicid="c6dae262-d2bd-f011-bbd3-7c1e522e1eab"
     data-topicname="Events"
     data-channels="Email"
     data-optinwhenchecked="true">
    <div>
        <input type="checkbox" id="topic-events"
               name="msdynmkt_topicid;channels;optinwhenchecked"
               value="c6dae262-d2bd-f011-bbd3-7c1e522e1eab;Email;true">
        <label for="topic-events">
            <p>Event invitations and webinars</p>
        </label>
    </div>
</div>

<!-- Privacy policy link -->
<div data-editorblocktype="Text" style="margin: 10px 30px">
    <p style="font-size: 12px; color: #605e5c;">
        View our <a href="https://yourcompany.com/privacy" target="_blank">Privacy Policy</a>
        to learn how we handle your data.
    </p>
</div>
```

---

### Related Resources

- **Microsoft Learn**: [Compliance Settings in Customer Insights](https://learn.microsoft.com/en-us/dynamics365/customer-insights/journeys/real-time-marketing-compliance-settings)
- **Form Attributes**: [Form Attributes Reference - Consent & Topic Attributes](form-attributes-reference.md#consent--topic-attributes)

---

## Accessibility Requirements

All forms should include proper accessibility features:

### Core Principles

- **Label every field clearly**: Use `<label>` elements linked to inputs via `for` and `id` attributes
- **Keyboard navigation**: Ensure all interactive elements are reachable via Tab/Shift+Tab
- **ARIA roles**: Use appropriate attributes (`aria-required`, `aria-label`, `aria-describedby`)
- **Error messages**: Make visible to screen readers (`aria-live="polite"`)
- **Contrast and focus**: Sufficient color contrast and clear focus indicators
- **Group related fields**: Use `<fieldset>` and `<legend>` for groups
- **Accessible buttons**: Use `<button>` or `<input type="submit">` with clear labels

### Example: Required Field with Error Handling

```html
<div class="mb-4"
     data-editorblocktype="TextFormField"
     data-targetaudience="contact"
     data-targetproperty="firstname"
     data-required="required">
  <label for="firstname" class="block text-gray-800 text-sm font-medium mb-2">
    First Name <span aria-label="required" class="text-red-600">*</span>
  </label>
  <input
    id="firstname"
    type="text"
    name="firstname"
    placeholder="First Name"
    aria-required="true"
    aria-describedby="firstname-error"
    maxlength="50"
    required
    class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400">
  <span id="firstname-error" class="hidden text-red-600 text-sm mt-1" role="alert" aria-live="polite"></span>
</div>
```

### Example: Checkbox Group with Fieldset

```html
<fieldset class="mb-6">
  <legend class="text-xl font-semibold text-gray-800 mb-2">Newsletter Preferences</legend>
  <p class="text-gray-600 mb-4">Select the topics you're interested in:</p>

  <div class="flex items-start mb-3">
    <input
      type="checkbox"
      id="topic-marketing"
      name="msdynmkt_topicid;channels;optinwhenchecked"
      value="topic-id-1;Email;true"
      class="h-4 w-4 text-sky-600 border-gray-300 rounded focus:ring-sky-500"
      aria-describedby="topic-marketing-desc">
    <label for="topic-marketing" class="ml-2 text-sm text-gray-700">
      Marketing Updates
      <span id="topic-marketing-desc" class="block text-xs text-gray-500">
        Latest product news and promotions
      </span>
    </label>
  </div>

  <div class="flex items-start mb-3">
    <input
      type="checkbox"
      id="topic-events"
      name="msdynmkt_topicid;channels;optinwhenchecked"
      value="topic-id-2;Email;true"
      class="h-4 w-4 text-sky-600 border-gray-300 rounded focus:ring-sky-500"
      aria-describedby="topic-events-desc">
    <label for="topic-events" class="ml-2 text-sm text-gray-700">
      Event Invitations
      <span id="topic-events-desc" class="block text-xs text-gray-500">
        Webinars, conferences, and networking events
      </span>
    </label>
  </div>
</fieldset>
```

### Accessibility Checklist

- [ ] All form fields have associated `<label>` elements
- [ ] Required fields marked with `aria-required="true"`
- [ ] Form completable using keyboard only
- [ ] Visible focus indicators on all interactive elements
- [ ] Error messages use `role="alert"` and `aria-live="polite"`
- [ ] Color contrast meets WCAG 2.1 AA (4.5:1 for normal text)
- [ ] Related controls grouped with `<fieldset>` and `<legend>`
- [ ] Clear, accessible error feedback

---

## Credits

Documentation rewritten from: [Microsoft Learn - Custom Template Attributes](https://learn.microsoft.com/en-gb/dynamics365/customer-insights/journeys/custom-template-attributes?WT.mc_id=DX-MVP-5003395)

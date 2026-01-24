# Form Attributes Reference

This document provides a comprehensive reference for all `data-*` attributes used in Dynamics 365 Customer Insights forms.

---

## Table of Contents

1. [Layout & Structure Attributes](#layout--structure-attributes)
2. [Form Block Attributes](#form-block-attributes)
3. [Field-Specific Attributes](#field-specific-attributes)
4. [Consent & Topic Attributes](#consent--topic-attributes)
5. [Validation Attributes](#validation-attributes)
6. [Behavior Attributes](#behavior-attributes)

---

## Layout & Structure Attributes

### `data-layout="true"`

**Purpose**: Identifies the main form container

**Required**: Yes

**Usage**:
```html
<div data-layout="true" data-layout-version="v2" style="margin: auto; max-width: 600px;">
    <!-- Form content -->
</div>
```

**Notes**:
- Must be placed on the outermost form container
- Always use with `data-layout-version`

---

### `data-layout-version`

**Purpose**: Specifies the layout version for the form editor

**Required**: Yes (when using `data-layout="true"`)

**Values**: `"v2"` (current version)

**Usage**:
```html
<div data-layout="true" data-layout-version="v2">
```

---

### `data-section="true"`

**Purpose**: Marks a major section within the form layout

**Required**: No, but recommended for proper form structure

**Usage**:
```html
<div data-section="true" class="emptyContainer columns-equal-class wrap-section" style="padding: 0px; display: flex;">
    <!-- Section content -->
</div>
```

**Notes**:
- Sections help organize form content into logical groups
- Used by the form editor to identify editable regions

---

### `data-container="true"`

**Purpose**: Identifies column containers within sections

**Required**: No, but needed for multi-column layouts

**Usage**:
```html
<div class="columnContainer" data-container="true" data-container-width="100">
    <!-- Container content -->
</div>
```

**Related Attributes**: `data-container-width`

---

### `data-container-width`

**Purpose**: Specifies the width percentage of a container

**Required**: When using `data-container="true"`

**Values**: Numeric value representing percentage (e.g., `"100"`, `"50"`)

**Usage**:
```html
<div data-container="true" data-container-width="100">
    <!-- Full width container -->
</div>

<div data-container="true" data-container-width="50">
    <!-- Half width container -->
</div>
```

---

## Form Block Attributes

### `data-editorblocktype`

**Purpose**: Identifies the type of form element for the D365 editor

**Required**: Yes (for all form elements)

**Common Values**:

| Value | Description |
|-------|-------------|
| `Text` | Static text content (headings, paragraphs) |
| `TextFormField` | Single-line text input |
| `TextAreaFormField` | Multi-line text area |
| `DateTimeFormField` | Date/time picker |
| `OptionSetFormField` | Dropdown select field |
| `MultiOptionSetFormField` | Multi-select checkbox group |
| `TwoOptionFormField` | Radio buttons or single checkbox |
| `SubmitButton` | Form submit button |
| `ResetButton` | Form reset button |
| `Consent` | Consent checkbox (purpose-based) |
| `Topic` | Topic subscription checkbox |
| `Captcha` | CAPTCHA verification |
| `Divider` | Visual divider line |
| `Image` | Image element |
| `ForwardToFriendBlock` | Forward to friend functionality |

**Usage**:
```html
<div data-editorblocktype="TextFormField" data-targetproperty="firstname">
    <!-- Field content -->
</div>
```

---

## Field-Specific Attributes

### `data-targetproperty`

**Purpose**: Maps form field to a Dynamics 365 entity attribute (logical name)

**Required**: Yes (for fields that save to D365)

**Values**: D365 logical field names (case-sensitive)

**Common Examples**:

| Display Name | Logical Name |
|--------------|--------------|
| First Name | `firstname` |
| Last Name | `lastname` |
| Email | `emailaddress1` |
| Phone | `telephone1` |
| Mobile Phone | `mobilephone` |
| Company Name | `companyname` |
| Job Title | `jobtitle` |
| Description | `description` |

**Usage**:
```html
<div data-editorblocktype="TextFormField" data-targetproperty="firstname">
    <label for="firstname">First Name</label>
    <input id="firstname" type="text" name="firstname">
</div>
```

**Finding Logical Names**:
- Navigate to: Settings > Customizations > Entities > [Entity Name] > Fields
- The "Name" column shows the logical name

---

### `data-targetentity`

**Purpose**: Specifies which entity the field belongs to (when different from form target audience)

**Required**: No (defaults to form's target audience)

**Common Values**: `"contact"`, `"lead"`, `"account"`

**Usage**:
```html
<div data-editorblocktype="TextFormField"
     data-targetentity="contact"
     data-targetproperty="jobtitle">
```

**Notes**:
- Use when a field maps to a different entity than the main form
- Most forms only target one entity, making this optional

---

### `data-required`

**Purpose**: Marks a field as mandatory

**Required**: No

**Values**: `"required"` or omit the attribute

**Usage**:
```html
<div data-editorblocktype="TextFormField"
     data-targetproperty="firstname"
     data-required="required">
    <label for="firstname">First Name</label>
    <input id="firstname" type="text" name="firstname" required>
</div>
```

**Notes**:
- When present, a red asterisk (*) appears next to the label
- Must also add `required` attribute to the `<input>` element for HTML5 validation

---

### `data-prefill`

**Purpose**: Controls whether the field value is pre-filled for known contacts

**Required**: No

**Values**: `"prefill"` (enable) or omit (disable)

**Usage**:
```html
<div data-editorblocktype="TextFormField"
     data-targetproperty="emailaddress1"
     data-prefill="prefill">
```

**How It Works**:
- When a known contact visits the form, D365 can pre-populate fields with their existing data
- Commonly used for: email, name, phone, company
- Requires journey ID tracking to identify the contact

**Best Practices**:
- Use for convenience fields (name, email)
- Don't use for sensitive fields
- Always allow users to edit pre-filled values

---

### `data-options`

**Purpose**: Defines available options for TwoOptionFormField

**Required**: Yes (for TwoOptionFormField only)

**Format**: JSON-encoded array of option objects

**Usage**:
```html
<div data-editorblocktype="TwoOptionFormField"
     data-options='[{"value":"1","label":"Yes"},{"value":"0","label":"No"}]'>
```

**Format Details**:
```json
[
    {"value": "1", "label": "Option 1"},
    {"value": "0", "label": "Option 0"}
]
```

**Notes**:
- Must be valid JSON
- Values are typically `"1"` (true) and `"0"` (false)
- Escape quotes properly in HTML

---

## Consent & Topic Attributes

### Consent Block Attributes

**Purpose**: Collect consent for communication purposes

**Required Attributes**:
- `data-editorblocktype="Consent"`
- `data-purposeid`
- `data-channels`
- `data-optinwhenchecked`

**Usage**:
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
        <input type="checkbox" id="consentCheckbox"
               name="msdynmkt_purposeid;channels;optinwhenchecked"
               value="10000000-0000-0000-0000-000000000001;Email,Text;true">
        <label for="consentCheckbox"><p>I agree to receive transactional communications</p></label>
    </div>
</div>
```

---

### Topic Block Attributes

**Purpose**: Collect subscription preferences for marketing topics

**Required Attributes**:
- `data-editorblocktype="Topic"`
- `data-topicid`
- `data-channels`
- `data-optinwhenchecked`

**Usage**:
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
        <input type="checkbox" id="topicCheckbox"
               name="msdynmkt_topicid;channels;optinwhenchecked"
               value="b5cfd151-c1ac-f011-bbd3-7c1e522e1eab;Email,Text;true">
        <label for="topicCheckbox"><p>Send me marketing updates</p></label>
    </div>
</div>
```

---

### `data-purposeid`

**Purpose**: Links to a compliance purpose in D365

**Required**: Yes (for Consent blocks)

**Format**: GUID

**Common Values**:
- `"10000000-0000-0000-0000-000000000001"` - Transactional
- `"10000000-0000-0000-0000-000000000003"` - Commercial

**Notes**: Configured in Settings > Data Management > Compliance Settings

---

### `data-topicid`

**Purpose**: Links to a marketing topic in D365

**Required**: Yes (for Topic blocks)

**Format**: GUID

**Usage**: Set to the topic ID from Customer Insights - Journeys > Channels > Topics

---

### `data-channels`

**Purpose**: Specifies communication channels for consent/topic

**Required**: Yes (for Consent and Topic blocks)

**Common Values**: `"Email"`, `"Text"`, `"Email,Text"`, `"Phone"`

**Usage**:
```html
data-channels="Email,Text"
```

**Notes**: Multiple channels separated by commas (no spaces)

---

### `data-optinwhenchecked`

**Purpose**: Controls opt-in/opt-out behavior when checkbox is checked

**Required**: Yes (for Consent and Topic blocks)

**Values**: `"true"` (opt-in when checked) or `"false"` (opt-out when checked)

**Usage**:
```html
data-optinwhenchecked="true"
```

---

### `data-compliancesettingsid`

**Purpose**: References the compliance profile ID

**Required**: No (metadata)

**Format**: GUID

---

### `data-compliancesettingsname`

**Purpose**: Human-readable compliance profile name

**Required**: No (metadata)

---

### `data-purposename`

**Purpose**: Human-readable purpose name

**Required**: No (metadata)

---

### `data-topicname`

**Purpose**: Human-readable topic name

**Required**: No (metadata)

---

## Validation Attributes

### Standard HTML5 Validation

Dynamics 365 forms support standard HTML5 validation attributes:

**`required`**
```html
<input type="text" name="firstname" required>
```

**`pattern`** (regex validation)
```html
<input type="email" name="emailaddress1"
       pattern="[^@\s\\&quot;&lt;&gt;\)\(\[\]:;,.]+(([.]{1}[^@\s\\&quot;&lt;&gt;\)\(\[\]:;,.]+)+?|)@([^@\s\\&quot;&lt;&gt;\)\(\[\]\+:;,\.\-]+(((\.|\+|-|--)[^@\s\\&quot;&lt;&gt;\)\(\[\]+:;,.\-]+)+?|)([.][^0-9@\s\\&quot;&lt;&gt;\)\(\[\]+:;,.\-]+)+?)"
       required>
```

**`maxlength`**
```html
<input type="text" name="firstname" maxlength="50">
```

**`type`** (for built-in validation)
- `type="email"` - Email format validation
- `type="tel"` - Phone number input
- `type="url"` - URL validation
- `type="number"` - Numeric input
- `type="date"` - Date picker
- `type="datetime-local"` - Date and time picker

---

## Behavior Attributes

### `data-captchalanguage`

**Purpose**: Sets the language for CAPTCHA verification

**Required**: No (defaults to English)

**Common Values**: `"en"`, `"es"`, `"fr"`, `"de"`, `"pt"`, etc.

**Usage**:
```html
<div data-editorblocktype="Captcha" align="center" data-captchalanguage="en">
```

---

### `data-image-file-id`

**Purpose**: References an image asset stored in D365

**Required**: Yes (for Image blocks)

**Format**: GUID

**Usage**:
```html
<div data-editorblocktype="Image" style="margin: 10px;"
     data-image-file-id="6228de52-03bc-f011-bbd3-7c1e522e1eab">
    <img src="https://assets-gbr.mkt.dynamics.com/[orgid]/digitalassets/images/6228de52-03bc-f011-bbd3-7c1e522e1eab">
</div>
```

**Notes**: Images must be uploaded to D365 Digital Assets first

---

## Quick Reference Tables

### Field Block Classes

| Block Type | Wrapper Class |
|------------|---------------|
| Text Input | `.textFormFieldBlock` |
| Text Area | `.textFormFieldBlock` |
| Date/Time | `.dateTimeFormFieldBlock` |
| Dropdown | `.optionSetFormFieldBlock` |
| Multi-Select | `.multiOptionSetFormFieldBlock` |
| Two-Option | `.twoOptionFormFieldBlock` |
| Consent/Topic | `.consentBlock` |

### Input Name Formats

| Field Type | Name Format | Example |
|------------|-------------|---------|
| Standard Field | `{logicalname}` | `name="firstname"` |
| Consent (Purpose) | `msdynmkt_purposeid;channels;optinwhenchecked` | `name="msdynmkt_purposeid;channels;optinwhenchecked"` |
| Topic | `msdynmkt_topicid;channels;optinwhenchecked` | `name="msdynmkt_topicid;channels;optinwhenchecked"` |

---

## Related Resources

- [Technical Reference](technical-reference.md)
- [Default Form Fields](technical-reference.md#default-form-fields)
- [Consent & Topics Documentation](https://learn.microsoft.com/en-us/dynamics365/customer-insights/journeys/real-time-marketing-compliance-settings)

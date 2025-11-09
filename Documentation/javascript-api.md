# JavaScript API Reference

## Overview

Dynamics 365 Customer Insights - Journeys forms expose a JavaScript API through the `d365mktforms` global object. This API provides functions for programmatically creating forms, manipulating lookup fields, and handling form events.

**Important**: The JavaScript API is only available for forms hosted as a script. It does not support the iFrame hosting option.

---

## Table of Contents

1. [Form Creation API](#form-creation-api)
   - [createForm()](#createform)
2. [Lookup Field API](#lookup-field-api)
   - [fillLookupFromSearch()](#filllookupfromsearch)
3. [React Component API](#react-component-api)
   - [FormPlaceholder](#formplaceholder)
4. [Custom Events](#custom-events)
   - [Event Reference](#event-reference)
   - [Event Payload Details](#event-payload-details)
5. [Configuration Object](#configuration-object)
6. [Complete Examples](#complete-examples)

---

## Form Creation API

### createForm()

Dynamically creates and renders a marketing form without waiting for `DOMContentLoaded`. This is particularly useful for single-page applications or dynamically loaded content.

#### Syntax

```javascript
d365mktforms.createForm(formId, formApiBaseUrl, formUrl, options)
```

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `formId` | String | Yes | The GUID of the marketing form entity |
| `formApiBaseUrl` | String | Yes | Base URL for the form API endpoint |
| `formUrl` | String | Yes | CDN URL for the cached form content |
| `options` | Object | No | Additional configuration options (event registration, etc.) |

#### Return Value

Returns a `HTMLDivElement` containing the form placeholder. The form content is fetched in the background and injected when ready.

#### Standard Form Example

```javascript
// Load the FormLoader script
<script src="https://cxppusa1formui01cdnsa01-endpoint.azureedge.net/global/FormLoader/FormLoader.bundle.js"></script>

// Create form programmatically
const root = document.getElementById('root');
const formElement = d365mktforms.createForm(
  '12345678-abcd-ef00-1234-567890abcdef', // formId
  'https://your-org.dynamics.com/api/v1.0/orgs/org-id/landingpageforms', // formApiBaseUrl
  'https://your-org.dynamics.com/org-id/digitalassets/forms/12345678-abcd-ef00-1234-567890abcdef' // formUrl
);
root.appendChild(formElement);
```

#### Event Registration Form Example

For event registration forms, pass the readable event ID in the options parameter:

```javascript
const formElement = d365mktforms.createForm(
  '12345678-abcd-ef00-1234-567890abcdef',
  'https://your-org.dynamics.com/api/v1.0/orgs/org-id/eventmanagement',
  'https://your-org.dynamics.com/org-id/digitalassets/forms/12345678-abcd-ef00-1234-567890abcdef',
  { 'data-readable-event-id': 'My_Test_Event_123' }
);
```

#### Complete HTML Example

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Dynamic Form Loading</title>
  </head>
  <body>
    <div id="root"></div>

    <script src="https://cxppusa1formui01cdnsa01-endpoint.azureedge.net/global/FormLoader/FormLoader.bundle.js"></script>
    <script>
      // Wait for FormLoader to initialize
      window.addEventListener('load', function() {
        const root = document.getElementById('root');
        const form = d365mktforms.createForm(
          'formId',
          'formApiBaseUrl',
          'formUrl'
        );
        root.appendChild(form);
      });
    </script>
  </body>
</html>
```

#### Use Cases

**When to use `createForm()`:**
- Single-page applications (SPAs) that load content dynamically
- Forms loaded after user interaction (e.g., button click)
- Conditional form rendering based on user behavior
- Multiple forms on the same page loaded at different times

**When NOT to use:**
- Static pages where forms load with the page (use standard placeholder method)
- iFrame-hosted forms

---

## Lookup Field API

### fillLookupFromSearch()

Performs a background search on a lookup field and automatically populates it with matching items. This enables pre-selecting values or implementing autocomplete functionality.

#### Syntax

```javascript
d365mktforms.fillLookupFromSearch(form, fieldLogicalName, searchTerm)
```

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `form` | HTMLFormElement | Yes | The form element containing the lookup field |
| `fieldLogicalName` | String | Yes | The logical name of the lookup field |
| `searchTerm` | String | Yes | Search query to match items |

#### Return Value

Returns a `Promise` that resolves with the search results when successful, or rejects with an error.

#### Basic Example

```javascript
document.addEventListener("d365mkt-afterformload", (event) => {
  const form = event.target.querySelector("form");

  d365mktforms
    .fillLookupFromSearch(
      form,
      "transactioncurrencyid", // field logical name
      "dollar" // search term
    )
    .then(function (result) {
      console.log("Success performing search", result);
    })
    .catch(function (error) {
      console.log("Error performing search", error);
    });
});
```

#### Advanced Example: Pre-populate Based on URL Parameter

```javascript
document.addEventListener("d365mkt-afterformload", (event) => {
  const form = event.target.querySelector("form");

  // Get currency from URL parameter
  const urlParams = new URLSearchParams(window.location.search);
  const preferredCurrency = urlParams.get('currency') || 'USD';

  d365mktforms
    .fillLookupFromSearch(form, "transactioncurrencyid", preferredCurrency)
    .then(function (result) {
      console.log(`Pre-selected currency: ${preferredCurrency}`, result);
    })
    .catch(function (error) {
      console.warn("Could not pre-select currency", error);
    });
});
```

#### Example: Multiple Lookup Fields

```javascript
document.addEventListener("d365mkt-afterformload", async (event) => {
  const form = event.target.querySelector("form");

  try {
    // Pre-populate multiple lookups
    await d365mktforms.fillLookupFromSearch(form, "industrycode", "Technology");
    await d365mktforms.fillLookupFromSearch(form, "transactioncurrencyid", "USD");
    console.log("All lookup fields populated successfully");
  } catch (error) {
    console.error("Error populating lookup fields", error);
  }
});
```

#### Important Notes

- **Timing**: Call this function after the `d365mkt-afterformload` event
- **Search matching**: The search term matches against the display name of lookup items
- **Multiple matches**: If multiple items match, the first result is selected
- **Case sensitivity**: Search is typically case-insensitive
- **Performance**: Searches are cached; repeated searches for the same term are fast

#### Common Lookup Field Logical Names

| Display Name | Logical Name | Search Examples |
|--------------|--------------|-----------------|
| Currency | `transactioncurrencyid` | "USD", "Euro", "Dollar" |
| Industry | `industrycode` | "Technology", "Finance", "Healthcare" |
| Country/Region | `address1_country` | "United States", "Canada" |
| State/Province | `address1_stateorprovince` | "California", "Texas" |

---

## React Component API

### FormPlaceholder

A React component for embedding Dynamics 365 forms into React applications.

#### Import

The `FormPlaceholder` component is available on the `d365mktforms` global object after loading the FormLoader script.

```javascript
const FormPlaceholder = d365mktforms.FormPlaceholder;
```

#### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `formId` | String | Yes | The GUID of the marketing form entity |
| `formApiBaseUrl` | String | Yes | Base URL for the form API endpoint |
| `formUrl` | String | Yes | CDN URL for the cached form content |
| `readableEventId` | String | No | Event ID for event registration forms |

#### Basic React Example

```html
<!DOCTYPE html>
<html>
  <head>
    <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://cxppusa1formui01cdnsa01-endpoint.azureedge.net/global/FormLoader/FormLoader.bundle.js"></script>
  </head>
  <body>
    <div id="root"></div>

    <script>
      const root = ReactDOM.createRoot(document.getElementById('root'));
      root.render(React.createElement(d365mktforms.FormPlaceholder, {
        formId: '12345678-abcd-ef00-1234-567890abcdef',
        formApiBaseUrl: 'https://your-org.dynamics.com/api/v1.0/orgs/org-id/landingpageforms',
        formUrl: 'https://your-org.dynamics.com/org-id/digitalassets/forms/12345678-abcd-ef00-1234-567890abcdef'
      }, null));
    </script>
  </body>
</html>
```

#### React with Event Registration

```javascript
root.render(React.createElement(d365mktforms.FormPlaceholder, {
  formId: '12345678-abcd-ef00-1234-567890abcdef',
  formApiBaseUrl: 'https://your-org.dynamics.com/api/v1.0/orgs/org-id/eventmanagement',
  formUrl: 'https://your-org.dynamics.com/org-id/digitalassets/forms/12345678-abcd-ef00-1234-567890abcdef',
  readableEventId: 'My_Test_Event_123'
}, null));
```

#### React with JSX (if using a build system)

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';

// Load d365mktforms from window (after script loads)
const FormPlaceholder = window.d365mktforms.FormPlaceholder;

function App() {
  return (
    <div className="app-container">
      <h1>Contact Us</h1>
      <FormPlaceholder
        formId="12345678-abcd-ef00-1234-567890abcdef"
        formApiBaseUrl="https://your-org.dynamics.com/api/v1.0/orgs/org-id/landingpageforms"
        formUrl="https://your-org.dynamics.com/org-id/digitalassets/forms/12345678-abcd-ef00-1234-567890abcdef"
      />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
```

#### Widget Attribute to React Prop Mapping

| HTML Widget Attribute | React Component Prop |
|-----------------------|---------------------|
| `data-form-id` | `formId` |
| `data-form-api-url` | `formApiBaseUrl` |
| `data-cached-form-url` | `formUrl` |
| `data-readable-event-id` | `readableEventId` |

---

## Custom Events

Dynamics 365 forms emit custom DOM events throughout the form lifecycle. These events allow you to hook into form behavior and implement custom logic.

### Event Reference

| Event Name | Timing | Cancelable | Visibility in Console |
|------------|--------|------------|----------------------|
| `d365mkt-beforeformload` | Before form content is fetched | No | No (fires before page load) |
| `d365mkt-formrender` | After content fetched, before injection | No | No (fires before page load) |
| `d365mkt-afterformload` | After form is injected into DOM | No | Yes |
| `d365mkt-formsubmit` | When form is submitted | **Yes** | Yes |
| `d365mkt-afterformsubmit` | After form submission completes | No | Yes |

### Event Attachment

Use standard `addEventListener` to attach event handlers:

```javascript
document.addEventListener("d365mkt-afterformload", function(event) {
  console.log("Form loaded successfully");
});
```

### Event Payload Details

#### d365mkt-beforeformload

**Fires**: When the form placeholder is recognized, before fetching content from the server.

**Use cases**:
- Initialize tracking
- Show custom loading indicators
- Prepare page for form display

**Payload**: None

```javascript
document.addEventListener("d365mkt-beforeformload", function(event) {
  console.log("Form is about to load");
  // Show loading spinner
  document.getElementById('spinner').style.display = 'block';
});
```

---

#### d365mkt-formrender

**Fires**: After the form content is fetched from the server, right before it's injected into the placeholder.

**Use cases**:
- Modify form HTML before rendering
- Log form rendering analytics
- Apply custom transformations

**Payload**: None (form is not yet in DOM)

```javascript
document.addEventListener("d365mkt-formrender", function(event) {
  console.log("Form content fetched, about to render");
});
```

**Note**: This event fires before the page loads, so it won't appear in the developer console unless you set up logging before page load.

---

#### d365mkt-afterformload

**Fires**: After the form is fully injected into the placeholder and ready for interaction.

**Use cases**:
- Hide loading indicators
- Pre-populate fields with custom logic
- Set up field watchers
- Initialize third-party plugins (e.g., input masks)

**Payload**: Standard event object with `target` pointing to the form placeholder

```javascript
document.addEventListener("d365mkt-afterformload", function(event) {
  console.log("Form loaded successfully");

  // Hide loading spinner
  document.getElementById('spinner').style.display = 'none';

  // Access the form element
  const form = event.target.querySelector("form");

  // Pre-populate fields
  const emailField = form.querySelector('[name="emailaddress1"]');
  if (emailField && !emailField.value) {
    emailField.value = getEmailFromLocalStorage();
  }
});
```

---

#### d365mkt-formsubmit

**Fires**: When the user submits the form, **before** data is sent to the server.

**Cancelable**: **YES** - Call `event.preventDefault()` to stop submission.

**Use cases**:
- Custom client-side validation
- Confirm submission with user
- Track submission attempts
- Modify payload before sending

**Payload**: `event.detail.payload`

The payload is an object containing all form field data that will be sent to the server.

```javascript
event.detail = {
  payload: {
    firstname: "John",
    lastname: "Doe",
    emailaddress1: "john.doe@example.com",
    // ... other form fields
  }
}
```

**Example: Custom Validation**

```javascript
document.addEventListener("d365mkt-formsubmit", function(event) {
  const payload = event.detail.payload;

  // Example: Block submission unless first name is "John"
  if (payload.firstname !== "John") {
    event.preventDefault();
    alert("For demo purposes, first name must be John");
    console.log("Blocked form submission");
    return;
  }

  console.log("Form submitting with data:", payload);
});
```

**Example: User Confirmation**

```javascript
document.addEventListener("d365mkt-formsubmit", function(event) {
  const payload = event.detail.payload;

  const confirmed = confirm(
    `Submit form with email: ${payload.emailaddress1}?`
  );

  if (!confirmed) {
    event.preventDefault();
    console.log("User cancelled submission");
  }
});
```

**Example: Analytics Tracking**

```javascript
document.addEventListener("d365mkt-formsubmit", function(event) {
  // Track submission attempt in analytics
  if (typeof gtag !== 'undefined') {
    gtag('event', 'form_submit_attempt', {
      form_id: 'contact_form',
      email: event.detail.payload.emailaddress1
    });
  }

  console.log("Form submission tracked", event.detail.payload);
});
```

---

#### d365mkt-afterformsubmit

**Fires**: After the form submission is processed by the server (success or failure).

**Use cases**:
- Display custom success messages
- Redirect users to thank you page
- Track successful conversions
- Handle submission errors
- Update UI based on result

**Payload**: `event.detail`

```javascript
event.detail = {
  successful: true, // Boolean - true if server accepted, false if rejected
  payload: {
    // Original form data as submitted
    firstname: "John",
    lastname: "Doe",
    emailaddress1: "john.doe@example.com"
  }
}
```

**Example: Custom Success Message**

```javascript
document.addEventListener("d365mkt-afterformsubmit", function(event) {
  if (event.detail.successful) {
    console.log("Form submitted successfully!");
    console.log("Submitted data:", event.detail.payload);

    // Show custom success message
    document.getElementById('custom-success').style.display = 'block';
    document.getElementById('form-container').style.display = 'none';
  } else {
    console.error("Form submission failed");
    alert("There was an error submitting your form. Please try again.");
  }
});
```

**Example: Redirect After Success**

```javascript
document.addEventListener("d365mkt-afterformsubmit", function(event) {
  if (event.detail.successful) {
    // Redirect to thank you page after 1 second
    setTimeout(function() {
      window.location.href = '/thank-you?email=' +
        encodeURIComponent(event.detail.payload.emailaddress1);
    }, 1000);
  }
});
```

**Example: Track Conversion**

```javascript
document.addEventListener("d365mkt-afterformsubmit", function(event) {
  if (event.detail.successful) {
    // Google Analytics conversion tracking
    if (typeof gtag !== 'undefined') {
      gtag('event', 'conversion', {
        'send_to': 'AW-CONVERSION_ID/CONVERSION_LABEL',
        'value': 1.0,
        'currency': 'USD'
      });
    }

    // Facebook Pixel tracking
    if (typeof fbq !== 'undefined') {
      fbq('track', 'Lead', {
        content_name: 'Contact Form Submission'
      });
    }

    console.log("Conversion tracked for:", event.detail.payload.emailaddress1);
  }
});
```

**Example: Handle Errors**

```javascript
document.addEventListener("d365mkt-afterformsubmit", function(event) {
  console.log("Submission result:", event.detail.successful);
  console.log("Submitted payload:", event.detail.payload);

  if (!event.detail.successful) {
    // Log error details
    console.error("Submission failed for email:", event.detail.payload.emailaddress1);

    // Show user-friendly error message
    const errorDiv = document.getElementById('error-message');
    errorDiv.textContent = "We couldn't process your submission. Please check your information and try again.";
    errorDiv.style.display = 'block';

    // Re-enable submit button
    const submitBtn = document.querySelector('.submitButton');
    submitBtn.disabled = false;
  }
});
```

---

### Complete Event Lifecycle Example

```javascript
// Track the entire form lifecycle
document.addEventListener("d365mkt-beforeformload", function() {
  console.log("1. Form loading started");
  document.getElementById('status').textContent = "Loading form...";
});

document.addEventListener("d365mkt-formrender", function() {
  console.log("2. Form content fetched, rendering...");
});

document.addEventListener("d365mkt-afterformload", function(event) {
  console.log("3. Form loaded and ready");
  document.getElementById('status').textContent = "Form ready";

  const form = event.target.querySelector("form");
  console.log("Form element:", form);
});

document.addEventListener("d365mkt-formsubmit", function(event) {
  console.log("4. Form submitting with data:", event.detail.payload);
  document.getElementById('status').textContent = "Submitting...";

  // Optional: Add custom validation here
  // event.preventDefault() to cancel submission
});

document.addEventListener("d365mkt-afterformsubmit", function(event) {
  console.log("5. Form submission completed");
  console.log("   Success:", event.detail.successful);
  console.log("   Payload:", event.detail.payload);

  if (event.detail.successful) {
    document.getElementById('status').textContent = "Submitted successfully!";
  } else {
    document.getElementById('status').textContent = "Submission failed";
  }
});
```

---

## Configuration Object

Configure form behavior by defining the `d365mkt` object before loading the FormLoader script.

### hideProgressBar

Disable the loading progress bar during form initialization.

```javascript
<script>
var d365mkt = {
  // Disable showing of progress bar during form loading
  hideProgressBar: true
};
</script>
<script src="https://cxppusa1formui01cdnsa01-endpoint.azureedge.net/global/FormLoader/FormLoader.bundle.js"></script>
```

### Default Configuration

```javascript
var d365mkt = {
  hideProgressBar: false // Default: show progress bar
};
```

---

## Complete Examples

### Example 1: UTM Parameter Capture

Automatically capture UTM parameters from the URL and store them in hidden form fields.

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Contact Form with UTM Tracking</title>
</head>
<body>
  <div data-form-id="{form-id}"
       data-form-api-url="https://{server}.dynamics.com/api/v1.0/orgs/{org-id}/landingpageforms"
       data-cached-form-url="https://{server}.dynamics.com/{org-id}/digitalassets/forms/{form-id}">
  </div>

  <script src="https://cxppusa1formui01cdnsa01-endpoint.azureedge.net/global/FormLoader/FormLoader.bundle.js"></script>

  <script>
    document.addEventListener("d365mkt-afterformload", function() {
      // Get all UTM parameters from URL
      const urlParams = new URLSearchParams(window.location.search);

      // Map of UTM parameters to form field IDs
      const utmFieldMapping = {
        'utm_source': 'utmsource-1234567890',
        'utm_medium': 'utmmedium-1234567891',
        'utm_campaign': 'utmcampaign-1234567892',
        'utm_term': 'utmterm-1234567893',
        'utm_content': 'utmcontent-1234567894'
      };

      // Populate hidden fields
      for (const [param, fieldId] of Object.entries(utmFieldMapping)) {
        const value = urlParams.get(param);
        if (value) {
          const field = document.getElementById(fieldId);
          if (field) {
            field.value = value;
            console.log(`Set ${param} to:`, value);
          }
        }
      }
    });
  </script>
</body>
</html>
```

### Example 2: Dynamic Field Logic

Show/hide fields based on user selection.

```javascript
document.addEventListener("d365mkt-afterformload", function(event) {
  const form = event.target.querySelector("form");

  // Get form elements
  const companyField = form.querySelector('[name="companyname"]');
  const employeeCountField = form.querySelector('[name="numberofemployees"]');
  const employeeCountWrapper = employeeCountField.closest('.textFormFieldBlock');

  // Hide employee count initially
  employeeCountWrapper.style.display = 'none';

  // Show employee count when company name is entered
  companyField.addEventListener('input', function() {
    if (this.value.trim() !== '') {
      employeeCountWrapper.style.display = 'flex';
    } else {
      employeeCountWrapper.style.display = 'none';
    }
  });
});
```

### Example 3: Multi-Field Combination

Combine first name and last name into a full name field.

```javascript
document.addEventListener("d365mkt-afterformload", function(event) {
  const form = event.target.querySelector("form");

  const firstName = form.querySelector('[name="firstname"]');
  const lastName = form.querySelector('[name="lastname"]');
  const fullName = form.querySelector('[name="fullname"]');

  function updateFullName() {
    if (firstName && lastName && fullName) {
      fullName.value = `${firstName.value} ${lastName.value}`.trim();
    }
  }

  // Update on change
  firstName.addEventListener('change', updateFullName);
  lastName.addEventListener('change', updateFullName);

  // Update on blur (when user leaves field)
  firstName.addEventListener('blur', updateFullName);
  lastName.addEventListener('blur', updateFullName);
});
```

### Example 4: Pre-populate with Local Storage

Remember user information across sessions.

```javascript
document.addEventListener("d365mkt-afterformload", function(event) {
  const form = event.target.querySelector("form");

  // Pre-populate from localStorage
  const savedEmail = localStorage.getItem('userEmail');
  if (savedEmail) {
    const emailField = form.querySelector('[name="emailaddress1"]');
    if (emailField && !emailField.value) {
      emailField.value = savedEmail;
    }
  }
});

// Save on submission
document.addEventListener("d365mkt-afterformsubmit", function(event) {
  if (event.detail.successful) {
    localStorage.setItem('userEmail', event.detail.payload.emailaddress1);
  }
});
```

### Example 5: Custom Validation with Visual Feedback

```javascript
document.addEventListener("d365mkt-formsubmit", function(event) {
  const payload = event.detail.payload;
  let isValid = true;
  const errors = [];

  // Custom validation: Email must be from company domain
  if (payload.emailaddress1 && !payload.emailaddress1.endsWith('@company.com')) {
    isValid = false;
    errors.push('Please use your company email address');
  }

  // Custom validation: Phone number format
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  if (payload.telephone1 && !phoneRegex.test(payload.telephone1)) {
    isValid = false;
    errors.push('Please enter a valid phone number (international format)');
  }

  if (!isValid) {
    event.preventDefault();

    // Display errors
    const errorDiv = document.getElementById('custom-errors');
    errorDiv.innerHTML = '<ul>' + errors.map(e => `<li>${e}</li>`).join('') + '</ul>';
    errorDiv.style.display = 'block';

    // Scroll to errors
    errorDiv.scrollIntoView({ behavior: 'smooth' });
  }
});
```

---

## Related Resources

- [Advanced Customization](advanced-customization.md)
- [Technical Reference](technical-reference.md)
- [Form Events Documentation](https://learn.microsoft.com/en-us/dynamics365/customer-insights/journeys/developer/realtime-marketing-form-client-side-extensibility)

---

## Troubleshooting

### Issue: Events Not Firing

**Problem**: Custom event listeners don't execute.

**Solutions**:
- Ensure event listeners are added before the FormLoader script loads
- Check event names are spelled correctly (case-sensitive)
- Use browser DevTools to verify events are being dispatched

### Issue: createForm() Returns Empty Div

**Problem**: Form doesn't appear after calling `createForm()`.

**Solutions**:
- Verify FormLoader script has loaded completely
- Check browser console for network errors
- Ensure form ID and URLs are correct
- Confirm domain is authenticated in D365 settings

### Issue: fillLookupFromSearch() Not Working

**Problem**: Lookup field doesn't populate.

**Solutions**:
- Call function only after `d365mkt-afterformload` event
- Verify field logical name is correct (case-sensitive)
- Check that lookup field exists on the form
- Ensure search term matches at least one item
- Verify field-level security permissions

---

Last updated: 2025-01-07

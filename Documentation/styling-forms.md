# Styling Forms

## Using the Theme Panel

The form designer includes a **Theme panel** to control visual appearance without writing code:

1. Open your form in the editor
2. Click the **Styles** or **Theme** tab
3. Adjust settings: fonts, colors, spacing, borders, buttons

## Adding Custom CSS

For more control beyond the theme panel:

1. Click the **HTML** button (`</>`) in the form editor
2. Locate the `<style>` section
3. Add your custom CSS
4. Click **Save**

### Custom CSS Examples

#### Customizing Form Fields

```css
/* Change input field styling */
.textFormFieldBlock input,
.dateTimeFormFieldBlock input,
.marketingForm textarea {
    border: 2px solid #0078d4;
    border-radius: 8px;
    padding: 12px;
    background-color: #ffffff;
}

/* Change input focus state */
.textFormFieldBlock input:focus,
.marketingForm textarea:focus {
    outline: none;
    border-color: #005a9e;
    box-shadow: 0 0 0 3px rgba(0, 120, 212, 0.1);
}

/* Customize field labels */
.textFormFieldBlock label,
.dateTimeFormFieldBlock label {
    font-size: 14px;
    font-weight: 700;
    color: #005a9e;
    text-transform: uppercase;
}
```

#### Customizing Buttons

```css
/* Primary submit button */
.submitButton {
    background: #0078d4;
    color: white;
    padding: 14px 28px;
    border-radius: 6px;
    font-size: 16px;
    font-weight: 700;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.submitButton:hover {
    background: #005a9e;
}

/* Secondary/reset button */
.secondaryButton {
    background: #ffffff;
    color: #0078d4;
    border: 2px solid #0078d4;
    padding: 14px 28px;
    border-radius: 6px;
}
```

#### Customizing Form Layout

```css
/* Adjust form container width */
[data-layout="true"] {
    max-width: 800px;
    margin: 0 auto;
    padding: 40px 20px;
}

/* Customize section spacing */
div[data-section="true"] {
    padding: 20px 0;
}

/* Field spacing */
.textFormFieldBlock,
.dateTimeFormFieldBlock,
.optionSetFormFieldBlock {
    padding: 16px 24px;
    gap: 12px;
}
```

#### Customizing Typography

```css
/* Form headings */
.marketingForm h1 {
    font-size: 32px;
    color: #0078d4;
    font-weight: 700;
    margin-bottom: 16px;
}

.marketingForm h2 {
    font-size: 24px;
    color: #323130;
    font-weight: 600;
}

/* Form paragraphs */
.marketingForm p {
    font-size: 16px;
    line-height: 1.5;
    color: #605e5c;
}
```

#### Customizing Checkboxes and Radio Buttons

```css
/* Checkbox/radio button styling */
.twoOptionFormFieldBlock input[type="radio"],
.twoOptionFormFieldBlock input[type="checkbox"],
.consentBlock input[type="checkbox"] {
    width: 24px;
    height: 24px;
    border: 2px solid #323130;
    border-radius: 4px;
    accent-color: #0078d4;
}

/* Checkbox labels */
.consentBlock label,
.twoOptionFormFieldBlock label {
    font-size: 14px;
    color: #323130;
    cursor: pointer;
}
```

## Using Custom Fonts

You can use custom web fonts by adding them in the form header:

```html
<head>
    <!-- Google Fonts example -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap" rel="stylesheet">

    <style>
        /* Apply custom font to entire form */
        .marketingForm {
            font-family: 'Open Sans', Arial, sans-serif;
        }
    </style>
</head>
```

## Mobile Responsive Styling

D365 forms include built-in responsive styles. To add custom mobile styling:

```css
/* Tablet and mobile devices */
@media only screen and (max-width: 768px) {
    [data-layout="true"] {
        max-width: 100%;
        padding: 20px 16px;
    }

    .textFormFieldBlock,
    .dateTimeFormFieldBlock {
        padding: 12px 16px;
    }

    .marketingForm h1 {
        font-size: 24px;
    }

    .submitButton {
        width: 100%;
        padding: 16px;
    }
}
```

## Best Practices

1. **Test your changes**: Always preview forms after making CSS changes
2. **Use browser inspector**: Debug styling issues using browser developer tools
3. **Keep it simple**: Avoid overly complex CSS that may conflict with D365 defaults
4. **Brand consistency**: Match your organization's brand colors and typography
5. **Accessibility**: Maintain sufficient color contrast (WCAG 2.1 AA minimum)
6. **Cache considerations**: CSS changes may take up to 10 minutes to appear on live forms due to CDN caching

## Related Resources

- [Technical Reference - Default CSS Styling](technical-reference.md#default-css-styling)
- [Advanced Customization](advanced-customization.md)
- [Accessibility Requirements](technical-reference.md#accessibility-requirements)

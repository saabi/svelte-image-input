# Theming

Customize the visual appearance of svelte-image-input components using CSS custom properties (CSS variables).

## Overview

All components support theming through CSS custom properties. You can override these variables to match your application's design system, support dark mode, or create custom themes.

## CSS Variables

### ImageLoader Component

#### Drop Area
- `--image-loader-border-color`: Border color (default: `#ccc`)
- `--image-loader-border-width`: Border width (default: `2px`)
- `--image-loader-border-style`: Border style (default: `dashed`)
- `--image-loader-border-radius`: Border radius (default: `0`)
- `--image-loader-background-color`: Background color (default: `#f9f9f9`)
- `--image-loader-text-color`: Text color (default: `inherit`)

#### Hover States
- `--image-loader-hover-border-color`: Border color on hover (default: `#999`)
- `--image-loader-hover-background-color`: Background color on hover (default: `#f0f0f0`)

#### Button
- `--image-loader-button-color`: Button text color (default: `inherit`)
- `--image-loader-button-background`: Button background (default: `transparent`)
- `--image-loader-button-border-width`: Button border width (default: `1px`)
- `--image-loader-button-border-style`: Button border style (default: `solid`)
- `--image-loader-button-border-color`: Button border color (default: `currentColor`)
- `--image-loader-button-border-radius`: Button border radius (default: `0`)
- `--image-loader-button-hover-color`: Button text color on hover (default: `inherit`)
- `--image-loader-button-hover-background`: Button background on hover (default: `transparent`)
- `--image-loader-button-hover-border-color`: Button border color on hover (default: `currentColor`)

### ImageEncoder Component

- `--image-encoder-background-color`: Canvas background color (default: `transparent`)
- `--image-encoder-cursor`: Cursor style (default: `move`)

### ImageInput Component

- `--image-input-background`: Container background (default: `transparent`)

#### Clear Button
- `--image-input-clear-button-color`: Clear button color (default: `inherit`)
- `--image-input-clear-button-background`: Clear button background (default: `transparent`)
- `--image-input-clear-button-border-color`: Clear button border color (default: `transparent`)
- `--image-input-clear-button-border-radius`: Clear button border radius (default: `0`)
- `--image-input-clear-button-hover-color`: Clear button color on hover (default: `inherit`)
- `--image-input-clear-button-hover-background`: Clear button background on hover (default: `rgba(0, 0, 0, 0.1)`)
- `--image-input-clear-button-hover-border-color`: Clear button border color on hover (default: `transparent`)
- `--image-input-clear-button-size`: Clear button font size (default: `1.5em`)

## Usage

### Global Theme

Apply theme variables globally to affect all components:

```svelte
<style>
  :global(body) {
    --image-loader-border-color: #4a7cf8;
    --image-loader-background-color: #f0f4ff;
    --image-loader-hover-border-color: #2a5cd6;
    --image-loader-hover-background-color: #e0e8ff;
  }
</style>

<ImageInput bind:url />
```

### Component-Level Theme

Apply theme to specific components using a wrapper:

```svelte
<div class="custom-theme">
  <ImageInput bind:url />
</div>

<style>
  .custom-theme {
    --image-loader-border-color: #4a7cf8;
    --image-loader-background-color: #f0f4ff;
    --image-loader-button-color: #4a7cf8;
    --image-input-clear-button-color: #4a7cf8;
  }
</style>
```

### Using Classes Prop

You can also use the `classes` prop with global styles:

```svelte
<ImageInput bind:url classes="my-theme" />

<style>
  :global(.my-theme) {
    --image-loader-border-color: #4a7cf8;
    --image-loader-background-color: #f0f4ff;
  }
</style>
```

## Example Themes

### Dark Theme

```svelte
<style>
  .dark-theme {
    --image-loader-border-color: #666;
    --image-loader-background-color: #2a2a2a;
    --image-loader-text-color: #fff;
    --image-loader-hover-border-color: #888;
    --image-loader-hover-background-color: #333;
    --image-loader-button-color: #fff;
    --image-encoder-background-color: #1a1a1a;
    --image-input-clear-button-color: #fff;
    --image-input-clear-button-hover-background: rgba(255, 255, 255, 0.1);
  }
</style>

<div class="dark-theme">
  <ImageInput bind:url />
</div>
```

### Brand Theme

```svelte
<style>
  .brand-theme {
    --image-loader-border-color: #4a7cf8;
    --image-loader-background-color: #f0f4ff;
    --image-loader-text-color: #333;
    --image-loader-hover-border-color: #2a5cd6;
    --image-loader-hover-background-color: #e0e8ff;
    --image-loader-button-color: #4a7cf8;
    --image-loader-button-hover-color: #2a5cd6;
    --image-input-clear-button-color: #4a7cf8;
    --image-input-clear-button-background: rgba(74, 124, 248, 0.1);
    --image-input-clear-button-border-color: #4a7cf8;
    --image-input-clear-button-border-radius: 50%;
    --image-input-clear-button-hover-background: rgba(74, 124, 248, 0.2);
  }
</style>

<div class="brand-theme">
  <ImageInput bind:url />
</div>
```

### Minimal Theme

```svelte
<style>
  .minimal-theme {
    --image-loader-border-color: #e0e0e0;
    --image-loader-border-width: 1px;
    --image-loader-background-color: #fff;
    --image-loader-hover-border-color: #b0b0b0;
    --image-loader-text-color: #666;
    --image-loader-button-color: #333;
  }
</style>

<div class="minimal-theme">
  <ImageInput bind:url />
</div>
```

## Accessibility

When creating custom themes, ensure:

1. **Contrast Ratios:** Text and backgrounds meet WCAG AA standards (4.5:1 for normal text)
2. **Focus Indicators:** Maintain visible focus indicators for keyboard navigation
3. **Color Independence:** Don't rely solely on color to convey information

## Tips

- Variables cascade from parent elements, so you can set them at any level
- Default values ensure components work out of the box
- You can override individual variables without affecting others
- Combine with the `classes` prop for maximum flexibility


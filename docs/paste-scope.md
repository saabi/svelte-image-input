# Paste Event Scope Control

Control how paste events are handled when using svelte-image-input components.

## Overview

By default, `ImageLoader` listens for paste events anywhere on the page (window-level). This is convenient for single-component usage but can cause issues when multiple components are used or when other paste targets exist on the page.

The `pasteScope` prop allows you to control whether paste events are handled at the window level or only when the component is focused.

## Props

### ImageLoader

- `pasteScope?: 'window' | 'component'` (default: `'window'`)

### ImageInput

The `ImageInput` component passes the `pasteScope` prop to its internal `ImageLoader`.

## Behavior

### Window Scope (Default)

When `pasteScope="window"` (or not specified):

- Paste events anywhere on the page trigger image loading
- Convenient for single-component usage
- Works even when component is not focused
- May conflict with other paste targets (text inputs, textareas)
- Multiple components all respond to paste events

```svelte
<ImageLoader onImageLoaded={handleImageLoaded} />
<!-- or -->
<ImageLoader onImageLoaded={handleImageLoaded} pasteScope="window" />
```

### Component Scope

When `pasteScope="component"`:

- Paste events only work when the component is focused
- Better for multiple components on the same page
- No conflicts with other paste targets
- Component must be clicked or focused first
- Only the focused component responds to paste

```svelte
<ImageLoader
  onImageLoaded={handleImageLoaded}
  pasteScope="component"
/>
```

## Usage Examples

### Single Component (Default)

For a single component, the default window scope is usually best:

```svelte
<ImageInput bind:url />
<!-- Paste works anywhere on the page -->
```

### Multiple Components

When using multiple components, use component scope to avoid conflicts:

```svelte
<div class="image-editors">
  <div>
    <h3>Profile Picture</h3>
    <ImageInput bind:url1 pasteScope="component" />
  </div>
  
  <div>
    <h3>Cover Photo</h3>
    <ImageInput bind:url2 pasteScope="component" />
  </div>
</div>
```

Now each component only responds to paste when it's focused.

### Mixed Usage

You can mix window and component scope:

```svelte
<!-- Global paste handler (only one should use window scope) -->
<ImageInput bind:url1 pasteScope="window" />

<!-- Component-specific paste handlers -->
<ImageInput bind:url2 pasteScope="component" />
<ImageInput bind:url3 pasteScope="component" />
```

### With Other Paste Targets

When your page has text inputs or other paste targets, use component scope:

```svelte
<div>
  <input type="text" placeholder="Enter description..." />
  
  <ImageInput
    bind:url
    pasteScope="component"
  />
</div>
```

This ensures pasting in the text input doesn't trigger image loading.

## Focus Behavior

When using `pasteScope="component"`:

1. **Clicking the component** gives it focus
2. **Tab navigation** can focus the component
3. **Paste works** when the component or its children have focus
4. **Visual focus indicator** appears (customizable via CSS)

### Programmatic Focus

You can programmatically focus the component if needed:

```svelte
<script>
  import { ImageInput } from 'svelte-image-input';
  
  let imageInputElement;
  let url = '';
  
  function focusImageInput() {
    // Focus the component's drop area
    imageInputElement?.querySelector('.drop-area')?.focus();
  }
</script>

<button onclick={focusImageInput}>Focus Image Input</button>
<ImageInput bind:this={imageInputElement} bind:url pasteScope="component" />
```

## Accessibility

When using component scope:

- The component becomes keyboard accessible (via `tabindex="0"`)
- Focus indicators should be visible (customize via CSS)
- Screen readers will announce when the component is focused
- Users can navigate to the component using Tab key

## Common Scenarios

### Scenario 1: Single Image Upload

**Use window scope (default):**
```svelte
<ImageInput bind:url />
```

### Scenario 2: Multiple Image Uploads

**Use component scope:**
```svelte
<ImageInput bind:url1 pasteScope="component" />
<ImageInput bind:url2 pasteScope="component" />
<ImageInput bind:url3 pasteScope="component" />
```

### Scenario 3: Form with Text Inputs

**Use component scope:**
```svelte
<form>
  <input type="text" name="title" />
  <textarea name="description"></textarea>
  <ImageInput bind:url pasteScope="component" />
</form>
```

### Scenario 4: Modal/Dialog

**Use component scope:**
```svelte
<div class="modal">
  <ImageInput bind:url pasteScope="component" />
</div>
```

## Tips

- **Default behavior:** Window scope is convenient for most single-component use cases
- **Multiple components:** Always use component scope when multiple components exist
- **Forms:** Use component scope when other paste targets exist
- **User experience:** Component scope requires users to focus the component first, which may be less convenient but more predictable

## Migration

If you're upgrading and want to maintain current behavior, no changes are needed - window scope is the default. To use component scope, simply add the prop:

```svelte
<!-- Before (implicit window scope) -->
<ImageInput bind:url />

<!-- After (explicit window scope - same behavior) -->
<ImageInput bind:url pasteScope="window" />

<!-- After (component scope - new behavior) -->
<ImageInput bind:url pasteScope="component" />
```


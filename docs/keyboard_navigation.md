# Keyboard Navigation Testing Guide

Comprehensive guide for testing keyboard accessibility in the Movie App.

## Overview

This document provides step-by-step instructions for verifying that all interactive elements in the Movie App are fully accessible via keyboard navigation.

## General Keyboard Controls

| Key | Action |
|-----|--------|
| `Tab` | Move focus to next interactive element |
| `Shift + Tab` | Move focus to previous interactive element |
| `Enter` | Activate buttons, links, and form submissions |
| `Space` | Activate buttons |
| `Escape` | Close modals and dialogs |
| `Arrow Keys` | Navigate within specific components (if applicable) |

---

## Testing Checklist

### ✅ Global Navigation

#### Navbar
- [ ] Tab to logo - should have visible focus ring
- [ ] Pressing Enter on logo navigates to homepage
- [ ] Tab to search input (desktop) - should have visible focus ring  
- [ ] Type in search input and press Enter - should navigate to search page
- [ ] Tab to "Favorites" link - should have visible focus ring
- [ ] Pressing Enter on Favorites navigates to favorites page

#### Focus Indicators
- [ ] All focused elements show high-contrast red outline (#961200)
- [ ] Focus ring has 2px solid border with 2px offset
- [ ] Focus indicators are visible on both light and dark backgrounds

---

### ✅ Homepage

#### Hero Section
- [ ] Tab to movie title link - should have visible focus
- [ ] Pressing Enter navigates to movie details

#### Movie Carousels
- [ ] Tab through trending movie cards
- [ ] Each card shows hover effects and focus indicators
- [ ] Pressing Enter on a card navigates to that movie's detail page
- [ ] **Prefetch Test**: Hover over a card (or tab to it), check Network tab - should see prefetch request for movie details

#### New Releases Grid
- [ ] Tab through all movie cards in grid
- [ ] Focus order follows visual layout (left to right, top to bottom)
- [ ] Cards respond to Enter key

---

### ✅ Search Page

#### Mobile Search (< 768px)
- [ ] Tab to back button - should have visible focus
- [ ] Pressing Enter/Space returns to homepage
- [ ] Tab to search input
- [ ] Type search query - live search should trigger after 500ms pause
- [ ] **ARIA Live Region Test**: Use screen reader - should announce "Searching for movies..." then "Found X results"
- [ ] Tab to clear button (X) when input has text
- [ ] Pressing Enter/Space on clear button clears input

#### Search Results
- [ ] Tab through movie cards
- [ ] Each card is keyboard accessible
- [ ] Pressing Enter opens movie details
- [ ] **Hover Prefetch Test**: Hover/focus on card - Network tab shows prefetch

#### Load More Button
- [ ] Tab to "Load More" button (if visible)
- [ ] Pressing Enter/Space loads next page
- [ ] Focus remains in logical place after load

---

### ✅ Favorites Page

#### Empty State
- [ ] Tab to "Explore Movie" button
- [ ] Pressing Enter navigates to homepage

#### Favorite Movies List
- [ ] Tab through all movie cards
- [ ] Each card and favorite heart button are individually focusable
- [ ] Pressing Enter on card opens details
- [ ] Pressing Enter/Space on heart removes from favorites

#### Load More
- [ ] Tab to "Load More" button
- [ ] Keyboard activation works correctly

---

### ✅ Movie Detail Page

#### Movie Information
- [ ] Tab to back button
- [ ] Tab to movie poster (if clickable)
- [ ] Tab through genre tags
- [ ] Tab to favorite button
- [ ] Pressing Enter/Space toggles favorite status

#### Cast & Crew Section
- [ ] Tab through cast member profiles
- [ ] Each profile is keyboard accessible

#### Trailer Section
- [ ] Tab to "Watch Trailer" button
- [ ] Pressing Enter opens video modal

---

### ✅ Video Modal (Trailer)

**Critical: Focus Trap Testing**

#### Modal Opening
- [ ] When modal opens, focus automatically moves to modal
- [ ] First focusable element (close button or iframe) receives focus
- [ ] Background content is not accessible via Tab

#### Focus Trap
- [ ] Tab through all elements in modal
- [ ] After last element, Tab cycles back to first element
- [ ] Shift + Tab cycles backward correctly
- [ ] Focus does NOT escape modal to background content

#### Modal Closing
- [ ] Pressing `Escape` closes modal
- [ ] Clicking close button (X) closes modal
- [ ] After closing, focus returns to "Watch Trailer" button that opened it
- [ ] Background content is keyboard accessible again

#### YouTube iframe
- [ ] YouTube player controls are keyboard accessible
- [ ] Space bar plays/pauses video
- [ ] Arrow keys control volume/seek (YouTube defaults)

---

### ✅ Form Controls

#### Search Input
- [ ] Input is focusable
- [ ] Typing triggers live search with debounce
- [ ] Clear button (X) is keyboard accessible
- [ ] Focus ring visible when focused

---

## Common Issues to Check

### ❌ Anti-Patterns to Avoid

- **Invisible focus indicators** - All focused elements must have visible outline
- **Focus traps without Escape** - Modals must be closeable with Escape key
- **Incorrect tab order** - Focus should follow visual layout
- **Missing keyboard handlers** - All clickable elements (`onClick`) must also handle `Enter` and `Space`
- **Inaccessible custom components** - Interactive divs need `role`, `tabIndex`, and keyboard handlers

### ✅ Best Practices Implemented

- **Custom focus styles** via `:focus-visible` pseudo-class
- **Skip-to-content link** for keyboard users (not visible until focused)
- **Logical tab order** following visual hierarchy
- **ARIA live regions** for dynamic content announcements
- **Focus management** in modals

---

## Testing Tools

### Browser DevTools
1. Open DevTools (F12)
2. Navigate with Tab key
3. Watch focus indicator move
4. Check Console for accessibility warnings

### Keyboard-Only Testing
1. **Unplug/disable mouse**
2. Navigate entire app using only keyboard
3. Verify all interactive elements are reachable
4. Ensure no "keyboard traps"

### Focus Debugger
```javascript
// Run in Console to visualize focus
document.addEventListener('focusin', (e) => {
  console.log('Focused:', e.target);
});
```

---

## Success Criteria

✅ **All interactive elements accessible** via keyboard  
✅ **Visible focus indicators** on all focused elements  
✅ **Logical tab order** matching visual layout  
✅ **Modal focus traps** working correctly  
✅ **ARIA live regions** announcing dynamic content  
✅ **No keyboard traps** - can always escape/continue  
✅ **Consistent behavior** across all browsers  

---

## Browser Compatibility

Test in:
- ✅ Chrome/Edge (Chromium)
- ✅ Firefox
- ✅ Safari

All modern browsers support `:focus-visible` and standard keyboard navigation.

---

## Next Steps

After keyboard testing, proceed to:
1. **Screen Reader Testing** - See `screen_reader_testing.md`
2. **Automated Accessibility Audit** - Lighthouse, axe DevTools
3. **Real User Testing** - Observe users with disabilities

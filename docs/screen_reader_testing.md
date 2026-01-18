# Screen Reader Testing Guide

Comprehensive guide for testing screen reader accessibility with NVDA and JAWS.

## Overview

This document provides instructions for testing the Movie App with popular screen readers to ensure compatibility and a good user experience for visually impaired users.

## Supported Screen Readers

- **NVDA** (NonVisual Desktop Access) - Free, Windows
- **JAWS** (Job Access With Speech) - Commercial, Windows  
- **VoiceOver** - Built-in, macOS/iOS (basic testing)

---

## NVDA Testing (Windows)

### Setup

1. **Download**: https://www.nvaccess.org/download/
2. **Install** and launch NVDA
3. **Start browsing mode** - NVDA should start automatically

### Basic Controls

| Key Combination | Action |
|----------------|--------|
| `Insert + Down Arrow` | Start reading from cursor |
| `Insert + B` | Read entire page |
| `H` | Next heading |
| `Shift + H` | Previous heading |
| `K` | Next link |
| `Shift + K` | Previous link |
| `B` | Next button |
| `Shift + B` | Previous button |
| `F` | Next form field |
| `Shift + F` | Previous form field |
| `Insert + F7` | List all elements |
| `Insert + Space` | Toggle browse/focus mode |

---

## Testing Checklist

### ✅ Page Structure

#### Landmarks & Regions
- [ ] **Main navigation**: NVDA announces "navigation landmark"
- [ ] **Main content**: Announced as "main landmark"
- [ ] **Footer**: Announced as "contentinfo landmark"
- [ ] Skip-to-content link appears when focused (Tab once on page load)

#### Heading Structure
- [ ] **H1**: Page title present and unique per page
  - Homepage: "Movie App" or main hero title
  - Search: "Search Results" or similar
  - Favorites: "Favorites"
  - Details: Movie title
- [ ] **H2**: Major sections (Trending Movies, New Releases, etc.)
- [ ] **H3**: Subsections (Cast, Crew, etc.)
- [ ] Heading hierarchy is logical (no skipped levels)

**Test**: Press `H` repeatedly to navigate headings - order should make sense

---

### ✅ Images & Media

#### Movie Posters
- [ ] Each image has descriptive `alt` text with movie title
- [ ] NVDA reads: "Image, [Movie Title]"
- [ ] Decorative images have `alt=""` or `aria-hidden="true"`

#### Icons
- [ ] Functional icons have `aria-label`:
  - Search icon: "Search"
  - Close icon: "Close" or "Clear search"
  - Favorite heart: "Add to favorites" / "Remove from favorites"
- [ ] Decorative icons are hidden from screen readers

**Test**: Navigate through homepage cards - each poster should announce movie title

---

### ✅ Navigation

#### Navbar
- [ ] Logo announced as link: "Movie App, link"
- [ ] Search input: "Search Movie, edit, blank"
- [ ] Favorites link: "Favorites, link"
- [ ] Current page link has `aria-current="page"` (reads as "current page")

#### Breadcrumbs (if any)
- [ ] Announced as "navigation"
- [ ] Current page breadcrumb has `aria-current="page"`

---

### ✅ Interactive Elements

#### Buttons
- [ ] All buttons announced with descriptive labels
- [ ] "Watch Trailer" button: "Watch Trailer, button"
- [ ] Favorite heart: "Add to favorites, button" or "Remove from favorites, button"
- [ ] Load More: "Load More, button"

#### Links
- [ ] Movie cards: "Movie Title, link"
- [ ] Generic "Read More" avoided (links have context)

#### Form Controls
- [ ] Search input has label: "Search Movie"
- [ ] Placeholder text is NOT the only label
- [ ] Input type correctly identified: "edit" for text inputs

---

### ✅ Dynamic Content

#### ARIA Live Regions

**Search Page**:
- [ ] Start typing in search
- [ ] **NVDA should announce**: "Searching for movies..."
- [ ] After results load: "Found 12 results for 'Avengers'"
- [ ] No results: "No results found for 'xyz'"

**Test Steps**:
1. Navigate to search page
2. Type a query (e.g., "avengers")
3. Wait 500ms for debounce
4. **Listen**: NVDA should announce search status without moving focus

#### Loading States
- [ ] Loading spinners have `aria-busy="true"` on container
- [ ] NVDA announces: "busy" when loading starts
- [ ] Announces when loading completes

#### Toast Notifications
- [ ] Error toasts announced automatically
- [ ] Success messages announced
- [ ] Uses `role="status"` or `aria-live="polite"`

---

### ✅ Modals & Dialogs

#### Video Modal (Trailer)

**Opening**:
- [ ] NVDA announces modal title/content
- [ ] Focus moves into modal automatically
- [ ] Background content is `aria-hidden="true"`

**Content**:
- [ ] Close button: "Close, button"
- [ ] Video title announced
- [ ] Video player controls accessible

**Closing**:
- [ ] Escape key closes modal (NVDA announces)
- [ ] Focus returns to trigger button
- [ ] Background `aria-hidden` removed

---

### ✅ Lists & Collections

#### Movie Grids
- [ ] Movie cards in semantic list: `<ul>` or `<ol>`
- [ ] NVDA announces: "List, 12 items"
- [ ] Each item: "Bullet, Movie Title, link"

#### Navigation Lists
- [ ] Nav links in `<ul>` structure
- [ ] Announced as list

---

## JAWS Testing (Windows)

### Setup
1. **Download**: https://www.freedomscientific.com/products/software/jaws/
2. Install trial version or full license
3. Launch JAWS

### Basic Controls
Similar to NVDA, with some differences:

| Key Combination | Action |
|----------------|--------|
| `Insert + Down Arrow` | Say all |
| `H` | Next heading |
| `T` | Next table |
| `Insert + F5` | List forms |
| `Insert + F6` | List headings |
| `Insert + F7` | List links |

### JAWS-Specific Tests
- [ ] Virtual cursor navigation works
- [ ] Forms mode activates for inputs
- [ ] Tables (if any) read correctly
- [ ] ARIA live regions announce properly

---

## VoiceOver Testing (macOS)

### Setup
1. **Enable**: System Preferences > Accessibility > VoiceOver
2. **Start**: `Cmd + F5`

### Basic Controls
| Key Combination | Action |
|----------------|--------|
| `VO + A` | Start reading |
| `VO + Right Arrow` | Next item |
| `VO + Left Arrow` | Previous item |
| `VO + H` | Next heading |
| `VO + U` | Open rotor (element list) |

### Testing
- [ ] Same checklist as NVDA
- [ ] VoiceOver rotor shows all interactive elements
- [ ] Gestures work on iOS Safari

---

## Common Issues & Solutions

### ❌ Problems to Watch For

<function_calls>
<invoke name="write_to_file">
<parameter name="CodeContent"># Screen Reader Testing Guide (Continued)

## Common Issues & Solutions

### ❌ Problems to Watch For

| Issue | Solution |
|-------|----------|
| **"Clickable"** instead of button label | Add proper `role="button"` and `aria-label` |
| **Images read as filenames** | Add descriptive `alt` text |
| **"Button" with no label** | Add `aria-label` or visible text |
| **Form without labels** | Use `<label>` elements or `aria-labelledby` |
| **Dynamic content not announced** | Add `aria-live="polite"` or `role="status"` |
| **Modal background still accessible** | Set `aria-hidden="true"` on background when modal open |
| **Generic link text** ("Click here", "Read more") | Make link text descriptive |

### ✅ Our Implementations

- **Focus management in modals** - Focus moves to modal and returns correctly
- **ARIA live regions** - Search results announced
- **Descriptive labels** - All buttons and inputs have proper labels
- **Alt text** - Movie posters have descriptive alt text with titles
- **Semantic HTML** - Proper use of `<button>`, `<nav>`, `<main>`, etc.

---

## Testing Scenarios

### Scenario 1: Search for a Movie
1. **Start** on homepage
2. **Tab** to search input (or Navigate with NVDA keys)
3. **Type** "Avengers"
4. **Listen**: "Searching for movies..."
5. **Wait** for results
6. **Listen**: "Found X results for 'Avengers'"
7. **Navigate** to first result card
8. **Listen**: "Avengers: Endgame, link" (or similar)
9. **Press Enter** to open details

**Expected**: Clear announcements at each step, logical navigation order

---

### Scenario 2: Watch a Trailer
1. **Navigate** to movie detail page
2. **Find** "Watch Trailer" button (press `B` to jump to buttons)
3. **Listen**: "Watch Trailer, button"
4. **Press Enter** to open modal
5. **Listen**: Modal content announced
6. **Press Escape** to close
7. **Listen**: Focus returned to "Watch Trailer" button

**Expected**: Modal opens/closes with proper announcements and focus management

---

### Scenario 3: Manage Favorites
1. **Navigate** to a movie card
2. **Find** favorite button (heart icon)
3. **Listen**: "Add to favorites, button" or "Remove from favorites"
4. **Press Space/Enter**
5. **Listen**: Toast notification announces success
6. **Navigate** to Favorites page
7. **Listen**: "Favorites, heading level 1"
8. **Navigate** to movie cards
9. **Verify**: Previously favorited movie is present

**Expected**: Clear state announcements, feedback on actions

---

## Screen Reader Announcement Examples

### Good Examples ✅

```
"Search Movie, edit, blank"
"Avengers: Endgame, link"
"Add to favorites, button"
"Watch Trailer, button"
"Found 25 results for 'Avengers'"
"Navigation landmark"
"Main landmark"
```

### Bad Examples ❌

```
"Button" (no label)
"Click here" (not descriptive)
"Image" (no alt text with filename)
"Edit" (no label)
"Clickable" (div with onClick, no role/label)
```

---

## Automated Testing Tools

While manual testing is essential, use these tools for initial screening:

### axe DevTools
- **Chrome Extension**: https://www.deque.com/axe/devtools/
- Scans page for accessibility issues
- Highlights ARIA problems, missing labels, contrast issues

### WAVE
- **Web Extension**: https://wave.webaim.org/extension/
- Visual feedback on accessibility
- Shows document outline, ARIA usage

### Lighthouse
- **Built into Chrome DevTools**
- Run Accessibility audit
- Provides score and actionable items

---

## Reporting Issues

When you find an accessibility issue, document:

1. **Component**: Where the issue occurs
2. **Screen Reader**: NVDA, JAWS, VoiceOver
3. **Expected**: What should happen
4. **Actual**: What actually happens
5. **Steps**: How to reproduce
6. **Severity**: Critical, High, Medium, Low

### Example Issue Report

```markdown
**Component**: Movie Card Favorite Button  
**Screen Reader**: NVDA 2024  
**Expected**: "Add to favorites, button" or "Remove from favorites, button"  
**Actual**: "Button" (no label)  
**Steps**:
1. Navigate to homepage
2. Tab to first movie card
3. Tab to favorite heart icon
4. NVDA announces only "button" without descriptive label

**Severity**: Medium (button is functional but lacks context)  
**Fix**: Add aria-label with current state
```

---

## Resources

### Documentation
- **ARIA Authoring Practices**: https://www.w3.org/WAI/ARIA/apg/
- **WebAIM**: https://webaim.org/
- **NVDA User Guide**: https://www.nvaccess.org/files/nvda/documentation/userGuide.html

### Free Screen Readers
- **NVDA**: https://www.nvaccess.org/download/
- **VoiceOver**: Built into macOS and iOS

### Testing Communities
- **A11y Slack**: https://web-a11y.slack.com
- **WebAIM Discussion List**: https://webaim.org/discussion/

---

## Success Criteria

✅ **All content accessible** via screen reader  
✅ **Logical reading order** matches visual layout  
✅ **Descriptive labels** for all interactive elements  
✅ **Headings structure** provides page outline  
✅ **Images** have meaningful alt text  
✅ **Forms** have proper labels  
✅ **Dynamic content** announced via ARIA live  
✅ **Modals** manage focus correctly  
✅ **No screen reader traps** - can navigate entire app  

---

## Implementation Status

### ✅ Completed
- ARIA live regions for search results
- Focus indicators for keyboard users
- Semantic HTML structure
- Alt text on images
- Button labels (mostly via visible text)

### 🔄 Monitor
- Toast notification announcements
- Modal focus management
- Dynamic content updates

### 📋 Future Enhancements
- More contextual ARIA labels for icons
- Enhanced loading state announcements
- Table semantics if data tables are added

---

## Next Steps

1. **Run automated tests** (Lighthouse, axe DevTools)
2. **Manual NVDA testing** - Follow checklists above
3. **JAWS testing** (if license available)
4. **Fix identified issues**
5. **Retest** after fixes
6. **User testing** with real screen reader users (ideal)

---

**Remember**: Screen reader testing is iterative. Test often, fix issues, and test again. The goal is to ensure all users can access and use the Movie App regardless of ability.

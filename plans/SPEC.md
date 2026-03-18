# Homework Tracker PWA - Technical Specification

## 1. Project Overview

**Project Name:** Homework Tracker  
**Type:** Progressive Web App (PWA) - React  
**Core Functionality:** A mobile-first homework tracking application for tutor "Unaib" to manage homework assignments for 3 students  
**Target Users:** Single user (Tutor Unaib)

---

## 2. UI/UX Specification

### Layout Structure

**Mobile-First Design (375px base)**
- Single page application
- Fixed header with app title
- Scrollable homework list
- Fixed floating action button (FAB) at bottom-right
- Modal overlay for adding/editing homework

**Responsive Breakpoints**
- Mobile: 375px - 767px (primary)
- Tablet: 768px - 1023px
- Desktop: 1024px+

### Visual Design

**Color Palette (Dark Theme)**
- Background Primary: `#0D0D0D` (near black)
- Background Secondary: `#1A1A1A` (card backgrounds)
- Background Tertiary: `#262626` (input backgrounds)
- Text Primary: `#FFFFFF`
- Text Secondary: `#A0A0A0`
- Text Muted: `#666666`
- Accent/Primary: `#6366F1` (indigo for buttons)
- Success: `#22C55E`
- Warning: `#F59E0B`
- Error: `#EF4444`
- Border: `#333333`

**Student Theme Colors**
- Muhammad: `#22C55E` (Green)
- Mahveen: `#A855F7` (Purple)
- Hadia: `#F97316` (Orange)

**Typography**
- Font Family: System UI, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
- Heading (H1): 24px, font-weight 700
- Heading (H2): 20px, font-weight 600
- Body: 16px, font-weight 400
- Small: 14px, font-weight 400
- Caption: 12px, font-weight 400

**Spacing System**
- Base unit: 4px
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px
- 2xl: 48px

**Visual Effects**
- Card shadows: `0 4px 6px -1px rgba(0, 0, 0, 0.3)`
- Border radius (cards): 12px
- Border radius (buttons): 8px
- Border radius (inputs): 8px
- Transitions: 200ms ease-in-out
- FAB shadow: `0 8px 16px rgba(99, 102, 241, 0.4)`

### Components

**1. Header**
- App title: "Homework Tracker"
- Subtitle: "Tutor: Unaib"
- Background: transparent with blur
- Height: 60px
- Sticky position

**2. Homework Card**
- Student name with colored indicator dot
- Subject badge
- Due date (with overdue styling)
- Notes (optional, truncated)
- Delete button
- Completed checkbox

**3. Floating Action Button (FAB)**
- Position: Fixed bottom-right
- Size: 56px diameter
- Icon: + (plus)
- Color: Primary accent (#6366F1)
- Shadow for elevation

**4. Add Homework Modal**
- Full-screen on mobile, centered card on desktop
- Overlay background with blur
- Form fields:
  - Student dropdown (required)
  - Subject dropdown (required)
  - Due date picker (required)
  - Notes textarea (optional)
- Cancel and Save buttons

**5. Empty State**
- Illustrated message when no homework
- Call-to-action to add first homework

**6. Filter/Tabs (Optional Enhancement)**
- All / Active / Completed tabs

---

## 3. Functionality Specification

### Core Features

**F1: View Homework List**
- Display all homework sorted by due date (earliest first)
- Show student name with their color
- Show subject
- Show due date (highlight overdue items)
- Show completion status

**F2: Add Homework**
- Open modal via FAB click
- Select student from dropdown (Muhammad, Mahveen, Hadia)
- Select subject from predefined list
- Set due date via date picker
- Add optional notes
- Save creates new homework entry

**F3: Mark Homework Complete**
- Toggle checkbox on homework card
- Visual indication of completed status
- Move to bottom of list

**F4: Delete Homework**
- Delete button on each card
- Confirmation before deletion

**F5: Data Persistence**
- Store all homework in localStorage
- Auto-save on any change
- Load on app startup

### Default Subjects
- Math
- English
- Science
- Physics
- Chemistry
- Biology
- History
- Geography
- Urdu
- Computer Science
- Art
- Music

### Data Model

```typescript
interface Homework {
  id: string;
  studentId: 'muhammad' | 'mahveen' | 'hadia';
  subject: string;
  dueDate: string; // ISO date string
  notes: string;
  completed: boolean;
  createdAt: string; // ISO timestamp
}

interface Student {
  id: 'muhammad' | 'mahveen' | 'hadia';
  name: string;
  color: string;
}
```

### Edge Cases
- Empty homework list: Show empty state
- All homework completed: Show congratulatory message
- Past due date: Highlight in red/warning color
- Long notes: Truncate with "..." in card, full in modal

---

## 4. PWA Configuration

### Manifest (manifest.json)
- Name: "Homework Tracker"
- Short name: "Homework"
- Theme color: #0D0D0D
- Background color: #0D0D0D
- Display: standalone
- Orientation: portrait
- Icons: 192x192, 512x512 (can use placeholder)

### Service Worker
- Cache static assets
- Offline support (basic)

---

## 5. Acceptance Criteria

- [ ] App loads without errors
- [ ] PWA is installable (manifest.json valid)
- [ ] Dark theme applied throughout
- [ ] All 3 students visible with correct colors
- [ ] FAB visible at bottom-right
- [ ] Can add new homework via modal
- [ ] Can mark homework as complete
- [ ] Can delete homework
- [ ] Data persists after page refresh
- [ ] Responsive on mobile devices
- [ ] Due dates displayed correctly
- [ ] Overdue homework highlighted

---

## 6. Technology Stack

- **Framework:** React 18+ with Vite
- **Language:** TypeScript
- **Styling:** CSS Modules or styled-components
- **State Management:** React useState + useEffect
- **Storage:** localStorage
- **PWA:** vite-plugin-pwa
- **Icons:** Lucide React or similar

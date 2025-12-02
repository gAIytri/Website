# MediaCarousel Component Documentation

## Overview
MediaCarousel is a smooth, animated horizontal carousel component designed to display project media (images/videos) with dynamic 3D-like effects. It features smooth scaling, elevation, and rotation animations as items scroll into center view.

## Component Location
`src/components/MediaCarousel.jsx`

## Usage

### Basic Implementation
```jsx
import MediaCarousel from './components/MediaCarousel';

const projectData = [
  {
    id: 1,
    name: 'Skill Map',
    media: [
      { id: 1 },
      { id: 2 },
      { id: 3 },
      { id: 4 },
      { id: 5 },
      { id: 6 },
    ]
  }
];

<MediaCarousel
  projects={projectData}
  header="Products"
  subheader="Discover our innovative products designed to transform your business"
/>
```

### Currently Used In
- **Products section** (`src/components/Products.jsx`)
- Replaces the previous ImageCarousel component

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `projects` | Array | Yes | Array of project objects containing name and media |
| `header` | String | Yes | Main heading text displayed at top |
| `subheader` | String | Yes | Subheading text displayed below header |

### Project Object Structure
```javascript
{
  id: Number,          // Unique identifier
  name: String,        // Tab/project name (e.g., "Skill Map")
  media: Array         // Array of media items
}
```

### Media Item Structure
```javascript
{
  id: Number,          // Unique identifier
  isEmpty: Boolean     // Optional - for placeholder items
}
```

## Key Features

### 1. Finite Scrolling (Non-Infinite)
- Displays items 1-6 once (not circular)
- First item: centered with empty placeholder on left
- Last item: centered with empty placeholder on right
- Simple back-and-forth scrolling

### 2. Empty Placeholders
- Automatically adds invisible placeholders at start and end
- Ensures 3 items always visible: left-center-right
- Placeholders have `opacity: 0` and `isEmpty: true`

### 3. Dynamic Transforms
All transforms are distance-based and interpolate smoothly:

#### Scale
```javascript
scale = 1 - (normalizedDistance * 0.25)
// Center: 1.0 (100%)
// Edges: 0.75 (75%)
```

#### Vertical Position (translateY)
```javascript
translateY = -100 + (normalizedDistance * 280)
// Center: -100px (elevated high)
// Edges: +180px (very low down)
// Creates dramatic arc: items rise to center, descend to sides
```

#### Rotation
```javascript
rotation = normalizedDistance * (isLeft ? -15 : 15)
// Center: 0 degrees (flat)
// Left side: -15 degrees (tilted counter-clockwise)
// Right side: +15 degrees (tilted clockwise)
// Smooth interpolation - no sudden jumps
```

#### Opacity
```javascript
opacity = 1 - (normalizedDistance * 0.4)
// Center: 1.0 (fully visible)
// Edges: 0.6 (slightly faded)
```

### 4. Custom Smooth Scrolling
- Uses requestAnimationFrame for 60fps updates
- Custom scroll animation: 600ms duration
- Easing: ease-out quadratic for natural deceleration
- Prevents browser's default smooth scroll for full control

### 5. Navigation
- **Tabs**: Switch between projects (currently 1: "Skill Map")
- **Indicators**: Dot navigation below carousel
- **Arrows**: Previous/Next buttons with disabled states at boundaries
- **Click Items**: Click any item to scroll it to center
- **Mouse Scroll**: Native horizontal scroll with trackpad/mouse

## Technical Implementation

### Transform Application
Transforms are applied directly to DOM for performance:
```javascript
item.style.transform = `scale(${scale}) translateY(${translateY}px) rotate(${rotation}deg)`;
item.style.opacity = opacity;
```

### Scroll Handler
- Uses `requestAnimationFrame` for smooth updates
- Throttles updates using RAF cancellation
- Calculates distance for each item on every scroll event
- Updates all transforms continuously during scroll

### Initialization
- Scrolls to first real item (index 1, after placeholder) on mount
- Triggers initial transform application after 100ms
- Resets when project tab changes

### Boundary Detection
- Left boundary: activeIndex === 1 (first real item)
- Right boundary: activeIndex === items.length - 2 (last real item)
- Navigation arrows disabled/faded at boundaries

## Styling Details

### Layout
- **Section**: Full width, centered content
- **Wrapper**: Minimal top padding (0.5rem), allows vertical overflow
- **Container**: Horizontal scroll only, vertical overflow hidden
- **Items**: 50vw width each, no gap between items

### Spacing
- **Gap**: 0rem (items touching)
- **Container Padding**: 12rem top, 2rem bottom, 5vw sides
- **Wrapper Padding**: 0.5rem top, 2rem bottom
- **Indicators**: 1rem margin top
- **Navigation**: 1rem margin top

### Overflow Control
- **Section**: `overflowY: visible`, `overflowX: hidden`
- **Wrapper**: `overflowY: visible`, `overflowX: hidden`
- **Container**: `overflowX: scroll`, `overflowY: hidden`
- Prevents vertical scrolling, allows horizontal only

### Colors
- **Active indicator**: `#02E673` (brand green)
- **Inactive indicator**: `rgba(233, 234, 232, 0.3)`
- **Active shadow**: `0 20px 60px rgba(2, 230, 115, 0.3)`
- **Tab active**: `#02E673` with weight 600

## Current Configuration

### Products Section Setup
```javascript
// src/components/Products.jsx
const projectData = [
  {
    id: 1,
    name: 'Skill Map',
    media: [
      { id: 1 }, { id: 2 }, { id: 3 },
      { id: 4 }, { id: 5 }, { id: 6 }
    ]
  }
];
```

- **6 media items** per project
- **1 project tab** ("Skill Map")
- **Placeholder images** (Unsplash office photo)

## Animation Characteristics

### Visual Effect
- Items appear to "rise from below" as they approach center
- Center item: elevated high (-100px), full scale, no rotation
- Side items: very low (+180px), 75% scale, ±15° tilted
- Creates 3D carousel/fan effect

### Transition Speed
- **Item transitions**: 0.2s ease-out (applied to transform/opacity)
- **Scroll animation**: 600ms ease-out quadratic
- **Smooth**: Uses RAF for continuous interpolation

## Placeholder Content
Currently using temporary placeholder:
```javascript
<img
  src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=450&fit=crop"
  alt={`Media ${index}`}
  style={styles.mediaImage}
/>
```

### TODO: Replace with Actual Media
- Support both images and videos
- Accept image/video URLs in media items
- Conditional rendering based on media type

## Future Enhancements

### Potential Additions
1. **Video Support**: Detect and render video elements
2. **Multiple Projects**: Add more project tabs beyond "Skill Map"
3. **Lazy Loading**: Load media on-demand for performance
4. **Touch Gestures**: Enhanced mobile swipe support
5. **Autoplay**: Optional automatic rotation through items
6. **Thumbnails**: Preview images for quick navigation
7. **Full Screen**: Modal view for media inspection
8. **Captions**: Text overlays or descriptions for media items

### Known Considerations
- Transform values optimized for current viewport sizes
- May need responsive adjustments for very small/large screens
- Rotation effect works best with rectangular media (16:9)
- Ensure adequate vertical space for elevation effects

## Browser Compatibility
- Uses modern CSS features (transform, flexbox)
- requestAnimationFrame for animations
- Tested on modern browsers (Chrome, Firefox, Safari)
- Requires JavaScript enabled

## Performance Notes
- Direct DOM manipulation for transforms (avoids React re-renders)
- RAF throttling prevents excessive updates
- Hardware-accelerated transforms (scale, translateY, rotate)
- CSS `will-change` hint for optimization

## Code Structure

### Main State
```javascript
const [activeIndex, setActiveIndex] = useState(0);
const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
const rafRef = useRef(null);
```

### Key Functions
1. `smoothScrollTo()` - Custom scroll animation
2. `scrollToItem()` - Navigate to specific index
3. `handleScroll()` - Update transforms on scroll
4. `useEffect()` - Initialize and cleanup

### Styles Object
All styles defined in component-level `styles` object for easy modification.

## Files Modified
1. `src/components/MediaCarousel.jsx` - Component implementation
2. `src/components/Products.jsx` - Integration and data
3. `src/Home.jsx` - Removed test version

---

**Last Updated**: December 2025
**Component Version**: 1.0
**Status**: Production Ready

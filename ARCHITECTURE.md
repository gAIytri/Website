# Gaiytri Website - Architecture & Changes Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Component Structure](#component-structure)
4. [Recent Changes](#recent-changes)
5. [Responsive Design Strategy](#responsive-design-strategy)
6. [Technical Decisions](#technical-decisions)

---

## Project Overview

**Gaiytri Website** is a modern, responsive web application showcasing Gaiytri LLC's AI automation services. The project consists of:

- **Frontend**: React + Vite (hosted on Vercel at gaiytri.com)
- **Backend**: Python FastAPI + RAG Agent (hosted on Railway)
- **Database**: ChromaDB for vector storage
- **AI Model**: OpenAI GPT-4o with LangChain

### Tech Stack
- **Frontend**: React, Vite, Framer Motion, react-responsive
- **Backend**: FastAPI, LangChain, ChromaDB, OpenAI API
- **Styling**: Inline styles with responsive clamp() functions
- **Deployment**: Vercel (frontend), Railway (backend)

---

## Architecture

### Frontend Architecture

```
/gaiytriwebsite/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx           # Main navigation (responsive)
│   │   ├── Hero.jsx             # Hero section with video background
│   │   ├── CenteredChat.jsx     # AI chatbot interface
│   │   ├── SlidingSection.jsx   # Products/Services section
│   │   ├── AboutUS.jsx          # Founders section
│   │   ├── ContactUs.jsx        # Contact form
│   │   └── Footer.jsx           # Footer component
│   ├── App.jsx                  # Main app wrapper with gradient
│   ├── Home.jsx                 # Homepage layout
│   └── main.jsx                 # Entry point
├── public/
│   └── hero-background.mp4      # Background video
└── .env                         # Environment variables
```

### Backend Architecture (RAG Agent)

```
/GaiytriRAG/
├── src/
│   ├── api.py                   # FastAPI endpoints
│   ├── rag_chain.py             # RAG logic with streaming
│   └── ingest.py                # Document ingestion
├── data/
│   └── company/                 # Markdown knowledge base (8 docs)
├── chroma_db/                   # Vector database storage
└── requirements.txt
```

---

## Component Structure

### 1. Hero Component (`/src/components/Hero.jsx`)

**Purpose**: Self-contained hero section with video background, animated text, and chatbot.

**Key Features**:
- Video background with responsive sizing
- Animated rotating text ("to automate", "to optimize", "to evolve", "to scale")
- Integrated chatbot interface
- Fully responsive across all screen sizes

**Structure**:
```
Hero
├── Video Background Layer (z-index: 1)
├── Dark Overlay (z-index: 2, rgba(0,0,0,0.4))
└── Hero Content (z-index: 3)
    ├── Header Section
    │   ├── Line 1: "Empowering you"
    │   └── Line 2: "to [rotating word]"
    ├── Subtext
    └── Chat Section
```

**Responsive Breakpoints**:
- Desktop (≥1025px): 100vh, video cover
- Tablet (769-1024px): 80vh, video cover
- Mobile (≤768px): 70vh, video contain
- Small mobile (≤480px): 60vh, video contain
- Landscape mobile: 85vh, video contain

### 2. Navbar Component (`/src/components/Navbar.jsx`)

**Purpose**: Fixed navigation bar with responsive menu system.

**Structure**:
- **Desktop**: Logo | Products, Services (center) | Contact Us (right)
- **Mobile (≤510px)**: Logo | Hamburger Menu
  - Dropdown: Products, Services, Contact Us

**Responsive Height**:
- Desktop: 72px
- Mobile (≤480px): 48px
- Very small (≤360px): 44px

**Logo Size**:
- Desktop: 40px
- Mobile (≤480px): 24px
- Very small (≤360px): 22px

### 3. CenteredChat Component (`/src/components/CenteredChat.jsx`)

**Purpose**: AI chatbot interface with streaming responses.

**Key Features**:
- Server-Sent Events (SSE) streaming
- Real-time token-by-token rendering using `flushSync()`
- Responsive input with adaptive placeholder text
- Black background with white text

**Input Placeholder (Responsive)**:
- Desktop (>600px): "Ask me anything about Gaiytri - our services, team, pricing, or mission..."
- Mobile (≤600px): "Ask me about Gaiytri..."
- Very small (≤400px): "Ask about Gaiytri..."

**Input Sizing**:
- Desktop: max-width 750px, padding 0.75-1rem
- Tablet (≤768px): max-width 650px, padding 0.45-0.7rem
- Mobile (≤480px): max-width 100%, padding 0.4-0.6rem
- Very small (≤360px): padding 0.35-0.5rem

---

## Recent Changes

### Session Overview: Website Redesign & Hero Component Creation

#### 1. Navbar Restructure
**Before**: Logo | "Coming Soon" (center) | "About Us" (right)
**After**: Logo | "Products", "Services" (center) | "Contact Us" (right)

**Changes**:
- Updated navbar tabs from "Coming Soon" to "Products" and "Services"
- Created hamburger menu for mobile with black dropdown
- Made navbar height, logo size, and padding fully responsive
- Reduced navbar blur from 4px to 1px

**Files Modified**:
- `src/components/Navbar.jsx`
- `src/App.jsx` (updated callback props)

#### 2. Video Background Implementation
**Purpose**: Add hero video background to landing page

**Implementation**:
- Video file: `/public/hero-background.mp4`
- Auto-play, muted, loop, playsInline
- Responsive object-fit: cover (desktop), contain (mobile)
- Dark overlay: rgba(0, 0, 0, 0.4)

**Responsive Strategy**:
- Desktop: Full cover, 100vh
- Mobile: Contain (show full video), 60-70vh
- Prevents video cropping important content on mobile

#### 3. Hero Component Creation
**Purpose**: Self-contained component for video section

**Why Created**:
- Previous implementation had overflow issues
- Content and video weren't staying together on mobile
- Needed better containment and responsive behavior

**Solution**:
- Created `/src/components/Hero.jsx` as standalone component
- Moved all video, header, and chat logic into Hero
- Updated `/src/Home.jsx` to simply import `<Hero />`
- Video section now properly constrains all content

**Benefits**:
- ✅ Self-contained unit (video + text + chat stay together)
- ✅ No overflow issues
- ✅ Easier to maintain and modify
- ✅ Reusable component

#### 4. Header Text Updates
**Before**: "Empowering businesses to automate, optimize, evolve and scale"
**After**:
- Line 1: "Empowering you"
- Line 2: "to [automate/optimize/evolve/scale]"

**Animation**:
- Slides in from LEFT (not top)
- Uses translateX(-20px) animation
- Duration: 0.6s with cubic-bezier easing
- Rotates every 2.5 seconds
- Center-aligned

**Spacing**:
- Reduced line-height from 1.3 to 1
- Reduced gap between header and subtext from 0.5-1rem to 0.25-0.5rem
- Reduced gap between subtext and chat from 1.5-2rem to 0.75-1.25rem

#### 5. Subtext Update
**Before**: "Gaiytri designs intelligent systems that streamline operations, reduce manual effort, and help businesses grow smarter"
**After**: "Gaiytri builds intelligent systems that simplify your work, eliminate manual effort, and enable smarter growth for everyone"

#### 6. Chat Input Redesign
**Before**: Semi-transparent white background, large padding
**After**: Black background (#000000), white text, minimal padding

**Changes**:
- Background: #000000 (pure black)
- Text color: #FFFFFF (white)
- Border: 1px solid rgba(255, 255, 255, 0.15)
- Reduced padding by ~40%
- Smaller send button (36-42px vs 40-48px)
- Responsive placeholder text
- Border radius: 14-22px (down from 16-24px)

**Responsive Improvements**:
- Added media queries for <768px, <480px, <360px
- Width, height, padding all scale down on smaller screens
- Fixed right-side overflow issue
- Container padding reduces on mobile (0.75rem → 0.4rem)

---

## Responsive Design Strategy

### Philosophy
The entire website uses **responsive clamp()** functions instead of traditional breakpoints for most sizing. This creates smooth, continuous scaling across all screen sizes.

### clamp() Syntax
```css
clamp(minimum, preferred, maximum)
```

**Example**:
```javascript
fontSize: 'clamp(1.3rem, 3.5vw, 3.2rem)'
```
- Minimum: 1.3rem (20.8px) - smallest font size
- Preferred: 3.5vw - scales with viewport width
- Maximum: 3.2rem (51.2px) - largest font size

### Key Breakpoints (Media Queries)

Despite using clamp(), these breakpoints are used for structural changes:

| Breakpoint | Description | Usage |
|------------|-------------|-------|
| 360px | Very small mobile | Ultra-compact layouts |
| 400px | Small mobile | Shortened placeholder text |
| 480px | Mobile phones | Height/padding reductions |
| 510px | Mobile menu | Navbar switches to hamburger |
| 600px | Small screens | Placeholder text change |
| 768px | Tablet/Mobile | Video contain mode, layout shifts |
| 1024px | Tablet landscape | Transition to desktop layouts |
| 1025px | Desktop | Full desktop experience |

### Viewport-Based Units

| Unit | Usage | Example |
|------|-------|---------|
| `vh` | Vertical spacing, section heights | `min-height: 70vh` |
| `vw` | Horizontal sizing, gaps | `fontSize: 3.5vw` |
| `rem` | Minimum/maximum values | `clamp(0.5rem, 2vh, 1rem)` |

---

## Technical Decisions

### 1. Why Self-Contained Hero Component?

**Problem**: Video and content were separating on mobile screens, causing overflow.

**Solution**: Created Hero.jsx with all logic and styling encapsulated.

**Benefits**:
- Content height matches video section height at all breakpoints
- No overflow or positioning issues
- Single source of truth for hero section
- Easier to test and modify

### 2. Why `object-fit: contain` on Mobile?

**Problem**: Video important content was being cropped on mobile.

**Decision**: Use `contain` instead of `cover` for screens ≤768px.

**Tradeoff**:
- ✅ All video content visible
- ✅ No important parts cropped
- ⚠️ May show letterboxing depending on video aspect ratio

### 3. Why Inline Styles Instead of CSS Files?

**Reason**: Quick prototyping and component co-location.

**Advantages**:
- Styles live with component logic
- No CSS class naming conflicts
- Easy to see all styling in one place
- Works well with clamp() responsive values

**Disadvantages**:
- Limited pseudo-classes (handled with style tags)
- No CSS cascade benefits
- Can become verbose for complex components

### 4. Why Server-Sent Events (SSE) for Chat?

**Alternative**: WebSockets or polling

**Why SSE**:
- ✅ Simpler than WebSockets (one-way communication)
- ✅ Built-in reconnection
- ✅ Works with standard HTTP
- ✅ Perfect for streaming AI responses
- ✅ No need for bidirectional communication

**Implementation**:
```javascript
// Backend: Stream chunks
async def generate():
    for chunk in stream_generator:
        yield f"data: {json.dumps({'content': chunk})}\n\n"

// Frontend: Read stream
const reader = response.body.getReader();
while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    // Process chunk with flushSync for immediate render
}
```

### 5. Why `flushSync()` for Streaming?

**Problem**: React batches state updates, causing all text to appear at once.

**Solution**: Use `flushSync()` from 'react-dom' to force synchronous rendering.

**How it works**:
```javascript
import { flushSync } from 'react-dom';

flushSync(() => {
    setMessages((prev) => {
        // Update message text
    });
});
await new Promise(resolve => setTimeout(resolve, 20)); // Yield to browser
```

This forces the browser to paint each update immediately, creating visible token-by-token streaming.

### 6. Why 20ms Delay Between Chunks?

**Reason**: Balance between speed and visibility.

**Tested values**:
- 0ms: Too fast, appears instant
- 50ms: Too slow, feels laggy
- 20ms: Sweet spot - fast but visible streaming effect

---

## File Structure & Key Files

### Frontend Configuration

**`.env`**
```env
VITE_API_URL=https://gaiytri-rag-api-production.up.railway.app
# VITE_API_URL=http://localhost:8000  # For local development
```

**`vite.config.js`**
- Standard Vite configuration
- React plugin enabled

### Backend Configuration

**`/GaiytriRAG/src/api.py`**
- FastAPI server
- CORS enabled for gaiytri.com
- Endpoints: `/ask` (standard), `/ask/stream` (SSE)

**`/GaiytriRAG/src/rag_chain.py`**
- RAG logic with ChromaDB
- Streaming support (`stream=True` parameter)
- Enhanced prompt with validation rules

**Prompt Template**:
```python
template = """You are an intelligent AI assistant representing Gaiytri LLC...

CRITICAL VALIDATION RULES:
1. ONLY answer questions about Gaiytri LLC
2. For off-topic questions, politely redirect
3. For greetings, respond warmly
4. Provide context-aware responses (specific to specific questions)

CONTEXT: {context}
CHAT HISTORY: {chat_history}
QUESTION: {question}
"""
```

**Knowledge Base** (`/GaiytriRAG/data/company/`):
- 8 markdown files with company information
- Ingested into ChromaDB as 43 chunks
- Topics: overview, services, technical capabilities, team, pricing, contact

---

## Deployment

### Frontend (Vercel)
- **Domain**: gaiytri.com
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Environment Variables**: `VITE_API_URL`

### Backend (Railway)
- **URL**: https://gaiytri-rag-api-production.up.railway.app
- **Start Command** (Procfile): `cd src && python3 -m uvicorn api:app --host 0.0.0.0 --port $PORT`
- **Environment Variables**: `OPENAI_API_KEY`

---

## Component Props & Interfaces

### Navbar Props
```javascript
{
  onProductsClick: () => void,    // Callback for Products tab
  onServicesClick: () => void,    // Callback for Services tab
  onContactClick: () => void      // Callback for Contact Us tab
}
```

### Home Props
```javascript
{
  slidingRef: React.RefObject,    // Ref for Products/Services section
  aboutRef: React.RefObject        // Ref for About/Founders section
}
```

### CenteredChat (No Props)
- Self-contained with internal state
- Manages messages, loading, input state
- Connects to API_URL from environment

---

## Styling Patterns

### Color Palette
- **Primary Green**: `#02E673` (Gaiytri brand color)
- **Background Dark**: `#111111`, `#000000`
- **Text Light**: `#E9EAE8`, `#FFFFFF`
- **Text Muted**: `rgba(255, 255, 255, 0.5)`
- **Border Subtle**: `rgba(255, 255, 255, 0.15)`

### Typography
- **Font Family**: 'Poppins, sans-serif'
- **Header Font Size**: `clamp(1.3rem, 3.5vw, 3.2rem)`
- **Subtext Font Size**: `clamp(0.75rem, 1.5vw, 1rem)`
- **Input Font Size**: `clamp(0.8rem, 2vw, 0.95rem)`

### Spacing System
- **Extra Small**: `0.25rem` (4px)
- **Small**: `0.5rem` (8px)
- **Medium**: `1rem` (16px)
- **Large**: `1.5rem` (24px)
- **Extra Large**: `2rem` (32px)

All spacing uses clamp() for responsive scaling.

---

## Performance Considerations

### Video Optimization
- Video should be compressed for web
- Recommended: H.264 codec, MP4 container
- Target size: <10MB for good performance
- Consider providing multiple resolutions

### Chat Streaming
- 20ms delay between chunks balances UX and performance
- `flushSync()` has performance cost but necessary for UX
- Message history limited to prevent memory issues

### Component Re-renders
- Hero component memoization not implemented (consider for performance)
- Chat messages use key={index} - could be improved with unique IDs
- Navbar state minimal to reduce re-renders

---

## Future Improvements

### Suggested Enhancements
1. **Accessibility**: Add ARIA labels, keyboard navigation
2. **SEO**: Add meta tags, structured data
3. **Analytics**: Implement event tracking
4. **Error Boundaries**: Add error handling components
5. **Loading States**: Better skeleton screens
6. **Animation**: Use Framer Motion more extensively
7. **Testing**: Add unit and integration tests
8. **TypeScript**: Migrate to TypeScript for type safety

### Known Issues
- Video may not autoplay on some mobile browsers (iOS Safari)
- Chat history not persisted (refreshing page clears conversation)
- No rate limiting on API calls
- Placeholder text truncation could be smoother

---

## Development Commands

### Frontend
```bash
npm install          # Install dependencies
npm run dev          # Start development server (localhost:5173)
npm run build        # Build for production
npm run preview      # Preview production build
```

### Backend
```bash
cd GaiytriRAG
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
cd src
python api.py        # Start FastAPI server (localhost:8000)
python ingest.py     # Re-ingest documents into ChromaDB
```

---

## Glossary

- **RAG**: Retrieval Augmented Generation - AI technique that retrieves relevant context before generating responses
- **SSE**: Server-Sent Events - HTTP protocol for server-to-client streaming
- **ChromaDB**: Vector database for semantic search
- **clamp()**: CSS function for responsive sizing with min/preferred/max values
- **flushSync()**: React function to force synchronous state updates
- **vh/vw**: Viewport height/width units (100vh = full screen height)

---

## Maintainer Notes

### When Adding New Components
1. Follow the self-contained pattern (like Hero.jsx)
2. Use clamp() for all responsive sizing
3. Add media queries only for structural changes
4. Document props and usage
5. Test on mobile, tablet, and desktop

### When Modifying Styles
1. Maintain the color palette consistency
2. Test all breakpoints (<360px, 480px, 768px, 1024px)
3. Ensure text remains readable at all sizes
4. Verify no horizontal scrolling on mobile

### When Working with the RAG Agent
1. Test streaming in browser console first
2. Verify CORS settings for new domains
3. Update prompt template carefully (affects all responses)
4. Re-ingest documents after knowledge base changes

---

**Last Updated**: December 1, 2025
**Version**: 2.0 (Website Redesign)
**Author**: Claude (Anthropic) with guidance from Sidharth Raj

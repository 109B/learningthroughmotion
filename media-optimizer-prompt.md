# Media Optimizer Tool - Build Prompt

## Project Overview

Build a client-side media optimization tool that runs entirely in the browser. This tool allows users to compress and convert images and videos to web-optimized formats without uploading files to a server.

**Target URL:** `tools.1zero9.com` or `/tools/media-optimizer` on main site

## Core Features

### Image Processing
- **Input formats:** HEIC, PNG, JPEG, TIFF, WebP, GIF, BMP
- **Output format:** WebP (with JPEG fallback option)
- **Capabilities:**
  - Resize to max dimensions (e.g., 1920px width)
  - Quality slider (50-100%)
  - Batch processing (multiple files at once)
  - Before/after file size comparison

### Video Processing
- **Input formats:** MOV, MP4, WebM, AVI
- **Output format:** MP4 (H.264)
- **Capabilities:**
  - Resolution options (1080p, 720p, 480p)
  - Quality/compression level
  - Show estimated output size
  - Progress indicator (video processing takes time)

### User Interface
- Drag & drop zone for files
- File list showing: name, original size, type
- Global settings (quality, max dimensions, output format)
- Per-file settings override (optional)
- Process button
- Download individual files or all as ZIP
- Before/after size comparison with percentage saved

## Technical Implementation

### Stack
- **Framework:** Next.js 14+ (App Router) or plain React/Vite
- **Styling:** Tailwind CSS
- **Image processing:** Browser Canvas API + `browser-image-compression` library
- **Video processing:** `@ffmpeg/ffmpeg` (FFmpeg.wasm)
- **ZIP creation:** `jszip` library
- **File handling:** Native File API + drag-and-drop

### Key Libraries

```json
{
  "dependencies": {
    "browser-image-compression": "^2.0.0",
    "@ffmpeg/ffmpeg": "^0.12.0",
    "@ffmpeg/util": "^0.12.0",
    "jszip": "^3.10.0",
    "file-saver": "^2.0.5"
  }
}
```

### Architecture

```
/app (or /src)
├── page.tsx                 # Main optimizer page
├── components/
│   ├── DropZone.tsx        # Drag & drop file input
│   ├── FileList.tsx        # List of queued files
│   ├── FileItem.tsx        # Individual file row
│   ├── Settings.tsx        # Quality, size, format options
│   ├── ProgressBar.tsx     # Processing progress
│   └── ResultsSummary.tsx  # Before/after comparison
├── lib/
│   ├── imageProcessor.ts   # Image compression logic
│   ├── videoProcessor.ts   # FFmpeg video processing
│   └── utils.ts            # File size formatting, etc.
└── hooks/
    └── useMediaProcessor.ts # Main processing hook
```

### Image Processing Logic

```typescript
import imageCompression from 'browser-image-compression';

async function compressImage(file: File, options: {
  maxWidth: number;
  quality: number;
  outputFormat: 'webp' | 'jpeg';
}): Promise<Blob> {
  const compressed = await imageCompression(file, {
    maxWidthOrHeight: options.maxWidth,
    initialQuality: options.quality / 100,
    fileType: `image/${options.outputFormat}`,
    useWebWorker: true,
  });
  return compressed;
}
```

### Video Processing Logic

```typescript
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';

const ffmpeg = new FFmpeg();

async function compressVideo(file: File, options: {
  resolution: '1080' | '720' | '480';
  quality: number; // CRF value 18-28
}): Promise<Blob> {
  await ffmpeg.load();

  await ffmpeg.writeFile('input', await fetchFile(file));

  const scale = {
    '1080': 'scale=-2:1080',
    '720': 'scale=-2:720',
    '480': 'scale=-2:480',
  }[options.resolution];

  await ffmpeg.exec([
    '-i', 'input',
    '-vf', scale,
    '-c:v', 'libx264',
    '-crf', String(options.quality),
    '-preset', 'medium',
    '-c:a', 'aac',
    '-b:a', '128k',
    'output.mp4'
  ]);

  const data = await ffmpeg.readFile('output.mp4');
  return new Blob([data], { type: 'video/mp4' });
}
```

## UI Design

### Layout

```
┌──────────────────────────────────────────────────────────────┐
│  1zero9 Media Optimizer                              [Logo]  │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌────────────────────────────────────────────────────────┐  │
│  │                                                        │  │
│  │     📁 Drop images or videos here                      │  │
│  │        or click to browse                              │  │
│  │                                                        │  │
│  │     Supports: HEIC, PNG, JPEG, MOV, MP4                │  │
│  │                                                        │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌─ Settings ─────────────────────────────────────────────┐  │
│  │                                                        │  │
│  │  Quality:     ████████░░░░ 70%                         │  │
│  │  Max Width:   [1920] px                                │  │
│  │  Image Format: ○ WebP (smaller)  ○ JPEG (compatible)   │  │
│  │  Video Res:   ○ 1080p  ● 720p  ○ 480p                  │  │
│  │                                                        │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌─ Files (3) ────────────────────────────────────────────┐  │
│  │                                                        │  │
│  │  ✓ photo1.heic    4.2 MB  →  0.3 MB  (-93%)   [x]     │  │
│  │  ✓ photo2.png     2.1 MB  →  0.2 MB  (-90%)   [x]     │  │
│  │  ◐ video.mov     48.0 MB  →  processing...    [x]     │  │
│  │                                                        │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                              │
│  Total: 54.3 MB → 12.1 MB (78% smaller)                      │
│                                                              │
│  [ Process All ]              [ Download All as ZIP ]        │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### Color Scheme
- Use 1zero9 brand colors
- Success: Green for completed files
- Processing: Amber/yellow with spinner
- Error: Red with retry option

### Responsive Design
- Works on desktop (primary)
- Tablet-friendly
- Mobile: simplified single-column layout

## User Flow

1. User drags files onto drop zone (or clicks to browse)
2. Files appear in the list with original sizes
3. User adjusts settings if needed (defaults are sensible)
4. User clicks "Process All"
5. Progress shown per-file
6. Completed files show before/after size
7. User downloads individually or as ZIP

## Important Considerations

### Performance
- Use Web Workers for image processing (handled by browser-image-compression)
- FFmpeg.wasm is ~25MB, lazy-load only when video is added
- Process files sequentially to avoid memory issues
- Show clear progress for long video operations

### Browser Support
- Modern browsers only (Chrome, Firefox, Safari, Edge)
- FFmpeg.wasm requires SharedArrayBuffer (COOP/COEP headers)
- For video support, add these headers:
  ```
  Cross-Origin-Embedder-Policy: require-corp
  Cross-Origin-Opener-Policy: same-origin
  ```

### Error Handling
- Graceful fallback if FFmpeg fails to load
- Clear error messages for unsupported formats
- Retry option for failed files

### Privacy Notice
- Add a note: "Files are processed entirely in your browser. Nothing is uploaded to any server."

## Default Settings

```typescript
const DEFAULT_SETTINGS = {
  image: {
    maxWidth: 1920,
    quality: 75,
    format: 'webp',
  },
  video: {
    resolution: '720',
    crf: 23, // Lower = better quality, higher = smaller file
  },
};
```

## Stretch Features (Future)

- [ ] Preset profiles (e.g., "Web", "Email", "Social Media")
- [ ] Image cropping before compression
- [ ] Video trimming
- [ ] Metadata stripping option
- [ ] Watermark option
- [ ] Batch rename on download
- [ ] Remember settings in localStorage

## Hosting

- Deploy as static site on Vercel/Netlify (free)
- Subdomain: `tools.1zero9.com` or path: `1zero9.com/tools/media-optimizer`
- Remember: Video processing needs COOP/COEP headers for SharedArrayBuffer

## Summary

This tool should be simple, fast, and focused on one job: making files smaller for web use. The client-side approach means zero hosting costs for processing and complete privacy for users.

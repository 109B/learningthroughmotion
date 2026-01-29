# Media Management

The media management system allows uploading, organizing, and managing images and videos used throughout the website.

## Image Sections

Images are organized by website section, each with its own color coding for easy identification:

| Section | Color | Target Page |
|---------|-------|-------------|
| Homepage | Sky Blue | Hero carousel on homepage |
| Maths Through Sport | Green | `/maths-through-sport` carousel |
| Sensory Redevelopment | Amber | `/sensory-redevelopment` carousel |
| The Next Chapter | Pink | `/the-next-chapter` carousel |
| Our Programmes | Indigo | `/our-programmes` carousel |
| Our Coaches | Purple | `/our-coaches` carousel |

### Uploading Images

1. Select the target section from the color-coded buttons
2. Click "Choose images..." to select files (multiple selection supported)
3. Click "Upload" to upload all selected files
4. Progress is shown during upload
5. Images appear immediately in the section grid

### Image Guidelines

- **Format**: JPG, PNG, WebP supported
- **Size**: Keep under 2MB for optimal loading
- **Dimensions**: 1920x1080 or higher recommended
- **Aspect Ratio**: 16:9 works best in carousels

## Video Sections

Videos are used for the "See Us In Action" showcase section.

| Section | Color | Target Page |
|---------|-------|-------------|
| Homepage Video | Red | Homepage video showcase |

### Uploading Videos

1. Click "Choose videos..." (supports multiple selection)
2. Click "Upload Videos"
3. Progress bars show individual upload status
4. Videos appear in the section grid when complete

### Video Guidelines

- **Format**: MP4, WebM, MOV supported
- **Size**: Keep under 50MB for optimal loading
- **Duration**: 5-30 seconds recommended
- **Resolution**: 1920x1080 recommended
- **Audio**: Videos autoplay muted on the website

## Bulk Upload

Both images and videos support bulk upload:

1. Select multiple files at once
2. Progress tracked for each file
3. Failed uploads show error status
4. Successful uploads marked with checkmark

## Deleting Media

1. Locate the image/video in the grid
2. Click the delete button (red X or "Delete")
3. Confirm deletion
4. Media is removed from both storage and website

## Storage

All media is stored in **Vercel Blob Storage**, providing:

- Global CDN delivery for fast loading
- Automatic image optimization
- Secure, reliable hosting
- Easy migration from local files

### Migration Tool

The "Migrate All" button copies existing local carousel images to cloud storage:

1. Click "Migrate All"
2. Confirm the migration
3. Wait for completion
4. All local images are now in cloud storage

---

*Media management added: January 2026*

# Admin Portal

The Learning Through Motion admin portal provides a secure interface for managing website content without requiring code changes.

## Features

- **Media Management**: Upload, organize, and delete images and videos
- **Section-Based Organization**: Content grouped by website section (Homepage, Programmes, etc.)
- **Bulk Upload**: Upload multiple files at once with progress tracking
- **Cloud Storage**: All media stored in Vercel Blob storage for reliable CDN delivery

## Accessing the Admin Portal

The admin portal is available at `/admin` on the website. Access requires authentication.

### Login

1. Navigate to `/admin/login`
2. Enter the admin password
3. You'll be redirected to the media management dashboard

### Security

- Password-protected access
- Session-based authentication with HTTP-only cookies
- Admin routes protected by Next.js middleware
- Only `/admin/login` is publicly accessible

## Admin Sections

| Section | URL | Purpose |
|---------|-----|---------|
| Login | `/admin/login` | Authentication |
| Media | `/admin/images` | Image & video management |
| Documentation | `/admin/docs` | Project documentation |

## Quick Start

1. Click the subtle "Admin" link in the website footer
2. Log in with your admin password
3. Upload images to the appropriate section
4. Images automatically appear in the corresponding page carousel

---

*Admin portal added: January 2026*

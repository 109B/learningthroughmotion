# Authentication

The admin portal uses simple password-based authentication suitable for a small team.

## How It Works

### Login Flow

1. User navigates to `/admin/*` (any admin route)
2. Middleware checks for `admin_session` cookie
3. If missing or invalid, redirects to `/admin/login`
4. User enters password
5. Password verified against `ADMIN_PASSWORD` environment variable
6. On success, `admin_session` cookie is set
7. User redirected to admin dashboard

### Session Management

- **Cookie Name**: `admin_session`
- **Value**: `authenticated`
- **Security**: HTTP-only cookie
- **Duration**: Session-based (cleared on browser close)

## Environment Configuration

The admin password is configured via environment variable:

```bash
# .env.local
ADMIN_PASSWORD="your-secure-password"
```

!!! warning "Security Note"
    Always use a strong, unique password in production. Never commit the actual password to version control.

## Protected Routes

The following routes require authentication:

| Route | Access |
|-------|--------|
| `/admin/login` | Public |
| `/admin/*` | Protected |
| `/admin/images` | Protected |
| `/admin/docs` | Protected |

## Middleware

Route protection is handled by Next.js middleware:

```typescript
// middleware.ts
export function middleware(request: NextRequest) {
  if (
    request.nextUrl.pathname.startsWith("/admin") &&
    !request.nextUrl.pathname.startsWith("/admin/login")
  ) {
    const adminSession = request.cookies.get("admin_session");

    if (!adminSession || adminSession.value !== "authenticated") {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}
```

## Logging Out

1. Click the "Logout" button in the admin header
2. Session cookie is cleared
3. Redirected to login page

## Future Enhancements

Potential improvements for the authentication system:

- [ ] Multi-user support with roles
- [ ] Password hashing with bcrypt
- [ ] Session expiration with refresh tokens
- [ ] Activity logging
- [ ] Two-factor authentication

---

*Authentication system added: January 2026*

// Learning Through Motion - Auth Session Helpers

import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

/**
 * Get the current session (server-side)
 * Returns null if not authenticated
 */
export async function getSession() {
  return await getServerSession(authOptions);
}

/**
 * Get the current user from session
 * Returns null if not authenticated
 */
export async function getCurrentUser() {
  const session = await getSession();
  return session?.user ?? null;
}

/**
 * Require authentication - redirects to sign in if not authenticated
 * Use this in server components that require authentication
 */
export async function requireAuth() {
  const session = await getSession();

  if (!session) {
    redirect('/auth/signin');
  }

  return session;
}

/**
 * Require admin role - redirects if not admin
 * Use this in admin-only pages
 */
export async function requireAdmin() {
  const session = await requireAuth();

  if (session.user.role !== 'admin') {
    redirect('/account/dashboard');
  }

  return session;
}

/**
 * Check if user is authenticated (returns boolean)
 */
export async function isAuthenticated() {
  const session = await getSession();
  return !!session;
}

/**
 * Check if user is admin
 */
export async function isAdmin() {
  const session = await getSession();
  return session?.user.role === 'admin';
}

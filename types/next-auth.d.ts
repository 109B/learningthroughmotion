// Learning Through Motion - NextAuth Type Extensions

import 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: 'parent' | 'admin';
    };
  }

  interface User {
    id: string;
    email: string;
    name: string;
    role: 'parent' | 'admin';
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: 'parent' | 'admin';
  }
}

import type { Request, Response, NextFunction } from 'express';
import { auth } from '../auth.js'; // Adjust path if necessary

export const requireAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const webHeaders = new Headers();
    for (const [key, value] of Object.entries(req.headers)) {
      if (value !== undefined) {
        if (Array.isArray(value)) {
          value.forEach(v => webHeaders.append(key, v));
        } else {
          webHeaders.set(key, value);
        }
      }
    }

    const session = await auth.api.getSession({
      headers: webHeaders
    });

    if (!session || !session.user) {
      res.status(401).json({ success: false, message: 'Authentication required. No valid session found.' });
      return;
    }

    req.user = {
      id: session.user.id,
      email: session.user.email,
      name: session.user.name,
    };

    next();
  } catch (error: any) {
    console.error('Auth Middleware Error:', error.message);
    res.status(401).json({ success: false, message: 'Invalid or expired session.' });
  }
};

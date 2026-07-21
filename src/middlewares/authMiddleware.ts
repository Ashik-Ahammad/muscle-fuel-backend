import type { Request, Response, NextFunction } from 'express';
import { jwtVerify } from 'jose-cjs';

export const requireAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    let token: string | undefined;

    // 1. Try to get token from Authorization header
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    } 
    // 2. Try to get token from cookies if no Auth header
    else if (req.headers.cookie) {
      const cookies = req.headers.cookie.split(';').reduce((acc: Record<string, string>, cookie) => {
        const parts = cookie.trim().split('=');
        if (parts[0]) {
            acc[parts[0]] = parts[1] || '';
        }
        return acc;
      }, {});
      
      token = cookies['better-auth.session_token'];
    }

    if (!token) {
      res.status(401).json({ success: false, message: 'Authentication required. No token provided.' });
      return;
    }

    // Verify token using jose-cjs
    const secretKey = process.env.BETTER_AUTH_SECRET;
    if (!secretKey) {
      throw new Error('BETTER_AUTH_SECRET is not configured on the server.');
    }

    const secret = new TextEncoder().encode(secretKey);
    
    // Better auth JWT payload structure includes standard claims
    const { payload } = await jwtVerify(token, secret);

    // Attach decoded user to the request object
    const userPayload: { id: string; email?: string; name?: string } = {
      id: (payload.sub || payload.userId) as string,
    };
    if (payload.email) userPayload.email = payload.email as string;
    if (payload.name) userPayload.name = payload.name as string;

    req.user = userPayload;

    next();
  } catch (error: any) {
    console.error('JWT Verification Error:', error.message);
    res.status(401).json({ success: false, message: 'Invalid or expired token.' });
  }
};

import jwt from "jsonwebtoken";

export const IsAuthorized = (req, res, next) => {
    const cook = req.cookies.jwt;
    if (!cook) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
  
    jwt.verify(cook, 'dont_share_token', (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
      }
     req.user = decoded;
      next();
    });
  };
  
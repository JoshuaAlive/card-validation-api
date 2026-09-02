import { Request, Response, NextFunction } from 'express';

/**
 * Global error handler middleware.
 * Catches malformed JSON and any other unexpected errors.
 * Must be registered AFTER all routes in app.ts.
 */
export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
): Response | void => {
    // Handle malformed JSON body
    if (err instanceof SyntaxError && 'body' in err) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'Invalid JSON format in request body.'
        });
    }

    // Pass any other errors down the chain
    next(err);
};

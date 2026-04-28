import serverless from 'serverless-http';

// Import the configured Express app
import app from '../index.js';

// Export the serverless handler
export const handler = serverless(app, {
  // Add request and response size limits for better compatibility
  request: (request, event, context) => {
    // Add timeout handling for serverless environments
    context.callbackWaitsForEmptyEventLoop = false;
    
    // Add some debugging info for development
    if (process.env.NODE_ENV === 'development') {
      console.log('Netlify function called with:', {
        path: event.path,
        httpMethod: event.httpMethod,
        headers: event.headers
      });
    }
  },
  response: (response, event, context) => {
    // Add CORS headers for all responses
    response.headers = {
      ...response.headers,
      'Access-Control-Allow-Origin': process.env.CORS_ORIGIN || '*',
      'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type,Authorization,X-Requested-With',
      'Access-Control-Allow-Credentials': 'true'
    };
  }
});
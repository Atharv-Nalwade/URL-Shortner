# URL Shortener Project

## Overview

This project is a simple URL shortener service built using Node.js, Express, and MongoDB. The purpose of the application is to take long URLs and provide a shortened version that redirects to the original URL. Additionally, the system offers statistical insights into the usage of the shortened URLs.

## Features

- **Shortening URLs:** Users can input a long URL, and the system generates a unique short URL.
- **Custom Names:** Users can optionally provide custom names for their short URLs.
- **Statistics:** Users can retrieve statistics on the usage of a short URL, including creation time and click count.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Redis (for caching)
- Mongoose (ODM for MongoDB)
- Shortid (for generating short URL IDs)

## Project Structure

- **index.js:** Main file containing the Express server setup and routes.
- **services/url-service.js:** Service layer handling business logic for URL-related operations.
- **repository/url-repository.js:** Repository handling database interactions for URLs, including MongoDB and Redis.
- **models/url.js:** Mongoose schema for the URL model.
- **controllers/url-controller.js:** Controllers handling HTTP requests and responses.

## API Endpoints

- **GET /:code:** Redirects to the original URL associated with the given short code.
- **POST /urlShorten:** Shortens a provided long URL.
  - Request body: `{ "original_url": "https://example.com", "options": "custom_name" }`
- **GET /statistics:** Retrieves statistics for a given short code.
  - Request body: `{ "code": "custom_name" }`

## Usage

1. Shorten a URL: Send a POST request to `/urlShorten` with the original URL and optional custom name.
2. Access the shortened URL: Use the generated short URL to redirect to the original URL.
3. Get statistics: Send a GET request to `/statistics` with the short code to retrieve usage statistics.

## Error Handling

- The system provides appropriate error messages for invalid URLs, custom name conflicts, and other potential issues.

# Future Scope:
- Create a different branch and use atomic-write to handle concurrency (Sequelize handles atomic-write by default).
- Deploy the project.

Additional Future Scope Ideas:
1. URL Expiration: Add the option to set an expiration time for the short URLs, after which they become invalid.
2. User Authentication: Introduce user authentication and user-specific short URL management, enabling users to manage their own created short URLs.
3. URL Preview: Provide a preview feature to show users the original long URL before they are redirected.
4. QR Code Generation: Offer the ability to generate QR codes for the short URLs, making it convenient for users to share the links.
5. API Documentation: Create comprehensive API documentation to allow developers to integrate the URL Shortener service into their own applications.
6. Link Sharing Options: Integrate with popular social media platforms or messaging apps to allow users to directly share short URLs.
7. Security Enhancements: Implement additional security measures, such as rate limiting, to prevent abuse or misuse of the service.
8. Support for Multiple Domains: Allow users to choose from a list of available short domains or use their custom domain for short URLs.

Feel free to contribute to this project by suggesting improvements or working on the future scope features. Happy URL shortening!


Works on future scope will be done soon.

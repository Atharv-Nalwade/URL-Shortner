# URL-Shortener

This is a simple URL shortener that takes a long URL and converts it into a short URL with minimal length. When the short URL is pasted in the browser, it will redirect to the original long URL.

# Acheived
- Implement Redis for caching to reduce response time for frequently queried URLs.
- Custom Short URL's

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

# Fake News Combat Agency — Client - Angular-cli 21.1.3

Front-end application for the **Fake News Combat Agency** platform.
This project provides the user interface for interacting with the platform, including authentication, navigation, informational pages, and social login integration.

The application is built with **Angular** and follows a modular component-based architecture.

---

# Project Structure

Example structure of the Angular application:

```
├── public
└── src
    ├── app
    │   ├── features
    │   │   ├── auth
    │   │   │   ├── privacy-notice
    │   │   │   ├── signin
    │   │   │   ├── signup
    │   │   │   └── terms-conditions
    │   │   ├── home
    │   │   └── user
    │   └── shared
    │       ├── types
    │       └── ui
    │           ├── external-login
    │           ├── footer
    │           └── navbar
    ├── assets
    ├── environments
    └── types
```

---

# Overview

The client application is responsible for:

- Rendering the web interface
- Managing navigation and routing
- Handling user authentication
- Providing informational pages (privacy, terms, etc.)
- Supporting social login providers
- Providing responsive layout including mobile navigation

---

# Tech Stack

- Angular
- TypeScript
- HTML5
- CSS / Responsive Layout
- Angular Router
- Social Authentication Integration
- Google Login

---

# Implemented Features

Based on the project commit history, the following features have been implemented so far.

## Project Initialization

Initial front-end project structure was generated and configured.

Features included:

- Angular project setup
- Base application structure
- Initial routing configuration

---

# Navigation System

The application includes a navigation system designed for both desktop and mobile users.

Features:

- Top navigation bar
- Responsive grid layout
- Mobile menu support
- Navigation refactoring for improved maintainability

Components involved:

- Navbar
- Mobile menu
- Grid layout system

---

# Authentication System

The project includes an authentication structure with support for both traditional and social login.

Implemented features:

- Sign-in component
- Sign-up flow (refactoring prepared)
- Authentication service
- Social login integration
- Google login button
- External authentication support

Authentication elements:

- Auth service
- Login button
- Social authentication providers

---

# Application Routing

The application routing system was expanded to support multiple pages and components.

Implemented routes include:

- Authentication pages
- Informational pages
- Main navigation routes

Routing improvements:

- Router configuration updates
- Router outlet fixes
- Route refactoring

---

# Informational Pages

The platform includes legal and informational pages required for public web applications.

Pages implemented:

- Terms and Conditions
- Privacy Notice
- Informational content sections

---

# UI Improvements

Several commits focused on improving the layout and user experience.

Enhancements include:

- Responsive grid layout
- Content sections
- Application favicon
- Menu improvements

---

# Running the Project

Install dependencies:

```
npm install
```

Run the development server:

```
ng serve
```

Open in browser:

```
http://localhost:4200
```

---

# Roadmap

Planned next steps for the client application may include:

- Integration with the backend API
- JWT authentication flow
- Protected routes
- News verification interface
- User dashboard
- Admin interface
- Form validation improvements
- API service layer

---

# Contribution

This project is part of the **Fake News Combat Agency** platform and is under active development.

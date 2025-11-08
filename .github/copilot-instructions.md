# VGetit Project Copilot Instructions

This document provides essential context for AI agents working with the VGetit codebase.

## Project Architecture

### Frontend (React + Vite)
- **Core Structure**: Single-page application using React Router for navigation
- **State Management**: Context API for auth state (`src/context/AuthContext.jsx`)
- **Key Directories**:
  - `src/components/`: Reusable UI components
  - `src/pages/`: Page-level components
  - `src/api/`: API configuration and service layers
  - `src/context/`: Global state management
  - `src/styles/`: CSS and styling files

### Backend (Django)
- REST API with JWT authentication
- Nested routing for company-related endpoints
- Celery integration for background tasks

## Key Patterns and Conventions

### Component Structure
```jsx
// src/components/ExampleComponent.jsx
import React from 'react';

function ExampleComponent({ prop1, prop2 }) {
  return (
    // JSX content
  );
}

export default ExampleComponent;
```

### API Integration
- Base configuration in `src/api/axiosConfig.jsx`
- JWT tokens stored in localStorage
- Automatic token injection via axios interceptors

### Authentication Flow
- JWT-based auth using `AuthContext` provider
- Protected routes handled through context consumer components
- Login/signup flows in `AuthPage.jsx`

## Development Workflow

### Local Development
1. Start Django API: `python manage.py runserver`
2. Start React dev server: `npm run dev`
3. Celery worker: `celery -A vgetit worker`

### Environment Setup
- Frontend requires `.env` with API endpoints
- Backend needs `django-api/.env` with Django/JWT settings

## Core Features
1. Company Search: `HeroSection.jsx` → Django API endpoint
2. Company Profiles: Dynamic routing with nested resources
3. User Authentication: JWT-based with refresh tokens
4. Web Scraping: Celery background tasks for data collection

## Integration Points
- Frontend → Backend: RESTful API calls using axios
- Backend → External: Web scraping via Celery tasks
- Authentication: JWT token exchange through `/api/token/`

## Common Patterns
- Use absolute imports for project files
- Component-specific styles in respective folders
- API error handling via axios interceptors
- Consistent use of functional components with hooks
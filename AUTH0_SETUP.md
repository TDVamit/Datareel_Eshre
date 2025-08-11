# Auth0 Integration Setup

This document explains how Auth0 authentication has been integrated into the Datareel application.

## Overview

The application now uses Auth0 for user authentication, providing secure login, signup, logout, and profile management functionality.

## Configuration

### Auth0 Provider Setup

The Auth0 provider is configured in `src/app/layout.tsx`:

```typescript
<Auth0Provider
  domain="fyndev.us.auth0.com"
  clientId="urzIOCqeeuEqRn1gwvPoMAOwICVdxVOR"
  authorizationParams={{
    redirect_uri: typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000',
    audience: "https://fyndev.us.auth0.com/api/v2/",
    scope: "openid profile email"
  }}
>
```

### Credentials Used

- **Domain**: `fyndev.us.auth0.com`
- **Client ID**: `urzIOCqeeuEqRn1gwvPoMAOwICVdxVOR`

## Components and Features

### 1. Custom Hook (`src/hooks/useAuth.ts`)

A custom hook that wraps Auth0 functionality and provides a cleaner API:

```typescript
const { user, isAuthenticated, isLoading, login, logout, getToken, getClaims } = useAuth();
```

**Features:**
- User authentication state
- Login/logout functions
- Token and claims retrieval
- Loading states

### 2. Header Component (`src/components/Header.tsx`)

Updated to show authentication status and user menu:

**Features:**
- Shows "Sign In" button for unauthenticated users
- Shows user profile picture/name for authenticated users
- Dropdown menu with Profile and Sign Out options
- Loading state while checking authentication

### 3. Protected Route Component (`src/components/ProtectedRoute.tsx`)

A wrapper component for pages that require authentication:

```typescript
<ProtectedRoute>
  <YourProtectedComponent />
</ProtectedRoute>
```

**Features:**
- Automatically redirects unauthenticated users to home page
- Shows loading state while checking authentication
- Provides fallback UI option

### 4. Account Page (`src/app/account/page.tsx`)

A comprehensive user profile page:

**Features:**
- User profile information display
- Account statistics
- Quick actions (Settings, Edit Profile, Sign Out)
- Account information (User ID, Provider, Email verification)
- Recent activity timeline

### 5. Sign In Page (`src/app/signin/page.tsx`)

A dedicated sign-in page:

**Features:**
- Auth0 login button
- Email/password form (redirects to Auth0)
- Remember me functionality
- Forgot password link
- Terms and privacy policy links

## How It Works

### Authentication Flow

1. **User clicks "Sign In"** → Redirects to Auth0 login page
2. **User authenticates** → Auth0 handles the authentication
3. **User is redirected back** → Application receives user data
4. **User state is updated** → Header shows user information
5. **User can access protected pages** → Account page, etc.

### User State Management

- User information is automatically available throughout the app
- Authentication state is managed by Auth0
- No need for manual token storage or management
- Automatic token refresh handled by Auth0

### Protected Routes

Pages that require authentication can be wrapped with the `ProtectedRoute` component:

```typescript
import ProtectedRoute from '@/components/ProtectedRoute';

export default function MyProtectedPage() {
  return (
    <ProtectedRoute>
      <div>This content is only visible to authenticated users</div>
    </ProtectedRoute>
  );
}
```

## Usage Examples

### Checking Authentication Status

```typescript
import { useAuth } from '@/hooks/useAuth';

function MyComponent() {
  const { isAuthenticated, user, isLoading } = useAuth();
  
  if (isLoading) return <div>Loading...</div>;
  
  if (isAuthenticated) {
    return <div>Welcome, {user?.name}!</div>;
  }
  
  return <div>Please sign in</div>;
}
```

### Login/Logout

```typescript
import { useAuth } from '@/hooks/useAuth';

function AuthButtons() {
  const { login, logout, isAuthenticated } = useAuth();
  
  if (isAuthenticated) {
    return <button onClick={logout}>Sign Out</button>;
  }
  
  return <button onClick={login}>Sign In</button>;
}
```

### Getting User Information

```typescript
import { useAuth } from '@/hooks/useAuth';

function UserProfile() {
  const { user } = useAuth();
  
  return (
    <div>
      <h1>{user?.name}</h1>
      <p>{user?.email}</p>
      <img src={user?.picture} alt="Profile" />
    </div>
  );
}
```

## Security Features

1. **Automatic Token Management**: Auth0 handles token storage and refresh
2. **Secure Redirects**: All redirects are validated by Auth0
3. **CSRF Protection**: Built-in protection against cross-site request forgery
4. **Session Management**: Secure session handling
5. **Email Verification**: Support for email verification workflows

## Customization

### Adding More User Information

You can extend the user profile by adding custom claims in your Auth0 dashboard and accessing them in the user object.

### Styling

All components use Tailwind CSS and can be easily customized by modifying the className props.

### Additional Auth0 Features

You can enable additional Auth0 features like:
- Multi-factor authentication
- Social login providers
- Enterprise SSO
- Custom domains

## Troubleshooting

### Common Issues

1. **Redirect URI Mismatch**: Ensure the redirect URI in Auth0 dashboard matches your application URL
2. **CORS Issues**: Make sure your Auth0 domain is properly configured
3. **Token Issues**: Check that the audience and scope are correctly configured

### Debug Mode

You can enable Auth0 debug mode by adding this to your Auth0Provider:

```typescript
<Auth0Provider
  // ... other props
  cacheLocation="localstorage"
  useRefreshTokens={true}
>
```

## Files Modified/Created

1. `src/app/layout.tsx` - Added Auth0Provider
2. `src/components/Header.tsx` - Updated with Auth0 integration
3. `src/components/ProtectedRoute.tsx` - New component for route protection
4. `src/app/account/page.tsx` - New user profile page
5. `src/app/signin/page.tsx` - Updated sign-in page
6. `src/hooks/useAuth.ts` - New custom hook for Auth0
7. `AUTH0_SETUP.md` - This documentation file

## Next Steps

1. Configure additional Auth0 features as needed
2. Add role-based access control
3. Implement user preferences and settings
4. Add user activity tracking
5. Set up email notifications for user events 
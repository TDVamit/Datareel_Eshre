"use client";

import { Auth0Provider } from '@auth0/auth0-react';
import { ReactNode } from 'react';

interface Auth0ProviderWrapperProps {
  children: ReactNode;
}

export default function Auth0ProviderWrapper({ children }: Auth0ProviderWrapperProps) {
  const redirectUri = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3001';
  
  // Common Auth0 organization ID patterns - these must be actual org IDs from Auth0
  const possibleOrgIds = [
    "org_2nh7u8k9Ub4PQKX5", // Example Auth0 org ID format
    "org_qa_fyndev_123",     // Pattern with numbers
    "org_fyndev_qa",         // Different pattern
    // Add more as needed - these need to be actual org IDs from your Auth0 dashboard
  ];
  
  // Use the tenant domain as organization ID as requested
  const organizationId = process.env.NEXT_PUBLIC_AUTH0_ORGANIZATION || "qa.fyndev.com";
  
  console.log('Auth0 Configuration:', {
    domain: "fyndev.us.auth0.com",
    clientId: "urzIOCqeeuEqRn1gwvPoMAOwICVdxVOR",
    redirectUri,
    organizationId,
    tenant: "qa.fyndev.com",
    advisor: "peterparker123@yopmail.com",
    possibleOrgIds
  });

  // Create auth params - conditionally include organization
  const authParams: any = {
    redirect_uri: redirectUri,
    audience: "https://fyndev.us.auth0.com/api/v2/",
    scope: "openid profile email"
  };

  // Add organization parameter (required for this Auth0 client)
  if (organizationId) {
    authParams.organization = organizationId;
    console.log('Using organization ID:', organizationId);
  } else {
    console.error('No organization ID provided - Auth0 login will fail');
  }

  return (
    <Auth0Provider
      domain="fyndev.us.auth0.com"
      clientId="urzIOCqeeuEqRn1gwvPoMAOwICVdxVOR"
      authorizationParams={authParams}
      cacheLocation="localstorage"
      useRefreshTokens={true}
      onRedirectCallback={(appState) => {
        console.log('Auth0 redirect callback:', appState);
        // Navigate to the intended page or default
        window.location.replace(appState?.returnTo || window.location.pathname);
      }}
    >
      {children}
    </Auth0Provider>
  );
}
---
title: Modernizing Keycloak - Building Custom Themes with React, Tailwind v4, and Shadcn UI
slug: modern-keycloak-react-theme
description: A production-ready Keycloak login theme starter kit with npm package support, built using React, Keycloakify, and Shadcn UI.
date: 2025-12-21
tags: ["Keycloak", "React", "TailwindCSS", "Authentication", "Open Source"]
# coverImage: https://raw.githubusercontent.com/Oussemasahbeni/keycloak-react-theme-keycloakify/main/src/login/assets/img/auth-logo.svg
---

If you have ever worked with [Keycloak](https://www.keycloak.org/), you know that it is an incredibly powerful Identity and Access Management solution. However, you likely also know the pain of trying to customize its default look and feel.

Traditionally, theming Keycloak meant wrestling with **FreeMarker templates**, writing raw CSS, and rebuilding JAR files just to see a color change. It was a slow, developer-hostile process.

Enter **[Keycloakify](https://www.keycloakify.dev/)** and the **Keycloakify Shadcn Starter** — now available as an npm package for instant setup.

In this post, I want to share a modern, production-ready starter kit I built to make Keycloak customization not just bearable, but actually enjoyable. The best part? You can now install it directly from npm and have a fully functional theme running in minutes.

**📦 npm package:** `@oussemasahbeni/keycloakify-login-shadcn`

## The Tech Stack

This project allows you to build Keycloak themes using the modern frontend stack you already know and love:

- **React** (Type-Safe)
- **Vite** (for lightning-fast HMR)
- **Tailwind CSS v4** (Utility-first styling)
- **shadcn/ui** (Accessible, copy-paste components)
- **Keycloakify v11** (The bridge between React and Keycloak)

## Why use this starter?

While Keycloakify does the heavy lifting of compiling React to Keycloak themes, setting up a production-ready project still takes time. This starter comes pre-configured with everything you need for a professional identity provider, and now it's available as an npm package for instant setup.

### Key Features

**Modern UI** - Beautiful, responsive design using Tailwind CSS v4 and shadcn/ui components that look great out of the box.

**Dark Mode** - Built-in dark/light/system theme toggle with persistent preferences across sessions.

**Multi-language Support** - i18n ready with English, French, and Arabic (RTL supported) translations. Adding a new language is as simple as adding a key to the configuration:

```typescript
// src/login/i18n.ts
.withCustomTranslations({
    en: {
        welcomeMessage: "Welcome to Your App",
        loginAccountTitle: "Login to your account",
    },
    fr: {
        welcomeMessage: "Bienvenue sur votre application",
        loginAccountTitle: "Connectez-vous à votre compte",
    },
    ar: { /* Arabic translations with RTL support */ }
})
```

**Custom Email Templates** - One of the most neglected parts of IAM is email. This project integrates **jsx-email**, allowing you to build transactional emails (Password Reset, Email Verification, Login Errors) using React components. Preview them locally before deploying:

```bash
pnpm emails:preview
```

**Complete Login Flow** - All 35+ Keycloak login pages are fully customized, including Login, Register, OTP, WebAuthn (Passkeys), Terms & Conditions, Update Profile, and more.

**social Login Providers** - Pre-styled icons for 16+ OAuth providers including Google, GitHub, Microsoft, and more.

**Storybook Integration** - Visual testing and documentation for all components to streamline development.

**Vite Powered** - Lightning-fast development with HMR and optimized production builds.

**Type-Safe** - Full TypeScript support throughout the codebase for better developer experience.

## Screenshots

Here is a preview of the custom login screen:

![Modern Keycloak Login Screen](/images/blog/keycloak-theme/login-preview.png)

![Modern Keycloak Register Screen](/images/blog/keycloak-theme/register-preview.png)

## Developer Experience (DX)

The biggest advantage of this setup is the development loop. You can run the theme locally and see changes instantly without running a heavy Keycloak Docker container during UI development.

```bash
# Start development server with hot reload
pnpm dev

# Run Storybook for component isolation and testing
pnpm storybook

# Preview email templates locally
pnpm emails:preview

# Build the Keycloak theme JAR
pnpm build-keycloak-theme
```

## How to use it

There are two ways to get started: using the npm package (recommended) or cloning the repository for deeper customization.

### Quick Start with npm Package

The fastest way to get started is using the published npm package:

1. **Create a new Vite + React + TypeScript project:**

   ```bash
   pnpm create vite
   # Choose React and TypeScript when prompted
   cd your-project-name
   ```

2. **Install the theme package:**

   ```bash
   pnpm add keycloakify @oussemasahbeni/keycloakify-login-shadcn
   pnpm install
   ```

3. **Initialize Keycloakify:**

   ```bash
   npx keycloakify init
   # Select login theme and install stories when prompted
   ```

4. **Configure Vite** (update `vite.config.ts`):

   ```typescript
   import react from "@vitejs/plugin-react";
   import { keycloakify } from "keycloakify/vite-plugin";
   import { defineConfig } from "vite";
   import path from "node:path";
   import tailwindcss from "@tailwindcss/vite";

   export default defineConfig({
     plugins: [react(), tailwindcss(), keycloakify({ accountThemeImplementation: "none" })],
     resolve: {
       alias: { "@": path.resolve(__dirname, "./src") },
     },
   });
   ```

5. **Build the theme:**

   ```bash
   pnpm build-keycloak-theme
   ```

   This generates a standard `.jar` file that you can deploy to any Keycloak instance.

### Clone for Deep Customization

If you want full control and plan to customize extensively:

```bash
git clone https://github.com/Oussemasahbeni/keycloakify-shadcn-starter.git
cd keycloakify-shadcn-starter
pnpm install
```

Then customize your logo in `src/login/assets`, adjust colors in `src/login/index.css`, and modify components as needed.

## Conclusion

Identity screens are the front door to your application. They shouldn't look like they were built in 2010. By leveraging React and Keycloakify, we can bring the full power of the modern frontend ecosystem to Keycloak.

With the npm package now available, getting started has never been easier. Install it, customize it, and deploy professional-looking authentication screens in minutes.

Check out the repository, give it a star, and feel free to contribute!

**[View on GitHub](https://github.com/Oussemasahbeni/keycloakify-shadcn-starter)**  
**[npm Package](https://www.npmjs.com/package/@oussemasahbeni/keycloakify-login-shadcn)**

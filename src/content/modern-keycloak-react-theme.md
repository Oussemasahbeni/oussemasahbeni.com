---
title: Modernizing Keycloak - Building Custom Themes with React, Tailwind v4, and Shadcn UI
slug: modern-keycloak-react-theme
description: A deep dive into a new boilerplate for building beautiful, type-safe Keycloak themes using React, Keycloakify, and Shadcn UI.
date: 2025-12-12
tags: ["Keycloak", "React", "TailwindCSS", "Authentication", "Open Source"]
# coverImage: https://raw.githubusercontent.com/Oussemasahbeni/keycloak-react-theme-keycloakify/main/src/login/assets/img/auth-logo.svg
---

If you have ever worked with [Keycloak](https://www.keycloak.org/), you know that it is an incredibly powerful Identity and Access Management solution. However, you likely also know the pain of trying to customize its default look and feel.

Traditionally, theming Keycloak meant wrestling with **FreeMarker templates**, writing raw CSS, and rebuilding JAR files just to see a color change. It was a slow, developer-hostile process.

Enter **[Keycloakify](https://www.keycloakify.dev/)** and the new **Keycloak React Theme** starter kit.

In this post, I want to share a modern, open-source boilerplate I built to make Keycloak customization not just bearable, but actually enjoyable.

**[🔗 Preview the theme in action](https://oussemasahbeni.github.io/keycloak-react-theme-keycloakify/)**

## The Tech Stack

This project allows you to build Keycloak themes using the modern frontend stack you already know and love:

- **React** (Type-Safe)
- **Vite** (for lightning-fast HMR)
- **Tailwind CSS v4** (Utility-first styling)
- **shadcn/ui** (Accessible, copy-paste components)
- **Keycloakify v11** (The bridge between React and Keycloak)

## Why use this starter?

While Keycloakify does the heavy lifting of compiling React to Keycloak themes, setting up a production-ready project still takes time. This repository comes pre-configured with everything you need for a professional identity provider.

### 1. Complete Page Coverage

Most tutorials only show you how to style the Login page. This theme includes custom implementations for **all 35+ Keycloak login pages**, including:

- Login, Register, and Forgot Password
- OTP and WebAuthn (Passkeys)
- Terms & Conditions
- Update Profile and more...

### 2. Built-in Dark Mode

Using `shadcn/ui` and Tailwind, the theme includes a robust dark/light mode toggle that persists user preferences.

### 3. Internationalization (i18n)

Keycloak is often used in global enterprise environments. This theme supports English, French, and Arabic (with RTL support) out of the box. Adding a new language is as simple as adding a key to the configuration:

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
})
```

### 4. Custom Email Templates

One of the most neglected parts of IAM is email. Keycloak's default emails look outdated.

This project integrates **jsx-email**, allowing you to build transactional emails (Password Reset, Email Verification) using React components. You can preview them locally before deploying:

```bash
pnpm emails:preview
```

## Screenshots

Here is a preview of the custom login screen:

![Modern Keycloak Login Screen](/images/blog/keycloak-theme/login-preview.png)

![Modern Keycloak Register Screen](/images/blog/keycloak-theme/register-preview.png)

## Developer Experience (DX)

The biggest advantage of this setup is the loop. You can run the theme locally and see changes instantly without running a heavy Keycloak Docker container during UI development.

```bash
# Start development server with hot reload
pnpm dev

# Run Storybook for component isolation
pnpm storybook
```

## How to use it

Getting started is straightforward. You will need Node.js and Maven (for the final build step).

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Oussemasahbeni/keycloak-react-theme-keycloakify.git
   cd keycloak-react-theme-keycloakify
   ```

2. **Install dependencies:**

   ```bash
   pnpm install
   ```

3. **Customize:**
   Change your logo in `src/login/assets` and adjust your colors in `src/login/index.css`.

4. **Build:**

   ```bash
   pnpm build-keycloak-theme
   ```

   This generates a standard `.jar` file that you can drop into any Keycloak instance.

## Conclusion

Identity screens are the front door to your application. They shouldn't look like they were built in 2010. By leveraging React and Keycloakify, we can bring the full power of the modern frontend ecosystem to Keycloak.

Check out the repository, give it a star, and feel free to contribute!

**[View on GitHub](https://github.com/Oussemasahbeni/keycloak-react-theme-keycloakify)**

# My Recipe App

> A simple Angular recipe-book application with SSR/prerender support and Firebase hosting.

Live demo: https://my-recipe-book-c9769.firebaseapp.com/

## Overview

This repository contains an Angular application ("My Recipe App") that demonstrates recipe and shopping-list management with authentication, server-side rendering/prerendering, and Firebase hosting.

## Tech Stack

- Angular (including Angular Signals)
- TypeScript
- NgRx (state management patterns)
- Firebase (used as the real-time backend and hosting)

## Features

- Create, edit and view recipes
- Shopping list management
- Authentication (guards/interceptors/services present in the `src/app/auth` folder)
- Server-side rendering / prerender support (see `server.ts` and `src/main.server.ts`)
- Developed with advanced Angular Signals and NgRx state-management patterns, and integrated with Firebase for real-time data handling.

## Getting Started

Prerequisites:

- Node.js (14+ recommended)
- npm (comes with Node)
- Firebase CLI (optional, for deployment)

Installation:

```powershell
npm install
```

Development server:

```powershell
npm run start
# or if package.json uses "start": "ng serve"
# You can also run: npx ng serve --configuration=development
```

Running tests:

```powershell
npm run test
```

Build for production:

```powershell
npm run build
# or with Angular CLI directly:
# npx ng build --configuration=production
```

Server-side Rendering / Prerender (notes):

- This project includes `server.ts` and `src/main.server.ts` and is configured for SSR/prerendering in `angular.json`.
- Typical SSR build and run steps (may vary depending on `package.json` scripts):

```powershell
# Build the server bundle and browser bundles (example using ng commands):
npx ng run my-recipe-app:server:production; npx ng run my-recipe-app:build:production
# Then run the compiled server bundle (adjust path if different):
node dist/my-recipe-app/server/main.js
```

## Deployment (Firebase Hosting)

This app is deployed at:

```
https://my-recipe-book-c9769.firebaseapp.com/
```

To deploy to Firebase Hosting from this repo:

```powershell
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy --only hosting
```

Notes:

- Ensure `firebase.json` and your build output (`dist/` folder) are correctly configured before deploying.
- If your project uses a specific `public`/`hosting` folder or rewrite rules, confirm them in `firebase.json`.

## Project Structure (high level)

- `src/` — main Angular source
- `src/app/` — app modules, components and services (see `auth/`, `recipes/`, `shopping-list/`)
- `server.ts`, `src/main.server.ts` — server entrypoints for SSR/prerender
- `angular.json` — Angular project configuration
- `firebase.json` — Firebase hosting configuration

## Contributing

Feel free to open issues or pull requests. Follow the existing code style and update tests where appropriate.

## License

This project does not include a license file. If you want to apply one, consider adding a `LICENSE` (for example MIT).

---

If you'd like, I can also:

- Add a `LICENSE` file (MIT) and commit it.
- Add or adapt exact `npm` script commands in `package.json` to match the README examples.
# MyRecipeApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.2.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).



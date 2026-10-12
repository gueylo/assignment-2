My name is KAWAYA GUEYLORD.

# KGPortfolio

An offline-first personal portfolio Android application for SWE 3409 Individual Assignment 2, built with React Native, Expo, and TypeScript.

> Submission blocker: replace the remaining personal-content `TODO` values in `src/portfolioData.ts`. Personal facts were deliberately not invented.

## Features

- Home, Skills, Projects, Profile, and About tabs
- Typed Projects → Project Details navigation
- Add, edit, validate, and delete projects with offline persistence
- Validated profile editor with camera and gallery image selection
- Local persistence with AsyncStorage and a restore-defaults action
- Local portfolio content that remains available offline
- Responsive scrollable screens and accessible touch targets

## Run and check

```bash
npm install
npm start
npm run typecheck
npx expo-doctor
```

## Build an APK

After replacing the remaining personal-content TODO values and signing into Expo:

```bash
npx eas-cli build --platform android --profile preview
```

The preview profile in `eas.json` is configured to produce an installable APK.

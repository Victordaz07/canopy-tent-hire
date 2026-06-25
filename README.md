# Canopy Tent Hire — Tent & Marquee Booking Platform

Bilingual (English / Tongan) booking site for a Tongatapu tent and marquee
rental business. React 19 + Vite + TypeScript + Tailwind CSS, with Firebase
(Firestore + Auth) for data and admin login.

> **Photos:** no real product photography is available yet. The tent grid and
> hero use illustrated/vector placeholders with a localized "Photo coming
> soon" message instead of stock or broken images — swap in real photos by
> filling in `imageUrls` on each tent document once they exist.

> **Tongan translation note:** the strings in `src/locales/to.json` are a
> best-effort draft, not reviewed by a native speaker. Have a fluent Tongan
> speaker proofread `to.json` before this goes live for real customers.

## Status

Implemented: project scaffold, light "Canopy" design system, i18n (EN/TO
toggle persisted to `localStorage`), public shell (Navbar/Footer/bunting
divider), Hero, Tents grid (sizes/prices), full booking flow (date, tent
size, delivery or pickup), reviews (public grid + submission form,
moderation queue), Firestore security rules, and an admin panel (`/admin`)
with booking management, review moderation, and tents CRUD.

Not yet built: a real Firebase project for this business (see [Manual setup
remaining](#manual-setup-remaining)), an admin Auth account, and a final
content/polish pass once real client info (business name, tent inventory,
pricing, delivery area) is available.

`tents` currently has no seed data — it needs to be populated in the
Firebase console once the project exists, so the grid renders populated
tent sizes/prices.

## Manual setup remaining

These steps require Firebase Console access and can't be done from this
environment:

1. **Create the Firebase project.** `.firebaserc` currently points at a
   placeholder project id (`canopy-tent-hire`) — create a real Firebase
   project (Firestore + Authentication enabled) and update `.firebaserc` and
   the `--project` flag in `.github/workflows/firebase-deploy.yml` if the
   real project id differs.
2. **Create the admin account.** Firebase Console → Authentication → Sign-in
   method → enable **Email/Password** → Users → Add user. The security
   rules treat *any* authenticated user as admin (single-account model, no
   public signup) — log into `/admin/login` with that email/password once
   created.
3. **(Later) Enable Cloud Storage** when the business upgrades off the
   Spark plan, to support real review photo uploads — see below.

## Setup

```bash
npm install
cp .env.example .env   # fill in Firebase web app config
npm run dev
```

### Environment variables

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

These come from the Firebase console (Project Settings → General → Your apps).
`.env` is gitignored — never commit it.

## Scripts

- `npm run dev` — local dev server
- `npm run build` — type-check (`tsc -b`) and production build
- `npm run lint` — ESLint
- `npm run preview` — preview the production build locally

## Deploying

Deploys to Firebase Hosting happen automatically via GitHub Actions
(`.github/workflows/firebase-deploy.yml`) on every push to
`claude/seguimos-r09cuu`. The workflow builds the app and runs
`firebase deploy --only hosting,firestore:rules` using a service account
key stored in the repo secret `FIREBASE_SERVICE_ACCOUNT`.

To set up or rotate that secret: GitHub repo → Settings → Secrets and
variables → Actions → New repository secret → name `FIREBASE_SERVICE_ACCOUNT`,
value = the full contents of a service account JSON key (Editor role, or at
least `Firebase Hosting Admin` + `Firebase Rules Admin`) for the
`canopy-tent-hire` GCP project once it exists.

Manual/local deploy is still possible:

```bash
npm run build
firebase deploy --only hosting,firestore:rules --project canopy-tent-hire
```

Requires `firebase login` or `GOOGLE_APPLICATION_CREDENTIALS` pointing at a
service account key with the roles above.

## Data model (Firestore)

- **tents**: `{ id, nameEn, nameTo, descriptionEn, descriptionTo, size, price, imageUrls: string[], active: boolean }`
- **bookings**: `{ id, clientName, phone, tentId, date (YYYY-MM-DD), deliveryMethod: 'delivery'|'pickup', address, status: 'pending'|'confirmed'|'cancelled'|'completed', createdAt }`
- **reviews**: `{ id, clientName, rating (1-5), comment, photoUrls: string[], approved: boolean, createdAt }`

## Security model

`firestore.rules`: public can read `tents` and create `bookings` (must start
`status: 'pending'`) and `reviews` (must start `approved: false`). Any
authenticated user can read/write everything — there's a single admin
account, no public signup or per-user roles.

## Enabling Storage later

The project runs on the Firebase **Spark** (free) plan, which does not
include Cloud Storage. Photo uploads on reviews are built behind a single
abstraction so enabling Storage later is a one-function change:

- `src/lib/uploadReviewPhotos.ts` exports `uploadReviewPhotos(files: File[]): Promise<string[]>`.
- Every caller (`ReviewForm`, `ReviewCard`) only ever calls this function and
  renders whatever strings come back — they don't know or care whether those
  are Storage URLs or something else.
- **Now:** stub that returns `[]` (no photos), so the photo input is shown as
  disabled with a "coming soon" message (`PhotoUpload.tsx`).
- **Once the business upgrades to Blaze:** swap the function body to upload
  to Firebase Storage and return real download URLs. No other code needs to
  change.

## Design system

A light, warm "Canopy" theme — see `tailwind.config.js` for the full token
set (colors, fonts). Never hardcode hex values in components; extend the
theme instead. The `BuntingDivider` component
(`src/components/layout/BuntingDivider.tsx`) is the one exception, since CSS
gradients/shapes can't reference Tailwind theme tokens directly — its colors
must be kept in sync with the theme config by hand.

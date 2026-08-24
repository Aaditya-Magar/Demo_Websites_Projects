# Portfolio Website Collection

A monorepo containing 13 polished demonstration websites for businesses, services, retail,
hospitality, education, travel, and personal productivity. Each project is an independent
application that can be developed, built, customized, and deployed separately.

These projects were created to demonstrate frontend engineering, responsive design, reusable
component architecture, animation, accessibility, and deployment practices. They are demo
websites rather than operating businesses, and their sample names, contact details, prices,
testimonials, appointments, reservations, and products are fictional.

## Website catalogue

| Website | Original project | Purpose | Workspace | Live demo |
| --- | --- | --- | --- | --- |
| Luxury Salon | Aura Luxe Showcase | Premium hair, skin, and beauty services showcase | `@portfolio-websites/luxury-store` | [View demo](https://auraluxeshowcase.vercel.app/) |
| Cafe | Brew Haven Cafe | Cafe menu, story, location, and customer experience | `@portfolio-websites/cafe` | [View demo](https://brewheavencafe.vercel.app/) |
| Video Editing Studio | Cut Craft Hub | Video-editing services, pricing, portfolio, and enquiries | `@portfolio-websites/barber-shop` | [View demo](https://cutcrafthub.vercel.app/) |
| Dental Clinic | Dantam Dental Clinic | Dental services and clinic information | `@portfolio-websites/dental-clinic` | [View demo](https://dantamdentalclinic.vercel.app/) |
| Skin Clinic | Derma Glow Clinic | Dermatology treatments, specialists, and consultation content | `@portfolio-websites/skin-clinic` | [View demo](https://dermaglowclinic.vercel.app/) |
| Academy | Excel Edge Academy | Courses, learning outcomes, and academy information | `@portfolio-websites/academy` | [View demo](https://exceledgeacademy.vercel.app/) |
| Gym | Iron Peak Circle | Fitness programs, memberships, trainers, and facilities | `@portfolio-websites/gym` | [View demo](https://ironpeakcircle.vercel.app/) |
| Restaurant | Royal Spice House | Restaurant menu, dining experience, and reservation presentation | `@portfolio-websites/restaurant` | [View demo](https://royalspicehouse.vercel.app/) |
| Hotel | Seagrove Unveiled | Rooms, amenities, destination content, and booking presentation | `@portfolio-websites/hotel` | [View demo](https://seagroveunveiled.vercel.app/) |
| Habit Tracker | SimpleHabits | Habit tracking and journaling for web and desktop | `@portfolio-websites/habit-tracker` | [View demo](https://simplehabitstracker.vercel.app/) |
| Modern Dental Clinic | Smile Craft Dental | Modern dental care, treatments, and appointment presentation | `@portfolio-websites/modern-dental-clinic` | [View demo](https://smilecraftdentel.vercel.app/) |
| Fashion | Vela Wearable Art | Fashion collection and wearable-art storefront | `@portfolio-websites/fashion` | [View demo](https://velawearableart.vercel.app/) |
| Travel | Wander Nest | Destinations, travel inspiration, and trip-planning presentation | `@portfolio-websites/travel` | [View demo](https://wandernesttravel.vercel.app/) |

## Repository structure

```text
.
├── .github/
│   └── workflows/
│       └── ci.yml
├── websites/
│   ├── academy/
│   ├── barber-shop/
│   ├── cafe/
│   ├── dental-clinic/
│   ├── fashion/
│   ├── gym/
│   ├── habit-tracker/
│   ├── hotel/
│   ├── luxury-store/
│   ├── modern-dental-clinic/
│   ├── restaurant/
│   ├── skin-clinic/
│   └── travel/
├── .editorconfig
├── .gitignore
├── .nvmrc
├── .prettierignore
├── .prettierrc
├── LICENSE
├── package-lock.json
├── package.json
└── README.md
```

The root is an npm workspace. Every directory under `websites/` remains an independent
application with its own source code, dependencies, scripts, assets, and deployment
configuration. Shared repository policy lives at the root.

## Technology

The collection primarily uses:

- React and TypeScript
- Vite
- TanStack Router and TanStack Start in applicable projects
- Tailwind CSS
- Radix UI and shadcn/ui-style components
- Vitest in projects with automated tests
- Electron for the optional SimpleHabits desktop build
- Vercel and Cloudflare configuration where applicable

Individual projects intentionally use the React, Tailwind, and framework versions appropriate
to their existing implementation. The monorepo does not force them onto one runtime stack.

## Requirements

- Node.js 22.13 or newer
- npm 10 or newer
- Git

Check your environment:

```bash
node --version
npm --version
git --version
```

## Installation

Clone the monorepo and install every workspace with one command:

```bash
git clone https://github.com/Aaditya-Magar/Demo_Websites_Projects.git
cd Demo_Website_Projects
npm install
```

The root `package-lock.json` records the complete dependency graph for reproducible installs.
Use `npm ci` instead of `npm install` in CI or when you want a clean, lockfile-exact install.

## Development

Start one website by selecting its workspace:

```bash
npm run dev --workspace @portfolio-websites/gym
```

Replace `gym` with any workspace name from the catalogue:

```bash
npm run dev --workspace @portfolio-websites/hotel
npm run dev --workspace @portfolio-websites/cafe
npm run dev --workspace @portfolio-websites/travel
```

The terminal prints the local URL after the development server starts. Ports may differ when
multiple websites run at the same time.

You can also work directly inside one website:

```bash
cd websites/restaurant
npm run dev
```

## Root commands

| Command | Purpose |
| --- | --- |
| `npm install` | Install dependencies for the root and all workspaces |
| `npm run build` | Build every website |
| `npm test` | Run tests in every workspace that provides a test script |
| `npm run lint` | Run each workspace's existing lint script |
| `npm run format` | Run formatting in workspaces that provide a format script |

Run a command for one project by adding `--workspace`:

```bash
npm run build --workspace @portfolio-websites/luxury-store
npm run lint --workspace @portfolio-websites/skin-clinic
npm test --workspace @portfolio-websites/fashion
```

## Production builds

Build everything:

```bash
npm run build
```

Build one website:

```bash
npm run build --workspace @portfolio-websites/dental-clinic
```

Generated output remains inside the selected website and is ignored by Git. Depending on the
framework, output is written to `dist/` or `.output/`.

## Deployment

Each website is deployable independently. When importing the monorepo into a hosting provider,
set the project's root directory to the corresponding folder under `websites/`.

Example Vercel settings for the gym:

```text
Root Directory: websites/gym
Install Command: npm install
Build Command: npm run build
```

Most projects include a website-specific `vercel.json`; some also include Cloudflare Wrangler
configuration. Keep deployment settings inside the website because routes and output directories
differ between static Vite applications and TanStack Start applications.

Do not deploy the monorepo root as one website. Create one hosting project per website.

## Using a website as a template

You may use these projects as starting points for personal, client, educational, or commercial
websites under the terms of the MIT License.

Recommended workflow:

1. Copy the desired directory from `websites/` into a new project.
2. Keep its `package.json`, source, public assets, and framework configuration together.
3. Rename the package and update the website title, metadata, branding, text, and contact details.
4. Replace all demonstration images and review their licenses.
5. Replace fictional services, products, prices, testimonials, and business information.
6. Review forms and connect them to your own secure backend or form provider.
7. Run the build, tests, responsive checks, and accessibility checks.
8. Configure a deployment project using that website directory as its root.

If extracting a website from this monorepo, generate a standalone lockfile after copying it:

```bash
cd your-copied-website
npm install
```

## Customization checklist

Before publishing a customized template:

- Replace the brand name, logo, favicon, colors, typography, and social links.
- Update the document title, description, Open Graph metadata, and canonical URL.
- Replace placeholder telephone numbers, email addresses, maps, opening hours, and addresses.
- Replace sample products, services, team members, pricing, testimonials, and legal text.
- Confirm every navigation link, button, form, and responsive menu works.
- Compress images and provide meaningful alternative text.
- Test keyboard navigation, focus states, contrast, zoom, and reduced-motion behavior.
- Test common mobile, tablet, laptop, and wide-screen sizes.
- Review Content Security Policy and hosting headers after adding third-party services.
- Never commit API keys, tokens, credentials, customer data, or production `.env` files.

## Environment and security

The current demos do not require private production credentials. Development-mode checks use
framework-provided environment flags. The root `.gitignore` excludes local environment files,
deployment metadata, generated output, and dependencies.

If a customized website needs configuration:

1. Store secrets in the hosting provider's environment settings.
2. Commit only a documented `.env.example` containing placeholder values.
3. Expose only variables intentionally designed for browser use.
4. Validate untrusted input on the server, not only in the browser.
5. Keep security headers aligned with any external images, fonts, analytics, or APIs you add.

## Dependency management

Install dependencies from the monorepo root:

```bash
npm install
```

Add a dependency to one website:

```bash
npm install <package> --workspace @portfolio-websites/cafe
```

Remove a dependency from one website:

```bash
npm uninstall <package> --workspace @portfolio-websites/cafe
```

Avoid placing application dependencies in the root package. Each website should declare what it
uses so it remains independently understandable and deployable.

## Continuous integration

The GitHub Actions workflow runs on pull requests and pushes to `main`. It:

1. Installs the complete workspace from the root lockfile.
2. Builds all 13 websites.
3. Runs tests in workspaces that provide them.

This catches broken dependencies, TypeScript/build failures, and test regressions before changes
are merged.

## Troubleshooting

### A workspace name is not found

Run `npm install` from the repository root, then use the exact scoped name shown in the catalogue.

### A development port is already in use

Stop the process using that port or pass a different port to the website's development command:

```bash
npm run dev --workspace @portfolio-websites/gym -- --port 5174
```

### A clean install behaves differently

Remove generated dependencies and reinstall from the root lockfile:

```bash
npm ci
```

### Vercel builds the wrong project

Set the Vercel Root Directory to the relevant `websites/<name>` directory. Each website is a
separate deployment target.

## Project status

These websites are portfolio demonstrations and reusable templates. They do not represent live
businesses, medical providers, accommodation providers, financial services, or guaranteed
production integrations. Any forms, bookings, purchases, consultations, or reservations must be
connected to real services and reviewed before production use.

## License

This collection is available under the [MIT License](LICENSE). You may use, modify, and distribute
the code, including as a template for your own websites, provided the license notice is retained.

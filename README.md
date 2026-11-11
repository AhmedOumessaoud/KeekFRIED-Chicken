# KeekFRIED Chicken — digital menu

Static HTML, CSS and vanilla JavaScript. Run `npm start` and open http://localhost:5173, or open `index.html` directly. Deploy the project root to static hosting. No runtime framework is required.

## Configuration
Set the restaurant's real international WhatsApp number (digits only) in `js/config.js`, then run `npm run build`. Checkout stays visibly disabled until a valid number is configured. Set `deliveryFee` only after confirmation; otherwise delivery totals explicitly exclude delivery fees. There is no payment gateway.

79 products / 15 categories, priced from the written brief. Avocado juice is 25 DH. The cart persists locally. Adding items never opens WhatsApp; only checkout does.

## Design and photography
The supplied posters guide the chalkboard background, brush script menu title, yellow category headings and price pills, dotted product rows, glossy red buttons, framed dessert section, juice/beverage panels, and warm supplement cards.

New images are generated with the built-in imagegen tool and optimized to local WebP files in `assets/images/generated/`. `assets/image-manifest.json` records the per-product assets and generation status. `assets/generation-prompts.json` records the final prompts and original generated file locations. Generated images are presentation photography; the restaurant should confirm exact ingredients and portion appearance.

The original restaurant logo is retained in `assets/logo/keek.webp`. The supplied poster crops and the earlier generated assets remain available in `assets/images/` but product references are replaced with the new per-product images as generation completes.

## Development
Edit `js/app.js`, `js/cart.js`, `js/menu-data.js`, or `js/config.js`, then run `npm run build`. It creates the classic browser bundle using Node only; it does not launch Playwright. The complete HTML fallback is already committed. To refresh that fallback after changing menu markup or data, run `npm run render:static` locally, then commit the updated `index.html`. This optional command requires local Playwright Chromium; production deployment does not. This avoids module restrictions when opening a local file, and keeps the menu visible when preview software disables JavaScript. Interactive ordering requires JavaScript.

`npm test` checks product data, assets, arithmetic, persistence and WhatsApp message formatting. Browser checks use Playwright Chromium (`npx playwright install chromium`):

- `node scripts/browser-check.mjs`: every add button, search, filtering, delivery fields, persistence, image loading and overflow at 320–1440px.
- `node scripts/check-direct-file.mjs`: direct file opening, fallback visibility, cart and search recovery.
- `node scripts/check-redesign.mjs`: pictured add confirmation, direct cart link and compact layouts.

## Vercel deployment

`vercel.json` selects the Other/static preset and serves the project root (`.`), including `index.html`, `css/`, `js/`, and `assets/`. The production install uses `npm ci --omit=dev`; Playwright remains a development-only tool. The production build runs only `node scripts/build-browser.mjs`, preserving bundle generation after source/configuration edits without requiring a browser executable.

Screenshot scripts (`scripts/capture*.mjs`), browser tests, and `npm run render:static` are local development tools and are not part of the production build. Do not add Chromium installation to the Vercel build command.

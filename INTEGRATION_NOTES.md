# Happy Hooks by Esha — Frontend/Backend Integration Notes

This pass wires every admin module (and the customer-facing storefront) to the
real Express/MongoDB backend instead of local demo data. Below is what
changed, how to run it, and a few things worth knowing before you deploy.

## What's new on the backend

- **File uploads (Cloudinary)** — `POST /api/upload` and `/api/upload/multiple`
  (admin only, multer + `multer-storage-cloudinary`) upload directly to your
  Cloudinary account and return the permanent `https://res.cloudinary.com/...`
  URL. Every upload is also logged to a new `Media` collection so the Media
  Library shows everything that's been uploaded anywhere in the app, and
  deleting a Media item deletes it from Cloudinary too.
- **Media Library API** — `GET/DELETE /api/media` lists/removes uploaded
  files.
- **Settings API** — `GET/PUT /api/settings` persists store info, shipping,
  payment, and social settings (previously only lived in React state).
- **Homepage content** — the `Homepage` model now also stores banners, FAQs,
  testimonials, and Instagram media, each with full CRUD routes under
  `/api/homepage/...`.
- **Orders** — added `DELETE /api/orders/:id` (admin) so the admin table's
  delete button works; deleting an order restores product stock.

## What's new on the frontend

- New `src/services/*.js` files (`productService`, `orderService`,
  `customerService`, `reviewService`, `homepageService`, `settingsService`,
  `mediaService`, `analyticsService`, `uploadService`) — thin fetch wrappers
  matching the existing `categoryService`/`subCategoryService` style.
- Every context that used to hold local demo arrays (`ProductContext`,
  `OrderContext`, `CustomerContext`, `ReviewContext`, `HomepageContext`,
  `SettingsContext`, `MediaContext`) now fetches from and writes to the API.
- All admin screens (Products, New Arrivals, Categories/Sub-Categories,
  Orders, Customers, Reviews, Homepage Manager, Settings, Media Library,
  Dashboard/Analytics) were updated to work with Mongo `_id`s and populated
  fields instead of the old numeric/local ids, and image uploads go through
  the real `/api/upload` endpoint instead of blob URLs.
- The storefront (Shop, Product Details, Related Products, Home's Featured
  Products / New Arrivals, header search) now reads from the live
  `ProductContext` instead of `src/data/products.js`.
- Checkout now actually creates a real order (`POST /api/orders`) from the
  cart, billing form, and selected shipping/payment method, and shows the
  real order number on success.
- The Product Details "Reviews" tab fetches approved reviews for that
  product and lets a logged-in customer submit a new one (goes to "Pending"
  until an admin approves it).

## Scope / simplifications worth knowing about

- A few purely-cosmetic homepage sections that never had a backend model to
  begin with (About section prose, "Shop by Occasion", static Testimonials/
  Instagram sections *as shown to shoppers*) are left as-is on the storefront
  — the admin-side CRUD for testimonials/Instagram media/banners/FAQs is
  fully wired to the database, but wiring the public-facing display of every
  one of those sections was outside a reasonable scope for this pass. Ask if
  you'd like those hooked up too.
- Some demo-only fields that never existed in the backend schema (product
  "rating"/"reviews" counts on the card, "Show on Homepage" checkbox) are
  harmless leftovers in a couple of forms — they don't break anything, they
  just aren't persisted, since there's no corresponding database field.
- Bank Transfer at checkout is recorded as a "Cash on Delivery" order under
  the hood, since the `Order` model only distinguishes COD vs EasyPaisa.
  Easy to add a real `Bank Transfer` enum value if you want it tracked
  separately.
- I could not run a live MongoDB Atlas connection inside this sandbox (no
  internet access to Atlas), so this wasn't tested against a live database.
  It *was* verified with: `node --check` + a full `require()` smoke test on
  every backend file, and a full `npm run build` of the frontend (Vite),
  both of which pass cleanly. I'd still recommend clicking through the admin
  panel once after your first deploy.
- Found and fixed a pre-existing bug unrelated to this task: `SubCategories.jsx`
  imported from `components/admin/subcategory/...` (lowercase) while the
  actual folder is `subCategory/...` (camelCase). This silently worked on
  Windows/Mac (case-insensitive filesystems) but broke the production build
  on Linux. Fixed the import casing.
- Also added the missing `@tailwindcss/vite` dependency to
  `frontend/package.json` — it was imported by `vite.config.js` but never
  listed as a dependency, so a fresh `npm install` would have failed to
  build.

## Running it

```bash
# Backend
cd backend
npm install
# create backend/.env with MONGO_URI and JWT_SECRET (see your existing setup)
npm start          # or: npm run dev

# Frontend
cd frontend
npm install
npm run dev
```

Uploaded files are written to `backend/uploads/` (git-ignored) and served at
`http://localhost:5000/uploads/<filename>`.

# Separate Vercel deployments

Create four Vercel projects from this one GitHub repository. Set each project's **Root Directory** to the repository root and leave the install command as `npm ci`. Use `npm run build:vercel` as the build command and `vercel-output` as the output directory; these are also committed in `vercel.json`.

Set `APP_TARGET` in every environment (Production, Preview, and Development) for each project:

| Vercel project | `APP_TARGET` |
| --- | --- |
| NOVA storefront host | `shop-shell` |
| NOVA cart remote | `cart` |
| NOVA checkout remote | `checkout` |
| NOVA admin remote | `admin` |

On the storefront host, additionally set these environment variables to the production URLs of the deployed remotes, including `remoteEntry.json`:

```text
CART_REMOTE_URL=https://your-cart-project.vercel.app/remoteEntry.json
CHECKOUT_REMOTE_URL=https://your-checkout-project.vercel.app/remoteEntry.json
ADMIN_REMOTE_URL=https://your-admin-project.vercel.app/remoteEntry.json
```

Use the matching preview URLs for Preview deployments if you want previews to compose preview remotes. `vercel.json` provides SPA fallback routing and a permissive static CORS header so the host can import remote federation modules.

## GitHub

The repository must be created under the supplied GitHub account before it can be pushed. After it exists, add its exact URL as `origin`, commit, and push the `master` branch. Then import that repository four times in Vercel—once per project above.

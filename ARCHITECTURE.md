# NOVA commerce microfrontend map

`shop-shell` is the storefront host. Cart, checkout, and admin are independent Angular projects under `projects/`, each built and served as a Native Federation remote. The host lazy-loads their route exports through `remoteEntry.json`.

| Federated entry | Responsibility |
| --- | --- |
| `shop-shell` | Product discovery and composition host (`:4200`) |
| `cart` | Bag lines and quantity management (`:4201`) |
| `checkout` | Delivery and order completion workflow (`:4202`) |
| `admin` | Catalog and operations dashboard (`:4203`) |

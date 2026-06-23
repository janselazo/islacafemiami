# Site images

These files power the Isla Café website. Replace them with your Higgsfield generations when available.

## Expected filenames

- `logo.jpg` — Nav + footer logo
- `hero.jpeg` — Hero background
- `barista-pour.jpeg` — Historia (large)
- `pastelitos-historia.jpeg` — Historia (small)
- `cafe-con-leche.jpeg` — Menú café card
- `tostada-isla.jpeg` — Menú brunch card
- `pastelitos-menu.jpeg` — Menú dulces card
- `salon.jpeg` — El Espacio (large tile)
- `barra.jpeg`, `plantas.jpeg`, `mesa-al-sol.jpeg`, `pour-over.jpeg` — El Espacio grid

## Download from Higgsfield

1. Authenticate the Higgsfield MCP plugin in Cursor
2. Run `show_generations` (type: image) to list your generations
3. Create a manifest JSON mapping filename → `results.rawUrl`
4. Run: `npm run download-images -- path/to/manifest.json`

Current files are temporary placeholders until Higgsfield assets are pulled in.

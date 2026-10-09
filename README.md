# LustAI realistic catalog landing

Static catalog linking to the corresponding AI-character chats on https://lustai.chat.

## Preview

Run `python3 -m http.server 4187 --bind 127.0.0.1` from this directory.

## Content

16 adult, realistic, system characters selected from the live LustAI catalog on 2026-10-09. Names, ages, biographies and popularity values are a snapshot of the catalog. Only display fields are included; no account data, conversations, credentials or internal character instructions are shipped. Images are stored locally in `assets/characters`.

Update `characters.json` and matching image files to refresh the catalog. The page does not query the protected LustAI API.

## Attribution

Outgoing product links include `lander=realistic_catalog`, default `utm_source=github_pages` and `utm_medium=landing`. Supported incoming campaign/click parameters override the defaults. The character recipient is fixed by the selected card; incoming parameters cannot replace it. Preserving URL parameters does not establish that the product records or attributes them; that requires separate analytics validation.

No registration, payment processing, age confirmation, or user-data collection is performed on this landing. The product handles those steps. Search, age filters and sorting operate locally. Every visitor receives the same page; there is no bot, reviewer, or geographic content switching.

## Hosting

GitHub Pages: publish the repository's `main` branch from `/`.

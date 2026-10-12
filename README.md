# Songbook

A tiny Jekyll songbook for GitHub Pages. The main page lists every song
alphabetically with a search bar (it searches titles *and* lyrics). Tap a
title to open the lyrics.

On a song page:
- **A− / A+** change the lyric size (remembered on that device).
- **Previous / Next** flip through the book.
- The screen stays on while a song is open, so it won't dim mid-verse
  (iPhone with iOS 16.4 or newer).

It follows your phone's light/dark setting.

## Add a song

Each song is one file in the `_songs` folder. On GitHub:

1. Open the `_songs` folder and choose **Add file → Create new file**.
2. Name it with dashes and `.md` at the end, like `you-are-my-sunshine.md`.
   (The file name becomes the page address.)
3. Paste this at the top, then the lyrics underneath:

```
---
title: "Song Title"
credit: "Songwriter or Traditional"
---

First line of verse one
Second line of verse one

> First line of the chorus
> Second line of the chorus

First line of verse two
Second line of verse two

> *(Chorus)*
```

Formatting rules:
- Put each lyric line on its own line.
- Leave a **blank line** between verses.
- Start chorus lines with `> ` and they'll be indented and italic.
- `*(Chorus)*` is a handy shorthand for repeating the chorus.

4. Click **Commit changes**. The song appears in about a minute.

If you add a song with only the top section (no lyrics yet), it shows up in
the list with an "Add lyrics" tag.

## Remove the placeholder songs

Delete these five files from `_songs`:
`apple-orchard-lullaby.md`, `big-red-barn.md`, `old-mill-road.md`,
`rainy-day-ramble.md`, `sleepy-little-moon.md`.

## Files

- `_config.yml` – site title and home-screen name
- `index.html` – the main page with the song list and search
- `_layouts/default.html` – the page frame shared by every page
- `_layouts/song.html` – the lyrics page
- `_songs/` – one file per song
- `assets/song.js` – search, text size, and keep-screen-on
- `assets/style.css` – colors and layout
- `assets/notes.svg` – the music-note background
- `apple-touch-icon.png` – the iPhone home-screen icon

## Publish on GitHub Pages

1. Create a new repository on GitHub (for example `songbook`) and upload these files, keeping the folder structure (including the folders that start with `_`).
2. Go to **Settings → Pages**, set the source to **Deploy from a branch**, pick `main` and `/ (root)`, and save.
3. After a minute, the site is live at `https://<your-username>.github.io/songbook/`.

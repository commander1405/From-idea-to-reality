# From an Idea to Reality — DarkKnight Studio

A cinematic, English-only, presenter-controlled website for GitHub Pages. It is a visual companion for the presentation: the speaker reads their full script from a separate PowerPoint while the audience sees short phrases, animated artwork and project highlights.

## Files
- `index.html` — presentation structure
- `style.css` — responsive design, neon glow and transitions
- `script.js` — slide controls, progress, keyboard, touch and fullscreen
- `assets/` — custom SVG logo and illustrations

## Test locally
Open `index.html` in a modern browser. For the best experience, use a desktop browser and fullscreen mode.

## Publish on GitHub Pages
1. Create a new public repository, for example `from-idea-to-reality`.
2. Upload **all files and the `assets` folder** from this project to the repository root. Do not upload only `index.html`.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Choose branch `main` and folder `/(root)`, then Save.
6. Wait for GitHub Pages to publish the site. The URL will usually look like `https://YOUR-USERNAME.github.io/from-idea-to-reality/`.

## Assets note
The SVGs in this prototype are original, lightweight illustrations made for this presentation. The currently supplied DarkKnight website address could not be inspected from this environment, so these are branded placeholder visuals rather than copied images from the existing site. Replace them with approved original studio/project images when available, keeping the filenames or updating their paths in `index.html`.

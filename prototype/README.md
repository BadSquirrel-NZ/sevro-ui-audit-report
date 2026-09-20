# Interactive prototype

This directory contains the current portable Sevro web prototype.

## Run locally

From the repository root:

```bash
python3 -m http.server 8000 --directory prototype
```

Then open `http://localhost:8000`.

No build step or dependencies are required.

## Files

- `index.html` — document shell and metadata
- `styles.css` — responsive Apple Health-inspired light and dark themes
- `app.js` — screens, navigation, seeded data and prototype interactions

## Included experience

- Home with Today's Workout, Volume and Goals
- Workouts, workout creation and standard split selection
- Active workout and set logging
- Exercise swapping and progress review
- Insights
- Settings, profile, goals, backup/restore and appearance controls
- System, light and dark themes

Hosted version: https://sevro-training-prototype.joe297450.chatgpt.site

This prototype is the behavioural and visual reference. The production app remains native SwiftUI and should reuse its existing models and business logic.

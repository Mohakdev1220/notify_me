# OfficeSync — Schedule Notifier

A personal office timetable notifier. Upload your Excel/JSON schedule, get notified 2 min before each period.

## Deploy to GitHub Pages

1. Create a new GitHub repo (e.g. `officesync`)
2. Push these 3 files: `index.html`, `sw.js`, `README.md`
3. Settings → Pages → Branch: main → Save
4. Your app is live at: `https://mohakdev1220.github.io/officesync`

## Supabase setup (cloud sync)

1. Go to [supabase.com](https://supabase.com) → New project (free)
2. Go to SQL Editor → paste contents of `supabase-setup.sql` → Run
3. Go to Settings → API → copy Project URL and anon key
4. In the app → Settings → paste URL and key → Save & connect

## Uploading your timetable

### Option A: Excel
- Click "Download template (.xlsx)" in the Upload page
- Fill it in: Day, Slot, Label, StartTime (HH:MM)
- Upload it back

### Option B: JSON
```json
{
  "Monday": [
    { "slot": "1", "label": "Assembly", "startTime": "08:00" },
    { "slot": "2", "label": "Period 1", "startTime": "08:45" },
    { "slot": "Lunch", "label": "Lunch Break", "startTime": "13:00" },
    { "slot": "9", "label": "Leave for home", "startTime": "16:00" }
  ],
  "Tuesday": [ ... ]
}
```

## Features
- 6 days, 10 slots per day
- Notifies X minutes before each slot (default: 2 min)
- Today's live timeline with Done / Next / Now badges
- Countdown to next period
- localStorage backup + Supabase cloud sync
- PWA-ready (Service Worker for background notifications)
- Mobile responsive

## File structure
```
officesync/
├── index.html          ← Main app
├── sw.js               ← Service worker (background)
├── supabase-setup.sql  ← Run once in Supabase SQL editor
└── README.md
```

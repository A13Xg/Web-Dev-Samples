const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the sites directory
app.use('/sites', express.static(path.join(__dirname, 'sites')));

// Serve the main index
app.use(express.static(path.join(__dirname, 'public')));

// Route for main index
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Routes for each site
const sites = [
    '01-minimalist-portfolio',
    '02-gourmet-restaurant',
    '03-tech-startup',
    '04-fashion-ecommerce',
    '05-travel-adventure',
    '06-fitness-studio',
    '07-creative-agency',
    '08-news-magazine',
    '09-music-festival',
    '10-law-firm'
];

// Serve each site's static files (CSS, JS, images) under its route
sites.forEach(site => {
    // Serve static assets for each site
    app.use(`/${site}`, express.static(path.join(__dirname, 'sites', site)));
});

app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════════════════════════╗
║           Web Development Samples Server                    ║
╠════════════════════════════════════════════════════════════╣
║  Server running at: http://localhost:${PORT}                   ║
║                                                              ║
║  Available Sites:                                            ║
║  ├── /01-minimalist-portfolio  - Designer Portfolio          ║
║  ├── /02-gourmet-restaurant    - Fine Dining                 ║
║  ├── /03-tech-startup          - SaaS Landing Page           ║
║  ├── /04-fashion-ecommerce     - Clothing Store              ║
║  ├── /05-travel-adventure      - Travel Blog                 ║
║  ├── /06-fitness-studio        - Gym & Wellness              ║
║  ├── /07-creative-agency       - Design Agency               ║
║  ├── /08-news-magazine         - Editorial Platform          ║
║  ├── /09-music-festival        - Entertainment               ║
║  └── /10-law-firm              - Corporate Services          ║
╚════════════════════════════════════════════════════════════╝
    `);
});

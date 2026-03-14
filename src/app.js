const path = require('path');
const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const site = require('./config/site');
const pages = require('./config/pages');

function makeBreadcrumbSchema(baseUrl, breadcrumbs) {
  if (!breadcrumbs || !breadcrumbs.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${item.path}`
    }))
  };
}

function makeLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: site.organization.name,
    url: site.baseUrl,
    image: `${site.baseUrl}${site.organization.logo}`,
    telephone: site.organization.telephone,
    email: site.organization.email,
    identifier: site.organization.siret,
    address: {
      '@type': 'PostalAddress',
      ...site.organization.address
    }
  };
}

function createApp() {
  const app = express();

  app.disable('x-powered-by');
  app.set('trust proxy', 1);
  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, '..', 'views'));

  app.use(express.urlencoded({ extended: true }));
  app.use(compression());

  app.use(
    helmet({
      frameguard: { action: 'sameorigin' },
      referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
      crossOriginEmbedderPolicy: false,
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", "'unsafe-inline'"],
          styleSrc: ["'self'", "'unsafe-inline'", 'https:'],
          imgSrc: ["'self'", 'data:', 'https:'],
          connectSrc: ["'self'"],
          fontSrc: ["'self'", 'https:', 'data:'],
          frameSrc: ['https://www.google.com', 'https://www.google.com/maps'],
          objectSrc: ["'none'"]
        }
      }
    })
  );

  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 300,
      standardHeaders: true,
      legacyHeaders: false
    })
  );

  app.use(
    express.static(path.join(__dirname, '..', 'public'), {
      etag: true,
      maxAge: '7d',
      index: false,
      setHeaders(res, filePath) {
        if (filePath.endsWith('.html')) {
          res.setHeader('Cache-Control', 'no-cache');
        }
      }
    })
  );

  for (const pageConfig of pages) {
    app.get(pageConfig.path, (req, res) => {
      const canonicalUrl = `${site.baseUrl}${req.path === '/' ? '/' : req.path}`;
      const schemas = [makeLocalBusinessSchema()];
      const breadcrumbSchema = makeBreadcrumbSchema(site.baseUrl, pageConfig.breadcrumbs);

      if (breadcrumbSchema) schemas.push(breadcrumbSchema);

      res.render(pageConfig.view, {
        siteName: site.siteName,
        title: pageConfig.title,
        description: pageConfig.description || site.defaultDescription,
        active: pageConfig.active,
        canonicalUrl,
        schemas
      });
    });
  }

  app.get('/robots.txt', (_req, res) => {
    res.type('text/plain');
    res.send(`User-agent: *\nAllow: /\n\nSitemap: ${site.baseUrl}/sitemap.xml\n`);
  });

  app.get('/sitemap.xml', (_req, res) => {
    const now = new Date().toISOString();
    const urls = pages
      .map((page) => `<url><loc>${site.baseUrl}${page.path}</loc><lastmod>${now}</lastmod><changefreq>weekly</changefreq></url>`)
      .join('');

    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;
    res.type('application/xml');
    res.send(xml);
  });

  app.use((req, res) => {
    res.status(404).render('pages/404', {
      siteName: site.siteName,
      title: 'Page introuvable – JMD Maçonnerie - Bâtissons ensemble vos projets',
      description: 'La page demandée est introuvable.',
      active: '',
      canonicalUrl: `${site.baseUrl}${req.path}`,
      schemas: []
    });
  });

  return app;
}

module.exports = {
  createApp
};

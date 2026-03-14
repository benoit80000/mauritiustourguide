module.exports = [
  {
    key: 'home',
    path: '/',
    view: 'pages/home',
    title: 'JMD Maçonnerie - Bâtissons ensemble vos projets – Accueil',
    description: 'Jean-Michel Douay, maçonnerie générale, rénovation et carrelage à Villers-Bocage (80260).',
    active: 'home',
    breadcrumbs: [{ name: 'Accueil', path: '/' }]
  },
  {
    key: 'prestations',
    path: '/prestations',
    view: 'pages/prestations',
    title: 'Prestations – JMD Maçonnerie - Bâtissons ensemble vos projets',
    description: 'Toutes les prestations de maçonnerie, rénovation, extension et aménagement.',
    active: 'prestations',
    breadcrumbs: [
      { name: 'Accueil', path: '/' },
      { name: 'Prestations', path: '/prestations' }
    ]
  },
  {
    key: 'realisations',
    path: '/realisations',
    view: 'pages/realisations',
    title: 'Réalisations – JMD Maçonnerie - Bâtissons ensemble vos projets',
    description: 'Découvrez les réalisations de JMD Maçonnerie - Bâtissons ensemble vos projets dans la Somme.',
    active: 'realisations',
    breadcrumbs: [
      { name: 'Accueil', path: '/' },
      { name: 'Réalisations', path: '/realisations' }
    ]
  },
  {
    key: 'contact',
    path: '/contact',
    view: 'pages/contact',
    title: 'Contact – JMD Maçonnerie - Bâtissons ensemble vos projets',
    description: 'Contactez JMD Maçonnerie - Bâtissons ensemble vos projets pour un devis gratuit.',
    active: 'contact',
    breadcrumbs: [
      { name: 'Accueil', path: '/' },
      { name: 'Contact', path: '/contact' }
    ]
  },
  {
    key: 'mentions-legales',
    path: '/mentions-legales',
    view: 'pages/mentions-legales',
    title: 'Mentions légales – JMD Maçonnerie - Bâtissons ensemble vos projets',
    description: 'Mentions légales du site JMD Maçonnerie - Bâtissons ensemble vos projets.',
    active: '',
    breadcrumbs: [
      { name: 'Accueil', path: '/' },
      { name: 'Mentions légales', path: '/mentions-legales' }
    ]
  },
  {
    key: 'politique-confidentialite',
    path: '/politique-confidentialite',
    view: 'pages/politique-confidentialite',
    title: 'Politique de confidentialité – JMD Maçonnerie - Bâtissons ensemble vos projets',
    description: 'Politique de confidentialité et cookies.',
    active: '',
    breadcrumbs: [
      { name: 'Accueil', path: '/' },
      { name: 'Politique de confidentialité', path: '/politique-confidentialite' }
    ]
  }
];

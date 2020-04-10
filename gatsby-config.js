module.exports = {
  plugins: [
    'gatsby-plugin-resolve-src',
    'gatsby-plugin-sass',
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images`
      },
      packageMains: [
        'module', // adds check for 'module'
        'webpack',
        'browser',
        'web',
        'browserify',
        ['jam', 'main'],
        'main',
      ]
    },
    'gatsby-plugin-react-leaflet',
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-vega`,
        ],
      },
    }
  ]
};

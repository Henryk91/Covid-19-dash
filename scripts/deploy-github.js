const ghpages = require('gh-pages')

// replace with your repo url
ghpages.publish(
  'public',
  {
    branch: 'gh-pages',
    repo: 'https://github.com/Henryk91/Covid-19-dash.git',
  },
  () => {
    console.log('Deploy Complete!')
  }
)
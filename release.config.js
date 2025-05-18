module.exports = {
  branches: ['main'],
  plugins: [
    '@semantic-release/changelog',
    {
      path: '@semantic-release/git',
      assets: ['CHANGELOG.md', 'VERSION'],
      message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}'
    },
    './scripts/plugins/verify-conditions.js',
    './scripts/plugins/analyze-commits.js',
    './scripts/plugins/generate-notes.js',
    './scripts/plugins/prepare.js',
    './scripts/plugins/publish.js'
  ]
};

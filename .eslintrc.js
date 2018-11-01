module.exports = {
  extends: [ 'eslint-config-standard' ], // StandardJS
  rules: {
    'no-var': 'error', // force const or let usage
    'prefer-arrow-callback': 'error', // () => preferred
    'prefer-template': 'error' // `${templateLiterals}` preferred
  }
}

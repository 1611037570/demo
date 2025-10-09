export default {
  '**/*.{cjs,json,md}': ['prettier --write'],
  '**/*.{html,vue,ts,js,jsx,tsx}': ['oxlint --fix', 'eslint --fix', 'prettier --write'],
}

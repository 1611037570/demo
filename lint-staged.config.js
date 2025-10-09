// 在Windows环境下更稳健的lint-staged配置
export default {
  '**/*.{cjs,json,md}': ['npx prettier --write'],
  '**/*.{html,vue,ts,js,jsx,tsx}': ['npx oxlint --fix', 'npx eslint --fix', 'npx prettier --write'],
}

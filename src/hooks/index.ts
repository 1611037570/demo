// export * from './modules/useClipboard'
// export * from './modules/useCountdown'
// export * from './modules/useCurrentTime'
// export * from './modules/useEventListener'
const allExports = {}

const components: any = import.meta.glob('./modules/*.ts', { eager: false })
console.log('components', components)
Object.entries(import.meta.glob('./modules/*.ts', { eager: true })).forEach(([_, module]) => {
  console.log('module', module)
  console.log('module.default', _, module.default)
  Object.assign(allExports, module)
})
console.log('allExports', allExports)

export default allExports

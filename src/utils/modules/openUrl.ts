export function openUrl(url: string) {
  const routerMode = import.meta.env.VITE_ROUTER_MODE
  if (routerMode === 'history') {
    const hash = window.location.hash
    url = hash + url
  }
  window.open(url, '_blank')
}

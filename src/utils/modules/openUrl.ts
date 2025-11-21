export function openUrl(url: string) {
  const routerMode = import.meta.env.VITE_ROUTER_MODE
  if (routerMode === 'hash') {
    url = window.location.hash + url
  }
  window.open(url, '_blank')
}

import { computed } from 'vue'

const usePosition = (
  windowWidth: any,
  menuWidth: any,
  clientX: any,
  windowHeight: any,
  menuHeight: any,
  clientY: any,
  position: any,
): any => {
  const res = computed(() => {
    const wW = windowWidth.value
    const mW = menuWidth.value
    const cX = clientX.value
    const wH = windowHeight.value
    const mH = menuHeight.value
    const cY = clientY.value

    const positionStyle: any = {}
    if (!position) {
      // 计算水平方向位置并设置对应transform-origin
      if (cX > wW - mW) {
        positionStyle.right = `${wW - cX}px`
        positionStyle.transformOrigin = 'right'
      } else {
        positionStyle.left = `${cX}px`
        positionStyle.transformOrigin = 'left'
      }
      
      // 计算垂直方向位置并补充transform-origin
      if (cY > wH - mH) {
        positionStyle.bottom = `${wH - cY}px`
        positionStyle.transformOrigin += ' bottom'
      } else {
        positionStyle.top = `${cY}px`
        positionStyle.transformOrigin += ' top'
      }
      
      return positionStyle
    }
    // 菜单相对于窗口左边的位置
    const left = cX > wW - mW ? cX - mW : cX
    // 菜单相对于窗口上边的位置
    const top = cY > wH - mH ? wH - mH : cY
    // 菜单相对于窗口右边的位置
    const right = wW - cX + mW > wW ? wW - cX - mW : wW - cX
    // 菜单相对于窗口下边的位置
    const bottom = wH - cY + mH > wH ? wH - cY - mH : wH - cY
    
    // 根据位置动态设置transform-origin
    switch (position) {
      case 'tl':
        positionStyle.left = `${left}px`
        positionStyle.top = `${top}px`
        positionStyle.transformOrigin = 'left top'
        break
      case 'tr':
        positionStyle.right = `${right}px`
        positionStyle.top = `${top}px`
        positionStyle.transformOrigin = 'right top'
        break
      case 'bl':
        positionStyle.left = `${left}px`
        positionStyle.bottom = `${bottom}px`
        positionStyle.transformOrigin = 'left bottom'
        break
      case 'br':
        positionStyle.right = `${right}px`
        positionStyle.bottom = `${bottom}px`
        positionStyle.transformOrigin = 'right bottom'
        break
      default:
        // 默认为空，让自动位置计算逻辑处理
        break
    }

    return positionStyle
  })
  return res
}
export default usePosition

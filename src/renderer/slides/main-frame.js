module.exports.createMainFrame = function () {
  let mainFrame = document.createElement('div')
  mainFrame.classList.add('notion-frame')
  mainFrame.classList.add('notion-dark-theme')
  mainFrame.style.color = 'rgba(255, 255, 255, 0.9)'
  mainFrame.style.fill = 'rgba(255, 255, 255, 0.9)'
  mainFrame.style.position = 'absolute'
  mainFrame.style.top = '0'
  mainFrame.style.bottom = '0'
  mainFrame.style.left = '0'
  mainFrame.style.right = '0'
  mainFrame.style.zIndex = '1000'
  mainFrame.style.overflow = 'overlay'
  return mainFrame
}

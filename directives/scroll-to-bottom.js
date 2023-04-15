const scrollToBottom = (el) => {
  el.scrollTop = el.scrollHeight
}
export default {
  inserted: scrollToBottom,
  componentUpdated: scrollToBottom,
}

export const CHAT_OPEN_EVENT = 'fondi:open-chat'

export function openFondiChat() {
  window.dispatchEvent(new Event(CHAT_OPEN_EVENT))
}

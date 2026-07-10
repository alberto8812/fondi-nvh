export const CHAT_OPEN_EVENT = 'fondi:open-chat'

export function openFondiChat(seed?: { monto?: string }) {
  window.dispatchEvent(new CustomEvent(CHAT_OPEN_EVENT, { detail: seed }))
}

import { useEffect, useState } from 'react'

export const usePreventTabClose = (initialState?: boolean) => {
  const [enabled, setEnabled] = useState(initialState)
  useEffect(() => {
    if (enabled && typeof window !== 'undefined') {
      window.addEventListener('beforeunload', ev => {
        ev.preventDefault()
        /* note: Chrome and Safari display their OS text anyway as custom text is considered a security issue.
         * https://stackoverflow.com/questions/40570164/how-to-customize-the-message-changes-you-made-may-not-be-saved-for-window-onb
         * but you gotta feed it something for this to function, so, whatever. */
        return (ev.returnValue = 'Closing this tab will leave your donation incomplete. Are you sure?')
      })
    }
  }, [])
  return [enabled, setEnabled]
}

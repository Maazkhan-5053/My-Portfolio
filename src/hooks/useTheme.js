import { useCallback, useEffect, useState } from 'react'

const KEY = 'theme'

// The site was dark-only, so dark stays the default until the visitor pulls the string.
const read = () => {
    try {
        const v = localStorage.getItem(KEY)
        if (v === 'light' || v === 'dark') return v
    } catch { /* storage unavailable */ }
    return 'dark'
}

export default function useTheme() {
    const [theme, setTheme] = useState(read)

    useEffect(() => {
        const root = document.documentElement
        root.dataset.theme = theme
        root.classList.add('theme-anim') // enables the smooth colour fade for 0.7s
        const t = setTimeout(() => root.classList.remove('theme-anim'), 700)
        try { localStorage.setItem(KEY, theme) } catch { /* ignore */ }
        return () => clearTimeout(t)
    }, [theme])

    const toggle = useCallback(() => setTheme((t) => (t === 'dark' ? 'light' : 'dark')), [])
    return [theme, toggle]
}

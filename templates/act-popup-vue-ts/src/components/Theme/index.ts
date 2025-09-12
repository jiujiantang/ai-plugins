import { ref, watchEffect, provide, inject } from 'vue'
import { themes } from './theme'

const themeRef = ref<number>(1)

export function useThemeProvider() {
    const setTheme = (theme: number) => {
        themeRef.value = theme
    }

    watchEffect(() => {
        const vars = themes[themeRef.value]
        const root = document.documentElement
        for (const key in vars) {
            root.style.setProperty(key, vars[key as keyof typeof vars])
        }
    })

    provide('theme', {
        theme: themeRef,
        setTheme,
    })
}

export function useTheme() {
    return inject<{
        theme: typeof themeRef
        setTheme: (theme: number) => void
    }>('theme')!
}

import { ThemeType } from './ThemeContext'
import { Theme } from './Theme'

export const THEMES: Record<ThemeType, Theme> = {
    light: {
        '--theme-switch-notch': "#2f363d",
        '--theme-switch-bg': "#FFF",
        '--logo-color': "#12181B",
        '--card-color': "#FFF",
        '--background': "#F2F3F5",
        '--gray-line': "#DCDDE0",
        '--text': "#666666",
        '--text-highlight': "#B3B9FF",
        '--title': "#2E384D",
        '--red': "#E83F5B",
        '--green': "#4CD62B",
        '--green-positive': "#61b875",
        '--blue': "#5965E0",
        '--blue-dark': "#4953B8",
        '--blue-twitter': "#2AA9E0",
        'background': "var(--background)",
    },
    dark: {
        '--theme-switch-notch': "#9E25FC",
        '--theme-switch-bg': "#6d18b0",
        '--logo-color': "#FFF",
        '--card-color': "#12181B",
        '--background': "#2A2E35",
        '--gray-line': "#2a2e35",
        '--text': "#B2BECD",
        '--text-highlight': "#B3B9FF",
        '--title': "#FFF",
        '--red': "#E83F5B",
        '--green': "#479335",
        '--green-positive': "#61b875",
        '--blue': "#5965E0",
        '--blue-dark': "#4953B8",
        '--blue-twitter': "#2AA9E0",
        'background': "var(--background)",
    }
}
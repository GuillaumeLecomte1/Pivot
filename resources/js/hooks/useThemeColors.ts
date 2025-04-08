import { useTheme } from '@/components/ThemeProvider';
import { getColor, getThemeColors, ColorKey } from '@/lib/colors';

const getSystemTheme = () => {
    if (typeof window === 'undefined') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export const useThemeColors = () => {
    const { theme } = useTheme();
    const currentTheme = theme === 'system' ? getSystemTheme() : theme;

    const getThemeColor = (key: ColorKey) => {
        return getColor(currentTheme, key);
    };

    const getCurrentThemeColors = () => {
        return getThemeColors(currentTheme);
    };

    return {
        getThemeColor,
        getCurrentThemeColors,
        theme: currentTheme
    };
}; 
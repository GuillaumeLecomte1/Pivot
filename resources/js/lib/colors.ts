export const colors = {
    light: {
        background: 'bg-white',
        foreground: 'text-gray-900',
        card: 'bg-white',
        cardForeground: 'text-gray-900',
        popover: 'bg-white',
        popoverForeground: 'text-gray-900',
        primary: 'bg-blue-600',
        primaryForeground: 'text-white',
        secondary: 'bg-gray-100',
        secondaryForeground: 'text-gray-900',
        muted: 'bg-gray-100',
        mutedForeground: 'text-gray-500',
        accent: 'bg-gray-100',
        accentForeground: 'text-gray-900',
        destructive: 'bg-red-500',
        destructiveForeground: 'text-white',
        border: 'border-gray-200',
        input: 'border-gray-200',
        ring: 'ring-blue-600',
    },
    dark: {
        background: 'bg-gray-900',
        foreground: 'text-white',
        card: 'bg-gray-900',
        cardForeground: 'text-white',
        popover: 'bg-gray-900',
        popoverForeground: 'text-white',
        primary: 'bg-blue-500',
        primaryForeground: 'text-white',
        secondary: 'bg-gray-800',
        secondaryForeground: 'text-white',
        muted: 'bg-gray-800',
        mutedForeground: 'text-gray-400',
        accent: 'bg-gray-800',
        accentForeground: 'text-white',
        destructive: 'bg-red-900',
        destructiveForeground: 'text-white',
        border: 'border-gray-700',
        input: 'border-gray-700',
        ring: 'ring-blue-500',
    }
} as const;

export type ColorKey = keyof typeof colors.light;
export type Theme = keyof typeof colors;

export const getColor = (theme: Theme, key: ColorKey) => {
    return colors[theme][key];
};

export const getThemeColors = (theme: Theme) => {
    return colors[theme];
}; 
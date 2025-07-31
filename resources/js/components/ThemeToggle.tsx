import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export function ThemeToggle() {
    const { setTheme } = useTheme();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="h-9 w-9 border-2">
                    <Sun className="dark:-rotate-90 h-5 w-5 rotate-0 scale-100 transition-all dark:scale-0" />
                    <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Changer de thème</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                <DropdownMenuItem onClick={() => setTheme('light')} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                    <Sun className="mr-2 h-4 w-4" />
                    <span>Clair</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('dark')} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                    <Moon className="mr-2 h-4 w-4" />
                    <span>Sombre</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('system')} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                    <span className="mr-2 h-4 w-4">💻</span>
                    <span>Système</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

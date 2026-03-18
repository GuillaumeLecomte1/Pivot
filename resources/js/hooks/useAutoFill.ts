import { useCallback, useRef, useState } from 'react';

interface UseAutoFillOptions {
    /** Delay in milliseconds between each character typed */
    charDelay?: number;
    /** Delay before starting the animation after calling startAnimation */
    startDelay?: number;
}

interface UseAutoFillReturn {
    /** Whether the animation is currently running */
    isAnimating: boolean;
    /** Whether the cursor should be visible (for blink effect) */
    cursorVisible: boolean;
    /** Start the auto-fill animation */
    startAnimation: (params: {
        email: string;
        password: string;
        onEmailChange: (value: string) => void;
        onPasswordChange: (value: string) => void;
        onComplete: () => void;
    }) => void;
    /** Cancel any ongoing animation */
    cancel: () => void;
}

const DEFAULT_CHAR_DELAY = 300;
const DEFAULT_START_DELAY = 500;
const CURSOR_BLINK_INTERVAL = 530;

export function useAutoFill(options: UseAutoFillOptions = {}): UseAutoFillReturn {
    const { charDelay = DEFAULT_CHAR_DELAY, startDelay = DEFAULT_START_DELAY } = options;

    const [isAnimating, setIsAnimating] = useState(false);
    const [cursorVisible, setCursorVisible] = useState(false);

    const timeoutRefs = useRef<ReturnType<typeof setTimeout>[]>([]);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const cancel = useCallback(() => {
        // Clear all pending timeouts
        timeoutRefs.current.forEach((timeout) => clearTimeout(timeout));
        timeoutRefs.current = [];

        // Clear cursor blink interval
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }

        setIsAnimating(false);
        setCursorVisible(false);
    }, []);

    const startAnimation = useCallback(
        (params: {
            email: string;
            password: string;
            onEmailChange: (value: string) => void;
            onPasswordChange: (value: string) => void;
            onComplete: () => void;
        }) => {
            const { email, password, onEmailChange, onPasswordChange, onComplete } = params;

            // Cancel any existing animation
            cancel();

            setIsAnimating(true);
            setCursorVisible(true);

            // Start cursor blink effect
            intervalRef.current = setInterval(() => {
                setCursorVisible((prev) => !prev);
            }, CURSOR_BLINK_INTERVAL);

            let charIndex = 0;
            let currentEmail = '';
            let currentPassword = '';
            let isTypingPassword = false;
            const emailLength = email.length;
            const passwordLength = password.length;
            const totalChars = emailLength + passwordLength;

            const typeNextChar = () => {
                if (charIndex >= totalChars) {
                    // Animation complete
                    setCursorVisible(false);
                    setIsAnimating(false);

                    if (intervalRef.current) {
                        clearInterval(intervalRef.current);
                        intervalRef.current = null;
                    }

                    onComplete();
                    return;
                }

                if (!isTypingPassword) {
                    // Still typing email
                    if (charIndex < emailLength) {
                        currentEmail += email[charIndex];
                        onEmailChange(currentEmail);
                        charIndex++;
                    } else {
                        // Switch to password
                        isTypingPassword = true;
                    }
                } else {
                    // Typing password
                    const passwordCharIndex = charIndex - emailLength;
                    if (passwordCharIndex < passwordLength) {
                        currentPassword += password[passwordCharIndex];
                        onPasswordChange(currentPassword);
                        charIndex++;
                    }
                }

                // Schedule next character
                const timeout = setTimeout(typeNextChar, charDelay);
                timeoutRefs.current.push(timeout);
            };

            // Start after initial delay
            const startTimeout = setTimeout(typeNextChar, startDelay);
            timeoutRefs.current.push(startTimeout);
        },
        [charDelay, startDelay, cancel],
    );

    return {
        isAnimating,
        cursorVisible,
        startAnimation,
        cancel,
    };
}

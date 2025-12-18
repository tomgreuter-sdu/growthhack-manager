import React, { useState, useEffect } from 'react';
import { Download, X, Share } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>;
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const InstallPrompt: React.FC = () => {
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
    const [showPrompt, setShowPrompt] = useState(false);
    const [isInstalled, setIsInstalled] = useState(false);
    const [isIOS, setIsIOS] = useState(false);

    // DEV MODE: Set to true to always show the prompt for testing
    const DEV_MODE = true;

    useEffect(() => {
        console.log('🔍 InstallPrompt: Initializing...');

        // Detect iOS (always do this first, even in dev mode)
        const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
        setIsIOS(iOS);
        console.log(`📱 Device: ${iOS ? 'iOS' : 'Other'}`);

        if (DEV_MODE) {
            console.log('⚠️ DEV MODE: Forcing prompt to show in 2 seconds...');
            setTimeout(() => {
                console.log('✅ DEV MODE: Showing prompt now!');
                setShowPrompt(true);
            }, 2000);
            return; // Skip the rest of the initialization in dev mode
        }

        // Check if app is already installed
        if (window.matchMedia('(display-mode: standalone)').matches) {
            console.log('✅ App is already installed (standalone mode)');
            setIsInstalled(true);
            return;
        }

        // For iOS, show manual install instructions
        if (iOS) {
            const dismissedDate = localStorage.getItem('installPromptDismissed');
            if (dismissedDate) {
                const daysSinceDismissed = Math.floor(
                    (Date.now() - parseInt(dismissedDate)) / (1000 * 60 * 60 * 24)
                );
                if (daysSinceDismissed < 7) {
                    console.log('⏸️ iOS: Not showing prompt (dismissed recently)');
                    return;
                }
            }
            console.log('📱 iOS: Showing manual install instructions in 3 seconds...');
            setTimeout(() => setShowPrompt(true), 3000);
            return;
        }

        // Listen for beforeinstallprompt event (Android/Desktop)
        const handleBeforeInstallPrompt = (e: Event) => {
            console.log('🎉 beforeinstallprompt event fired!');
            e.preventDefault();
            const event = e as BeforeInstallPromptEvent;
            setDeferredPrompt(event);

            // Check if user previously dismissed the prompt
            const dismissedDate = localStorage.getItem('installPromptDismissed');
            if (dismissedDate) {
                const daysSinceDismissed = Math.floor(
                    (Date.now() - parseInt(dismissedDate)) / (1000 * 60 * 60 * 24)
                );
                console.log(`📅 Prompt was dismissed ${daysSinceDismissed} days ago`);
                if (daysSinceDismissed < 7) {
                    console.log('⏸️ Not showing prompt (dismissed recently)');
                    return;
                }
            }

            console.log('⏰ Will show prompt in 3 seconds...');
            setTimeout(() => {
                console.log('✨ Showing install prompt!');
                setShowPrompt(true);
            }, 3000);
        };

        console.log('👂 Listening for beforeinstallprompt event...');
        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        // Listen for successful installation
        window.addEventListener('appinstalled', () => {
            setIsInstalled(true);
            setShowPrompt(false);
            setDeferredPrompt(null);
        });

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
    }, []);

    const handleInstallClick = async () => {
        if (!deferredPrompt) return;

        // Show the install prompt
        deferredPrompt.prompt();

        // Wait for the user's response
        const { outcome } = await deferredPrompt.userChoice;

        if (outcome === 'accepted') {
            console.log('User accepted the install prompt');
        } else {
            console.log('User dismissed the install prompt');
        }

        // Clear the prompt
        setDeferredPrompt(null);
        setShowPrompt(false);
    };

    const handleDismiss = () => {
        setShowPrompt(false);
        localStorage.setItem('installPromptDismissed', Date.now().toString());
    };

    // Don't show if already installed (unless in dev mode)
    if (isInstalled && !DEV_MODE) {
        return null;
    }

    // Don't show iOS prompt if dismissed
    if (isIOS && !showPrompt) {
        return null;
    }

    // Don't show Android prompt if event hasn't fired (unless in dev mode or showPrompt is true)
    if (!isIOS && !deferredPrompt && !DEV_MODE && !showPrompt) {
        return null;
    }

    // iOS Install Instructions
    if (isIOS) {
        return (
            <div className="fixed top-0 left-0 right-0 z-50 p-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg">
                <div className="max-w-md mx-auto">
                    <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-3 flex-1">
                            <Download className="w-5 h-5 flex-shrink-0 mt-1" />
                            <div className="flex-1">
                                <p className="text-sm font-semibold mb-1">Installeer GrowthHack</p>
                                <p className="text-xs opacity-90">Voeg toe aan je beginscherm:</p>
                            </div>
                        </div>
                        <button
                            onClick={handleDismiss}
                            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                            aria-label="Sluiten"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3 text-xs space-y-2">
                        <div className="flex items-start gap-2">
                            <span className="font-bold">1.</span>
                            <span>Tap op het <Share className="w-4 h-4 inline mx-1" /> <strong>Deel</strong> icoon onderaan je scherm</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <span className="font-bold">2.</span>
                            <span>Scroll omlaag en selecteer <strong>"Zet op beginscherm"</strong></span>
                        </div>
                        <div className="flex items-start gap-2">
                            <span className="font-bold">3.</span>
                            <span>Tap <strong>"Voeg toe"</strong></span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Android/Desktop Install Button
    return (
        <div className="fixed top-0 left-0 right-0 z-50 p-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg">
            <div className="max-w-md mx-auto flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 flex-1">
                    <Download className="w-5 h-5 flex-shrink-0" />
                    <div className="flex-1">
                        <p className="text-sm font-semibold">Installeer GrowthHack</p>
                        <p className="text-xs opacity-90">Voeg toe aan je beginscherm voor snelle toegang</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={handleInstallClick}
                        className="bg-white text-purple-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-purple-50 transition-colors whitespace-nowrap"
                    >
                        Installeer
                    </button>
                    <button
                        onClick={handleDismiss}
                        className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                        aria-label="Sluiten"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InstallPrompt;

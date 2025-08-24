// Download page specific JavaScript
(function() {
    'use strict';

    // Platform detection
    function detectPlatform() {
        const userAgent = navigator.userAgent;
        const platform = navigator.platform;

        if (/Mac|iPhone|iPod|iPad/.test(userAgent)) {
            // Detect Apple Silicon vs Intel
            if (/Mac/.test(userAgent)) {
                return {
                    os: 'macos',
                    arch: 'universal', // We'll show both options
                    name: 'macOS',
                    icon: '🍎'
                };
            }
            return { os: 'ios', name: 'iOS', icon: '📱' };
        }

        if (/Win/.test(userAgent) || /Windows/.test(userAgent)) {
            return {
                os: 'windows',
                arch: 'x64',
                name: 'Windows',
                icon: '🪟'
            };
        }

        if (/Linux/.test(userAgent) || /X11/.test(userAgent)) {
            return {
                os: 'linux',
                arch: 'x64',
                name: 'Linux',
                icon: '🐧'
            };
        }

        // Default to showing all options
        return {
            os: 'unknown',
            name: 'Your Platform',
            icon: '💻'
        };
    }

    // Show recommended download based on platform
    function showRecommendedDownload() {
        const platform = detectPlatform();
        const recommendedSection = document.getElementById('recommended-download');
        
        if (!recommendedSection) return;

        let recommendedHTML = '';

        if (platform.os === 'macos') {
            recommendedHTML = `
                <div class="recommended-platform">
                    <div class="platform-detected">
                        <span class="platform-icon">${platform.icon}</span>
                        <div>
                            <h3>Detected: ${platform.name}</h3>
                            <p>Choose the right version for your Mac</p>
                        </div>
                    </div>
                    <div class="recommended-actions">
                        <a href="/downloads/Crkle-1.0.0-arm64.dmg" 
                           class="btn btn-primary" 
                           onclick="trackDownload('desktop', 'mac-apple-silicon-recommended')">
                            <span class="btn-icon">⬇️</span>
                            Apple Silicon (M1/M2/M3) - Recommended
                        </a>
                        <a href="/downloads/Crkle-1.0.0.dmg" 
                           class="btn btn-secondary"
                           onclick="trackDownload('desktop', 'mac-intel-recommended')">
                            Intel Mac
                        </a>
                    </div>
                </div>
            `;
        } else if (platform.os === 'windows') {
            recommendedHTML = `
                <div class="recommended-platform">
                    <div class="platform-detected">
                        <span class="platform-icon">${platform.icon}</span>
                        <div>
                            <h3>Detected: ${platform.name}</h3>
                            <p>Perfect! Here's your recommended download</p>
                        </div>
                    </div>
                    <div class="recommended-actions">
                        <a href="/downloads/Crkle-Windows-v1.0.0.zip" 
                           class="btn btn-primary btn-large" 
                           onclick="trackDownload('desktop', 'windows-recommended')">
                            <span class="btn-icon">⬇️</span>
                            Download for Windows
                        </a>
                        <div class="download-note">
                            <small>⚠️ Extract the ZIP file and run Crkle.exe</small>
                        </div>
                    </div>
                </div>
            `;
        } else if (platform.os === 'linux') {
            recommendedHTML = `
                <div class="recommended-platform">
                    <div class="platform-detected">
                        <span class="platform-icon">${platform.icon}</span>
                        <div>
                            <h3>Detected: ${platform.name}</h3>
                            <p>AppImage format works on most Linux distributions</p>
                        </div>
                    </div>
                    <div class="recommended-actions">
                        <a href="/downloads/Crkle-1.0.0.AppImage" 
                           class="btn btn-primary btn-large" 
                           onclick="trackDownload('desktop', 'linux-recommended')">
                            <span class="btn-icon">⬇️</span>
                            Download AppImage
                        </a>
                        <div class="download-note">
                            <small>💡 Make executable with: chmod +x Crkle-1.0.0.AppImage</small>
                        </div>
                    </div>
                </div>
            `;
        } else {
            recommendedHTML = `
                <div class="recommended-platform">
                    <div class="platform-detected">
                        <span class="platform-icon">🌐</span>
                        <div>
                            <h3>Start with Chrome Extension</h3>
                            <p>Works on any operating system with Chrome browser</p>
                        </div>
                    </div>
                    <div class="recommended-actions">
                        <a href="https://chrome.google.com/webstore/detail/crkle/[extension-id]" 
                           class="btn btn-primary btn-large">
                            <span class="btn-icon">⬇️</span>
                            Add to Chrome - Free
                        </a>
                    </div>
                </div>
            `;
        }

        recommendedSection.innerHTML = recommendedHTML;
    }

    // Track download clicks
    function trackDownload(type, variant) {
        // Analytics tracking
        if (window.CrkleWebsite && window.CrkleWebsite.trackClick) {
            window.CrkleWebsite.trackClick('Download', type, variant);
        }

        // Optional: Send to backend for analytics
        fetch('/api/analytics/download', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                type: type,
                variant: variant,
                userAgent: navigator.userAgent,
                timestamp: new Date().toISOString(),
                referrer: document.referrer
            })
        }).catch(err => {
            console.log('Analytics tracking failed:', err);
        });

        // Show download confirmation
        showDownloadConfirmation(type, variant);
    }

    // Show download confirmation message
    function showDownloadConfirmation(type, variant) {
        const confirmationHTML = `
            <div class="download-confirmation" id="download-confirmation">
                <div class="confirmation-content">
                    <div class="confirmation-icon">✅</div>
                    <h4>Download Started!</h4>
                    <p>Your Crkle ${type} is downloading. Check your downloads folder.</p>
                    <div class="confirmation-actions">
                        <a href="/help/installation" class="btn btn-secondary btn-small">
                            📖 Installation Guide
                        </a>
                        <button onclick="hideDownloadConfirmation()" class="btn btn-primary btn-small">
                            Got it!
                        </button>
                    </div>
                </div>
            </div>
        `;

        // Remove existing confirmation
        const existing = document.getElementById('download-confirmation');
        if (existing) {
            existing.remove();
        }

        // Add new confirmation
        document.body.insertAdjacentHTML('beforeend', confirmationHTML);

        // Auto-hide after 5 seconds
        setTimeout(() => {
            hideDownloadConfirmation();
        }, 5000);
    }

    // Hide download confirmation
    function hideDownloadConfirmation() {
        const confirmation = document.getElementById('download-confirmation');
        if (confirmation) {
            confirmation.style.opacity = '0';
            setTimeout(() => {
                confirmation.remove();
            }, 300);
        }
    }

    // Copy download link to clipboard
    function copyDownloadLink(button, url) {
        navigator.clipboard.writeText(url).then(() => {
            const originalText = button.textContent;
            button.textContent = '✅ Copied!';
            button.style.background = '#10b981';
            
            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = '';
            }, 2000);
        }).catch(() => {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = url;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            
            button.textContent = '✅ Copied!';
        });
    }

    // Initialize download page functionality
    function init() {
        showRecommendedDownload();
        
        // Make functions globally available
        window.trackDownload = trackDownload;
        window.hideDownloadConfirmation = hideDownloadConfirmation;
        window.copyDownloadLink = copyDownloadLink;
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();

// CSS for download-specific styles
const downloadStyles = `
    .recommended-platform {
        background: rgba(255, 255, 255, 0.15);
        border-radius: 12px;
        padding: 1.5rem;
        margin-bottom: 2rem;
        border: 2px solid rgba(255, 255, 255, 0.2);
    }

    .platform-detected {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1.5rem;
    }

    .platform-detected .platform-icon {
        font-size: 3rem;
    }

    .platform-detected h3 {
        margin-bottom: 0.5rem;
        color: white;
        font-weight: 600;
    }

    .platform-detected p {
        margin: 0;
        opacity: 0.9;
    }

    .recommended-actions {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        align-items: center;
    }

    .download-confirmation {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease-out;
    }

    .confirmation-content {
        background: white;
        border-radius: 16px;
        padding: 2rem;
        text-align: center;
        max-width: 400px;
        box-shadow: var(--shadow-lg);
    }

    .confirmation-icon {
        font-size: 4rem;
        margin-bottom: 1rem;
    }

    .confirmation-content h4 {
        margin-bottom: 0.5rem;
        font-size: 1.5rem;
        font-weight: 600;
    }

    .confirmation-content p {
        color: var(--text-secondary);
        margin-bottom: 2rem;
    }

    .confirmation-actions {
        display: flex;
        gap: 1rem;
        justify-content: center;
        flex-wrap: wrap;
    }

    .btn-small {
        padding: 0.5rem 1rem;
        font-size: 0.9rem;
    }

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    @media (max-width: 768px) {
        .confirmation-content {
            margin: 1rem;
            padding: 1.5rem;
        }
        
        .confirmation-actions {
            flex-direction: column;
        }
    }
`;

// Inject download-specific styles
const downloadStyleSheet = document.createElement('style');
downloadStyleSheet.textContent = downloadStyles;
document.head.appendChild(downloadStyleSheet);
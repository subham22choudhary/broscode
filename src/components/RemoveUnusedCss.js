import React, { useState } from 'react';
import './RemoveUnused.css';

const RemoveUnusedCss = () => {
    const [html, setHtml] = useState('');
    const [css, setCss] = useState('');
    const [js, setJs] = useState('');
    const [filteredCss, setFilteredCss] = useState('');

    const handleRemoveUnusedCss = () => {
        // Combine HTML and JS to find used classes/ids/tags
        const combinedCode = html + ' ' + js;

        // Regular expression to find all class and id selectors used in HTML and JS
        const classRegex = /\bclass=["']([^"']+)["']/g;
        const idRegex = /\bid=["']([^"']+)["']/g;

        let usedClasses = [];
        let usedIds = [];

        let match;
        while ((match = classRegex.exec(combinedCode)) !== null) {
            usedClasses.push(...match[1].split(' '));
        }

        while ((match = idRegex.exec(combinedCode)) !== null) {
            usedIds.push(match[1]);
        }

        // Convert usedClasses and usedIds to sets for easy lookup
        usedClasses = new Set(usedClasses);
        usedIds = new Set(usedIds);

        // Improved logic to check if a selector is used
        const isSelectorUsed = (selector) => {
            selector = selector.trim();

            // Check for class selectors
            if (selector.startsWith('.')) {
                const className = selector.substring(1).split(':')[0]; // Remove pseudo-classes
                return usedClasses.has(className);
            }
            // Check for ID selectors
            if (selector.startsWith('#')) {
                const idName = selector.substring(1);
                return usedIds.has(idName);
            }
            // Assume tag selectors are always used (you can refine this as needed)
            return true;
        };

        // Regular expression to match CSS selectors (class, id, or other complex selectors)
        const cssRuleRegex = /([^{]+)\s*\{[^}]*\}/g;
        const filteredRules = [];

        while ((match = cssRuleRegex.exec(css)) !== null) {
            const ruleSelectors = match[1].trim().split(',');

            // Check if any selector in the rule is used
            const isUsed = ruleSelectors.some(isSelectorUsed);

            if (isUsed) {
                filteredRules.push(match[0]); // Keep the rule if any selector matches used classes/ids
            }
        }

        setFilteredCss(filteredRules.join('\n'));
    };

    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(filteredCss)
            .then(() => {
                alert('Filtered CSS copied to clipboard!');
            })
            .catch((err) => {
                console.error('Failed to copy: ', err);
            });
    };

    return (
        <div>
            <h2>Remove Unused CSS</h2>

            <div className='inp-cod'>
                <div>
                    <textarea
                        placeholder="Paste HTML code here"
                        value={html}
                        onChange={(e) => setHtml(e.target.value)}
                        rows="10"
                        cols="50"
                    ></textarea>
                </div>

                <div>
                    <textarea
                        placeholder="Paste CSS code here"
                        value={css}
                        onChange={(e) => setCss(e.target.value)}
                        rows="10"
                        cols="50"
                    ></textarea>
                </div>

                <div>
                    <textarea
                        placeholder="Paste JS code here"
                        value={js}
                        onChange={(e) => setJs(e.target.value)}
                        rows="10"
                        cols="50"
                    ></textarea>
                </div>
            </div>

            <button onClick={handleRemoveUnusedCss}>Remove Unused CSS</button>

            <div className='out-put'>
                {filteredCss && (
                    <div>
                        <h3>Filtered CSS</h3>
                        <div>
                            <pre>{filteredCss}</pre>
                        </div>
                        <button onClick={handleCopyToClipboard}>Copy to Clipboard</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RemoveUnusedCss;

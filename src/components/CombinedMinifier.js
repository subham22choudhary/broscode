import React, { useState } from 'react';

const CombinedMinifier = () => {
    const [inputCode, setInputCode] = useState('');
    const [minifiedCode, setMinifiedCode] = useState('');

    const handleInputChange = (e) => {
        setInputCode(e.target.value);
    };

    const minifyCode = (code) => {
        let minified;

        // Determine if the code is HTML, CSS, or JavaScript
        if (code.includes('<')) {
            // Minify HTML
            minified = code
                .replace(/>\s+</g, '><')
                .replace(/\s{2,}/g, ' ')
                .replace(/<!--[\s\S]*?-->/g, '')
                .trim();
        } else if (code.includes('{') || code.includes('}') || code.includes(':')) {
            // Minify CSS
            minified = code
                .replace(/\s+/g, ' ')
                .replace(/\s*([{}:;,])\s*/g, '$1')
                .replace(/\/\*[\s\S]*?\*\//g, '')
                .replace(/\s*;\s*}/g, '}')
                .trim();
        } else {
            // Minify JavaScript
            minified = code
                .replace(/\/\*[\s\S]*?\*\//g, '')
                .replace(/\/\/.*$/gm, '')
                .replace(/\s+/g, ' ')
                .replace(/\s*([{}:;,])\s*/g, '$1')
                .replace(/\s*;\s*}/g, '}')
                .trim();
        }

        return minified;
    };

    const handleMinifyClick = () => {
        const minified = minifyCode(inputCode);
        setMinifiedCode(minified);
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Combined Minifier</h2>
            <textarea
                rows={10}
                cols={50}
                placeholder="Enter HTML, CSS, or JavaScript here"
                value={inputCode}
                onChange={handleInputChange}
            />
            <button onClick={handleMinifyClick}>Minify Code</button>
            {minifiedCode && (
                <div>
                    <h4>Minified Code:</h4>
                    <textarea
                        rows={10}
                        cols={50}
                        value={minifiedCode}
                        readOnly
                    />
                </div>
            )}
        </div>
    );
};

export default CombinedMinifier;

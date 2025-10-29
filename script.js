     // --- 🗝️ "Master Key" ბაზის ნაწილები ---
        let wordDatabase = [];
        const LIGATURE_SYMBOL = '⫟';
        const SEPARATOR_SYMBOL = '◡';
        const LEADING_JOINER = '◟';
        const PARAGRAPH_BREAK = '⌋';
        
        // 🌟 განახლებული სიმბოლოების მასივი ყველა ბრჭყალის ჩათვლით
        const symbols = [ '\n', PARAGRAPH_BREAK, LIGATURE_SYMBOL, SEPARATOR_SYMBOL, LEADING_JOINER,
                             '!', '"', '#', '$', '%', '&', "'", '’', '(', ')', '*', '+', ',', '-', '.', '/', ':', ';', '<', '=', '>', '?', '@', '[', '\\', ']', '^', '_', '`', '{', '|', '}', '~',
                             '“', '”', '‘', '’', '«', '»', '„', '“' ];
        
        const topEmojis = [ '😂','❤️','👍','😭','🙏','😊','🤣','🥰','😍','✔','✨','🥺','🔥','🤔','❤','💀','💯','🎉','😉','😁', '👀','😢','👏','🙌','✅','💔','👌','🤞','😔','😬','😎','😅','🙃','🙂','😍','😘','😗','😋','😛', '😜','🤪','🤨','🧐','🤓','🤩','🥳','😏','😒','😞','😟','😠','😡','🤬','🤯','😳','🥵','🥶','😱', '😨','😰','😥','😓','🤗','🤭','🤫','🤥','😶','😐','😑','🙄','😯','😦','😧','😮','😲','🥱','😴', '🤤','😪','😵','🤐','🥴','🤢','🤮','🤧','😷','🤒','🤕','🤑','🤠','😈','👿','👹','👺','🤡','💩', '👻','👽','👾','🤖','🎃','😺','😸','😹','😻' ];
        const numbers = [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9' ];
        const punctuationRegex = /[!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~’“’”«»„]/;
        
        // 🌟 განახლებული წინა სასვენი ნიშნები (გახსნის სიმბოლოები)
        const leadingPunctuation = [ '(', '[', '{', '"', '“', '‘', '«' ];
        
        const wordRegex = /^\w+['’]?\w+$/;
        
        let lastTranslation = { tokens: [], hexCodes: [] };

        // --- ✅ ფუნქცია: ფერების გრაფის გახსნა/დაკეცვა (შეკეთებული) ---
        function toggleColorSwatches() {
            const container = document.getElementById('colorSwatchesContainer');
            const button = document.getElementById('toggleSwatchesButton');
            // 'expanded' კლასის გამოყენება CSS-ში max-height-ის გადასატვირთად
            const isExpanded = container.classList.toggle('expanded'); 
            
            if (isExpanded) {
                button.innerHTML = '◀️ გრაფის დაკეცვა';
            } else {
                button.innerHTML = '▶️ გრაფის გახსნა';
            }
        }
        
        // --- 🌟 ფუნქცია: ფერების კოპირება ---
        function copyHexCodes() {
            const outputArea = document.getElementById('colorsOutput');
            const copyButton = document.getElementById('copyHexButton');
            
            navigator.clipboard.writeText(outputArea.value)
                .then(() => {
                    const originalText = copyButton.innerHTML;
                    copyButton.innerHTML = '✅ დაკოპირდა!';
                    copyButton.style.backgroundColor = '#28a745'; // მწვანე აქცენტი
                    copyButton.disabled = true;

                    setTimeout(() => {
                        copyButton.innerHTML = originalText;
                        copyButton.style.backgroundColor = '#6200EE';
                        copyButton.disabled = false;
                    }, 1500);
                })
                .catch(err => {
                    console.error('კოპირება ვერ მოხერხდა:', err);
                    alert('კოპირება ვერ მოხერხდა. სცადეთ ხელით მონიშვნა.');
                });
        }

        // --- 🌟 ფუნქცია: წინადადება -> ფერები (ენკოდერი) ---
        function translateSentenceToColors() {
            const sentence = document.getElementById('sentenceInput').value;
            const swatchesContainer = document.getElementById('colorSwatchesContainer');
            const toggleButton = document.getElementById('toggleSwatchesButton');
            swatchesContainer.innerHTML = '';
            
            // 1. ტექსტის ნორმალიზაცია და აბზაცების ჩანაცვლება
            const normalizedSentence = sentence.replace(/’/g, "'");
            const paragraphNormalizedSentence = normalizedSentence.replace(/(\r?\n\s*\r?\n)+/g, ` ${PARAGRAPH_BREAK} `);

            let rawTokens = [];
            
            // 2. ტოკენიზაცია რიცხვების გათვალისწინებით
            const numberRegex = /(\d+)/g;
            const splitByNumbers = paragraphNormalizedSentence.split(numberRegex).filter(t => t.length > 0);
            
            for (const part of splitByNumbers) {
                if (part.match(/^\d+$/)) {
                    rawTokens.push(...part.split(''));
                } else {
                    const subTokens = part.match(/\s+|(\w+'\w+|\w+|[^\w\s])/g) || [];
                    rawTokens.push(...subTokens);
                }
            }

            // 3. კონტროლის სიმბოლოების ($⫟$, $◡$, $◟$, $⌋$) ლოგიკა
            let tokensWithControlSymbols = [];
            const tokenRegex = /\w+'?\w+|[ა-ჰ]+/;
            
            for (let i = 0; i < rawTokens.length; i++) {
                const current = rawTokens[i];
                const next = rawTokens[i + 1];
                const prev = rawTokens[i - 1];
                const prevActual = tokensWithControlSymbols[tokensWithControlSymbols.length - 1];
                const isCurrentPunctuation = punctuationRegex.test(current) && current !== '\n';
if (finalIndex === -1 && (wordRegex.test(lowerToken) || numbers.includes(lowerToken) || tokenRegex.test(lowerToken)) && lowerToken !== '\n' && lowerToken !== SEPARATOR_SYMBOL && lowerToken !== LEADING_JOINER && lowerToken !== PARAGRAPH_BREAK) {
    
    // 1. სიტყვის ლოკალურად დამატება (მხოლოდ მიმდინარე სესიისთვის!)
    wordDatabase.push(lowerToken);
    finalIndex = wordDatabase.length - 1;

    console.log(`✅ [Local Master Key Expanded] სიტყვა: "${lowerToken}" დაემატა ლოკალურად ინდექსით: ${finalIndex}`);
    
    // 2. ახალი სიტყვის გაგზავნა Webhook-ზე შესანახად
    const WEBHOOK_URL = 'https://webhook.site/dc924964-1cf1-469c-8ac9-504296bc7fc7'; // <-- ჩასვით თქვენი ბმული!

    fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            new_word: lowerToken,
            timestamp: new Date().toISOString()
        })
    })
    .then(() => { 
        console.log("✅ ახალი სიტყვა წარმატებით გაიგზავნა ლოგირებისთვის."); 
        document.getElementById('masterKeyStatus').textContent = `Master Key ჩაიტვირთა! (${wordDatabase.length} ჩანაწერი) + ახალი სიტყვა ("${lowerToken}") გაიგზავნა ლოგზე!`;
    })
    .catch(err => console.error("❌ Webhook-ზე გაგზავნის შეცდომა:", err));
}
                // 3.1. $⌋$ ლოგიკა: აბზაცის ნიშანი
                if (current === PARAGRAPH_BREAK) {
                    tokensWithControlSymbols.push(PARAGRAPH_BREAK);
                    continue;
                }

                // 3.2. იგნორირება: თუ ტოკენი მხოლოდ space-ია, გამოტოვეთ.
                if (current.match(/^\s+$/)) continue;
                
                // 3.3. $◟$ ლოგიკა: სიტყვა [space] წინა სასვენი ნიშანი (გახსნის სიმბოლოები)
                if (leadingPunctuation.includes(current) &&
                    prev && prev.match(/^\s+$/) &&
                    prevActual && tokenRegex.test(prevActual)) {
                    
                    tokensWithControlSymbols.push(LEADING_JOINER);
                    tokensWithControlSymbols.push(current.toLowerCase());
                    continue;
                }
                
                // 3.4. $⫟$ ლოგიკა: სიტყვა-პუნქტუაცია-სიტყვა
                if (isCurrentPunctuation &&
                    prevActual && tokenRegex.test(prevActual) &&
                    next && tokenRegex.test(next) && !next.match(/^\s+$/)) {
                    
                    tokensWithControlSymbols.push(LIGATURE_SYMBOL);
                    tokensWithControlSymbols.push(current.toLowerCase());
                    tokensWithControlSymbols.push(LIGATURE_SYMBOL);
                    continue;
                }
                
                // 3.5. $◡$ ლოგიკა: სიტყვა [space] - [space] სიტყვა
                if (current === '-' && prev && prev.match(/^\s+$/) && next && next.match(/^\s+$/)) {
                    tokensWithControlSymbols.push(SEPARATOR_SYMBOL);
                    tokensWithControlSymbols.push(current.toLowerCase());
                    tokensWithControlSymbols.push(SEPARATOR_SYMBOL);
                    continue;
                }
                
                // 3.6. ყველა სხვა შემთხვევა
                tokensWithControlSymbols.push(current);
            }
            
            // 4. ფერებად და ვიზუალიზაციად გადაქცევა + Master Key-ს გაფართოება
            let outputHexCodes = [];
            let processedTokens = [];
            
            for (const token of tokensWithControlSymbols) {
                
                const lowerToken = (token === '\n' || token === LIGATURE_SYMBOL || token === SEPARATOR_SYMBOL || token === LEADING_JOINER || token === PARAGRAPH_BREAK) ? token : token.toLowerCase();
                
                let finalIndex = wordDatabase.indexOf(lowerToken);
                
                // Master Key-ს ავტომატური გაფართოება
                if (finalIndex === -1 && (wordRegex.test(lowerToken) || numbers.includes(lowerToken) || tokenRegex.test(lowerToken)) && lowerToken !== '\n' && lowerToken !== LIGATURE_SYMBOL && lowerToken !== SEPARATOR_SYMBOL && lowerToken !== LEADING_JOINER && lowerToken !== PARAGRAPH_BREAK) {
                    
                    wordDatabase.push(lowerToken);
                    finalIndex = wordDatabase.length - 1;
                    
                    console.log(`✅ [Master Key Expanded] სიტყვა: "${lowerToken}" დაემატა ლოკალურად ინდექსით: ${finalIndex}`);
                    
                    // ასინქრონულად ვუგზავნით თხოვნას სერვერს ფაილის განახლებისთვის
                    fetch('save_word.php', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ word: lowerToken })
                    })
                    .then(res => res.json())
                    .then(data => {
                        if (data.status === "ok") { console.log("✅ სერვერზე (words_monster.txt) განახლდა:", data.added); }
                        else if (data.status === "exists") { console.log("ℹ️ სერვერზე უკვე არსებობს:", data.word); }
                        else { console.warn("⚠️ სერვერზე ვერ დაემატა:", data.message); }
                    })
                    .catch(err => console.error("❌ სერვერზე შენახვის შეცდომა:", err));
                }
                // --- Master Key ლოგიკის დასასრული ---

                const swatch = document.createElement('div');
                let hex = '#DDDDDD';
                
                if (finalIndex !== -1) { hex = '#' + finalIndex.toString(16).padStart(6, '0'); }

                outputHexCodes.push(hex);
                processedTokens.push(token);
                
                // --- TOOLTIP ლოგიკა ---
                swatch.style.backgroundColor = hex;
                let tooltipToken = (token === '\n') ? "LINE BREAK" :
                                     (token === PARAGRAPH_BREAK ? "PARAGRAPH BREAK (\n\n)" :
                                     (token === LIGATURE_SYMBOL ? "LIGATURE (NO SPACE)" :
                                     (token === SEPARATOR_SYMBOL ? "SEPARATOR (SPACE BOTH SIDES)" :
                                     (token === LEADING_JOINER ? "LEADING JOINER (SPACE BEFORE)" : token))));
                swatch.title = `Token: "${tooltipToken}"\nHex: ${hex}\nIndex: ${finalIndex}`;
                
                let cssClass = 'color-swatch';
                if (token === '\n') {
                    cssClass = 'color-swatch-linebreak'; // ხაზის გაწყვეტა
                }
                else if (token === PARAGRAPH_BREAK) {
                    cssClass = 'color-swatch-paragraphbreak'; // აბზაცის გაწყვეტა
                }
                // ✅ განახლებული ლოგიკა: ვიწრო კუბიკები სასვენი ნიშნებისთვის/სიმბოლოებისთვის
                else if (symbols.includes(lowerToken) || numbers.includes(lowerToken) || lowerToken === LIGATURE_SYMBOL || lowerToken === SEPARATOR_SYMBOL || lowerToken === LEADING_JOINER) {
                    cssClass = 'color-swatch-punctuation';
                }

                swatch.className = cssClass;
                swatchesContainer.appendChild(swatch);
            }
            
            document.getElementById('colorsOutput').value = outputHexCodes.join(' ');
            lastTranslation = { tokens: processedTokens, hexCodes: outputHexCodes };
            document.getElementById('exportSVGButton').disabled = false;
            document.getElementById('exportJPGButton').disabled = false;
            
            // 5. ტოგლის ლოგიკა: ვმალავთ/ვაჩენთ ღილაკს. (80px არის დაახლოებით 2 მწკრივი)
            setTimeout(() => {
                if (swatchesContainer.scrollHeight > 80) {
                    toggleButton.style.display = 'block';
                } else {
                    toggleButton.style.display = 'none';
                    swatchesContainer.classList.remove('expanded');
                    toggleButton.innerHTML = '▶️ გრაფის გახსნა';
                }
            }, 50);
        }

        // --- ფუნქცია: ფერები -> წინადადება (დეკოდერი) ---
        function translateColorsToSentence() {
            const colorString = document.getElementById('colorsInput').value.trim();
            const colorTokens = colorString.split(/\s+/);
            let outputWords = [];
            
            for (let i = 0; i < colorTokens.length; i++) {
                const hex = colorTokens[i];
                let decodedToken = "[?]";
                let isDecodedTokenNumber = false;
                let isDecodedTokenLigature = false;
                let isDecodedTokenSeparator = false;
                let isDecodedTokenLeadingJoiner = false;
                let isDecodedTokenParagraphBreak = false;

                // 1. ტოკენის დეკოდირება
                if (hex.startsWith('#') && hex.length === 7) {
                    const index = parseInt(hex.substring(1), 16);
                    if (index >= 0 && index < wordDatabase.length) {
                        decodedToken = wordDatabase[index];
                        if (numbers.includes(decodedToken)) {
                            isDecodedTokenNumber = true;
                        }
                        if (decodedToken === LIGATURE_SYMBOL) {
                            isDecodedTokenLigature = true;
                        }
                        if (decodedToken === SEPARATOR_SYMBOL) {
                            isDecodedTokenSeparator = true;
                        }
                        if (decodedToken === LEADING_JOINER) {
                            isDecodedTokenLeadingJoiner = true;
                        }
                        if (decodedToken === PARAGRAPH_BREAK) {
                             isDecodedTokenParagraphBreak = true;
                        }
                    } else {
                        decodedToken = "[?]";
                    }
                }
                
                // 2. თუ ტოკენი კონტროლის სიმბოლოა, არ უნდა გამოჩნდეს საბოლოო ტექსტში.
                if (!isDecodedTokenLigature && !isDecodedTokenSeparator && !isDecodedTokenLeadingJoiner && !isDecodedTokenParagraphBreak) {
                    outputWords.push(decodedToken);
                }

                // --- 3. ავტომატური space-ის ლოგიკა ---

                // 3.1. $⌋$ ლოგიკა: თუ მიმდინარე ტოკენი არის აბზაცის ნიშანი ($⌋$), ის ამატებს ორმაგ ხაზის გაწყვეტას.
                if (isDecodedTokenParagraphBreak) {
                     outputWords.push('\n\n');
                     continue;
                }

                // 3.2. $◡$ ლოგიკა: თუ მიმდინარე ტოკენი არის სეგმენტატორი ($◡$), ის უპირობოდ ამატებს space-ს.
                if (isDecodedTokenSeparator) {
                    if (i < colorTokens.length - 1) {
                        outputWords.push(' ');
                    }
                    continue;
                }
                
                // 3.3. $◟$ ლოგიკა: თუ მიმდინარე ტოკენი არის Leading Joiner ($◟$), ის უპირობოდ ამატებს space-ს (მარცხნივ).
                if (isDecodedTokenLeadingJoiner) {
                     if (i < colorTokens.length - 1) {
                         outputWords.push(' ');
                     }
                     continue;
                }

                // 3.4. არ დავამატოთ space, თუ მიმდინარე ტოკენი არის ხაზის გაწყვეტა ($\text{\n}$)
                if (decodedToken === '\n') continue;
                
                // 3.5. არ დავამატოთ space, თუ მიმდინარე ტოკენი არის ლიგატურა ($⫟$)
                if (isDecodedTokenLigature) continue;

                // 3.6. არ დავამატოთ space, თუ მიმდინარე ტოკენი არის ციფრი $\text{AND}$ შემდეგი ტოკენიც ციფრია (ციფრული მონოლითი).
                if (isDecodedTokenNumber) {
                     if (i < colorTokens.length - 1) {
                         const nextHex = colorTokens[i+1];
                         let nextIndex = -1;
                         if (nextHex.startsWith('#') && hex.length === 7) {
                             nextIndex = parseInt(nextHex.substring(1), 16);
                         }
                         
                         if (nextIndex !== -1 && numbers.includes(wordDatabase[nextIndex])) {
                             continue;
                         }
                     }
                }

                // 3.7. არ დავამატოთ space, თუ შემდეგი ტოკენი არის კონტროლის სიმბოლო ($⫟$, $◡$, $◟$ ან $⌋$).
                let nextIsControlSymbol = false;
                if (i < colorTokens.length - 1) {
                    const nextHex = colorTokens[i+1];
                    let nextIndex = -1;
                    if (nextHex.startsWith('#') && hex.length === 7) {
                        nextIndex = parseInt(nextHex.substring(1), 16);
                    }
                    if (nextIndex !== -1) {
                        const nextToken = wordDatabase[nextIndex];
                        if (nextToken === LIGATURE_SYMBOL || nextToken === SEPARATOR_SYMBOL || nextToken === LEADING_JOINER || nextToken === PARAGRAPH_BREAK) {
                             nextIsControlSymbol = true;
                        }
                    }
                }
                if (nextIsControlSymbol) continue;
                
                // 3.8. არ დავამატოთ space, თუ შემდეგი ტოკენი არის სასვენი ნიშანი, რომელიც სიტყვას უნდა მიეერთოს (დახურვის ნიშანი).
                if (i < colorTokens.length - 1) {
                    const nextHex = colorTokens[i+1];
                    let nextIndex = -1;
                    if (nextHex.startsWith('#') && hex.length === 7) {
                        nextIndex = parseInt(nextHex.substring(1), 16);
                    }
                    
                    if (nextIndex !== -1) {
                        const nextToken = wordDatabase[nextIndex];
                        // თუ შემდეგი არის სასვენი ნიშანი და ის არ არის სიტყვის ან ციფრის ნაწილი
                        if (punctuationRegex.test(nextToken) && !wordRegex.test(nextToken) && !numbers.includes(nextToken) && !topEmojis.includes(nextToken)) {
                             // ვამოწმებთ, რომ ეს არ არის ფრჩხილის/ბრჭყალის გახსნის ნიშანი (რადგან მათ $◟$ ამუშავებს)
                             if (!leadingPunctuation.includes(nextToken)) {
                                 continue;
                             }
                        }
                    }
                }

                // 3.9. არ დავამატოთ space, თუ მიმდინარე ტოკენი არის წინა სასვენი ნიშანი (გახსნის სიმბოლოები).
                if (leadingPunctuation.includes(decodedToken)) {
                    continue;
                }
                
                // 3.10. თუ არცერთი ზემოთ მოცემული პირობა არ სრულდება, ვამატებთ space-ს
                outputWords.push(' ');
            }
            
            // ბოლოში ზედმეტი space-ის წაშლა
            document.getElementById('sentenceOutput').value = outputWords.join('').trimEnd();
        }

        // --- ფუნქცია, რომელიც SVG მონაცემებს აბრუნებს ---
        function generateSVGContent() {
            const { tokens, hexCodes } = lastTranslation;
            if (hexCodes.length === 0) {
                return null;
            }

            // 1. ფიქსირებული ტილოს ზომა
            const FIXED_SIZE = 500;
            const SVG_WIDTH = FIXED_SIZE;
            const SVG_HEIGHT = FIXED_SIZE;

            const tokenCount = hexCodes.length;
            let cols;
            if (tokenCount <= 9) {
                 cols = Math.min(tokenCount, 3);
            } else {
                 cols = Math.ceil(Math.sqrt(tokenCount));
            }
            const rows = Math.ceil(tokenCount / cols);

            // 3. დინამიური უჯრის ზომის გამოთვლა
            const margin = 2; 
            const totalMarginX = margin * (cols + 1);
            const totalMarginY = margin * (rows + 1);
            
            const dynamicCellSize = Math.min(
                (SVG_WIDTH - totalMarginX) / cols,
                (SVG_HEIGHT - totalMarginY) / rows
            );
            const cellSize = Math.max(1, dynamicCellSize); 
            
            // დინამიური პარამეტრები
            const wordRadius = cellSize * 0.1; 
            const punctSize = cellSize * 0.4; 
            const punctRadius = punctSize / 2;
            const lineBreakWidth = Math.max(2, cellSize * 0.1); 

            // 4. Layout ლოგიკა
            let elements = [];
            let currentX = margin;
            let currentY = margin;
            let currentColumn = 0;
            let currentRow = 0;

            for (let i = 0; i < hexCodes.length; i++) {
                const hex = hexCodes[i];
                const token = tokens[i];
                const isPunctuation = symbols.includes(token) || numbers.includes(token) || token === LIGATURE_SYMBOL || token === SEPARATOR_SYMBOL || token === LEADING_JOINER;

                // 4.1. ახალი ხაზის ლოგიკა
                if (token === '\n' || token === PARAGRAPH_BREAK) {
                    
                    const lineColor = (token === '\n') ? '#ff4500' : '#ff0000';
                    const lineX = margin; 
                    
                    elements.push(`<rect x="${lineX}" y="${currentY - cellSize - margin}" width="${lineBreakWidth}" height="${cellSize + 2 * margin}" fill="${lineColor}" />`);
                    
                    currentX = margin;
                    currentY += cellSize + margin;
                    currentColumn = 0;
                    currentRow++;
                    
                    if (currentY + cellSize + margin > SVG_HEIGHT) {
                        break;
                    }
                    
                    continue; 
                }

                // 4.2. ახალ მწკრივზე გადასვლა
                if (currentColumn >= cols) {
                    currentX = margin;
                    currentY += cellSize + margin;
                    currentColumn = 0;
                    currentRow++;
                }

                if (currentY + cellSize + margin > SVG_HEIGHT) {
                    break; 
                }

                if (isPunctuation) {
                    // 4.3. პუნქტუაციის ლოგიკა (მრგვალი წერტილი)
                    const dotY = currentY + (cellSize - punctSize) / 2;
                    const dotX = currentX + (cellSize - punctSize) / 2; 
                    
                    elements.push(`<rect x="${dotX}" y="${dotY}" width="${punctSize}" height="${punctSize}" fill="${hex}" rx="${punctRadius}" ry="${punctRadius}" />`);
                    
                } else {
                    // 4.4. სიტყვის ლოგიკა (მომრგვალებული კუბიკი)
                    elements.push(`<rect x="${currentX}" y="${currentY}" width="${cellSize}" height="${cellSize}" fill="${hex}" rx="${wordRadius}" ry="${wordRadius}" />`);
                }
                
                // 4.5. პოზიციის განახლება
                currentX += cellSize + margin;
                currentColumn++;
            }
            
            // 5. საბოლოო SVG-ის შედგენა
            let svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="${SVG_WIDTH}" height="${SVG_HEIGHT}" viewBox="0 0 ${SVG_WIDTH} ${SVG_HEIGHT}">`;
            
            elements.forEach(el => svgContent += el);

            const dataString = hexCodes.join(' ');
            svgContent += `<desc id="color-translator-data">${dataString}</desc>`;
            svgContent += `</svg>`;
            
            return { svg: svgContent, width: SVG_WIDTH, height: SVG_HEIGHT };
        }
        
        // --- SVG ექსპორტის ფუნქცია ---
        function generateAndDownloadSVG() {
            const result = generateSVGContent();
            if (!result) return;
            
            const blob = new Blob([result.svg], {type: 'image/svg+xml'});
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `color_translation_${Date.now()}.svg`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }
        
        // --- ✅ განახლებული ფუნქცია: JPG ექსპორტი (თეთრი ფონით) ---
        function generateAndDownloadJPG() {
            const result = generateSVGContent();
            if (!result) return;
            
            // 1. SVG მონაცემების მიღება
            const svgData = result.svg;
            const svgWidth = result.width;
            
            // 2. Base64 ენკოდირება
            const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
            const svgUrl = URL.createObjectURL(svgBlob);
            
            // 3. Image ობიექტის შექმნა SVG-ს ჩასატვირთად
            const img = new Image();
            
            img.onload = function() {
                URL.revokeObjectURL(svgUrl);
                
                // 4. Canvas-ის შექმნა (1000x1000px)
                const canvas = document.createElement('canvas');
                const scale = 1000 / svgWidth;
                canvas.width = 1000;
                canvas.height = 1000;
                const ctx = canvas.getContext('2d');
                
                // 5. JPG-სთვის ფონის დამატება: თეთრი ფონი (#ffffff)
                ctx.fillStyle = '#ffffff'; // <-- ეს არის ცვლილება
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                // 6. SVG-ის დახატვა Canvas-ზე
                ctx.scale(scale, scale);
                ctx.drawImage(img, 0, 0);
                
                // 7. JPG ფაილის გადმოწერა
                const jpgUrl = canvas.toDataURL('image/jpeg', 0.9);
                const a = document.createElement('a');
                a.href = jpgUrl;
                a.download = `color_translation_${Date.now()}.jpg`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            };
            
            img.onerror = function(err) {
                console.error("SVG to Canvas-ზე გადაყვანის შეცდომა:", err);
                alert("JPG ექსპორტი ვერ მოხერხდა. შესაძლოა SVG მონაცემები ძალიან დიდია ან ბრაუზერი არ უჭერს მხარს.");
            };

            img.src = svgUrl;
        }

        function handleSVGImport(event) {
            const file = event.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (e) => {
                const text = e.target.result;
                const match = text.match(/<desc id="color-translator-data">(.*?)<\/desc>/);
                
                if (match && match[1]) {
                    const hexCodes = match[1];
                    document.getElementById('colorsInput').value = hexCodes;
                    document.getElementById('toSentenceButton').click();
                } else {
                    alert("ეს SVG ფაილი არ შეიცავს 'color-translator-data'-ს. იმპორტი ვერ მოხერხდა.");
                }
            };
            reader.readAsText(file);
        }

        async function loadWordList() {
            const buttons = document.querySelectorAll('button');
            const statusText = document.getElementById('masterKeyStatus');
            try {
                // Symbols მოიცავს ახალ ბრჭყალებს
                wordDatabase = symbols.concat(topEmojis).concat(numbers); 
                statusText.textContent = `იტვირთება ${wordDatabase.length} სიმბოლო... ახლა ვიწერ 1.5M სიტყვას...`;
                const response = await fetch('words_monster.txt');
                const text = await response.text();
                const words = text.split('\n')
                                     .map(word => word.trim().toLowerCase())
                                     .filter(word => word.length > 0);
                wordDatabase = wordDatabase.concat(words);
                statusText.textContent = `Master Key ჩაიტვირთა! (${wordDatabase.length} ჩანაწერი)`;
                statusText.style.backgroundColor = '#f6ffed';
                statusText.style.borderColor = '#b7eb8f';
                statusText.style.color = '#389e0d';
                buttons.forEach(button => button.disabled = false);
            } catch (error) {
                console.error('Master Key-ს ჩატვირთვის შეცდომა:', error);
                statusText.textContent = 'ბაზის ჩატვირთვა ვერ მოხერხდა. დარწმუნდი, რომ words_monster.txt ფაილი აქ არის და სერვერით ხარ.';
            }
        }

        document.getElementById('toColorsButton').addEventListener('click', translateSentenceToColors);
        document.getElementById('toSentenceButton').addEventListener('click', translateColorsToSentence);
        document.getElementById('exportSVGButton').addEventListener('click', generateAndDownloadSVG);
        document.getElementById('exportJPGButton').addEventListener('click', generateAndDownloadJPG);
        document.getElementById('svgUploader').addEventListener('change', handleSVGImport);
        document.getElementById('toggleSwatchesButton').addEventListener('click', toggleColorSwatches);
        document.getElementById('copyHexButton').addEventListener('click', copyHexCodes);
        window.addEventListener('load', loadWordList);

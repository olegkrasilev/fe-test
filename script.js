// Использование `async/await` и стрелочных функций

const fetchFileAwaitVersion = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.text();
    } catch (error) {
        console.error(`Fetch error: ${error}`);
        return null;
    }
};

const processFileAwaitVersion = async (url) => {
    const content = await fetchFileAwaitVersion(url);
    if (!content) return '';

    try {
        const json = JSON.parse(content);
        if (Array.isArray(json)) {
            const phrases = await Promise.all(json.map(file => processFileAwaitVersion(`https://fe.it-academy.by/Examples/words_tree/${file}`)));
            return phrases.join(' ');
        }
    } catch (e) {
        return content;
    }
};

const mainAwaitVersion = async () => {
    const rootUrl = 'https://fe.it-academy.by/Examples/words_tree/root.txt';
    const phrase = await processFileAwaitVersion(rootUrl);
    document.getElementById('result-await').innerText = phrase;
};

mainAwaitVersion();

// Использование `then` и традиционных функций

function fetchFileThenVersion(url) {
    return fetch(url)
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.text();
        })
        .catch(error => {
            console.error(`Fetch error: ${error}`);
            return null;
        });
}

function processFileThenVersion(url) {
    return fetchFileThenVersion(url).then(content => {
        if (!content) return '';

        try {
            const json = JSON.parse(content);
            if (Array.isArray(json)) {
                const promises = json.map(function(file) {
                    return processFileThenVersion(`https://fe.it-academy.by/Examples/words_tree/${file}`);
                });
                return Promise.all(promises).then(function(phrases) {
                    return phrases.join(' ');
                });
            }
        } catch (e) {
            return content;
        }
    });
}

function mainThenVersion() {
    const rootUrl = 'https://fe.it-academy.by/Examples/words_tree/root.txt';
    processFileThenVersion(rootUrl).then(function(phrase) {
        document.getElementById('result-then').innerText = phrase;
    });
}

mainThenVersion();

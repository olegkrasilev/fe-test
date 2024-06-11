// Использование `async/await` и стрелочных функций

const fetchFile = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.text();
    } catch (error) {
        console.error(`Fetch error: ${error}`);
        return null;
    }
};

const processFile = async (url) => {
    const content = await fetchFile(url);
    if (!content) return '';

    try {
        const json = JSON.parse(content);
        if (Array.isArray(json)) {
            const phrases = await Promise.all(json.map(file => processFile(`https://fe.it-academy.by/Examples/words_tree/${file}`)));
            return phrases.join(' ');
        }
    } catch (e) {
        return content;
    }
};

const main = async () => {
    const rootUrl = 'https://fe.it-academy.by/Examples/words_tree/root.txt';
    const phrase = await processFile(rootUrl);
    document.getElementById('result').innerText = phrase;
};

main();

// Использование `then` и традиционных функций

function fetchFile(url) {
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

function processFile(url) {
    return fetchFile(url).then(content => {
        if (!content) return '';

        try {
            const json = JSON.parse(content);
            if (Array.isArray(json)) {
                const promises = json.map(function(file) {
                    return processFile(`https://fe.it-academy.by/Examples/words_tree/${file}`);
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

function main() {
    const rootUrl = 'https://fe.it-academy.by/Examples/words_tree/root.txt';
    processFile(rootUrl).then(function(phrase) {
        document.getElementById('result').innerText = phrase;
    });
}

main();
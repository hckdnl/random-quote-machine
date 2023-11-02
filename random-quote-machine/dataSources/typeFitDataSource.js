const typeFitDataSource = {
    name:   'Type Fit',
    getQuote: async () => {
        const httpResult = await fetch('https://type.fit/api/quotes');
        const jsonData = await httpResult.json();
        const quote = jsonData[Math.floor(Math.random() * jsonData.length)];

        // Check if quote.author contains "type.fit"; if so, extract the actual author's name
        if (quote.author && quote.author.includes("type.fit")) {
            quote.author = quote.author.replace(", type.fit", "").trim(); 
            // Remove "type.fit" and trim any extra spaces
        }
        return {
            quote: quote.text,
            author: quote.author,
        };
    }
}
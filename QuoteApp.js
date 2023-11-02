class QuoteApp {
    constructor() {
        this.quoteBtn = document.getElementById('new-quote');
        this.quoteSection = document.querySelector('Section#quoteDisplay');
        this.quoteElements = {
            quote: this.quoteSection.querySelector('blockquote'),
            author: this.quoteSection.querySelector('p.author'),
            source: this.quoteSection.querySelector('p.source'),
        };

        this.quoteBtn.addEventListener('click', this.updatePageWithQuote.bind(this));

        document.addEventListener('DOMContentLoaded', this.updatePageWithQuote.bind(this));

        this.dataSources = [typeFitDataSource, arrayDataSource];

        this.tweetBtn = document.getElementById('tweet-quote')
        this.tweetBtn.addEventListener('click', this.tweetQuote.bind(this));


    }

    getRandomDataSource() {
        return this.dataSources[Math.floor(Math.random() * this.dataSources.length)];
    }

    async getRandomQuote() {
        const dataSource = this.getRandomDataSource();
        const quote = await dataSource.getQuote();

        return {...quote, source: dataSource.name};

    }

    async updatePageWithQuote () {
        this.quoteSection.classList.add('loading');

        this.quoteBtn.setAttribute('disabled', 'disabled');

        const randomQuoteResult = await this.getRandomQuote();
        const {quote, author = 'Unknown', source} = randomQuoteResult;

        const quoteWithSymbol = `<i class="fa fa-quote-left"></i> ${quote}`;

        this.quoteForSharing = `
        ${quote}
        - ${author}
        
        Source: ${source}
        `;

        setTimeout(()=> {
            this.quoteElements.quote.innerHTML = quoteWithSymbol;
            this.quoteElements.author.textContent = ` - ${author}`;
            this.quoteElements.source.textContent = `Source: ${source}`;
    
            this.setRandomBackgroundColor();
            this.quoteSection.classList.remove('loading');
            this.quoteBtn.removeAttribute('disabled')
        }, 800);


    }
    tweetQuote() {
        const tweetLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(this.quoteForSharing)}`;
        window.open(tweetLink, '_blank');
    }

    generateRandomNumer(){
        return Math.floor(Math.random() * 255);
    }

    generateRandomColorCode() {
        const r = this.generateRandomNumer();
        const g = this.generateRandomNumer();
        const b = this.generateRandomNumer();

        return {
            r,
            g,
            b,
        };
    }
    setRandomBackgroundColor() {
        const {r, g, b } = this.generateRandomColorCode();

        document.body.style.setProperty('--backgroundColor', `rgb(${r}, ${g}, ${b})`);
    };
    
}

new QuoteApp();
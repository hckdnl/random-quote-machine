import React, { useEffect, useState, } from 'react'
import './App.scss';
import COLOR_ARRAY from './Colors';


let quoteDBUrl = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"


function App() {
  const [quote, setQuote] = useState("If you want to lift yourself up, lift up someone else.");
  const [author, setAuthor] = useState("Booker T. Washington");

  const [getColor, setgetColor] = useState("#FF6633")

  const [, setRandomNumber] = useState(0);
  const [quotesArray, setQuotesArray] = useState(null)

  const fetchQuotes = async (url) => {
    const response = await fetch(url)
    const parsedJSON = await response.json()
    setQuotesArray(parsedJSON.quotes)
    console.log(parsedJSON)
  }

  useEffect(() => {
    fetchQuotes(quoteDBUrl)
  }, [])



  const getRandomNumber = () => {
    let randomInteger = Math.floor(quotesArray.length * Math.random())
    setRandomNumber(randomInteger)
    setgetColor(COLOR_ARRAY[randomInteger])
    setQuote(quotesArray[randomInteger].quote)
    setAuthor(quotesArray[randomInteger].author)
  }


  return (
    <div className="App">
      <header className="App-header" style={{ backgroundColor: getColor, color: getColor }}>
        <div id="quote-box" style={{ color: getColor }}>
          <p id="text">
            "{quote}"
          </p>
          <p id="author">
            - {author}
          </p>
          <div class="button">
            <a id="tweet-quote" style={{ backgroundColor: getColor }} target="_blank" 
            rel="noreferrer" 
            href={encodeURI(`http://www.twitter.com/intent/tweet?text=${quote} -${author}`)}>
              <FontAwesomeIcon icon={FaSymbol}/></a>
        </div>
        <button id="new-quote" style={{ backgroundColor: getColor }} onClick={() => getRandomNumber()}>New Quote</button>
    </div>

      </header >
    </div >
  );
}

export default App;

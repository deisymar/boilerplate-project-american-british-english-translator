const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

//declare each words collection
const onlyFromAmerican = Object.keys(americanOnly)
const onlyToBritish = Object.values(americanOnly)
const american = Object.keys(americanToBritishSpelling)
const british = Object.values(americanToBritishSpelling)
const americanTitles = Object.keys(americanToBritishTitles)
const britishTitles = Object.values(americanToBritishTitles)
const onlyFromBritish = Object.keys(britishOnly)
const onlyToAmerican = Object.values(britishOnly)

// declare replacement fuction
const replacer = (wordTranslated, translateStr, replacedStr) => {
  translateStr.forEach((word, i) => {
    const regex = new RegExp(`(?<=^|[.'"\\s])${word}(?=[.'"\\s]|$)`, 'gi')
    wordTranslated = wordTranslated.replace(regex, `<span class="highlight">${replacedStr[i]}</span>`)
  })
  return wordTranslated;
}

const replacerTitle = (wordTranslated, translateStr, replacedStr) => {
  translateStr.forEach((word, i ) => {
    const regex = new RegExp(`(?<=^|[.'"\\s])${word}(?=[.'"\\s]|$)`, 'gi')
    replacedStr[i] = replacedStr[i].replace(replacedStr[i][0], replacedStr[i][0].toUpperCase())
    wordTranslated = wordTranslated.replace(regex, `<span class="highlight">${replacedStr[i]}</span>`)
  })

  return wordTranslated
}

const replacerClock = (symTranslated, translateSym, replacedSym) => {
  const regex = new RegExp(`(\\d{1,2})${translateSym}(\\d{1,2})`, 'g')

  return symTranslated.replace(regex, `<span class="highlight">$1${replacedSym}$2</span>`)
}

class Translator {
  translate(words, locale) {
    let wordChange = words;

    if(locale === 'american-to-british') {
      wordChange = replacer(wordChange, american, british)
      wordChange = replacer(wordChange, onlyFromAmerican, onlyToBritish)
      wordChange = replacerTitle(wordChange, americanTitles, britishTitles)
      wordChange = replacerClock(wordChange, ':', '.')
    } else if(locale ==='british-to-american') {
      wordChange = replacer(wordChange, british, american)
      wordChange = replacer(wordChange, onlyFromBritish, onlyToAmerican)
      wordChange = replacerTitle(wordChange, britishTitles, americanTitles)
      wordChange = replacerClock(wordChange, '.', ':')
    }
    return  (wordChange !== words ?  wordChange : "Everything looks good to me!")
  }
  
}

module.exports = Translator;
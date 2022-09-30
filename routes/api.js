'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      //console.log("req.body :>> ", req.body);
      const { text, locale } = req.body;
      if (text === undefined || !locale) {
        res.json({ error: 'Required field(s) missing' });
        return;
      }
      if (text === "") {
        res.json({ error: 'No text to translate' });
        return;
      }
      if (locale !== "american-to-british" && locale !== "british-to-american") {
        res.json({ error: 'Invalid value for locale field' });
        return;
      }
      let translation = translator.translate(text, locale);
      
      /*if (translation == text || !translation) {
        res.json({ text, translation: "Everything looks good to me!" });
      } else {
        res.json({ text: text, translation: translation[1] });
      }*/
      res.json({ text: text, translation: translation });
  });

};

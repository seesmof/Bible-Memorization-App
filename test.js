fetch(`https://bible.helloao.org/api/available_translations.json`)
  .then((request) => request.json())
  .then((availableTranslations) => {
    console.log(
      "The API has the following translations:",
      availableTranslations,
    );
  });

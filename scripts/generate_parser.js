import('lidy-js/parser/node_parse.js').then(({ preprocess }) => {
  preprocess('src/lidy/dockerComposeGrammar.yml');
});

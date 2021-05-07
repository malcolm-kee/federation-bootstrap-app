const federationEndpoint = process.env.FEDERATION_ENDPOINT;

fetch(federationEndpoint)
  .then((res) => res.json())
  .then(({ endpoints }) => {
    window._endpoints = endpoints;
    import('./init');
  })
  .then(() => {
    console.log('done importing bootstrap in bootstrap app');
  })
  .catch(() => {
    console.log('error importing bootstrap in bootstrap app');
  });

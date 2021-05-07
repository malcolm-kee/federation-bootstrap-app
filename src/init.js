import('@mkeeorg/shell-app/App')
  .then(() => {
    console.log('import shell app bootstrap done');
  })
  .catch((err) => {
    console.error('import shell app bootstrap error', err);
  });

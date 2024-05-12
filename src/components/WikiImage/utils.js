import md5Hex from 'md5-hex';

export const twFilenameFix = (filename) => (filename.length !== 0 ? filename[0].toUpperCase() + filename.slice(1) : '');

export const linkGenerator = (filename) => {
  // const randInt = Math.floor(Math.random() * 5) + 1;
  const md5name = md5Hex(filename);
  return 'https://vignette.wikia.nocookie.net/nekowiz/images/'
  + `${md5name.charAt(0)}/${md5name.charAt(0)}${md5name.charAt(1)}/`
  + `${filename}/revision/latest?path-prefix=zh`;
};

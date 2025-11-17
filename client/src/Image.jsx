// // Image.jsx
// export default function Image({ src, ...rest }) {
//   const finalSrc =
//     src && (src.startsWith('http://') || src.startsWith('https://'))
//       ? src
//       : `http://localhost:4000/uploads/${src}`;

//   return <img src={finalSrc} alt="" {...rest} />;
// }
export default function Image({src,...rest}) {
  src = src && src.includes('https://')
    ? src
    : 'http://localhost:4000/uploads/'+src;
  return (
    <img {...rest} src={src} alt={''} />
  );
}
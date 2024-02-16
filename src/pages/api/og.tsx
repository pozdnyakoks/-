// import { ImageResponse } from '@vercel/og';
// import Image from 'next/image';

// export const config = {
//   runtime: 'edge',
// };

// export default function handler() {
//   const src = '/OG.png'; // Путь к изображению в папке public

//   return new ImageResponse(
//     (
//         <Image width={1200} height={630} src={src} alt='Jobs in Cosmos Blockchain' />
//     ),
//     {
//       width: 1200,
//       height: 630,
//     },
//   );
// }
import { NextApiHandler } from 'next';
import fs from 'fs';
import path from 'path';

const handler: NextApiHandler = (req, res) => {
  const src = '/OG.png'; // Путь к изображению в папке public
  const filePath = path.join(process.cwd(), 'public', src);
  const fileContents = fs.readFileSync(filePath);

  res.setHeader('Content-Type', 'image/png');
  res.status(200).send(fileContents);
};

export default handler;
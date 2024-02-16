import { ImageResponse } from '@vercel/og';
import Image from 'next/image';

export const config = {
  runtime: 'edge',
};

export default function handler() {
  const src = '/OG.png'; // Путь к изображению в папке public

  return new ImageResponse(
    (
        <Image width={1200} height={630} src={src} alt='Jobs in Cosmos Blockchain' />
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
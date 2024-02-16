import { ImageResponse } from '@vercel/og';
import Image from 'next/image';

export const config = {
  runtime: 'edge',
};

export default async function handler() {
  const imageData = await fetch(new URL('./OG.png', import.meta.url)).then(
    (res) => res.arrayBuffer(),
  );

  const base64ImageData = Buffer.from(imageData).toString('base64');
  const src = `data:image/png;base64,${base64ImageData}`;

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          background: '#f6f6f6',
          width: '100%',
          height: '100%',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Image width={256} height={256} src={src} alt='Jobs in Cosmos Blockchain' />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
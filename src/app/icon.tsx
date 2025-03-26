import { ImageResponse } from 'next/og'
import MonLogo from '../../public/images/mon_logo.png'

// Image metadata
const size = {
  width: 32,
  height: 32,
}
const contentType = 'image/png'

export { contentType, size }

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
        <link rel="icon" href={MonLogo.src} type="image/png" sizes="32x32" />
    ),
    {
      ...size,
    }
  )
}

// Set the favicon in the document head
if (typeof document !== 'undefined') {
  const link = document.createElement('link');
  link.rel = 'icon';
  link.href = MonLogo.src;
  link.type = 'image/png';
  link.sizes = '32x32';
  document.head.appendChild(link);
}

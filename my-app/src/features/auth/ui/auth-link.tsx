import Link from 'next/link';

export function AuthLink({text, linkText, url}: {
  text: string;
  linkText: string;
  url: string;
}) {
  return (
    <div className="text-center text-sm text-primary/50">
      {text}{' '}
      <Link href={url} className="font-medium text-primary hover:underline">
        {linkText}
      </Link>
    </div>
  )
}


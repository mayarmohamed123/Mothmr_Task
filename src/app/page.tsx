import { redirect } from 'next/navigation';

// Root redirects to /ads (primary content)
export default function HomePage() {
  redirect('/ads');
}

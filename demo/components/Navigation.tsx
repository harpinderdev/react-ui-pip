'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Home' },
    { href: '/controlled', label: 'Controlled' },
    { href: '/snap-corners', label: 'Snap' },
    { href: '/drag-handle', label: 'Drag Handle' },
  ];

  return (
    <nav className="nav">
      <div className="nav-content">
        <div className="nav-title">React UI PiP</div>
        <ul className="nav-links">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`nav-link ${pathname === link.href ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

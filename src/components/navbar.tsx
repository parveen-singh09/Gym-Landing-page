import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/button";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Schedule", href: "#schedule" },
  { label: "Gallery", href: "#gallery" },
  { label: "Plans", href: "#plans" },
  { label: "Contacts", href: "#contacts" },
];

const Navbar = () => {
  return (
    <header className="flex items-center justify-between px-6 py-5 md:px-10">
      <Link href="/" className="text-2xl font-bold tracking-tight text-white">
        <span className="text-primary">.</span>TITAN
      </Link>

      <nav className="hidden items-center gap-8 md:flex">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-sm text-white/80 transition-colors hover:text-white"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm">
          Log in
        </Button>
        <Button variant="white" size="sm">
          Try for free
          
        </Button>
      </div>
    </header>
  );
};

export default Navbar;

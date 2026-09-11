import Link from "next/link";

const marqueeItems = Array.from({ length: 8 }, () => "Fresh fast delivered");

const companyLinks = [
  { label: "Home", href: "/" },
  { label: "Contact us", href: "#contact" },
  { label: "Delivery zone", href: "#delivery" },
];

const menuLeft = [
  "Appetizers",
  "Salads",
  "Pizzas",
  "Lunch favorites",
  "Main dishes",
];

const menuRight = [
  "Side dish",
  "Brunch",
  "Desserts",
  "Beverages",
  "Fish & Sea foods",
];

const NomNomLogo = () => (
  <svg
    width="46"
    height="46"
    viewBox="0 0 46 46"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <path
      d="M8 28c0-2 1.5-4 4-4h3.5c.8-4.5 4.6-8 9.5-8s8.7 3.5 9.5 8H38c2.5 0 4 2 4 4v2H8v-2Z"
      fill="#EF4444"
    />
    <path
      d="M23 8c1.2 0 2.2.9 2.2 2.1V13h-4.4V10.1C20.8 8.9 21.8 8 23 8Z"
      fill="#EF4444"
    />
    <ellipse cx="23" cy="16" rx="6.5" ry="2.2" fill="#EF4444" />
    <path
      d="M11 32h24c.8 0 1.5.7 1.5 1.5S35.8 35 35 35H11c-.8 0-1.5-.7-1.5-1.5S10.2 32 11 32Z"
      fill="#EF4444"
    />
    <path
      d="M15 36.5c3 3 13 3 16 0"
      stroke="#EF4444"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
  </svg>
);

export const Footer = () => {
  return (
    <footer className="mt-auto w-full bg-[#18181B] text-white">
      <div className="overflow-hidden bg-[#EF4444] py-6">
        <div className="flex items-center justify-center">
          {
            <div className="flex items-center justify-center gap-8 pr-8">
              {marqueeItems.map((text, index) => (
                <span
                  key={`${text}-${index}`}
                  className="flex items-center justify-center gap-8 text-[11px] font-extrabold tracking-tight whitespace-nowrap"
                >
                  {text}
                </span>
              ))}
            </div>
          }
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-14 sm:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.1fr_1fr_1.6fr_0.9fr]">
          <div className="flex flex-col items-start">
            <NomNomLogo />
            <p className="mt-3 text-lg font-extrabold leading-none">NomNom</p>
            <p className="mt-1 text-xs text-zinc-400">Swift delivery</p>
          </div>

          <div>
            <p className="mb-4 text-[11px] font-medium tracking-[0.16em] text-zinc-500 uppercase">
              Nomnom
            </p>
            <ul className="flex flex-col gap-3 text-sm font-medium">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-zinc-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-[11px] font-medium tracking-[0.16em] text-zinc-500 uppercase">
              Menu
            </p>
            <div className="grid grid-cols-2 gap-x-8">
              <ul className="flex flex-col gap-3 text-sm font-medium">
                {menuLeft.map((item) => (
                  <li key={item}>
                    <a href="#menu" className="hover:text-zinc-300">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
              <ul className="flex flex-col gap-3 text-sm font-medium">
                {menuRight.map((item) => (
                  <li key={item}>
                    <a href="#menu" className="hover:text-zinc-300">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <p className="mb-4 text-[11px] font-medium tracking-[0.16em] text-zinc-500 uppercase">
              Follow us
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/80"
              >
                <img
                  src="/images/face.png"
                  alt="Facebook"
                  className="h-4 w-4"
                />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/80"
              >
                <img
                  src="/images/insta.png"
                  alt="Instagram"
                  className="h-4 w-4"
                />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-zinc-700 pt-6 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <p>Copy right 2024 © Nomnom LLC</p>
          <div className="flex flex-wrap gap-6">
            <a href="#privacy" className="hover:text-zinc-300">
              Privacy policy
            </a>
            <a href="#terms" className="hover:text-zinc-300">
              Terms and conditoin
            </a>
            <a href="#cookies" className="hover:text-zinc-300">
              Cookie policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

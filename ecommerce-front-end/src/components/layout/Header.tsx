"use client";

import Image from "next/image";
import { HeaderIcon } from "./header-icon";
import Link from "next/link";
import { useState } from "react";
import { HeaderSearch } from "./header-search";

type MenuItem = {
  label: string;
  href: string;
};

export function Header() {
  const menu: MenuItem[] = [
    { label: "Sedas", href: "/categories/sedas" },
    { label: "Piteiras", href: "/categories/piteiras" },
    { label: "Cuias", href: "/categories/cuias" },
    { label: "Kits", href: "/categories/kits" },
  ];
  const [menuOpened, setMenuOpened] = useState(false);
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="bg-black text-white text-lg p-4 text-center">
        <strong>FRETE GRATIS</strong> para toda São Paulo nas compras acima de R$
        50,00 <strong>APROVEITE!</strong>
      </div>
      <div className="w-full max-w-6xl mx-auto p-6">
        <div className="flex items-center">
          <div className="w-32">
            <Link href={"/"}>
              <Image
                src="/assets/ui/tabacremeLogo.png"
                alt="das"
                width={120}
                height={20}
              />
            </Link>
          </div>
          <div className="flex-1">
            <div className="w-full hidden md:flex items-center px-6 gap-6">
              <div className="flex-1">
                  <ul className="flex gap-10 font-bold text-gray-600">
                    {menu.map((item) => (
                      <li key={item.label}>
                        <Link key={item.label} href={item.href}>
                        {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
              </div>
                <HeaderSearch />
            </div>
          </div>
          <div className="flex gap-4 ">
            <Link href={"/my-orders"}>
              <HeaderIcon
                src={"/assets/ui/user-line.png"}
                alt={"Perfil"}
                srcSelected={"/assets/ui/user-line.png"}
              />
            </Link>
            <Link href={"/cart"}>
              <HeaderIcon
                src={"/assets/ui/shopping-bag-4-line.png"}
                alt={"Carrinho"}
                srcSelected={"/assets/ui/shopping-bag-4-line.png"}
              />
            </Link>
            <div
              className="md:hidden"
              onClick={() => setMenuOpened(!menuOpened)}
            >
              <HeaderIcon
                src={"/assets/ui/menu-line.png"}
                alt={"Menu"}
                selected={menuOpened}
                srcSelected={"/assets/ui/menu-line-white.png"}
              />
            </div>
          </div>
        </div>
      </div>
      {menuOpened && (
        <div className="md:hidden pb-6">
          {menu.map((item) => (
            <Link key={item.label} href={item.href}>
              <div className="p-6 border border-gray-200 flex items-center justify-between">
                <div className="font-medium text-lg text-[#7F7F7F]">
                  {item.label}
                </div>
                <div>
                  <Image
                    src={"/assets/ui/arrow-up-right.png"}
                    alt={"Ir a categoria"}
                    width={24}
                    height={24}
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
      <div className="p-6 pt-0 md:hidden">
        <HeaderSearch />
      </div>
    </header>
  );
}

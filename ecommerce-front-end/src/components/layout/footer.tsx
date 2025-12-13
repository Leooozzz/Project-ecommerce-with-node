import Image from "next/image";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";

type FooterItem = {
  label: string;
  href: string;
};

type SocialMediaProps = {
  img: string;
  href: string;
};

export const Footer = () => {
  const menu: FooterItem[] = [
    { label: "Sedas", href: "/category/sedas" },
    { label: "Piteiras", href: "/category/piteiras" },
    { label: "Cuias", href: "/category/cuias" },
    { label: "Kits", href: "/category/kits" },
  ];

  const socialMedia: SocialMediaProps[] = [
    { img: "/assets/ui/instagram-line.png", href: "https://www.instagram.com/tabacreme" },
    { img: "/assets/ui/linkedin-line.png", href: "https://www.linkedin.com/tabacreme" },
    { img: "/assets/ui/facebook-line.png", href: "https://www.facebook.com/tabacreme" },
    { img: "/assets/ui/twitter-x-fill.png", href: "https://x.com/tabacreme" },
  ];

  return (
   <footer className="mt-10">
    <div className="w-full max-w-6xl mx-auto p-6 flex flex-col md:flex-row items-center gap-6 ">
                    <Image
                        src={'/assets/ui/mail-send-line-balck.png'}
                        alt=""
                        width={68}
                        height={68}
                    />
                    <div className="text-center md:text-left">
                        <h3 className="font-bold text-2xl mb-6 md:mb-2">Fique por dentro das promoções</h3>
                        <p className="text-gray-400">Coloque seu e-mail e seja o primeiro a saber</p>
                    </div>
                    <form method="POST" className="w-full flex-1 flex flex-col gap-4 md:flex-row">
                        <Input
                            type="text"
                            className="flex-1 border border-gray-200 rounded-sm outline-0 h-16"
                            placeholder="Qual seu e-mail?"
                        />

                        <button type="submit" className="w-full md:w-50 px-6 py-2 bg-black text-white border-0 rounded-sm">
                            Enviar
                        </button>
                    </form>
                </div>

    <div className="bg-black w-full py-10 mt-10">
     <div className="max-w-6xl mx-auto px-4">

    <div className="mt-4 flex flex-col md:flex-row justify-between items-center gap-6">
      <Image
        src="/assets/ui/tabacremelogo-white.png"
        alt="Logo Tabacreme"
        width={144}
        height={48}
      />

      <nav>
        <ul className="flex flex-wrap justify-center md:justify-start gap-6 md:gap-10">
          {menu.map((item) => (
            <li key={item.label} className="text-lg md:text-xl text-white">
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>

    <Separator className="bg-white mt-6" />

    <div className="mt-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-14">

  
      <div className="w-full md:w-auto text-center md:text-left">
        <h1 className="font-bold text-xl text-white">Precisa de ajuda?</h1>

        <div className="flex flex-col md:flex-row gap-6 md:gap-10 mt-6 justify-center md:justify-start">

          <div className="p-4 border border-gray-500 rounded-md flex items-center gap-4">
            <Image src="/assets/ui/mail-line.png" alt="Email" height={26} width={26} />
            <h2 className="font-bold text-lg md:text-xl text-white break-all">
              tabacreme@gmail.com
            </h2>
          </div>

          <div className="p-4 border border-gray-500 rounded-md flex items-center gap-4">
            <Image src="/assets/ui/phone-line.png" alt="Telefone" height={26} width={26} />
            <h2 className="font-bold text-lg md:text-xl text-white">
              (00) 0 99125-4798
            </h2>
          </div>

        </div>
      </div>


      <div className="w-full md:w-auto text-center md:text-left">
        <h2 className="text-white font-bold text-lg">Acompanhe nas redes sociais</h2>

        <div className="mt-6 p-4 border border-gray-500 rounded-md flex justify-center md:justify-start gap-8">
          {socialMedia.map((item) => (
            <Link key={item.href} href={item.href} target="_blank">
              <Image src={item.img} alt="Rede social" height={27} width={27} />
            </Link>
          ))}
        </div>
      </div>

    </div>

    <Separator className="bg-white mt-10" />

    <div className="flex justify-center mt-8">
      <h1 className="text-lg md:text-2xl text-white">Feito por Leonardo De Souza</h1>
    </div>

  </div>
  </div>
</footer>

  );
};

import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  selected?: boolean;
  srcSelected: string;
}

export const HeaderIcon = ({ src, alt, selected, srcSelected }: Props) => {
  return (
    <div
      className={`
        border border-gray-200 size-12 rounded-sm flex justify-center items-center 
        hover:bg-gray-100 
        ${selected ? "bg-blue-600" : ""}
      `}
    >
      <Image
        src={selected ? srcSelected : src}
        alt={alt}
        width={24}
        height={24}
      />
    </div>
  );
};

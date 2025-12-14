"use client"
import Image from "next/image";
import { FilterItem } from "./filter-item";
import { useState } from "react";

type Props = {
  id: string;
  name: string;
  items: {
    id: string;
    label: string;
  }[];
};

export const FilterGroup = ({ id, name, items }: Props) => {
  const [opened, setOpened] = useState(true);

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center border-b border-gray-200 pb-4 mb-8">
        <div className="flex-1 font-bold text-xl">{name}</div>

        <div
          className="size-8 flex justify-center items-center cursor-pointer"
          onClick={() => setOpened(!opened)}
        >
          <Image
            src="/assets/ui/arrow-left-s-line.png"
            alt=""
            width={24}
            height={24}
            className={`${opened ? "rotate-0" : "rotate-180"} transition-all`}
          />
        </div>
      </div>

      <div
        className={`flex flex-col gap-4 overflow-hidden transition-all ${
          opened ? "max-h-96" : "max-h-0"
        }`}
      >
        {items.map((item) => (
          <FilterItem key={item.id} groupId={id} item={item} />
        ))}
      </div>
    </div>
  );
};

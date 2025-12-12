import { Input } from "../ui/input";
import { Search, SearchIcon } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "../ui/input-group";
export const HeaderSearch = () => {
  return (
    <InputGroup className="h-12">
      <InputGroupInput placeholder="O que você procura?." type="search" />
      <InputGroupAddon>
        <SearchIcon  className="size-6"/>
      </InputGroupAddon>
      <InputGroupAddon align="inline-end"></InputGroupAddon>
    </InputGroup>
  );
};

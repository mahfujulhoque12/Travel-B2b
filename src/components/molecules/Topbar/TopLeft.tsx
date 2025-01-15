import { SearchIcons } from "@/components/atoms/Icons";
import Span from "@/components/atoms/Span";
import { FaAnglesRight } from "react-icons/fa6";

import React from "react";
import { Button } from "@/components/atoms/Button";
import Breadcrumb from "../global/Breadcumb";

const TopLeft = () => {
  return (
    <div>
      <Button className="text-black text-base font-semibold m-0">
        <Breadcrumb />
      </Button>

      <div className="flex items-center mt-1.5  gap-2">
        <Span className="flex items-center text-[#8391A1] text-sm font-normal gap-1">
          <SearchIcons  /> search <FaAnglesRight />
        </Span>
        <Button className="text-sm font-semibold text-[#257CEB]">
          <Breadcrumb />
        </Button>
      </div>
    </div>
  );
};

export default TopLeft;

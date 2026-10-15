"use client";

import { Button, SearchField } from "@heroui/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

const SearchFoods = () => {
  const [searchInp, setSearchInp] = useState("");

  //   step - 1 : get search params, current pathname and router
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handleSearch = () => {
    // step - 2 : convert search params
    const params = new URLSearchParams(searchParams);

    // step-3 : Condition check and set params
    if (searchInp) {
      params.set("search", searchInp);
    } else {
      params.delete("search");
    }

    // step-4 : redirect in the main page
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex gap-4 flex-3">
      <SearchField
        type="text"
        className="flex-2"
        value={searchInp}
        onChange={setSearchInp}
      >
        <SearchField.Group>
          <SearchField.SearchIcon />
          <SearchField.Input className="w-full" placeholder="Search foods..." />
        </SearchField.Group>
      </SearchField>
      <Button onClick={handleSearch} variant="primary">
        Search
      </Button>
    </div>
  );
};

export default SearchFoods;

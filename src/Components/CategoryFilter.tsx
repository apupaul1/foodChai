"use client";

import { Select, ListBox } from "@heroui/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

const CategoryFilter = () => {
  //   step - 1 : get search params, current pathname and router
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handleFilter = (value: React.Key | null) => {

    const category = String(value)

    // step - 2 : convert search params
    const params = new URLSearchParams(searchParams);

    // step-3 : Condition check and set params
    if (category) {
      params.set("category", category);
    } else {
      params.delete("category");
    }

    // step-4 : redirect in the main page
    router.push(`${pathname}?${params.toString()}`);
  };
  return (
    <Select
      onChange={handleFilter}
      className="w-[256px]"
      placeholder="Select category"
    >
      <Select.Trigger>
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover>
        <ListBox>
          <ListBox.Item id="all" textValue="all">
            All Category
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="burger" textValue="burger">
            Burger
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="pizza" textValue="pizza">
            Pizza
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="dessert" textValue="dessert">
            Dessert
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="beverage" textValue="beverage">
            Beverage
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="rice" textValue="rice">
            Rice
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="dish" textValue="dish">
            Dish
            <ListBox.ItemIndicator />
          </ListBox.Item>
        </ListBox>
      </Select.Popover>
    </Select>
  );
};

export default CategoryFilter;

"use client";

import FoodCard from "@/Components/Cards/FoodCard";
import { IFood } from "@/food.type";
import { Button, ListBox, SearchField, Select } from "@heroui/react";
import { useEffect, useState } from "react";

const FoodClientPage = () => {
  const [foods, setFoods] = useState<IFood[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchInp, setSearchInp] = useState("");
  const [filterInp, setFilterInp] = useState("");

  const [searchVal, setSearchVal] = useState("");

  const getFoods = async (category = "", search = "") => {
    setLoading(true);

    const res = await fetch(
      `https://phi-lab-server.vercel.app/api/v1/lab/foods?category=${category}&search=${search}`,
    );
    const data = await res.json();

    setFoods(data.data);

    setLoading(false);
  };

  useEffect(() => {
    getFoods(filterInp, searchVal);
  }, [searchVal, filterInp]);

  const handleSearch = () => {
    setSearchVal(searchInp);
  };

  const handleFilter = (value: React.Key | null) => {
    if (value === null || value === "all") {
      setFilterInp("");
      return;
    }

    setFilterInp(String(value));
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-center font-bold text-2xl my-4">
        Food Available ({foods.length})
      </h1>

      <div className="flex my-8 gap-10 border p-4 rounded-2xl">
        <div className="flex gap-4 flex-3">
          <SearchField
            isRequired
            name="search"
            className="flex-2"
            value={searchInp}
            onChange={setSearchInp}
          >
            <SearchField.Group>
              <SearchField.SearchIcon />
              <SearchField.Input
                className="w-full"
                placeholder="Search foods..."
              />
            </SearchField.Group>
          </SearchField>
          <Button onClick={handleSearch} variant="primary">
            Search
          </Button>
        </div>

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
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <p className="text-xl text-gray-300">Loading delicious food...</p>
        </div>
      ) : foods.length === 0 ? (
        <div>
          <div className="text-center py-20">
            <p className="text-2xl text-gray-400">No Foods Found</p>
            <p className="text-gray-500 mt-2">
              Try different search terms or category
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {" "}
          {foods.map((food: any) => (
            <FoodCard key={food.id} food={food}></FoodCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default FoodClientPage;

import FoodCard from "@/Components/Cards/FoodCard";
import CategoryFilter from "@/Components/CategoryFilter";
import SearchFoods from "@/Components/SearchFoods";
import { IFood } from "@/food.type";
import React from "react";

const getFoods = async (category = "", search = "") => {
  const res = await fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/foods?category=${category}&search=${search}`,
  );
  const data = await res.json();

  return data.data;
};

const FoodServerPage = async ({ searchParams }: { searchParams: any }) => {
  const {search, category} = await searchParams;


  const foods: IFood[] = await getFoods(category, search);

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-center font-bold text-2xl my-4">
        Food Available ({foods.length})
      </h1>

      <div className="flex my-8 gap-10 border p-4 rounded-2xl">
        <SearchFoods></SearchFoods>
        <CategoryFilter></CategoryFilter>
      </div>

      {foods.length === 0 ? (
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
          {foods.map((food: any) => (
            <FoodCard key={food.id} food={food}></FoodCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default FoodServerPage;

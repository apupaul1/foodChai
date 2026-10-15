export interface IFood {
    id: string,
    dish_name: string,
    category: string,
    alternative_names: string[],
    main_ingredients: string[],
    rating: number,
    price: string,
    cuisine: string,
    origin_and_popularity: string,
    cooking_steps: string[],
    image_link: string
}
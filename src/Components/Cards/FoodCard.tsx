import { IFood } from "@/food.type";
import { Button, Card } from "@heroui/react";

const FoodCard = ({ food }: { food: IFood }) => {
  return (
    <div>
      <Card className=" gap-2">
        <img
          alt="Indie Hackers community"
          className="pointer-events-none aspect-square w-14 rounded-2xl object-cover select-none"
          loading="lazy"
          src={food.image_link}
        />
        <Card.Header>
          <Card.Title>{food.dish_name}</Card.Title>
          <Card.Description>Price: {food.price} BDT</Card.Description>
        </Card.Header>
        <Card.Footer className="flex gap-2">
          <Button fullWidth>View Details</Button>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default FoodCard;

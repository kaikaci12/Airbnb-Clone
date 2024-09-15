"use client";
import Container from "../Container";
import { TbBeach } from "react-icons/tb";
import { GiWindmill } from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import CategoryBox from "../CategoryBox";
export const categories = [
  {
    label: "Beach",
    icon: TbBeach,
    description: "This property is close to beach",
  },
  {
    label: "Windmills",
    icon: GiWindmill,
    description: "This property has Windmills",
  },
  {
    label: "Modern",
    icon: MdOutlineVilla,
    description: "This property has Windmills",
  },
];
const Categories = () => {
  return (
    <Container>
      <div className="pt-4 flex items-center justify-between overflow-x-auto">
        {categories.map((category) => {
          return (
            <CategoryBox
              key={category.label}
              label={category.label}
              description={category.description}
              icon={category.icon}
            />
          );
        })}
      </div>
    </Container>
  );
};
export default Categories;

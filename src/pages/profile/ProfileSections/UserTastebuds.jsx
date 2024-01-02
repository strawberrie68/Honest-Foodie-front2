import CategoryCard from "../../../components/CategoryCard";
import { foodCategories } from "../../../shared/foodCategories";
const UserTastebuds = () => {
  return (
    <div className="mt-10 flex flex-col">
      {/* Taste Id Overview */}
      {/* TODO right now hard coded, but will be dynamic. Answers from quiz and user stats */}
      <div className="user-tasteId flex h-52 w-full flex-col justify-center rounded-3xl bg-black px-6 text-white">
        <div className="text-xxs font-thin">My taste id:</div>
        <div className="text-3xl font-medium tracking-wider">
          Veggie Gourmet
        </div>
        <div className="mt-4 text-xxs font-thin">
          I tend to like dishes that are strong in spices and uses seasonal
          veggies
        </div>
        <div className="mt-3 flex gap-2">
          <div className="rounded-xl border border-white px-2 text-xxxs">
            vegertarian
          </div>
          <div className="rounded-xl border border-white px-2 text-xxxs">
            herb-lover
          </div>
          <div className="rounded-xl border border-white px-2 text-xxxs">
            cheese
          </div>
        </div>
      </div>
      <div className="user-likes mt-8 flex h-52 w-full items-center rounded-xl border border-primary-gray-500 px-6">
        <div className="basis-1/2">
          <div>
            <div className="font-medium">I tend to like</div>
            <ul className="ml-4 mt-2 list-disc text-xxs	">
              <li>salads</li>
              <li>spices</li>
              <li>seasonal veggies</li>
            </ul>
          </div>
        </div>
        <div className="basis-1/2"></div>
      </div>
      <div className="mb-10 mt-10">
        <div className="font-medium">My favorite categories</div>
        {/* TODO - get users favorite tags /categories */}
        <div className="category-card-div mt-2 flex justify-between gap-1 overflow-x-scroll">
          {foodCategories.map((category) => (
            <CategoryCard icon={category.icon} name={category.name} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserTastebuds;

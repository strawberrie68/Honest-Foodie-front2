const CategoryCard = ({ icon, name }) => {
  return (
    <div className="m-px flex flex-col items-center justify-center p-4">
      <div className="flex h-[50px] w-[50px] items-center justify-center rounded-3xl bg-primary-gray-100">
        {icon}
      </div>
      <p className="mt-2 text-xxs font-semibold">{name}</p>
    </div>
  );
};

export default CategoryCard;

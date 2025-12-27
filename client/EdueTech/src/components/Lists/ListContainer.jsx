import NavBar from "../components/NavBar";



const ListContainer = ({ title, subtitle, items, renderCard }) => {
  return (
    <section className="px-6 py-10">
      {title && <h2 className="text-2xl font-bold mb-1">{title}</h2>}
      {subtitle && <p className="text-gray-500 mb-8">{subtitle}</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto w-3/4 ">
        {items.map((item, index) =>
          renderCard(item, index)
        )}
      </div>
    </section>
  );
};

export default ListContainer;

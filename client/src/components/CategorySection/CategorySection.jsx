import CategoryCard from "../CategoryCard/CategoryCard";
import categories from "../../data/categories";

function CategorySection(){
    return (
        <section className="bg-slate-50 py-24">
            <div className="mx-auto max-w-[1500px] px-6">
                <div className="text-center">
                    <h2 className="text-5xl font-bold text-slate-900">Browse Categories</h2>

                    <p className="mt-4 text-lg text-slate-500">Find auctions from your favorite categories.</p>
                </div>

                <div className="mt-16 grid grid-cols-4 gap-8">
                    {
                        categories.map((category) => (
                            <CategoryCard
                                key={category.id}
                                name={category.name}
                                auctions={category.auctions}
                                icon={category.icon}

                            />
                        ))
                    }
                </div>
            </div>
        </section>
    )
}

export default CategorySection
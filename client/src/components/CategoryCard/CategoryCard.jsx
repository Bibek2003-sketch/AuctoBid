
function CategoryCard({name, auctions, icon}) {
    const Icon = icon
    return(
        <div className="rounded-2xl bg-white p-8 shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl">
            <div className="text-5xl"><Icon /></div>

            <h3 className="mt-6 text-2xl font-bold text-slate-800">{name}</h3>

            <p className="mt-3 text-slate-500">{auctions} Live Auctions</p>
        </div>
    )
}

export default CategoryCard
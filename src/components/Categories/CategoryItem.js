import { Link } from "react-router-dom";

function CategoryItem({ category }) {
    return (
        <>
            <Link
                to={"/category/" + category.id}
                className='text-capitalize bg-content d-flex justify-content-center align-items-center text-darken p-3 category-item'>
                {category.name}
            </Link>
        </>
    );
}

export default CategoryItem;

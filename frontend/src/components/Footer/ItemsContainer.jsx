
import Item from "./Item";
import { RESOURCES } from "./Menus";
const ItemsContainer = () => {
    return (
        <div className="flex justify-center lg:grid-cols-2 gap-6 sm:px-8 px-52 py-8">
            <img
                src="./src/assets/LogoUIT.svg"
                alt="logoUIT"
            />
            <Item Links={RESOURCES} />

        </div>
    )
}

export default ItemsContainer


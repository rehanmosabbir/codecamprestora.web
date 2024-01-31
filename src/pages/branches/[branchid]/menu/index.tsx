import { MenuItem } from "@/components/MenuItem/MenuItem";
import { getAllMenuCategory, getAllMenuItem } from "@/services/menuItemService";

export default function Menu() {

  const { data: _menuCategory, isLoading: isMenuCategoryLoading } = getAllMenuCategory();
  const { data: _menuItem, isLoading: isMenuItemLoading } = getAllMenuItem();

  if (!isMenuCategoryLoading && !isMenuItemLoading) {
    const menuCategory = _menuCategory?.data;
    const menuItem = _menuItem?.data;
    return <MenuItem data={{ menuCategory, menuItem }} />
  }
}

export default function filterItem(item,searchQuery){
    return item.name.toLowerCase().includes(searchQuery.toLowerCase())
}
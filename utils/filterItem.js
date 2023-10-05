export default function filterItem(item,searchString){
    return item.name.toLowerCase().includes(searchString.toLowerCase())
}
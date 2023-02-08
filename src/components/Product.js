import { React, useState, useEffect } from "react";
import products from "../productsdata";
export default function Product() {
    function retriveItems(){
        return JSON.parse(localStorage.getItem("items"))
    }
    const [items, setItems] = useState(()=>{
        return retriveItems()|| []
    });
    const [searchKey, setSearchKey] = useState('')
    const [sorting, setSort] = useState('Popular')
    const [toggle, setToggle] = useState(true);
    var filterproducts = products;
    useEffect(()=>{
        if(localStorage.getItem('items')){
        console.log("List of items",items)
        }
    },[])
    useEffect(() => {
        localStorage.setItem('items', JSON.stringify(items));
    }, [items]);
   
    const addToCart = (i) => {
        console.log("Add to Cart",i)
        var item=items.find(item=>item.id==i.id)
        setItems((items) => [...items, i]);
    }
    const listv = (e) => {
        e.preventDefault();
        setToggle(false);
    }
    const gridV = (e) => {
        setToggle(true);
    }
    const filter = () => {
        if (searchKey) {
            return filterproducts = products.filter(product => { return product.name.toLowerCase().includes(searchKey) })
        }
        if (sorting != 'popular') {
            if (sorting == 'htol') {
                filterproducts = products.sort((a, b) => {
                    return -a.price + b.price;
                })
            }
            else {
                filterproducts = products.sort((a, b) => {
                    return a.price - b.price;
                })
            }
            console.log(filterproducts);
        }
    }
    return (
        <div class="bg-white" >
            <div class="flex justify-center py-4">
                <button class="mb-5 items-center mr-2 flex pt-2"><span className="border px-2 py-4" onClick={(e) => listv(e)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg></span><span onClick={(e) => gridV(e)} className="border px-2 py-4"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z" />
                </svg>
                    </span></button>
                <div class="mb-3 xl:w-128 pt-4">
                    <div class="input-group relative flex  items-stretch w-full mb-4">
                        <input type="search" value={searchKey} onChange={(e) => { setSearchKey(e.target.value) }} class="form-control mr-2  border relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Search Products" aria-label="Search" aria-describedby="button-addon2" />
                        <select id="select1" value={sorting} onChange={(e) => setSort(e.target.value)} class="px-6 mr-2 text-lg py-4  rounded-md w-72" >
                            <option value="popular">Popular</option>
                            <option value="htol">High To Low</option>
                            <option value="ltoh">Low To High</option>
                        </select>
                        <button class="px-6 text-lg font-semibold py-4 border rounded-md bg-indigo-600 text-white" onClick={filter()}>Filter</button>
                    </div>
                </div>
            </div>
            <div class="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <div class="grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8" style={{ display: toggle ? 'grid' : '' }}>
                    {filterproducts.length && (filterproducts.map(product => {
                        return <div key={product._id}>
                            <div className='rounded bg-cl-white overflow-hidden my-2 w-60 px-4 pt-4 border border-solid border-gray-300 md:text-base text-sm'>
                                <div className='text-center px-2'>
                                    <img src={product.image} alt={product.name} loading="lazy" className='h-32 w-32 pt-4 mx-4' />
                                    </div>
                                <div class="py-4">
                                    <h1 class="font-semibold h-16">{product.name}</h1>
                                    <div className="flex justify-between items-center pt-4">
                                        <p class="text-lg"><strong><span>&#8377;</span> {product.price}</strong>
                                            <small class="text-gray-500 text-sm">/-</small></p>
                                        <div className="bg-gray-200 text-white cursor-pointer rounded-full border border-rose-400 px-3 py-1 mr-2 mb-2 bg-gradient-to-r from-red-600 to-pink-500 mt-2 rounded-full" onClick={() => addToCart(product)}>Add To Cart</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }))}
                </div>
            </div>
        </div>
    );
}
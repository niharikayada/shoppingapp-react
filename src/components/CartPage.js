import { React, useState, useEffect } from "react";
import discounts from "../discounts";
import { Link } from "react-router-dom";
export default function CartPage() {
    const [data, setItems] = useState([]);
    const [discount, setDiscount] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [flag, setFlag] = useState(false);
    useEffect(() => {
        let items = JSON.parse(localStorage.getItem('items'));
        if (items) {
            setItems(items);
        }
    }, []);
    const handleDiscountChange = (e) => {
        setDiscount(e.target.value);
        setFlag(false);
        setErrorMessage("");
    }
    const deleteFromcart = (deleteProduct) => {
        let items = JSON.parse(localStorage.getItem("items"));
        items = items.filter((item) => item.id !== deleteProduct.id);
        localStorage.setItem("items", JSON.stringify(items));
        setItems(items);
    }
    const handleDecrement = (p_id) => {
        setItems(data =>
            data.map((item) =>
                p_id === item.id ? { ...item, qty: item.qty - (item.qty > 1 ? 1 : 0) } : item
            )
        );

    }
    function discountAmt() {
        var total = 0;
        data.forEach((carts) => {
            total += parseFloat(carts.price * carts.qty);

        });
        return total * 0.1;
    }
    function discountCheck(val) {
        const listdiscount = discounts;
        console.log("json", listdiscount, val)
        const validation = listdiscount.find((i) => i.coupon == val)
        if (validation) {
            console.log("Valid", validation)
            setErrorMessage("Coupon is Valid");
            setFlag(true);
            return "Coupon Valid"
        }
        else {
            console.log("Invalid")
            setErrorMessage("Invalid coupon")
            setFlag(false)
            return "Coupon Invalid"
        }
    }
    function total() {
        var total = 0;
        data.forEach((carts) => {
            total += parseFloat(carts.price * carts.qty);
        });
        return total;
    }
    const handleIncrement = (p_id) => {
        setItems(data =>
            data.map((item) =>
                p_id === item.id ? { ...item, qty: item.qty + (item.qty < 10 ? 1 : 0) } : item
            )
        );
    }
    return (
        <div>
            {data.length == 0 ? <div className="grid place-items-center mt-10">
                <img src="../../empty.png" className="pt-5 mt-6"></img>
                <div className="text-xl text-indigo-500 underline"> <Link to='/'>Continue Shopping</Link></div>
            </div> : <div>
                <div class="bg-gray-100 pt-20">
                    <h1 class="mb-10 text-center text-2xl font-bold">Cart Items</h1>
                    <div class="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
                        <div class="rounded-lg md:w-2/3">
                            {data.length && (data.map(product => {
                                return <div class="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start" key={product._id}>
                                    <img src={product.image} alt={product.name} loading="lazy" class="w-full rounded-lg sm:w-40" />
                                    <div class="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                                        <div class="mt-5 sm:mt-0">
                                            <h2 class="text-lg font-bold text-gray-900">{product.name}</h2>
                                            <p class="text-base pt-4"><span>Price: </span><span>&#8377;</span>{product.price}</p>
                                            <div className="pt-2"><div class="flex items-center border-gray-100">
                                                <span class="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50" onClick={() => handleDecrement(product.id)}> - </span>
                                                <span className="p-2">{product.qty}</span>
                                                <span class="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50" onClick={() => handleIncrement(product.id)}> + </span>
                                            </div></div>
                                        </div>
                                        <div class="">
                                            <div class="text-right">
                                                <span className="cursor-pointer text-3xl " onClick={() => { deleteFromcart(product) }}>x</span>
                                            </div>
                                            <div class="pt-4">
                                                <div>Total</div>
                                                <span className="font-bold"> {product.qty * product.price}</span>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            }))}
                        </div>
                        <div class="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                            <div class="mb-2 flex justify-between">
                                <p class="text-gray-700">Total Amount</p>
                                <p class="text-gray-700"> {total()}</p>
                            </div>
                            <div class="flex justify-between">
                                <p class="text-gray-700">Discount coupon
                                    {flag && <div> <span>{discount}(10%) applied</span></div>}
                                </p>
                            </div>
                            <div class="flex justify-between pt-4">
                                <input type="search" value={discount} onChange={handleDiscountChange} class="form-control px-2 rounded mr-2 py-1.5  border relative  text-base font-normal text-gray-700 bg-white w-60 border border-solid border-gray-300" placeholder="Enter coupon" aria-label="Search" aria-describedby="button-addon2" />
                                <button className="border border-gray-300 p-2 bg-blue-500 text-white rounded-xl" onClick={() => discountCheck(discount)}>Apply </button>
                            </div>
                            <p className="pt-2" style={{color: flag ? '#3B82F6' : 'red'}}>{errorMessage && <div className="error"> {errorMessage} </div>}</p>

                            <hr class="my-4" />
                            <div class="flex justify-between">
                                <p class="text-gray-700">Subtotal</p>
                                <p class="text-gray-700">{Math.floor(total() / 1.21)}</p>
                            </div>
                            <div class="flex justify-between">
                                <p class="text-gray-700">Service tax (21%)</p>
                                <p class="text-gray-700">{total() - Math.floor(total() / 1.21)}</p>
                            </div>
                            <div class="flex justify-between">
                                <p class="text-gray-700">Discount (10%)</p>
                                <p className="text-gray-700">{flag ? <div>-{discountAmt()}</div> : <div>0</div>}</p>

                            </div>
                            <div class="flex justify-between pt-2">
                                <p class="text-lg font-bold">Total</p>
                                <div class="">
                                    <p class="mb-1 text-lg font-bold">{flag ? <div>{total() - discountAmt()}</div> : <div>{total()}</div>}</p>
                                </div>
                            </div>
                            <button class="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Check out</button>
                        </div>
                    </div>
                </div>
            </div>}

        </div>
    )
}
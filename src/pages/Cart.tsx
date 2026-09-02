import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { cartTotal, getCart, removeFromCart, updateQty, type CartItem } from '../lib/cart';

export default function Cart(){
  const [items,setItems]=useState<CartItem[]>([]);
  const navigate=useNavigate();
  const refresh=()=>setItems(getCart());
  useEffect(()=>{refresh(); const fn=()=>refresh(); window.addEventListener('root-cart-updated',fn); return()=>window.removeEventListener('root-cart-updated',fn)},[]);
  const total=cartTotal(items);
  return <div className="pt-28 pb-20 bg-stone-50 min-h-screen"><div className="max-w-5xl mx-auto px-4">
    <div className="flex items-center justify-between gap-4"><div><span className="section-tag">Your Basket</span><h1 className="text-4xl md:text-5xl font-bold text-emerald-950">Shopping Cart</h1></div><Link to="/shop" className="text-emerald-700 font-bold">Continue shopping →</Link></div>
    {!items.length?<div className="mt-10 bg-white rounded-3xl p-10 text-center border border-stone-100 shadow-sm"><ShoppingBag className="mx-auto text-emerald-600" size={44}/><h2 className="text-2xl font-bold mt-4">Your cart is empty</h2><p className="text-stone-500 mt-2">Add products from the Root Revolution shop.</p><Link to="/shop" className="btn-green inline-block mt-6">Browse Products</Link></div>:<div className="grid lg:grid-cols-[1fr_340px] gap-6 mt-8">
      <div className="space-y-4">{items.map(item=><div key={item.id} className="bg-white rounded-3xl border border-stone-100 shadow-sm p-4 flex gap-4 items-center"><div className="w-24 h-24 rounded-2xl bg-emerald-50 p-2 shrink-0"><img src={item.image} alt={item.name} className="w-full h-full object-contain"/></div><div className="flex-1 min-w-0"><h2 className="font-bold text-lg text-emerald-950">{item.name}</h2><p className="text-emerald-700 font-bold mt-1">R{item.price}</p><div className="flex items-center gap-2 mt-3"><button onClick={()=>updateQty(item.id,item.quantity-1)} className="w-9 h-9 rounded-full border flex items-center justify-center"><Minus size={15}/></button><span className="w-8 text-center font-bold">{item.quantity}</span><button onClick={()=>updateQty(item.id,item.quantity+1)} className="w-9 h-9 rounded-full border flex items-center justify-center"><Plus size={15}/></button><button onClick={()=>removeFromCart(item.id)} className="ml-3 text-red-600 inline-flex items-center gap-1 text-sm font-bold"><Trash2 size={16}/> Remove</button></div></div><strong className="text-lg">R{item.price*item.quantity}</strong></div>)}</div>
      <aside className="bg-emerald-950 text-white rounded-3xl p-6 h-fit"><h2 className="text-2xl font-bold">Order Summary</h2><div className="flex justify-between mt-6 text-emerald-100"><span>Items</span><span>{items.reduce((n,i)=>n+i.quantity,0)}</span></div><div className="flex justify-between mt-3 text-emerald-100"><span>Delivery</span><span>Calculated at checkout</span></div><div className="border-t border-white/20 my-5"></div><div className="flex justify-between text-2xl font-bold"><span>Total</span><span>R{total}</span></div><button onClick={()=>navigate('/checkout')} className="w-full mt-6 bg-white text-emerald-950 rounded-xl py-3 font-bold">Proceed to Checkout</button><p className="text-xs text-emerald-200 mt-4">Payment options currently include Cash on Delivery and EFT. Card payments / PayFast are coming soon.</p></aside>
    </div>}
  </div></div>
}

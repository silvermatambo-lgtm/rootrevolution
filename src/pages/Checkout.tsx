import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { cartTotal, getCart, type CartItem } from '../lib/cart';

const ORDER_EMAIL='info@rootrevolution.co.za';

export default function Checkout(){
  const [items,setItems]=useState<CartItem[]>([]);
  const [mailHref,setMailHref]=useState(`mailto:${ORDER_EMAIL}`);
  useEffect(()=>setItems(getCart()),[]);
  const total=useMemo(()=>cartTotal(items),[items]);

  const prepareEmail=()=>{
    const form=document.getElementById('root-order-form') as HTMLFormElement | null;
    if(!form) return true;
    if(!form.reportValidity()) return false;
    const fd=new FormData(form);
    const lines=items.map(i=>`• ${i.name} x${i.quantity} — R${i.price*i.quantity}`);
    const body=[
      'ROOT REVOLUTION ORDER','',...lines,'',`Total: R${total}`,'',
      'CUSTOMER DETAILS',
      `Name: ${fd.get('name')||''}`,
      `Phone: ${fd.get('phone')||''}`,
      `Email: ${fd.get('email')||''}`,
      `Address: ${fd.get('address')||''}`,
      `Suburb: ${fd.get('suburb')||''}`,
      `City: ${fd.get('city')||''}`,
      `Province: ${fd.get('province')||''}`,
      `Postal Code: ${fd.get('postal')||''}`,
      `Notes: ${fd.get('notes')||'None'}`
    ].join('\n');
    const href=`mailto:${ORDER_EMAIL}?subject=${encodeURIComponent('Root Revolution Order')}&body=${encodeURIComponent(body)}`;
    setMailHref(href);
    window.location.href=href;
    return true;
  };

  return <div className="pt-28 pb-20 bg-stone-50 min-h-screen"><div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-[1fr_380px] gap-7">
    <section>
      <span className="section-tag">Order Root Revolution Products</span>
      <h1 className="text-4xl md:text-5xl font-bold text-emerald-950">Complete Your Order</h1>
      {!items.length?<div className="bg-white rounded-3xl p-8 border mt-8"><p className="font-bold text-lg">Your cart is empty.</p><Link to="/shop" className="text-emerald-700 font-bold inline-block mt-3">Return to shop →</Link></div>:<>
      <form id="root-order-form" onSubmit={(e)=>{e.preventDefault();prepareEmail();}} className="bg-white rounded-3xl border border-stone-100 shadow-sm p-6 mt-8">
        <h2 className="text-xl font-bold text-emerald-950">Customer & Delivery Details</h2>
        <div className="grid md:grid-cols-2 gap-4 mt-5">
          <input required name="name" placeholder="Full name" className="border rounded-xl px-4 py-3"/>
          <input required name="phone" placeholder="Phone number" className="border rounded-xl px-4 py-3"/>
          <input required type="email" name="email" placeholder="Email address" className="border rounded-xl px-4 py-3 md:col-span-2"/>
          <input required name="address" placeholder="Street address" className="border rounded-xl px-4 py-3 md:col-span-2"/>
          <input required name="suburb" placeholder="Suburb" className="border rounded-xl px-4 py-3"/>
          <input required name="city" placeholder="City" className="border rounded-xl px-4 py-3"/>
          <input name="province" placeholder="Province" className="border rounded-xl px-4 py-3"/>
          <input name="postal" placeholder="Postal code" className="border rounded-xl px-4 py-3"/>
          <textarea name="notes" placeholder="Order notes (optional)" className="border rounded-xl px-4 py-3 md:col-span-2 min-h-28"/>
        </div>
        <button type="submit" className="w-full mt-6 rounded-2xl py-5 px-5 font-bold text-lg flex items-center justify-center gap-3 bg-emerald-950 text-white hover:bg-emerald-900"><Mail size={24}/> Order via Email</button>
      </form>
      <a href={mailHref} className="block text-center mt-4 text-sm font-bold text-emerald-800 underline">Open email directly</a>
      </>}
    </section>
    <aside className="bg-emerald-950 text-white rounded-3xl p-6 h-fit lg:sticky lg:top-28">
      <h2 className="text-2xl font-bold">Order Summary</h2>
      <div className="space-y-4 mt-5">{items.map(i=><div className="flex gap-3" key={i.id}><div className="w-14 h-14 bg-white rounded-xl p-1 shrink-0"><img src={i.image} alt={i.name} className="w-full h-full object-contain"/></div><div className="flex-1"><p className="font-bold text-sm">{i.name}</p><p className="text-xs text-emerald-200">Qty {i.quantity}</p></div><strong>R{i.price*i.quantity}</strong></div>)}</div>
      <div className="border-t border-white/20 mt-6 pt-5"><div className="flex justify-between text-2xl font-bold"><span>Total</span><span>R{total}</span></div></div>
    </aside>
  </div></div>
}

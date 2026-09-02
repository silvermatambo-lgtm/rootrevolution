import { FormEvent, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Banknote, CreditCard, Landmark, Truck, CheckCircle2 } from 'lucide-react';
import { cartTotal, clearCart, getCart, type CartItem } from '../lib/cart';

type Method='cod'|'eft'|'card';

export default function Checkout(){
  const [items,setItems]=useState<CartItem[]>([]);
  const [method,setMethod]=useState<Method>('cod');
  const [done,setDone]=useState(false);
  useEffect(()=>setItems(getCart()),[]);
  const total=useMemo(()=>cartTotal(items),[items]);

  const submit=(e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    if(method==='card') return;
    clearCart();
    setDone(true);
  };

  if(done) return <div className="pt-32 pb-24 bg-stone-50 min-h-screen"><div className="max-w-2xl mx-auto px-4"><div className="bg-white border border-stone-100 rounded-3xl shadow-sm p-10 text-center"><CheckCircle2 size={60} className="mx-auto text-emerald-600"/><h1 className="text-3xl font-bold text-emerald-950 mt-5">Order received</h1><p className="text-stone-600 mt-3">Thank you. Your order has been recorded. Root Revolution can confirm delivery arrangements and payment instructions before dispatch.</p><Link to="/shop" className="btn-green inline-block mt-7">Continue Shopping</Link></div></div></div>;

  return <div className="pt-28 pb-20 bg-stone-50 min-h-screen"><form onSubmit={submit} className="max-w-6xl mx-auto px-4 grid lg:grid-cols-[1fr_380px] gap-7">
    <section>
      <span className="section-tag">Secure Checkout</span><h1 className="text-4xl md:text-5xl font-bold text-emerald-950">Delivery & Payment</h1><p className="text-stone-500 mt-3">Complete your delivery information, then choose Cash on Delivery or EFT. Online card payment will be activated when PayFast details are connected.</p>
      {!items.length?<div className="bg-white rounded-3xl p-8 border mt-8"><p className="font-bold text-lg">Your cart is empty.</p><Link to="/shop" className="text-emerald-700 font-bold inline-block mt-3">Return to shop →</Link></div>:<>
      <div className="bg-white rounded-3xl border border-stone-100 shadow-sm p-6 mt-8"><h2 className="text-xl font-bold text-emerald-950">Customer & Delivery Details</h2><div className="grid md:grid-cols-2 gap-4 mt-5">
        <input required name="name" placeholder="Full name" className="border rounded-xl px-4 py-3"/><input required name="phone" placeholder="Phone number" className="border rounded-xl px-4 py-3"/><input required type="email" name="email" placeholder="Email address" className="border rounded-xl px-4 py-3 md:col-span-2"/><input required name="address" placeholder="Street address" className="border rounded-xl px-4 py-3 md:col-span-2"/><input required name="suburb" placeholder="Suburb" className="border rounded-xl px-4 py-3"/><input required name="city" placeholder="City" className="border rounded-xl px-4 py-3"/><input name="province" placeholder="Province" className="border rounded-xl px-4 py-3"/><input name="postal" placeholder="Postal code" className="border rounded-xl px-4 py-3"/><textarea name="notes" placeholder="Order notes (optional)" className="border rounded-xl px-4 py-3 md:col-span-2 min-h-28"/></div></div>
      <div className="bg-white rounded-3xl border border-stone-100 shadow-sm p-6 mt-6"><h2 className="text-xl font-bold text-emerald-950">Payment Method</h2><div className="grid gap-3 mt-5">
        <label className={`border rounded-2xl p-4 flex gap-4 cursor-pointer ${method==='cod'?'border-emerald-500 bg-emerald-50':'border-stone-200'}`}><input type="radio" name="payment" checked={method==='cod'} onChange={()=>setMethod('cod')}/><Truck className="text-emerald-700"/><div><strong>Cash on Delivery (COD)</strong><p className="text-sm text-stone-500 mt-1">Pay when your order is delivered. Final delivery eligibility and any delivery fee can be confirmed before dispatch.</p></div></label>
        <label className={`border rounded-2xl p-4 flex gap-4 cursor-pointer ${method==='eft'?'border-emerald-500 bg-emerald-50':'border-stone-200'}`}><input type="radio" name="payment" checked={method==='eft'} onChange={()=>setMethod('eft')}/><Landmark className="text-emerald-700"/><div><strong>EFT / Bank Transfer</strong><p className="text-sm text-stone-500 mt-1">Place the order now. Banking details and payment reference can be supplied by Root Revolution after checkout.</p></div></label>
        <label className="border rounded-2xl p-4 flex gap-4 opacity-70"><input type="radio" name="payment" checked={method==='card'} onChange={()=>setMethod('card')}/><CreditCard className="text-stone-500"/><div><strong>Card Payment / PayFast</strong><span className="ml-2 text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full font-bold">COMING SOON</span><p className="text-sm text-stone-500 mt-1">Visa, Mastercard and supported PayFast payment methods will be enabled once gateway credentials are added.</p></div></label>
      </div></div>
      <button disabled={method==='card'} className={`w-full mt-6 rounded-xl py-4 font-bold ${method==='card'?'bg-stone-300 text-stone-600 cursor-not-allowed':'bg-emerald-700 text-white hover:bg-emerald-800'}`}>{method==='card'?'Card Payments Coming Soon':method==='eft'?'Place Order — Pay by EFT':'Place Order — Cash on Delivery'}</button>
      </>}
    </section>
    <aside className="bg-emerald-950 text-white rounded-3xl p-6 h-fit lg:sticky lg:top-28"><h2 className="text-2xl font-bold">Order Summary</h2><div className="space-y-4 mt-5">{items.map(i=><div className="flex gap-3" key={i.id}><div className="w-14 h-14 bg-white rounded-xl p-1 shrink-0"><img src={i.image} className="w-full h-full object-contain"/></div><div className="flex-1"><p className="font-bold text-sm">{i.name}</p><p className="text-xs text-emerald-200">Qty {i.quantity}</p></div><strong>R{i.price*i.quantity}</strong></div>)}</div><div className="border-t border-white/20 mt-6 pt-5 space-y-3"><div className="flex justify-between"><span>Subtotal</span><span>R{total}</span></div><div className="flex justify-between"><span>Delivery</span><span>To be confirmed</span></div><div className="flex justify-between text-2xl font-bold pt-2"><span>Total</span><span>R{total}</span></div></div><div className="mt-6 p-4 rounded-2xl bg-white/10 text-sm"><div className="flex gap-2 items-start"><Banknote size={18} className="mt-0.5"/><p>No card details are collected on this page while PayFast is inactive.</p></div></div></aside>
  </form></div>
}

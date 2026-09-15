import { FormEvent, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Mail } from 'lucide-react';
import { cartTotal, getCart, type CartItem } from '../lib/cart';

const ORDER_EMAIL='info@rootrevolution.co.za';
const FORM_ENDPOINT=`https://formsubmit.co/ajax/${ORDER_EMAIL}`;

export default function Checkout(){
  const [items,setItems]=useState<CartItem[]>([]);
  const [sending,setSending]=useState(false);
  const [sent,setSent]=useState(false);
  const [error,setError]=useState('');

  useEffect(()=>{
    window.scrollTo({top:0,left:0,behavior:'auto'});
    setItems(getCart());
  },[]);

  const total=useMemo(()=>cartTotal(items),[items]);

  const submitOrder=async(e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    if(sending) return;
    setSending(true);
    setError('');

    const form=e.currentTarget;
    const fd=new FormData(form);
    const products=items.map(i=>`${i.name} x${i.quantity} - R${i.price*i.quantity}`).join('\n');
    const payload={
      _subject:'New Root Revolution Website Order',
      _template:'table',
      _captcha:'false',
      name:String(fd.get('name')||''),
      phone:String(fd.get('phone')||''),
      email:String(fd.get('email')||''),
      address:String(fd.get('address')||''),
      suburb:String(fd.get('suburb')||''),
      city:String(fd.get('city')||''),
      province:String(fd.get('province')||''),
      postal_code:String(fd.get('postal')||''),
      order_items:products,
      order_total:`R${total}`,
      notes:String(fd.get('notes')||'None')
    };

    try{
      const response=await fetch(FORM_ENDPOINT,{
        method:'POST',
        headers:{'Content-Type':'application/json','Accept':'application/json'},
        body:JSON.stringify(payload)
      });
      const data=await response.json().catch(()=>null);
      if(!response.ok || data?.success===false) throw new Error('Order could not be sent.');
      setSent(true);
      form.reset();
      window.scrollTo({top:0,left:0,behavior:'smooth'});
    }catch{
      setError('We could not send your order right now. Please try again.');
    }finally{
      setSending(false);
    }
  };

  return <div className="pt-28 pb-20 bg-stone-50 min-h-screen"><div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-[1fr_380px] gap-7">
    <section>
      <span className="section-tag">Order Root Revolution Products</span>
      <h1 className="text-4xl md:text-5xl font-bold text-emerald-950">Complete Your Order</h1>
      {!items.length?<div className="bg-white rounded-3xl p-8 border mt-8"><p className="font-bold text-lg">Your cart is empty.</p><Link to="/shop" className="text-emerald-700 font-bold inline-block mt-3">Return to shop →</Link></div>:sent?<div className="bg-white rounded-3xl border border-emerald-100 shadow-sm p-8 mt-8 text-center"><CheckCircle2 className="mx-auto text-emerald-700" size={54}/><h2 className="text-2xl font-bold text-emerald-950 mt-4">Order Sent Successfully</h2><p className="text-stone-600 mt-2">Thank you. Your order has been sent directly to Root Revolution. We will contact you using the details you provided.</p><Link to="/shop" className="btn-green inline-flex mt-6">Continue Shopping</Link></div>:<form onSubmit={submitOrder} className="bg-white rounded-3xl border border-stone-100 shadow-sm p-6 mt-8">
        <h2 className="text-xl font-bold text-emerald-950">Customer & Delivery Details</h2>
        <p className="text-stone-500 mt-2">Complete your details below. Your order will be sent directly to Root Revolution.</p>
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
        {error&&<p className="mt-4 rounded-xl bg-red-50 border border-red-100 text-red-700 px-4 py-3 font-semibold">{error}</p>}
        <button disabled={sending} type="submit" className="w-full mt-6 rounded-2xl py-5 px-5 font-bold text-lg flex items-center justify-center gap-3 bg-emerald-950 text-white hover:bg-emerald-900 disabled:opacity-60"><Mail size={24}/>{sending?'Sending Order...':'Place Order'}</button>
      </form>}
    </section>
    <aside className="bg-emerald-950 text-white rounded-3xl p-6 h-fit lg:sticky lg:top-28">
      <h2 className="text-2xl font-bold">Order Summary</h2>
      <div className="space-y-4 mt-5">{items.map(i=><div className="flex gap-3" key={i.id}><div className="w-14 h-14 bg-white rounded-xl p-1 shrink-0"><img src={i.image} alt={i.name} className="w-full h-full object-contain"/></div><div className="flex-1"><p className="font-bold text-sm">{i.name}</p><p className="text-xs text-emerald-200">Qty {i.quantity}</p></div><strong>R{i.price*i.quantity}</strong></div>)}</div>
      <div className="border-t border-white/20 mt-6 pt-5"><div className="flex justify-between text-2xl font-bold"><span>Total</span><span>R{total}</span></div></div>
    </aside>
  </div></div>
}

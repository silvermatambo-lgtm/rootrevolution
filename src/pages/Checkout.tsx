import { FormEvent, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Banknote, CreditCard, Landmark, Truck, CheckCircle2, MessageCircle, Mail } from 'lucide-react';
import { cartTotal, getCart, type CartItem } from '../lib/cart';

type Method='cod'|'eft'|'card';
type OrderChannel='whatsapp'|'email';

const WHATSAPP_NUMBER='27624042155';
const ORDER_EMAIL='info@rootrevolution.co.za';

export default function Checkout(){
  const [items,setItems]=useState<CartItem[]>([]);
  const [method,setMethod]=useState<Method>('cod');
  const [channel,setChannel]=useState<OrderChannel>('whatsapp');
  const [sentChannel,setSentChannel]=useState<OrderChannel|null>(null);
  useEffect(()=>setItems(getCart()),[]);
  const total=useMemo(()=>cartTotal(items),[items]);

  const buildOrderText=(form:HTMLFormElement)=>{
    const fd=new FormData(form);
    const lines=items.map(i=>`• ${i.name} x${i.quantity} — R${i.price*i.quantity}`);
    return [
      'ROOT REVOLUTION ORDER',
      '',
      ...lines,
      '',
      `Subtotal: R${total}`,
      'Delivery: To be confirmed',
      `Payment: ${method==='cod'?'Cash on Delivery':method==='eft'?'EFT / Bank Transfer':'Card / PayFast'}`,
      '',
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
  };

  const submit=(e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    if(method==='card') return;
    const form=e.currentTarget;
    const orderText=buildOrderText(form);

    if(channel==='whatsapp'){
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(orderText)}`,'_blank','noopener,noreferrer');
      setSentChannel('whatsapp');
      return;
    }

    window.location.href=`mailto:${ORDER_EMAIL}?subject=${encodeURIComponent('Root Revolution Order')}&body=${encodeURIComponent(orderText)}`;
    setSentChannel('email');
  };

  return <div className="pt-28 pb-20 bg-stone-50 min-h-screen"><form onSubmit={submit} className="max-w-6xl mx-auto px-4 grid lg:grid-cols-[1fr_380px] gap-7">
    <section>
      <span className="section-tag">Order Root Revolution Products</span><h1 className="text-4xl md:text-5xl font-bold text-emerald-950">Complete Your Order</h1><p className="text-stone-500 mt-3">Enter your delivery details, then choose whether you want to send your order through WhatsApp or email. Your full cart, quantities, total and delivery details will be prepared automatically.</p>
      {!items.length?<div className="bg-white rounded-3xl p-8 border mt-8"><p className="font-bold text-lg">Your cart is empty.</p><Link to="/shop" className="text-emerald-700 font-bold inline-block mt-3">Return to shop →</Link></div>:<>
      <div className="bg-white rounded-3xl border border-stone-100 shadow-sm p-6 mt-8"><h2 className="text-xl font-bold text-emerald-950">Customer & Delivery Details</h2><div className="grid md:grid-cols-2 gap-4 mt-5">
        <input required name="name" placeholder="Full name" className="border rounded-xl px-4 py-3"/><input required name="phone" placeholder="Phone number" className="border rounded-xl px-4 py-3"/><input required type="email" name="email" placeholder="Email address" className="border rounded-xl px-4 py-3 md:col-span-2"/><input required name="address" placeholder="Street address" className="border rounded-xl px-4 py-3 md:col-span-2"/><input required name="suburb" placeholder="Suburb" className="border rounded-xl px-4 py-3"/><input required name="city" placeholder="City" className="border rounded-xl px-4 py-3"/><input name="province" placeholder="Province" className="border rounded-xl px-4 py-3"/><input name="postal" placeholder="Postal code" className="border rounded-xl px-4 py-3"/><textarea name="notes" placeholder="Order notes (optional)" className="border rounded-xl px-4 py-3 md:col-span-2 min-h-28"/></div></div>

      <div className="bg-white rounded-3xl border border-stone-100 shadow-sm p-6 mt-6"><h2 className="text-xl font-bold text-emerald-950">Choose how to send your order</h2><p className="text-sm text-stone-500 mt-1">Select one of the two options below.</p><div className="grid md:grid-cols-2 gap-4 mt-5">
        <button type="button" onClick={()=>setChannel('whatsapp')} className={`border-2 rounded-2xl p-5 text-left transition ${channel==='whatsapp'?'border-emerald-500 bg-emerald-50 shadow-sm':'border-stone-200 hover:border-emerald-300'}`}><MessageCircle className="text-emerald-700" size={28}/><strong className="block mt-3 text-lg">Order via WhatsApp</strong><span className="text-sm text-stone-500">Open WhatsApp with your complete order already prepared for Root Revolution.</span>{channel==='whatsapp'&&<span className="inline-flex items-center gap-1 mt-3 text-xs font-bold text-emerald-700"><CheckCircle2 size={15}/> Selected</span>}</button>
        <button type="button" onClick={()=>setChannel('email')} className={`border-2 rounded-2xl p-5 text-left transition ${channel==='email'?'border-emerald-500 bg-emerald-50 shadow-sm':'border-stone-200 hover:border-emerald-300'}`}><Mail className="text-emerald-700" size={28}/><strong className="block mt-3 text-lg">Order via Email</strong><span className="text-sm text-stone-500">Open your email app with the full order addressed to {ORDER_EMAIL}.</span>{channel==='email'&&<span className="inline-flex items-center gap-1 mt-3 text-xs font-bold text-emerald-700"><CheckCircle2 size={15}/> Selected</span>}</button>
      </div></div>

      <div className="bg-white rounded-3xl border border-stone-100 shadow-sm p-6 mt-6"><h2 className="text-xl font-bold text-emerald-950">Payment Method</h2><div className="grid gap-3 mt-5">
        <label className={`border rounded-2xl p-4 flex gap-4 cursor-pointer ${method==='cod'?'border-emerald-500 bg-emerald-50':'border-stone-200'}`}><input type="radio" name="payment" checked={method==='cod'} onChange={()=>setMethod('cod')}/><Truck className="text-emerald-700"/><div><strong>Cash on Delivery (COD)</strong><p className="text-sm text-stone-500 mt-1">Pay when your order is delivered. Final delivery eligibility and any delivery fee can be confirmed before dispatch.</p></div></label>
        <label className={`border rounded-2xl p-4 flex gap-4 cursor-pointer ${method==='eft'?'border-emerald-500 bg-emerald-50':'border-stone-200'}`}><input type="radio" name="payment" checked={method==='eft'} onChange={()=>setMethod('eft')}/><Landmark className="text-emerald-700"/><div><strong>EFT / Bank Transfer</strong><p className="text-sm text-stone-500 mt-1">Submit your order first. Root Revolution can then send the banking details and payment reference.</p></div></label>
        <label className="border rounded-2xl p-4 flex gap-4 opacity-70"><input type="radio" name="payment" checked={method==='card'} onChange={()=>setMethod('card')}/><CreditCard className="text-stone-500"/><div><strong>Card Payment / PayFast</strong><span className="ml-2 text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full font-bold">COMING SOON</span><p className="text-sm text-stone-500 mt-1">Visa, Mastercard and supported PayFast payment methods will be enabled once the gateway is connected.</p></div></label>
      </div></div>
      <button disabled={method==='card'} className={`w-full mt-6 rounded-xl py-4 font-bold flex items-center justify-center gap-2 ${method==='card'?'bg-stone-300 text-stone-600 cursor-not-allowed':'bg-emerald-700 text-white hover:bg-emerald-800'}`}>{method==='card'?'Card Payments Coming Soon':channel==='whatsapp'?<><MessageCircle size={18}/> Continue with WhatsApp Order</>:<><Mail size={18}/> Continue with Email Order</>}</button>
      {sentChannel&&<div className="mt-4 bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-sm text-emerald-900">Your order has been prepared for {sentChannel==='whatsapp'?'WhatsApp':'email'}. Complete the final send in the app that opened.</div>}
      </>}
    </section>
    <aside className="bg-emerald-950 text-white rounded-3xl p-6 h-fit lg:sticky lg:top-28"><h2 className="text-2xl font-bold">Order Summary</h2><div className="space-y-4 mt-5">{items.map(i=><div className="flex gap-3" key={i.id}><div className="w-14 h-14 bg-white rounded-xl p-1 shrink-0"><img src={i.image} alt={i.name} className="w-full h-full object-contain"/></div><div className="flex-1"><p className="font-bold text-sm">{i.name}</p><p className="text-xs text-emerald-200">Qty {i.quantity}</p></div><strong>R{i.price*i.quantity}</strong></div>)}</div><div className="border-t border-white/20 mt-6 pt-5 space-y-3"><div className="flex justify-between"><span>Subtotal</span><span>R{total}</span></div><div className="flex justify-between"><span>Delivery</span><span>To be confirmed</span></div><div className="flex justify-between text-2xl font-bold pt-2"><span>Total</span><span>R{total}</span></div></div><div className="mt-6 p-4 rounded-2xl bg-white/10 text-sm"><div className="flex gap-2 items-start"><Banknote size={18} className="mt-0.5"/><p>Your selected products, quantities, total, payment method and delivery details are automatically included in the WhatsApp or email order.</p></div></div></aside>
  </form></div>
}

import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { whatsappLink } from '../data/site';

const links = [
  ['Home','/'],['Shop','/shop'],['Our Story','/about'],['Gallery','/gallery'],['Testimonials','/testimonials'],['FAQ','/faq'],['Contact','/contact']
];

export default function Navbar(){
 const [open,setOpen]=useState(false); const [scrolled,setScrolled]=useState(false); const {pathname}=useLocation();
 useEffect(()=>{const h=()=>setScrolled(scrollY>30); addEventListener('scroll',h,{passive:true}); return()=>removeEventListener('scroll',h)},[]);
 useEffect(()=>setOpen(false),[pathname]);
 return <>
 <header className={`fixed inset-x-0 top-0 z-50 transition ${scrolled?'bg-white/95 shadow-lg backdrop-blur':'bg-white/90 backdrop-blur'}`}>
  <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
   <Link to="/" className="flex items-center gap-3"><img src="/logo.jpg" className="h-14 w-14 object-contain rounded-full"/><div><div className="font-bold text-xl text-emerald-950 leading-none">ROOT REVOLUTION</div><div className="text-[10px] tracking-[.22em] text-orange-600 mt-1">NATURAL WELLNESS</div></div></Link>
   <nav className="hidden lg:flex items-center gap-1">{links.map(([l,t])=><Link key={t} to={t} className={`px-3 py-2 text-sm font-semibold rounded-full ${pathname===t?'bg-emerald-100 text-emerald-800':'text-stone-700 hover:text-emerald-700 hover:bg-emerald-50'}`}>{l}</Link>)}</nav>
   <div className="flex items-center gap-2"><a href={whatsappLink('Hi Root Revolution, I would like to order a product.')} target="_blank" className="hidden sm:inline-flex btn-green"><ShoppingBag size={16}/> Order Now</a><button className="lg:hidden p-2" onClick={()=>setOpen(true)}><Menu/></button></div>
  </div>
 </header>
 {open&&<div className="fixed inset-0 z-[60] bg-black/50" onClick={()=>setOpen(false)}><div className="absolute right-0 top-0 h-full w-80 bg-white p-5" onClick={e=>e.stopPropagation()}><div className="flex justify-between items-center mb-8"><img src="/logo.jpg" className="h-14"/><button onClick={()=>setOpen(false)}><X/></button></div><nav className="space-y-2">{links.map(([l,t])=><Link key={t} to={t} className="block px-4 py-3 rounded-xl bg-stone-50 hover:bg-emerald-50 font-semibold">{l}</Link>)}</nav><a href={whatsappLink('Hi Root Revolution, I would like to order a product.')} target="_blank" className="btn-green w-full justify-center mt-6"><ShoppingBag size={16}/> WhatsApp Order</a></div></div>}
 </>
}

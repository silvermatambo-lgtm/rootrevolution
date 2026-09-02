import { useMemo, useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { categories, products, whatsappLink } from '../data/site';

export default function Services(){
  const [q,setQ]=useState('');
  const [category,setCategory]=useState('All');
  const shown=useMemo(()=>products.filter(p=>{
    const matchesQ=(p.name+' '+p.category+' '+p.short).toLowerCase().includes(q.toLowerCase());
    return matchesQ && (category==='All'||p.category===category);
  }),[q,category]);
  return <div className="pt-28 pb-20 bg-stone-50 min-h-screen">
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-center max-w-3xl mx-auto">
        <span className="section-tag">Root Revolution Shop</span>
        <h1 className="text-4xl md:text-6xl font-bold text-emerald-950">Natural Wellness Products</h1>
        <p className="text-stone-500 mt-4">Explore the complete catalogue of {products.length} products across herbal supplements, hair and scalp care, skincare and beauty, and crystals.</p>
      </div>
      <div className="mt-8 bg-white border border-stone-100 rounded-3xl p-4 md:p-5 shadow-sm">
        <div className="relative max-w-2xl mx-auto"><Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18}/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search products, categories or wellness needs..." className="w-full border border-stone-200 rounded-2xl pl-11 pr-5 py-3 outline-none focus:ring-2 focus:ring-emerald-300"/></div>
        <div className="flex flex-wrap gap-2 justify-center mt-4"><span className="inline-flex items-center gap-1 text-xs font-bold text-stone-500 mr-1"><SlidersHorizontal size={14}/> Filter:</span>{['All',...categories].map(c=><button key={c} onClick={()=>setCategory(c)} className={`px-4 py-2 rounded-full text-xs font-bold transition ${category===c?'bg-emerald-700 text-white':'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'}`}>{c}</button>)}</div>
      </div>
      <p className="text-sm text-stone-500 mt-6">Showing <strong className="text-emerald-800">{shown.length}</strong> products</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-5">{shown.map(p=><article className="bg-white rounded-3xl border border-stone-100 overflow-hidden shadow-sm hover:shadow-xl transition group" key={p.id}><div className="h-64 bg-gradient-to-br from-emerald-50 to-amber-50 p-5 relative"><img src={p.image} alt={p.name} loading="lazy" className="w-full h-full object-contain group-hover:scale-105 transition duration-500"/>{p.badge&&<span className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">{p.badge}</span>}</div><div className="p-5"><p className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider">{p.category}</p><h2 className="font-bold text-lg mt-2 min-h-14">{p.name}</h2><p className="text-sm text-stone-500 mt-2 line-clamp-2">{p.short}</p><div className="flex items-center justify-between mt-5"><strong className="text-xl text-emerald-800">{p.price!=null?`R${p.price}`:'Price on request'}</strong><a target="_blank" rel="noopener noreferrer" href={whatsappLink(`Hi Root Revolution, I would like to order ${p.name}${p.price!=null?` for R${p.price}`:''}.`)} className="btn-green !px-4 !py-2">Order</a></div></div></article>)}</div>
      {!shown.length&&<div className="text-center py-20"><p className="text-xl font-bold text-emerald-950">No products found.</p><p className="text-stone-500 mt-2">Try another search or category.</p></div>}
    </div>
  </div>
}

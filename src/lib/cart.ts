export type CartItem = { id:string; name:string; price:number; image:string; quantity:number };

const KEY='rootrevolution-cart';

export function getCart():CartItem[]{
  try{return JSON.parse(localStorage.getItem(KEY)||'[]')}catch{return []}
}
export function saveCart(items:CartItem[]){localStorage.setItem(KEY,JSON.stringify(items));window.dispatchEvent(new Event('root-cart-updated'));}
export function addToCart(item:Omit<CartItem,'quantity'>){
  const cart=getCart();
  const found=cart.find(x=>x.id===item.id);
  if(found) found.quantity+=1; else cart.push({...item,quantity:1});
  saveCart(cart);
}
export function removeFromCart(id:string){saveCart(getCart().filter(x=>x.id!==id));}
export function updateQty(id:string,quantity:number){saveCart(getCart().map(x=>x.id===id?{...x,quantity:Math.max(1,quantity)}:x));}
export function clearCart(){saveCart([])}
export function cartTotal(items:CartItem[]){return items.reduce((s,x)=>s+x.price*x.quantity,0)}

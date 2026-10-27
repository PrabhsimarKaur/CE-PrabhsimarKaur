const products = [
 {id:1,name:"Oversized Sweatshirt",category:"Women",type:"Sweatshirts",price:1299,old:1799,rating:4.5,reviews:120,discount:28,color:"Pink",sizes:["S","M","L","XL"],tag:"New",image:"https://images.unsplash.com/photo-1554568218-0f1715e72254?auto=format&fit=crop&w=700&q=80"},
 {id:2,name:"Classic Hoodie",category:"Men",type:"Hoodies",price:1599,old:2199,rating:4.7,reviews:215,discount:27,color:"Black",sizes:["S","M","L","XL","XXL"],tag:"Bestseller",image:"https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=700&q=80"},
 {id:3,name:"Floral Midi Dress",category:"Women",type:"Dresses",price:1899,old:2499,rating:4.6,reviews:98,discount:24,color:"Green",sizes:["XS","S","M","L"],tag:"Trending",image:"https://images.unsplash.com/photo-1612336307429-8a898d10e223?auto=format&fit=crop&w=700&q=80"},
 {id:4,name:"Denim Jacket",category:"Men",type:"Jackets",price:2099,old:2799,rating:4.4,reviews:163,discount:25,color:"Blue",sizes:["S","M","L","XL"],tag:"Classic",image:"https://images.unsplash.com/photo-1523205771623-e0faa4d2813d?auto=format&fit=crop&w=700&q=80"},
 {id:5,name:"Casual White Shirt",category:"Women",type:"Tops",price:1199,old:1599,rating:4.3,reviews:87,discount:25,color:"White",sizes:["XS","S","M","L","XL"],tag:"Everyday",image:"https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=700&q=80"},
 {id:6,name:"Cargo Pants",category:"Men",type:"Bottoms",price:1749,old:2299,rating:4.5,reviews:142,discount:24,color:"Black",sizes:["S","M","L","XL","XXL"],tag:"Popular",image:"https://images.unsplash.com/photo-1517438476312-10d79c077509?auto=format&fit=crop&w=700&q=80"},
 {id:7,name:"Cozy Knit Sweater",category:"Women",type:"Knitwear",price:1499,old:1999,rating:4.8,reviews:76,discount:25,color:"Beige",sizes:["S","M","L","XL"],tag:"Soft touch",image:"https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=700&q=80"},
 {id:8,name:"Kids Everyday Tee",category:"Kids",type:"T-shirts",price:499,old:699,rating:4.6,reviews:64,discount:29,color:"Blue",sizes:["XS","S","M"],tag:"Value pick",image:"https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=700&q=80"},
 {id:9,name:"Relaxed Linen Shirt",category:"Men",type:"Shirts",price:1399,old:1799,rating:4.4,reviews:91,discount:22,color:"Beige",sizes:["S","M","L","XL","XXL"],tag:"Bestseller",image:"https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?auto=format&fit=crop&w=700&q=80"},
 {id:10,name:"Pink Summer Top",category:"Women",type:"Tops",price:899,old:1199,rating:4.2,reviews:53,discount:25,color:"Pink",sizes:["XS","S","M","L"],tag:"Fresh pick",image:"https://images.unsplash.com/photo-1564257577-7a1e9e4f4f2f?auto=format&fit=crop&w=700&q=80"},
 {id:11,name:"Kids Cozy Hoodie",category:"Kids",type:"Hoodies",price:799,old:999,rating:4.7,reviews:44,discount:20,color:"Green",sizes:["XS","S","M"],tag:"Comfy",image:"https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=700&q=80"},
 {id:12,name:"Everyday Blue Jeans",category:"Men",type:"Bottoms",price:1599,old:2099,rating:4.6,reviews:117,discount:24,color:"Blue",sizes:["S","M","L","XL","XXL"],tag:"Essential",image:"https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=700&q=80"}
];
const state={cart:{},category:"all",search:"",sort:"featured",maxPrice:4000,size:null,color:null,favorites:new Set(),coupon:false};
const FREE_SHIPPING=999, SHIPPING=79, COUPON="STYLE10";
const $=s=>document.querySelector(s);
const $$=s=>[...document.querySelectorAll(s)];
function money(n){return new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",minimumFractionDigits:2,maximumFractionDigits:2}).format(n)}
function safe(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function visibleProducts(){
 let list=products.filter(p=>(state.category==="all"||p.category===state.category)&&p.price<=state.maxPrice&&(!state.size||p.sizes.includes(state.size))&&(!state.color||p.color===state.color)&&(`${p.name} ${p.category} ${p.type} ${p.color}`.toLowerCase().includes(state.search.toLowerCase().trim())));
 if(state.sort==="price-asc")list.sort((a,b)=>a.price-b.price);
 if(state.sort==="price-desc")list.sort((a,b)=>b.price-a.price);
 if(state.sort==="rating")list.sort((a,b)=>b.rating-a.rating);
 if(state.sort==="name")list.sort((a,b)=>a.name.localeCompare(b.name));
 return list;
}
function renderProducts(){
 const list=visibleProducts();$("#productCount").textContent=`Showing ${list.length} of ${products.length} products`;
 $("#productGrid").classList.toggle("hidden",!list.length);$("#noResults").classList.toggle("hidden",!!list.length);
 $("#productGrid").innerHTML=list.map(p=>`<article class="product-card"><div class="product-image"><img src="${p.image}" alt="${safe(p.name)}" loading="lazy" onerror="this.onerror=null;this.src='https://placehold.co/500x600/f0f2ee/344b3c?text=UrbanThreads'"><span class="product-badge">${safe(p.tag)}</span><button class="favorite ${state.favorites.has(p.id)?"liked":""}" data-fav="${p.id}" aria-label="Toggle favourite" aria-pressed="${state.favorites.has(p.id)}">${state.favorites.has(p.id)?"♥":"♡"}</button></div><div class="product-info"><div class="product-name-row"><h3>${safe(p.name)}</h3><span class="rating"><span>★</span> ${p.rating.toFixed(1)} (${p.reviews})</span></div><p class="product-subtitle">${p.category} | ${p.type}</p><div class="price-row"><strong class="price">${money(p.price)}</strong><span class="old-price">${money(p.old)}</span><span class="discount-tag">${p.discount}% OFF</span></div><button class="add-button" data-add="${p.id}">🛒 &nbsp; Add to Bag</button></div></article>`).join("");
 $$(".tab").forEach(b=>{b.classList.toggle("active",b.dataset.tab===state.category);b.setAttribute("aria-pressed",String(b.dataset.tab===state.category))});
}
function subtotal(){return Object.entries(state.cart).reduce((s,[id,q])=>s+(products.find(p=>p.id===+id)?.price||0)*q,0)}
function count(){return Object.values(state.cart).reduce((a,b)=>a+b,0)}
function shipping(){let s=subtotal();return s===0||s>=FREE_SHIPPING?0:SHIPPING}
function discount(){return state.coupon?subtotal()*.1:0}
function total(){return Math.max(0,subtotal()+shipping()-discount())}
function renderCart(){
 const entries=Object.entries(state.cart).filter(([,q])=>q>0),n=count(),sub=subtotal();
 $("#cartCount").textContent=n;$("#bagCount").textContent=n;$("#emptyCart").classList.toggle("hidden",entries.length>0);$(".cart-list-head").classList.toggle("hidden",entries.length===0);
 $("#cartItems").innerHTML=entries.map(([id,q])=>{let p=products.find(x=>x.id===+id);return `<div class="cart-item"><div class="cart-product"><img class="cart-thumb" src="${p.image}" alt="${safe(p.name)}" onerror="this.src='https://placehold.co/100x120/edf0ed/344b3c?text=Clothes'"><div><h4>${safe(p.name)}</h4><p>${money(p.price)} · ${p.size||"One style"}</p><button class="remove-button" data-remove="${p.id}">Remove</button></div></div><div class="qty"><button data-qty="${p.id}" data-delta="-1" aria-label="Decrease quantity">−</button><span>${q}</span><button data-qty="${p.id}" data-delta="1" aria-label="Increase quantity">+</button></div><div class="item-subtotal">${money(p.price*q)}</div></div>`}).join("");
 $("#subtotal").textContent=money(sub);$("#shipping").textContent=money(shipping());$("#shippingNote").textContent=sub===0?"Shipping calculated when you add items":sub>=FREE_SHIPPING?"You've unlocked free shipping!":`Spend ${money(FREE_SHIPPING-sub)} more for free shipping`;
 $("#discount").textContent="−"+money(discount());$("#discountRow").classList.toggle("hidden",!state.coupon||sub===0);$("#total").textContent=money(total());$("#checkoutButton").disabled=n===0;
 if(state.coupon&&sub===0){state.coupon=false;$("#couponMessage").className="coupon-message";$("#couponMessage").innerHTML=`Try <strong>${COUPON}</strong> for 10% off.`}
}
let toastTimer;function notify(msg){let t=$("#toast");t.textContent=msg;t.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove("show"),2300)}
function add(id){state.cart[id]=(state.cart[id]||0)+1;renderCart();notify("Added to your bag!")}
function setCategory(category){state.category=category;$$('input[name="category"]').forEach(i=>i.checked=i.value===category||(category==="all"&&i.value==="all"));renderProducts()}
$("#productGrid").addEventListener("click",e=>{let a=e.target.closest("[data-add]"),f=e.target.closest("[data-fav]");if(a)add(+a.dataset.add);if(f){let id=+f.dataset.fav;state.favorites.has(id)?state.favorites.delete(id):state.favorites.add(id);renderProducts()}});
$("#cartItems").addEventListener("click",e=>{let q=e.target.closest("[data-qty]"),r=e.target.closest("[data-remove]");if(q){let id=+q.dataset.qty;state.cart[id]=(state.cart[id]||0)+ +q.dataset.delta;if(state.cart[id]<=0)delete state.cart[id];renderCart()}if(r){delete state.cart[+r.dataset.remove];renderCart();notify("Item removed from bag")}});
$("#searchInput").addEventListener("input",e=>{state.search=e.target.value;renderProducts()});
$$('input[name="category"]').forEach(i=>i.addEventListener("change",()=>setCategory(i.value)));
$$(".tab").forEach(b=>b.addEventListener("click",()=>setCategory(b.dataset.tab)));
$("#priceRange").addEventListener("input",e=>{state.maxPrice=+e.target.value;$("#priceLabel").textContent=state.maxPrice===4000?"₹4,000+":`₹${state.maxPrice.toLocaleString("en-IN")}`;renderProducts()});
$$("[data-size]").forEach(b=>b.addEventListener("click",()=>{state.size=state.size===b.dataset.size?null:b.dataset.size;$$("[data-size]").forEach(x=>x.classList.toggle("selected",x.dataset.size===state.size));renderProducts()}));
$$("[data-color]").forEach(b=>b.addEventListener("click",()=>{state.color=state.color===b.dataset.color?null:b.dataset.color;$$("[data-color]").forEach(x=>x.classList.toggle("selected",x.dataset.color===state.color));renderProducts()}));
function setSort(v){state.sort=v;$("#sortSelect").value=v;$("#sortSelectMobile").value=v;renderProducts()}
$("#sortSelect").addEventListener("change",e=>setSort(e.target.value));$("#sortSelectMobile").addEventListener("change",e=>setSort(e.target.value));
function resetFilters(){state.category="all";state.search="";state.sort="featured";state.maxPrice=4000;state.size=null;state.color=null;$("#searchInput").value="";$("#priceRange").value=4000;$("#priceLabel").textContent="₹4,000+";$$('input[name="category"]').forEach(i=>i.checked=i.value==="all");$$("[data-size]").forEach(b=>b.classList.remove("selected"));$$("[data-color]").forEach(b=>b.classList.remove("selected"));setSort("featured")}
$("#clearFilters").addEventListener("click",resetFilters);$("#resetSearch").addEventListener("click",resetFilters);
$("#couponForm").addEventListener("submit",e=>{e.preventDefault();let code=$("#couponInput").value.trim().toUpperCase(),m=$("#couponMessage");m.className="coupon-message";if(!count()){m.textContent="Add items to your bag before applying a coupon.";m.classList.add("error");return}if(code!==COUPON){state.coupon=false;m.textContent="Invalid code. Try STYLE10.";m.classList.add("error");renderCart();return}state.coupon=true;m.textContent="Success! 10% discount applied to your subtotal.";m.classList.add("success");renderCart();notify("STYLE10 applied — you saved 10%!")});
function openCheckout(){if(!count())return;$("#modalTotal").textContent=money(total());$("#checkoutView").classList.remove("hidden");$("#successView").classList.add("hidden");$("#checkoutModal").classList.remove("hidden");document.body.style.overflow="hidden";setTimeout(()=>$("#customerName").focus(),40)}
function closeCheckout(){$("#checkoutModal").classList.add("hidden");document.body.style.overflow=""}
$("#checkoutButton").addEventListener("click",openCheckout);$("#closeModal").addEventListener("click",closeCheckout);$("#checkoutModal").addEventListener("click",e=>{if(e.target===$("#checkoutModal"))closeCheckout()});
$("#checkoutForm").addEventListener("submit",e=>{e.preventDefault();let name=$("#customerName").value.trim();$("#successMessage").textContent=`Thank you, ${name}! Your demo order total is ${money(total())}. No real payment or delivery has been arranged.`;$("#orderId").textContent="UT-"+Date.now().toString().slice(-6);$("#checkoutView").classList.add("hidden");$("#successView").classList.remove("hidden");state.cart={};state.coupon=false;$("#couponInput").value="";$("#couponMessage").className="coupon-message";$("#couponMessage").innerHTML=`Try <strong>${COUPON}</strong> for 10% off.`;renderCart()});
$("#finishOrder").addEventListener("click",()=>{closeCheckout();$("#shop").scrollIntoView({behavior:"smooth"});notify("Thanks for shopping with UrbanThreads!")});
$("#cartJump").addEventListener("click",()=>$("#cart").scrollIntoView({behavior:"smooth"}));$("#continueShopping").addEventListener("click",()=>$("#shop").scrollIntoView({behavior:"smooth"}));
$("#accountButton").addEventListener("click",()=>notify("Account sign-in is not part of this demo."));
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeCheckout();if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){e.preventDefault();$("#searchInput").focus()}});
$("#year").textContent=new Date().getFullYear();renderProducts();renderCart();

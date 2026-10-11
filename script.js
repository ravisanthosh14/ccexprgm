const products = [
  {id:1,name:'First Aid Kit',category:'First Aid',description:'A handy kit for everyday minor first-aid needs.',price:299,emoji:'🧰',bg:'#fff2e5'},
  {id:2,name:'Digital Thermometer',category:'Equipment',description:'A simple digital tool for checking temperature.',price:149,emoji:'🌡️',bg:'#e8f5ff'},
  {id:3,name:'Medical Face Masks',category:'Wellness',description:'Disposable masks for everyday protective use.',price:99,emoji:'😷',bg:'#edf5ff'},
  {id:4,name:'Adhesive Bandages',category:'First Aid',description:'Small adhesive strips for minor cuts and scrapes.',price:59,emoji:'🩹',bg:'#fff1ec'},
  {id:5,name:'Digital BP Monitor',category:'Equipment',description:'A home blood-pressure monitoring device.',price:1299,emoji:'🩺',bg:'#e8f8f2'},
  {id:6,name:'Hand Sanitizer',category:'Wellness',description:'Hand hygiene gel for everyday use.',price:79,emoji:'🧴',bg:'#f1edff'},
  {id:7,name:'Cotton Roll',category:'First Aid',description:'Soft cotton for general first-aid and cleaning use.',price:45,emoji:'☁️',bg:'#f2f7fa'},
  {id:8,name:'Hot Water Bag',category:'Wellness',description:'Reusable hot-water bag. Follow product instructions.',price:199,emoji:'♨️',bg:'#fff5dc'}
];
let activeCategory = 'All';
let cart = [];
function renderProducts(){
  const query = document.getElementById('search').value.trim().toLowerCase();
  const shown = products.filter(p => (activeCategory === 'All' || p.category === activeCategory) && (p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query)));
  const grid = document.getElementById('product-grid');
  grid.innerHTML = shown.map(p => `
    <article class="product-card">
      <div class="product-art" style="background:${p.bg}"><span>${p.emoji}</span><span class="tag">${p.category}</span></div>
      <div class="product-info">
        <h3>${p.name}</h3><p>${p.description}</p>
        <div class="product-bottom"><span class="price">₹${p.price}</span>
          <button class="add-button" aria-label="Add ${p.name} to cart" onclick="addToCart(${p.id})">+</button>
        </div>
      </div>
    </article>`).join('');
  document.getElementById('empty-message').hidden = shown.length !== 0;
}
function setCategory(category, button){
  activeCategory = category;
  document.querySelectorAll('.filter').forEach(b => b.classList.remove('active'));
  button.classList.add('active');
  renderProducts();
}
function filterProducts(){ renderProducts(); }
function addToCart(id){
  const product = products.find(p => p.id === id);
  cart.push(product);
  document.getElementById('cart-count').textContent = cart.length;
  showNotice(`${product.name} added to cart`);
}
function showCart(){
  if(!cart.length){ showNotice('Your cart is empty'); return; }
  const total = cart.reduce((sum,p) => sum + p.price, 0);
  showNotice(`Cart: ${cart.length} item(s) · Total ₹${total}`);
}
let noticeTimer;
function showNotice(message){
  const notice = document.getElementById('notice');
  notice.textContent = message;
  notice.classList.add('show');
  clearTimeout(noticeTimer);
  noticeTimer = setTimeout(() => notice.classList.remove('show'), 2600);
}
renderProducts();

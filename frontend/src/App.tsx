import { useMemo, useState, useEffect } from 'react'
import './App.css'

interface WeatherSnapshot {
  date: string
  temperatureC: number
  temperatureF: number
  summary: string
}

interface MenuItem {
  id: number
  name: string
  description: string
  price: number
  category: 'Breakfast' | 'Lunch' | 'Dinner' | 'Drinks' | 'Desserts'
  prepTime: string
  spicy?: boolean
  popular?: boolean
}

const menuItems: MenuItem[] = [
  { id: 1, name: 'Scrambled Egg Bowl', description: 'Eggs, herbs, toast and mixed greens.', price: 119, category: 'Breakfast', prepTime: '8 min', popular: true },
  { id: 2, name: 'Greek Yogurt Parfait', description: 'Greek yogurt, granola and seasonal fruit.', price: 95, category: 'Breakfast', prepTime: '5 min' },
  { id: 3, name: 'Chicken Teriyaki Bowl', description: 'Jasmine rice, grilled chicken and teriyaki glaze.', price: 169, category: 'Lunch', prepTime: '12 min', popular: true },
  { id: 4, name: 'Veggie Curry Plate', description: 'Coconut curry, chickpeas and steamed rice.', price: 149, category: 'Lunch', prepTime: '10 min', spicy: true },
  { id: 5, name: 'Roasted Salmon & Potatoes', description: 'Oven-roasted salmon with lemon potatoes.', price: 189, category: 'Dinner', prepTime: '15 min' },
  { id: 6, name: 'Pasta Alfredo', description: 'Creamy parmesan sauce with mushrooms.', price: 159, category: 'Dinner', prepTime: '11 min' },
  { id: 7, name: 'Cold Brew Coffee', description: 'Slow-steeped cold brew over ice.', price: 59, category: 'Drinks', prepTime: '2 min' },
  { id: 8, name: 'Fresh Citrus Lemonade', description: 'Homemade lemonade with mint.', price: 55, category: 'Drinks', prepTime: '2 min' },
  { id: 9, name: 'Chocolate Lava Cake', description: 'Warm cake with melted chocolate center.', price: 85, category: 'Desserts', prepTime: '7 min', popular: true },
  { id: 10, name: 'Berry Cheesecake Cup', description: 'No-bake cheesecake with mixed berries.', price: 79, category: 'Desserts', prepTime: '4 min' },
]

const categories = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Drinks', 'Desserts'] as const
const SERVICE_FEE_PERCENTAGE = 0.05

function App() {
  const [weatherData, setWeatherData] = useState<WeatherSnapshot[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<(typeof categories)[number]>('All')
  const [search, setSearch] = useState('')
  const [pickupTime, setPickupTime] = useState('12:30')
  const [cart, setCart] = useState<Record<number, number>>({})
  const [placedOrders, setPlacedOrders] = useState<
    { id: string; items: number; total: number; pickupTime: string; createdAt: string }[]
  >([])
  const fetchWeatherForecast = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch('/api/weatherforecast')
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data: WeatherSnapshot[] = await response.json()
      setWeatherData(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data')
      console.error('Error fetching weather forecast:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWeatherForecast()
  }, [])

  const weatherNow = weatherData[0]

  const filteredMenu = useMemo(() => {
    return menuItems.filter((item) => {
      const categoryMatches = selectedCategory === 'All' || item.category === selectedCategory
      const searchText = search.trim().toLowerCase()
      const searchMatches =
        !searchText ||
        item.name.toLowerCase().includes(searchText) ||
        item.description.toLowerCase().includes(searchText)
      return categoryMatches && searchMatches
    })
  }, [search, selectedCategory])

  const cartItems = useMemo(() => {
    return menuItems
      .map((item) => ({ ...item, quantity: cart[item.id] ?? 0 }))
      .filter((item) => item.quantity > 0)
  }, [cart])

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const serviceFee = subtotal > 0 ? Math.round(subtotal * SERVICE_FEE_PERCENTAGE) : 0
  const total = subtotal + serviceFee
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0)

  const updateQuantity = (itemId: number, amount: number) => {
    setCart((previous) => {
      const next = (previous[itemId] ?? 0) + amount
      if (next <= 0) {
        const nextCart = { ...previous }
        delete nextCart[itemId]
        return nextCart
      }
      return { ...previous, [itemId]: next }
    })
  }

  const placeOrder = () => {
    if (cartItems.length === 0) return
    setPlacedOrders((previous) => [
      {
        id: `ORD-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
        items: totalItems,
        total,
        pickupTime,
        createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
      ...previous,
    ])
    setCart({})
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <div>
          <p className="header-eyebrow">Ordering System Menza</p>
          <h1 className="app-title">Order food faster, dine smarter.</h1>
          <p className="app-subtitle">Modern, responsive canteen ordering with real-time cart updates.</p>
        </div>
        <div className="header-weather">
          <h2>Today&apos;s Outlook</h2>
          {loading && <p>Loading weather…</p>}
          {!loading && weatherNow && (
            <>
              <p className="weather-temperature">{weatherNow.temperatureC}°C</p>
              <p>{weatherNow.summary}</p>
            </>
          )}
          {error && <p className="weather-error">Weather unavailable</p>}
          <button className="ghost-button" onClick={fetchWeatherForecast} disabled={loading} type="button">
            Refresh
          </button>
        </div>
      </header>

      <main className="main-content">
        <section className="menu-section" aria-labelledby="menu-heading">
          <div className="menu-controls">
            <h2 id="menu-heading">Menu</h2>
            <input
              className="search-input"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search meals or ingredients"
              aria-label="Search menu"
            />
            <div className="category-tabs" role="tablist" aria-label="Menu categories">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`tab-button ${selectedCategory === category ? 'active' : ''}`}
                  type="button"
                  role="tab"
                  aria-selected={selectedCategory === category}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="menu-grid">
            {filteredMenu.map((item) => {
              const quantity = cart[item.id] ?? 0
              return (
                <article key={item.id} className="menu-card">
                  <div className="menu-card-header">
                    <h3>{item.name}</h3>
                    <p className="menu-price">{item.price} Kč</p>
                  </div>
                  <p className="menu-description">{item.description}</p>
                  <div className="menu-meta">
                    <span>{item.category}</span>
                    <span>{item.prepTime}</span>
                    {item.spicy && <span>🌶️ Spicy</span>}
                    {item.popular && <span>🔥 Popular</span>}
                  </div>
                  <div className="menu-actions">
                    {quantity > 0 && (
                      <button className="small-button" onClick={() => updateQuantity(item.id, -1)} type="button">
                        −
                      </button>
                    )}
                    <button className="primary-button" onClick={() => updateQuantity(item.id, 1)} type="button">
                      {quantity > 0 ? `Add more (${quantity})` : 'Add to order'}
                    </button>
                  </div>
                </article>
              )
            })}
            {filteredMenu.length === 0 && <p className="empty-state">No meals found for your search.</p>}
          </div>
        </section>

        <aside className="cart-panel" aria-labelledby="cart-heading">
          <h2 id="cart-heading">Your order</h2>
          {cartItems.length === 0 && <p className="empty-state">Your cart is empty. Start adding meals.</p>}
          {cartItems.length > 0 && (
            <ul className="cart-list">
              {cartItems.map((item) => (
                <li key={item.id}>
                  <div>
                    <h3>{item.name}</h3>
                    <p>{item.quantity} × {item.price} Kč</p>
                  </div>
                  <p>{item.quantity * item.price} Kč</p>
                </li>
              ))}
            </ul>
          )}

          <label className="pickup-control">
            Pickup time
            <select value={pickupTime} onChange={(event) => setPickupTime(event.target.value)}>
              <option value="11:45">11:45</option>
              <option value="12:00">12:00</option>
              <option value="12:30">12:30</option>
              <option value="13:00">13:00</option>
              <option value="13:30">13:30</option>
            </select>
          </label>

          <div className="totals">
            <p><span>Items</span><span>{totalItems}</span></p>
            <p><span>Subtotal</span><span>{subtotal} Kč</span></p>
            <p><span>Service fee</span><span>{serviceFee} Kč</span></p>
            <p className="total-line"><span>Total</span><span>{total} Kč</span></p>
          </div>

          <button className="checkout-button" type="button" disabled={cartItems.length === 0} onClick={placeOrder}>
            Place order
          </button>

          {placedOrders.length > 0 && (
            <section className="history" aria-label="Recent orders">
              <h3>Recent orders</h3>
              <ul>
                {placedOrders.slice(0, 3).map((order) => (
                  <li key={order.id}>
                    <p><strong>{order.id}</strong> · {order.items} items</p>
                    <p>{order.total} Kč · Pickup {order.pickupTime} · Placed {order.createdAt}</p>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </aside>
      </main>
    </div>
  )
}

export default App

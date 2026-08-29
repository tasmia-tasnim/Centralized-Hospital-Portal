import { useState, useMemo } from 'react'
import { useAuth } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'
import { MEDICINES_DATA, PHARMACY_CATEGORIES } from '../data/pharmacyData'
import './Pharmacy.css'

export default function Pharmacy() {
  const { user } = useAuth()
  const { lang } = useLanguage()

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [rxFilter, setRxFilter] = useState('all') // 'all', 'otc', 'rx'

  // Cart state
  const [cart, setCart] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState(null)

  // Checkout inputs
  const [deliveryAddress, setDeliveryAddress] = useState(user?.address || 'House 42, Road 11, Dhanmondi, Dhaka')
  const [contactPhone, setContactPhone] = useState(user?.phone || '+880 1712-345678')
  const [paymentMethod, setPaymentMethod] = useState('cod')
  const [specialNote, setSpecialNote] = useState('')

  // Filtered medicines
  const filteredMedicines = useMemo(() => {
    return MEDICINES_DATA.filter(med => {
      const matchesCat = selectedCategory === 'all' || med.category === selectedCategory
      const matchesRx = 
        rxFilter === 'all' || 
        (rxFilter === 'rx' && med.requiresPrescription) || 
        (rxFilter === 'otc' && !med.requiresPrescription)
      
      const q = searchQuery.toLowerCase().trim()
      const matchesQuery = !q || 
        med.name.toLowerCase().includes(q) ||
        med.genericName.toLowerCase().includes(q) ||
        med.manufacturer.toLowerCase().includes(q) ||
        med.descriptionEn.toLowerCase().includes(q)

      return matchesCat && matchesRx && matchesQuery
    })
  }, [selectedCategory, rxFilter, searchQuery])

  // Cart management
  const addToCart = (med) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === med.id)
      if (existing) {
        return prev.map(item => item.id === med.id ? { ...item, quantity: item.quantity + 1 } : item)
      }
      return [...prev, { ...med, quantity: 1 }]
    })
  }

  const updateQuantity = (id, delta) => {
    setCart(prev => {
      return prev
        .map(item => {
          if (item.id === id) {
            const newQty = item.quantity + delta
            return newQty > 0 ? { ...item, quantity: newQty } : null
          }
          return item
        })
        .filter(Boolean)
    })
  }

  const totalItemsCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0)
  }, [cart])

  const cartSubtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  }, [cart])

  const deliveryFee = cartSubtotal >= 500 || cartSubtotal === 0 ? 0 : 40
  const grandTotal = cartSubtotal + deliveryFee

  const handlePlaceOrder = (e) => {
    e.preventDefault()
    if (cart.length === 0) return

    const orderId = `PH-ORD-${Math.floor(100000 + Math.random() * 900000)}`
    const orderDetails = {
      id: orderId,
      items: [...cart],
      total: grandTotal,
      subtotal: cartSubtotal,
      deliveryFee,
      address: deliveryAddress,
      phone: contactPhone,
      paymentMethod,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      estimatedArrival: '30 - 45 Minutes'
    }

    setOrderSuccess(orderDetails)
    setCart([])
    setIsCheckoutOpen(false)
    setIsCartOpen(false)
  }

  return (
    <div className="ph-page">
      {/* Pharmacy Hero Banner */}
      <section className="ph-hero">
        <div className="ph-hero-inner">
          <h1 className="ph-hero-title">
            {lang === 'bn' ? 'জেনুইন ওষুধ ও হেলথকেয়ার সামগ্রী খুঁজুন' : 'Order Genuine Medicines & Healthcare Essentials'}
          </h1>
          <p className="ph-hero-subtitle">
            {lang === 'bn'
              ? 'হাসপাতাল অনুমোদিত ফার্মেসি থেকে সরাসরি ৩০-৪৫ মিনিটে ওয়ার্ড বা বাসায় এক্সপ্রেস ডেলিভারি'
              : 'Direct from certified hospital inventory with 30-minute express ward & home delivery.'}
          </p>

          {/* Search bar */}
          <div className="ph-search-bar-wrap">
            <div className="ph-search-input-box">
              <svg className="ph-search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                type="text"
                className="ph-search-input"
                placeholder={lang === 'bn' ? 'ওষুধের নাম, জেনেরিক বা উপাদান লিখে খুঁজুন...' : 'Search medicine name, generic or therapeutic use...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button className="ph-clear-btn" onClick={() => setSearchQuery('')}>✕</button>
              )}
            </div>

            <button 
              type="button" 
              className="ph-open-cart-btn"
              onClick={() => setIsCartOpen(true)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              <span>{lang === 'bn' ? 'কার্ট' : 'Cart'}</span>
              {totalItemsCount > 0 && <span className="ph-cart-pill">{totalItemsCount}</span>}
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="ph-main-container">
        {/* Filter Navigation Bar */}
        <div className="ph-filter-bar">
          <div className="ph-category-chips">
            {PHARMACY_CATEGORIES.map(cat => (
              <button
                key={cat.id}
                className={`ph-cat-chip ${selectedCategory === cat.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {lang === 'bn' ? cat.nameBn : cat.nameEn}
              </button>
            ))}
          </div>

          <div className="ph-rx-selector">
            <button className={`ph-rx-btn ${rxFilter === 'all' ? 'active' : ''}`} onClick={() => setRxFilter('all')}>
              {lang === 'bn' ? 'সকল' : 'All'}
            </button>
            <button className={`ph-rx-btn ${rxFilter === 'otc' ? 'active' : ''}`} onClick={() => setRxFilter('otc')}>
              {lang === 'bn' ? 'ওটিসি (OTC)' : 'OTC Only'}
            </button>
            <button className={`ph-rx-btn ${rxFilter === 'rx' ? 'active' : ''}`} onClick={() => setRxFilter('rx')}>
              {lang === 'bn' ? 'প্রেসক্রিপশন আবশ্যক' : 'Rx Required'}
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="ph-products-grid">
          {filteredMedicines.length > 0 ? (
            filteredMedicines.map(med => {
              const inCart = cart.find(item => item.id === med.id)
              return (
                <div className="ph-product-card" key={med.id}>
                  <div className="ph-card-top-tag">
                    {med.requiresPrescription ? (
                      <span className="ph-tag-rx">Rx Required</span>
                    ) : (
                      <span className="ph-tag-otc">OTC</span>
                    )}
                    {med.tag && <span className="ph-tag-feature">{med.tag}</span>}
                  </div>

                  <div className="ph-med-icon-area">
                    <span className="ph-dosage-badge">{med.dosageForm}</span>
                    <div className="ph-med-symbol">
                      {med.dosageForm === 'Tablet' && '💊'}
                      {med.dosageForm === 'Capsule' && '💊'}
                      {med.dosageForm === 'Syrup' && '🧪'}
                      {med.dosageForm === 'Cream' && '🧴'}
                      {med.dosageForm === 'Device / Strips' && '🩹'}
                      {!['Tablet', 'Capsule', 'Syrup', 'Cream', 'Device / Strips'].includes(med.dosageForm) && '💊'}
                    </div>
                  </div>

                  <div className="ph-med-body">
                    <h3 className="ph-med-name">{med.name}</h3>
                    <p className="ph-med-generic">{med.genericName}</p>
                    <p className="ph-med-mfg">{med.manufacturer}</p>
                    <p className="ph-med-desc">{lang === 'bn' ? med.descriptionBn : med.descriptionEn}</p>
                  </div>

                  <div className="ph-med-footer">
                    <div className="ph-price-box">
                      <span className="ph-price-val">৳ {med.price}</span>
                      <span className="ph-price-unit">{med.unit}</span>
                    </div>

                    {inCart ? (
                      <div className="ph-qty-controls">
                        <button className="ph-qty-btn" onClick={() => updateQuantity(med.id, -1)}>−</button>
                        <span className="ph-qty-val">{inCart.quantity}</span>
                        <button className="ph-qty-btn" onClick={() => updateQuantity(med.id, 1)}>+</button>
                      </div>
                    ) : (
                      <button 
                        className="ph-add-cart-btn"
                        onClick={() => addToCart(med)}
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                        </svg>
                        <span>{lang === 'bn' ? 'যোগ করুন' : 'Add'}</span>
                      </button>
                    )}
                  </div>
                </div>
              )
            })
          ) : (
            <div className="ph-no-results">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <h3>{lang === 'bn' ? 'কোনো ওষুধ পাওয়া যায়নি' : 'No medicines matched your search'}</h3>
              <p>{lang === 'bn' ? 'বানান চেক করুন অথবা ফিল্টার পরিবর্তন করুন' : 'Try adjusting your search query or category filter.'}</p>
            </div>
          )}
        </div>
      </div>

      {/* Floating Bottom Cart Bar for Mobile/Quick Access */}
      {totalItemsCount > 0 && !isCartOpen && (
        <div className="ph-floating-cart-bar" onClick={() => setIsCartOpen(true)}>
          <div className="ph-fc-left">
            <span className="ph-fc-badge">{totalItemsCount} {totalItemsCount === 1 ? 'Item' : 'Items'}</span>
            <span className="ph-fc-price">৳ {grandTotal}</span>
          </div>
          <div className="ph-fc-right">
            <span>{lang === 'bn' ? 'কার্ট দেখুন ও অর্ডার করুন' : 'View Cart & Order'} →</span>
          </div>
        </div>
      )}

      {/* ================= SLIDE-OVER CART DRAWER ================= */}
      {isCartOpen && (
        <div className="ph-drawer-overlay" onClick={() => setIsCartOpen(false)}>
          <div className="ph-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="ph-drawer-header">
              <div className="ph-dh-title-wrap">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1B3C35" strokeWidth="2">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
                <h3 className="ph-dh-title">{lang === 'bn' ? 'আপনার ওষুধের ঝুড়ি' : 'Hospital Pharmacy Cart'}</h3>
                <span className="ph-dh-count">({totalItemsCount})</span>
              </div>
              <button className="ph-dh-close" onClick={() => setIsCartOpen(false)}>✕</button>
            </div>

            <div className="ph-drawer-body">
              {cart.length > 0 ? (
                <div className="ph-cart-items-list">
                  {cart.map(item => (
                    <div className="ph-cart-item" key={item.id}>
                      <div className="ph-ci-info">
                        <strong className="ph-ci-name">{item.name}</strong>
                        <span className="ph-ci-unit">{item.unit}</span>
                        <span className="ph-ci-rate">৳ {item.price} each</span>
                      </div>

                      <div className="ph-ci-actions">
                        <div className="ph-qty-controls small">
                          <button className="ph-qty-btn" onClick={() => updateQuantity(item.id, -1)}>−</button>
                          <span className="ph-qty-val">{item.quantity}</span>
                          <button className="ph-qty-btn" onClick={() => updateQuantity(item.id, 1)}>+</button>
                        </div>
                        <span className="ph-ci-total">৳ {item.price * item.quantity}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="ph-empty-cart">
                  <span className="ph-empty-icon">🛒</span>
                  <p>{lang === 'bn' ? 'আপনার ঝুড়ি খালি রয়েছে' : 'Your medicine cart is empty'}</p>
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="ph-drawer-footer">
                <div className="ph-bill-breakdown">
                  <div className="ph-bill-row">
                    <span>{lang === 'bn' ? 'সাবটোটাল' : 'Subtotal'}</span>
                    <span>৳ {cartSubtotal}</span>
                  </div>
                  <div className="ph-bill-row">
                    <span>{lang === 'bn' ? 'এক্সপ্রেস ডেলিভারি চার্জ' : 'Express Delivery Fee'}</span>
                    <span>{deliveryFee === 0 ? <strong style={{ color: '#16a34a' }}>FREE</strong> : `৳ ${deliveryFee}`}</span>
                  </div>
                  <div className="ph-bill-divider"></div>
                  <div className="ph-bill-row total">
                    <strong>{lang === 'bn' ? 'সর্বমোট' : 'Grand Total'}</strong>
                    <strong className="ph-grand-total-val">৳ {grandTotal}</strong>
                  </div>
                </div>

                <button 
                  className="ph-checkout-btn"
                  onClick={() => setIsCheckoutOpen(true)}
                >
                  <span>{lang === 'bn' ? 'অর্ডার প্রক্রিয়া এগিয়ে নিন' : 'Proceed to Checkout'}</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= CHECKOUT MODAL ================= */}
      {isCheckoutOpen && (
        <div className="ph-modal-overlay" onClick={() => setIsCheckoutOpen(false)}>
          <div className="ph-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="ph-modal-header">
              <h3 className="ph-modal-title">{lang === 'bn' ? 'ডেলিভারি ও পেমেন্ট নিশ্চিতকরণ' : 'Delivery & Payment Confirmation'}</h3>
              <button className="ph-modal-close" onClick={() => setIsCheckoutOpen(false)}>✕</button>
            </div>

            <form onSubmit={handlePlaceOrder} className="ph-checkout-form">
              <div className="ph-form-group">
                <label className="ph-form-label">{lang === 'bn' ? 'ডেলিভারি ঠিকানা / ওয়ার্ড ও বেড নম্বর *' : 'Delivery Address / Hospital Ward & Bed No *'}</label>
                <input 
                  type="text" 
                  className="ph-form-input" 
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  placeholder="e.g. Ward 4, Bed 12 (or Residential Address)"
                  required
                />
              </div>

              <div className="ph-form-group">
                <label className="ph-form-label">{lang === 'bn' ? 'যোগাযোগের মোবাইল নম্বর *' : 'Contact Mobile Number *'}</label>
                <input 
                  type="tel" 
                  className="ph-form-input" 
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  placeholder="+880 17..."
                  required
                />
              </div>

              <div className="ph-form-group">
                <label className="ph-form-label">{lang === 'bn' ? 'পেমেন্ট মেথড নির্বাচন করুন' : 'Select Payment Method'}</label>
                <div className="ph-payment-methods">
                  <label className={`ph-pay-option ${paymentMethod === 'cod' ? 'active' : ''}`}>
                    <input 
                      type="radio" 
                      name="payMethod" 
                      value="cod" 
                      checked={paymentMethod === 'cod'} 
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <span>{lang === 'bn' ? 'ক্যাশ অন ডেলিভারি (Cash on Delivery)' : 'Cash on Delivery (COD)'}</span>
                  </label>

                  <label className={`ph-pay-option ${paymentMethod === 'bkash' ? 'active' : ''}`}>
                    <input 
                      type="radio" 
                      name="payMethod" 
                      value="bkash" 
                      checked={paymentMethod === 'bkash'} 
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <span>{lang === 'bn' ? 'বিকাশ / নগদ (Mobile Banking)' : 'bKash / Nagad / Upay'}</span>
                  </label>
                </div>
              </div>

              <div className="ph-form-group">
                <label className="ph-form-label">{lang === 'bn' ? 'বিশেষ নির্দেশনা (ঐচ্ছিক)' : 'Delivery Notes (Optional)'}</label>
                <input 
                  type="text" 
                  className="ph-form-input" 
                  value={specialNote}
                  onChange={(e) => setSpecialNote(e.target.value)}
                  placeholder="e.g. Call upon arrival / urgent dose"
                />
              </div>

              <div className="ph-order-summary-box">
                <div className="ph-os-row">
                  <span>{lang === 'bn' ? 'মোট ওষুধ' : 'Items'} ({totalItemsCount}):</span>
                  <strong>৳ {cartSubtotal}</strong>
                </div>
                <div className="ph-os-row">
                  <span>{lang === 'bn' ? 'ডেলিভারি চার্জ:' : 'Delivery Fee:'}</span>
                  <strong>{deliveryFee === 0 ? 'FREE' : `৳ ${deliveryFee}`}</strong>
                </div>
                <div className="ph-os-divider"></div>
                <div className="ph-os-row total">
                  <span>{lang === 'bn' ? 'পরিশোধযোগ্য মোট:' : 'Payable Total:'}</span>
                  <span className="ph-os-total-val">৳ {grandTotal}</span>
                </div>
              </div>

              <button type="submit" className="ph-confirm-order-btn">
                {lang === 'bn' ? `৳ ${grandTotal} অর্ডার নিশ্চিত করুন` : `Confirm Order for ৳ ${grandTotal}`}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ================= ORDER SUCCESS MODAL ================= */}
      {orderSuccess && (
        <div className="ph-modal-overlay">
          <div className="ph-modal-container success-modal">
            <div className="ph-success-top">
              <div className="ph-success-check-icon">✓</div>
              <h2 className="ph-success-title">{lang === 'bn' ? 'ওষুধ অর্ডার সফলভাবে গৃহীত হয়েছে!' : 'Medicine Order Placed Successfully!'}</h2>
              <p className="ph-success-sub">{lang === 'bn' ? 'আপনার অর্ডারটি সেন্ট্রাল হসপিটাল ফার্মেসি থেকে প্রস্তুত করা হচ্ছে।' : 'Your medicine order is being dispatched by Central Hospital Pharmacy.'}</p>
            </div>

            <div className="ph-tracking-bar">
              <div className="ph-track-step done">
                <span className="ph-step-dot"></span>
                <span className="ph-step-txt">Order Received</span>
              </div>
              <div className="ph-track-line active"></div>
              <div className="ph-track-step done">
                <span className="ph-step-dot"></span>
                <span className="ph-step-txt">Packing</span>
              </div>
              <div className="ph-track-line"></div>
              <div className="ph-track-step">
                <span className="ph-step-dot"></span>
                <span className="ph-step-txt">Out for Delivery</span>
              </div>
            </div>

            <div className="ph-receipt-card">
              <div className="ph-rc-row">
                <span>Order ID:</span>
                <strong>{orderSuccess.id}</strong>
              </div>
              <div className="ph-rc-row">
                <span>Estimated Arrival:</span>
                <strong style={{ color: '#16a34a' }}>{orderSuccess.estimatedArrival}</strong>
              </div>
              <div className="ph-rc-row">
                <span>Delivery To:</span>
                <span>{orderSuccess.address} ({orderSuccess.phone})</span>
              </div>
              <div className="ph-rc-row">
                <span>Total Amount:</span>
                <strong style={{ fontSize: '16px' }}>৳ {orderSuccess.total}</strong>
              </div>
            </div>

            <button 
              className="ph-confirm-order-btn"
              onClick={() => setOrderSuccess(null)}
            >
              {lang === 'bn' ? 'ফার্মেসিতে ফিরে যান' : 'Continue Shopping'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

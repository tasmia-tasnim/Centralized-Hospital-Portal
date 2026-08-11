import './BloodBank.css'

const bloodStocks = [
  { group: 'A+', bags: 12, status: 'normal' },
  { group: 'A-', bags: 3, status: 'low' },
  { group: 'B+', bags: 18, status: 'normal' },
  { group: 'B-', bags: 2, status: 'critical' },
  { group: 'O+', bags: 8, status: 'low' },
  { group: 'O-', bags: 1, status: 'critical' },
  { group: 'AB+', bags: 5, status: 'low' },
  { group: 'AB-', bags: 4, status: 'low' }
]

export default function BloodBank() {
  return (
    <div className="bloodbank-inv-page">
      <div className="bloodbank-inv-content">
        <div className="bb-inv-header">
          <h1 className="bb-inv-title">Blood Bank Inventory</h1>
          <p className="bb-inv-desc">Live status of blood stock at Central Hospital.</p>
        </div>

        <div className="bb-inv-grid">
          {bloodStocks.map((stock) => (
            <div key={stock.group} className={`bb-inv-card status-${stock.status}`}>
              <h2 className="bb-inv-group">{stock.group}</h2>
              <div className="bb-inv-bags">{stock.bags} bags</div>
              <div className="bb-inv-status">
                {stock.status === 'normal' && 'Available'}
                {stock.status === 'low' && 'Low Stock'}
                {stock.status === 'critical' && 'Critical Shortage'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

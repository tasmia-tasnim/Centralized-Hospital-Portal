import { useState, useRef, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'
import './Chatbot.css'

const faqResponses = {
  en: [
    { q: 'How do I book an appointment?', a: 'Go to "Book Appointment" from the home page or navigation menu. Select a doctor, pick a date & time, and confirm your booking.' },
    { q: 'Where can I find a doctor?', a: 'Visit the "Find a Doctor" page from the navigation menu. You can browse all available doctors without signing in.' },
    { q: 'How do I check bed availability?', a: 'Navigate to "Bed Availability" from the Patient Services menu. You can see real-time bed counts by ward and department.' },
    { q: 'How do I view my medical records?', a: 'Go to "Medical Record" from the menu. You need to be signed in to view your records.' },
    { q: 'What is the emergency number?', a: 'Our emergency hotline is 10666. Available 24/7.' },
    { q: 'How do I request blood?', a: 'Visit the "Blood Donor Network" page. You can search for donors by blood type or submit an emergency request.' },
  ],
  bn: [
    { q: 'আমি কিভাবে অ্যাপয়েন্টমেন্ট বুক করব?', a: 'হোম পেজ বা নেভিগেশন মেনু থেকে "অ্যাপয়েন্টমেন্ট বুক করুন"-এ যান। একজন ডাক্তার নির্বাচন করুন, তারিখ ও সময় বেছে নিন, এবং আপনার বুকিং নিশ্চিত করুন।' },
    { q: 'আমি কিভাবে একজন ডাক্তার খুঁজব?', a: '"ডাক্তার খুঁজুন" পৃষ্ঠায় যান। আপনি সাইন ইন ছাড়াই সমস্ত উপলব্ধ ডাক্তার দেখতে পারবেন।' },
    { q: 'বেড প্রাপ্যতা কিভাবে দেখব?', a: 'রোগী সেবা মেনু থেকে "বেড প্রাপ্যতা"-তে যান। ওয়ার্ড ও বিভাগ অনুযায়ী রিয়েল-টাইম বেড সংখ্যা দেখতে পারবেন।' },
    { q: 'আমার মেডিকেল রেকর্ড কিভাবে দেখব?', a: 'মেনু থেকে "চিকিৎসা রেকর্ড"-এ যান। আপনার রেকর্ড দেখতে সাইন ইন করতে হবে।' },
    { q: 'জরুরি নম্বর কী?', a: 'আমাদের জরুরি হটলাইন হলো ১০৬৬৬। ২৪/৭ পাওয়া যায়।' },
    { q: 'আমি কিভাবে রক্তের অনুরোধ করব?', a: '"রক্তদাতা নেটওয়ার্ক" পৃষ্ঠায় যান। আপনি রক্তের ধরন অনুযায়ী দাতা খুঁজতে পারবেন বা জরুরি অনুরোধ জমা দিতে পারবেন।' },
  ]
}

export default function Chatbot() {
  const { lang } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [inputVal, setInputVal] = useState('')
  const [showFaqs, setShowFaqs] = useState(true)
  const bodyRef = useRef(null)

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight
    }
  }, [messages])

  const welcomeMsg = lang === 'bn'
    ? 'হ্যালো! সেন্ট্রাল হাসপাতাল পোর্টালে স্বাগতম। আমি আপনাকে কীভাবে সাহায্য করতে পারি?'
    : 'Hello! Welcome to Central Hospital portal. How can I help you today?'

  const handleFaqClick = (faq) => {
    setMessages(prev => [
      ...prev,
      { type: 'user', text: faq.q },
      { type: 'bot', text: faq.a }
    ])
    setShowFaqs(false)
  }

  const handleSend = () => {
    if (!inputVal.trim()) return
    const userMsg = inputVal.trim()
    setInputVal('')
    setShowFaqs(false)

    const faqs = faqResponses[lang] || faqResponses.en
    const lowerMsg = userMsg.toLowerCase()
    let botReply = lang === 'bn'
      ? 'ধন্যবাদ! আপনার প্রশ্নটি আমাদের টিমের কাছে পাঠানো হয়েছে। দ্রুত সাহায্যের জন্য 10666 কল করুন।'
      : 'Thank you for your question! Our team will get back to you soon. For immediate help, call 10666.'

    for (const faq of faqs) {
      const keywords = faq.q.toLowerCase().split(' ').filter(w => w.length > 3)
      const matchCount = keywords.filter(kw => lowerMsg.includes(kw)).length
      if (matchCount >= 2) {
        botReply = faq.a
        break
      }
    }

    setMessages(prev => [
      ...prev,
      { type: 'user', text: userMsg },
      { type: 'bot', text: botReply }
    ])
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSend()
  }

  const faqs = faqResponses[lang] || faqResponses.en

  return (
    <>
      <button
        className="chatbot-floating-btn"
        aria-label="Open chat"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        )}
      </button>

      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <div className="chatbot-avatar">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
              </div>
              <div>
                <h4>{lang === 'bn' ? 'লুমিনা অ্যাসিস্ট্যান্ট' : 'Lumina Assistant'}</h4>
                <span className="chatbot-status">
                  <span className="chatbot-status-dot"></span>
                  {lang === 'bn' ? 'অনলাইন' : 'Online'}
                </span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="chatbot-close-btn" aria-label="Close chat">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          <div className="chatbot-body" ref={bodyRef}>
            <div className="chatbot-msg bot-msg">
              <p>{welcomeMsg}</p>
            </div>

            {showFaqs && (
              <div className="chatbot-faq-list">
                <p className="chatbot-faq-label">{lang === 'bn' ? 'দ্রুত প্রশ্নসমূহ:' : 'Quick questions:'}</p>
                {faqs.map((faq, i) => (
                  <button
                    key={i}
                    className="chatbot-faq-btn"
                    onClick={() => handleFaqClick(faq)}
                  >
                    {faq.q}
                  </button>
                ))}
              </div>
            )}

            {messages.map((msg, i) => (
              <div key={i} className={`chatbot-msg ${msg.type === 'bot' ? 'bot-msg' : 'user-msg'}`}>
                <p>{msg.text}</p>
              </div>
            ))}
          </div>

          <div className="chatbot-footer">
            <input
              type="text"
              placeholder={lang === 'bn' ? 'আপনার মেসেজ লিখুন...' : 'Type a message...'}
              className="chatbot-input"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button className="chatbot-send-btn" onClick={handleSend} aria-label="Send message">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"/>
                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  )
}

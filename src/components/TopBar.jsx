import { useLanguage } from '../context/LanguageContext'
import './TopBar.css'

export default function TopBar() {
  const { lang, toggleLang } = useLanguage()

  return (
    <div className="topbar">
      <div className="topbar-inner">
        <div className="topbar-left">
          <span className="topbar-emergency">Emergency: 10666</span>
          <span className="topbar-handle">@centralhospital.bd</span>
        </div>
        <div className="topbar-right">
          <span className="topbar-lang" onClick={toggleLang} style={{cursor: 'pointer'}}>
            {lang === 'en' ? 'বাংলা' : 'Eng'} / {lang === 'en' ? 'Eng' : 'বাংলা'}
          </span>
          <span className="topbar-contact">Contact</span>
        </div>
      </div>
    </div>
  )
}

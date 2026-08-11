import { useLanguage } from '../context/LanguageContext'
import './TopBar.css'

export default function TopBar() {
  const { lang, toggleLang, t } = useLanguage()

  return (
    <div className="topbar">
      <div className="topbar-inner">
        <div className="topbar-left">
          <span className="topbar-emergency">{t('emergency')}: 10666</span>
          <span className="topbar-handle">@centralhospital.bd</span>
        </div>
        <div className="topbar-right">
          <div className="lang-switcher" onClick={toggleLang}>
            <span className={`lang-text ${lang === 'bn' ? 'active' : ''}`}>বাংলা</span>
            <span className="lang-sep">|</span>
            <span className={`lang-text ${lang === 'en' ? 'active' : ''}`}>Eng</span>
          </div>
          <span className="topbar-contact">{t('contact')}</span>
        </div>
      </div>
    </div>
  )
}

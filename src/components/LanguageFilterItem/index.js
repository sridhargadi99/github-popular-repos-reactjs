// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {eachDataDetails, updateActiveId, isActive} = props
  const {id, language} = eachDataDetails
  const clickLanguageButton = () => {
    updateActiveId(id)
  }
  const activeLanguage = isActive ? 'language-filter-item-button-style2' : ''

  return (
    <li className="language-filter-item-list-style">
      <button
        type="button"
        className={`language-filter-item-button-style1 ${activeLanguage}`}
        onClick={clickLanguageButton}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem

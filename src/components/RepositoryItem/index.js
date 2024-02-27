// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {eachRepoDetails} = props
  const {avatarUrl, forksCount, issuesCount, name, starsCount} = eachRepoDetails
  return (
    <li className="repository-item-list-style">
      <div className="avatar-name-container">
        <img className="avatar-image-style" src={avatarUrl} alt={name} />
        <h1 className="name-content-style">{name}</h1>
      </div>
      <div className="icon-count-container">
        <img
          className="icon-image-style"
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt=" stars"
        />
        <p className="icon-count-style">{starsCount} stars</p>
      </div>
      <div className="icon-count-container">
        <img
          className="icon-image-style"
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
        />
        <p className="icon-count-style">{forksCount} forks</p>
      </div>
      <div className="icon-count-container">
        <img
          className="icon-image-style"
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
        />
        <p className="icon-count-style">{issuesCount} open issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem

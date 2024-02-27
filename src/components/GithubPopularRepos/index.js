import {Component} from 'react'
import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const differentContainers = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here
class GithubPopularRepos extends Component {
  state = {
    activeId: languageFiltersData[0].id,
    repositoryData: [],
    activeContainer: differentContainers.initial,
  }

  componentDidMount() {
    this.getRepositoryItems()
  }

  getRepositoryItems = async () => {
    this.setState({activeContainer: differentContainers.loading})
    const {activeId} = this.state
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeId}`
    const response = await fetch(apiUrl)
    const data = await response.json()
    if (response.ok === true) {
      const updatedData = data.popular_repos.map(eachRepo => ({
        avatarUrl: eachRepo.avatar_url,
        forksCount: eachRepo.forks_count,
        id: eachRepo.id,
        issuesCount: eachRepo.issues_count,
        name: eachRepo.name,
        starsCount: eachRepo.stars_count,
      }))

      this.setState({
        repositoryData: updatedData,
        activeContainer: differentContainers.success,
      })
    } else {
      this.setState({activeContainer: differentContainers.failure})
    }
  }

  renderLoader = () => (
    <div className="loader-style" data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderFailureContainer = () => (
    <div className="failure-container">
      <img
        className="failure-image-style"
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1 className="failure-content-style">Something Went Wrong</h1>
    </div>
  )

  renderRepositoryContainer = () => {
    const {repositoryData} = this.state
    return (
      <>
        <ul className="repository-item-container">
          {repositoryData.map(eachRepo => (
            <RepositoryItem eachRepoDetails={eachRepo} key={eachRepo.id} />
          ))}
        </ul>
      </>
    )
  }

  getContainer = () => {
    const {activeContainer} = this.state
    switch (activeContainer) {
      case differentContainers.loading:
        return this.renderLoader()
      case differentContainers.success:
        return this.renderRepositoryContainer()
      case differentContainers.failure:
        return this.renderFailureContainer()
      default:
        return null
    }
  }

  updateActiveId = activeId => {
    this.setState({activeId}, this.getRepositoryItems)
  }

  render() {
    const {activeId} = this.state
    return (
      <div className="bg-container">
        <h1 className="popular-content-style">Popular</h1>
        <ul className="language-filter-item-container">
          {languageFiltersData.map(eachData => (
            <LanguageFilterItem
              eachDataDetails={eachData}
              key={eachData.id}
              updateActiveId={this.updateActiveId}
              isActive={activeId === eachData.id}
            />
          ))}
        </ul>
        {this.getContainer()}
      </div>
    )
  }
}

export default GithubPopularRepos

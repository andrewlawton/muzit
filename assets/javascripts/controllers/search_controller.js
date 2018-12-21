import { Controller } from "stimulus"

export default class extends Controller {
  static targets = [ "query", "results", "resultsList" ]

  disconnect() {
    this.reset()
  }

  fetchResults() {
    if (this.query == "") {
      this.reset()
      return
    }

    this.previousQuery = this.query
    this.resultsListTarget.classList.remove('hide-search-results')
  }

  reset() {
    this.hideResults()
    this.queryTarget.value = ""
  }

  hideResults() {
    this.resultsListTarget.classList.add('hide-search-results')
  }

  navigateResults(event) {
    if (this.searchResultsController) {
      this.searchResultsController.navigateResults(event)
    }
  }

  get query() {
    return this.queryTarget.value
  }

  get searchResultsController() {
    return this.application.getControllerForElementAndIdentifier(this.resultsTarget.firstElementChild, "search-results")
  }
}
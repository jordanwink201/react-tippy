import { Defaults } from './globals'

import hideAllPoppers from './hideAllPoppers'
import bindEventListeners from './bindEventListeners'

/**
* To run a single time, once DOM is presumed to be ready
* @return {Boolean} whether the function has run or not
*/
export default function init(shadowDom, documentContext) {
  if (init.done && init.oldShadowDOM === shadowDom && init.oldDocumentContext === documentContext) {
    return false
  }

  init.oldDocumentContext = documentContext
  init.oldShadowDOM = shadowDom
  init.done = true

  // If the script is in <head>, document.body is null, so it's set in the
  // init function
  if (shadowDom) {
    Defaults.appendTo = shadowDom
  } else {
    Defaults.appendTo = document.body
  }

  bindEventListeners()

  return true
}

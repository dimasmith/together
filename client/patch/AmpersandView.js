/**
 * Patched ampersand view.
 * Contains patched remove() method that is not failing.
 * Figure out issue reason and get rid of this class ASAP
 */

import AmpersandView from 'ampersand-view';
import {invoke, flatten} from 'lodash';

function removeView() {
  if (this.el && this.el.parentNode) this.el.parentNode.removeChild(this.el);
  if (this._subviews) invoke(flatten(this._subviews), 'remove');
  this.stopListening();
  this.trigger('remove');
}

AmpersandView.prototype._remove = removeView;

export default AmpersandView;

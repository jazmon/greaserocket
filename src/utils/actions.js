// @flow
import { createAction } from 'redux-actions';

let knownLabels = [];

export function uniqueAction(label: string, ...args: Array<any>) {
  if (!label) {
    throw new Error('Action requires a label as an identifier.');
  }

  if (knownLabels.includes(label)) {
    throw new Error(`Action labels must be unique. Tried to create a duplicate of ${label}.`);
  }

  knownLabels = [...knownLabels, label];
  return createAction(label, ...args);
}

export function uniqueActionGroup(root: string, children: Array<string>): Object {
  const result = {};
  children.forEach(childLabel => {
    result[childLabel] = uniqueAction(`${root}_${childLabel}`);
  });

  return result;
}

export default { uniqueAction, uniqueActionGroup };

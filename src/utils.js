export const mapBoxToken = 'pk.eyJ1Ijoia2Vuc2F5IiwiYSI6ImNrNmdrMGkxcjExYWMzZW52NDM1Ymhmc3AifQ.QNNipRYHGdZZ59WxtggPdA';
export const title = process.env.REACT_APP_APP_NAME;


export function dissoc(obj, prop) {
  const { [prop]: omit, ...res } = obj;
  return res;
}


export function indexBy(arr, field) {
  return arr?.reduce((acc, o) => ({ ...acc, [o[field]]: o }), {})
}

export function update(object, key, fn) {
  return { ...object, [key]: fn(object[key]) }
}

export function groupBy(items, key) {
  return items.reduce(
    (result, item) => ({
      ...result,
      [item[key]]: [
        ...(result[item[key]] || []),
        item,
      ],
    }),
    {},
  );
}

export function last(arr) {
  if (arr == null) {
    return null;
  }
  return arr[arr.length - 1];
}

export function indexDuplicates(arr, key, outKey) {
  const groupedArr = groupBy(arr, key);
  return Object
    .values(groupedArr)
    .map((duplicates) => duplicates
      .map((item, index) => ({ ...item, [outKey || 'index']: index })))
    .reduce((acc, v) => [...acc, ...v], [])
}

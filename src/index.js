class Find extends Array {
  where(rules) {
    return this.filter((item) => Object.keys(rules).every((key) => {
      if (rules[key] instanceof RegExp) { return rules[key].test(item[key]); }
      if (typeof rules[key] === 'function') { return !!rules[key](item[key]); }
      return rules[key] === item[key];
    }));
  }

  orderBy(key, order) {
    if (typeof order === 'function') return this.sort((a, b) => order(a[key], b[key]));
    if (!['desc', 'asc'].includes(order)) order = 'desc';
    return this.sort((a, b) => {
      if (order === 'desc') return a[key] > b[key] ? -1 : (a[key] < b[key] ? 1 : 0);
      if (order === 'asc') return a[key] > b[key] ? 1 : (a[key] < b[key] ? -1 : 0);
      return 0;
    });
  }
}

const find = (arr = []) => Find.from(Array.isArray(arr) ? arr : []);

export default find;

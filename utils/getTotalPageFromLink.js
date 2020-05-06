const getTotalPageFromLink = (link) => {
  const reg = new RegExp('[0-9]');
  if (!link || !link.length) return 1;
  const split = link.split('page=');
  let res = -Infinity;
  for (const el of split) {
    let str = '';
    for (let i = 0; i < el.length; i++) {
      if (reg.test(el[i])) {
        str += el[i];
      } else {
        break;
      }
    }
    let temp = Number(str);
    if (!isNaN(temp)) {
      res = Math.max(res, temp);
    }
  }
  return res === -Infinity ? 1 : res;
};

module.exports = getTotalPageFromLink;

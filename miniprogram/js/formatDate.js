class Format {
  formatDate(value, format) {
    let date = new Date(value);
    let year = date.getFullYear();
    if (/(y+)/.test(format)) {
      let content = RegExp.$1;
      format = format.replace(content, year.toString().slice(4 - content.length));
    }
    let o = {
      M: date.getMonth() + 1,
      d: date.getDate(),
      h: date.getHours(),
      m: date.getMinutes(),
      s: date.getSeconds()
    };

    for (let key in o) {
      let reg = new RegExp(`(${key}+)`);
      if (reg.test(format)) {
        let content = RegExp.$1;
        let k = o[key] >= 10 ? o[key] : content.length == 2 ? '0' + o[key] : o[key];
        format = format.replace(content, k);
      }
    }
    return format;
  }
  formatThousand(value, type) {
    let int = value.toString().split('.')[0]
    let dec = value.toString().split('.')[1] ? value.toString().split('.')[1] : '00'
    let thousand = int.replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, "$1,");
    if (type == 1) {
      return thousand
    } else if (type == 2) {
      return `${thousand}.${dec}`
    }
  }
}

export const format = new Format()
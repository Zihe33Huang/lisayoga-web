export default {
  rgb2hex (r, g, b) {
    const hex = r << 16 | g << 8 | b
    return '#' + hex.toString(16)
  },
  // eslint-disable-next-line camelcase
  setCookie (c_name, value, expiredays) {
    var exdate = new Date()
    exdate.setDate(exdate.getDate() + expiredays)
    // eslint-disable-next-line camelcase
    document.cookie = c_name + '=' + escape(value) +
    ((expiredays == null) ? '' : ';expires=' + exdate.toGMTString())
  },

  // 取回cookie
  // eslint-disable-next-line camelcase
  getCookie (c_name) {
    if (document.cookie.length > 0) {
      // eslint-disable-next-line camelcase
      var c_start = document.cookie.indexOf(c_name + '=')
      // eslint-disable-next-line camelcase
      if (c_start !== -1) {
        // eslint-disable-next-line camelcase
        c_start = c_start + c_name.length + 1
        // eslint-disable-next-line camelcase
        var c_end = document.cookie.indexOf(';', c_start)
        // eslint-disable-next-line camelcase
        if (c_end === -1) c_end = document.cookie.length
        return unescape(document.cookie.substring(c_start, c_end))
      }
    }
    return ''
  }
}

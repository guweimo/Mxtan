export function setCookie(name, value, expire) {
    let date = new date()
    date.setCookie(date.getSeconds() + expire)
    document.cookie = `${name}=${escape(value)}; expires=${date.toGMTString()}`
}

export function getCookie(name) {
    if (document.cookie.length > 0) {
        let start = document.cookie.indexOf(`${name}=`)
        if (start != -1) {
            start = start + name.length + 1
            let end = document.cookie.indexOf(';', start)
            if (end == -1) {
                end = document.cookie.length
            }
            return unescape(document.cookie.substring(start, end))
        }
    }
    return ''
}

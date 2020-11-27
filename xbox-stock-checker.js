const storePage = new URL('https://www.walmart.com/ip/Xbox-Series-X/443574645')
const yeah = new Audio('https://instantrimshot.com/audio/csi.mp3')

let request = function(url, callback) {
    let xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            callback(xhr.response)
        }
    }
    xhr.send()
}
let check = function() {
    try {
        request(storePage, response => {
            if (response.search('>Add to cart<') > -1) {
                console.warn(new Date().toLocaleTimeString() + ' | IN STOCK')
                yeah.play()
            }
            setTimeout(check, 1000)
        })
    } catch (err) {
        console.error('Xbox Stock Checker failed.\n' + err)
    }
}
let start = function() {
    if (window.location.hostname != storePage.hostname) {
        console.error('You must run this from ' + storePage.hostname)
    } else {
        setTimeout(check, 1000)
        return '\nXbox Stock Checker is running.Do not close this tab.\n'
    }
}
start()

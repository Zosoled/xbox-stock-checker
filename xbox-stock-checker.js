let xbox = (function() {
    const yeah = new Audio('https://instantrimshot.com/audio/csi.mp3')
    const buttons = [/\>add to cart\</i, /\>ship it\</i]
    
    function get(url, callback) {
        let xhr = new XMLHttpRequest()
        xhr.open('GET', url, true)
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                callback(xhr.response)
            }
        }
        xhr.send()
    }
    
    function check() {
        try {
            get(window.location.href, response => {
                buttons.forEach(regex => {
                    if (regex.test(response)) {
                        console.warn(new Date().toLocaleTimeString() + ' | IN STOCK')
                        yeah.play()
                    }
                })
            })
            setTimeout(check, 1000)
        } catch (err) {
            console.timeEnd('xbox-stock-checker')
            console.error('Xbox Stock Checker failed.\n' + err)
        }
    }
    
    let start = new Date()
    setTimeout(check)
    console.info(`%cXbox Stock Checker%c is running in the background.
    Do not close this tab.
    Call %cxbox.runtime()%c to view elapsed time.`,
    'background-color:#107c10;','','background-color:#33c;',''
    )
    
    return {
        runtime: function() {
            let now = new Date()
            let diff = now - start
            let days = Math.floor(diff / 86400000)
            let hours = Math.floor((diff -= days * 86400000) / 3600000)
            let minutes = Math.floor((diff -= hours * 3600000) / 60000)
            let seconds = Math.floor((diff -= minutes * 60000) / 1000)
            return `${days>0?days+' days, ':''}${hours>0?hours+' hours, ':''}${minutes>0?minutes+' minutes, ':''}${seconds+' seconds'}`
        }
    }
})()

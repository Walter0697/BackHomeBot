let $sectionOne = null
let $sectionTwo = null

const setMessageToPanel = ($section, title, message, background) => {
    const sectionTitle = $section.find('.section-title')
    const sectionContent = $section.find('.section-content')

    sectionTitle.text(title)
    sectionContent.text(message)
    $section.css('background-color', background)
}

$(document).ready(function() { 
    window.setInterval(() => {
        $.ajax({
            url: 'http://localhost:1984/display',
            data: { 
                'ids': [1, 2],
            },
            cache: false,
            type: "GET",
            success: function(response) {
                //const data = response[0]
                const list = response.result

                for (let i = 0; i < list.length; i++) {
                    const panel = response.panels.find(s => s.chatid === list[i].chatid)
                    if (i === 0) {
                        setMessageToPanel($sectionOne, panel.name, list[i].message, panel.background)
                    }
                }
                console.log(response)
                //setMessageToPanel($sectionOne, 'testing', data.message)
            },
            error: function(xhr) {
        
            }
        })
    }, 5000)

    $sectionOne = $('#section-1')
    $sectionTwo = $('#section-2') 
});
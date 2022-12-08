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
            url: backendLink,
            data: { 
                'ids': contentIds,
            },
            cache: false,
            type: "GET",
            success: function(response) {
                const list = response.result
                const panels = response.panels

                for (let i = 0; i < panels.length; i++) {
                    $currentSection = $sectionOne
                    const panel = panels[i]
                    const message = list.find(s => s.chatid === panel.chatid)
                    let text = ''
                    if (message) {
                        text = message.message
                    }
                    if (i !== 0) {
                        $currentSection = $sectionTwo
                    }
                    setMessageToPanel($currentSection, panel.name, text, panel.background)
                }
            },
            error: function(xhr) {
        
            }
        })
    }, 5000)

    $sectionOne = $('#section-1')
    $sectionTwo = $('#section-2') 
});
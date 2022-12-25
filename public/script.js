let $sectionOne = null
let $sectionTwo = null
let $time = null

const setMessageToPanel = ($section, title, message, displayDay, background) => {
    const sectionTitle = $section.find('.section-title')
    const sectionContent = $section.find('.section-content')
    const secctionDate = $section.find('.section-date')

    sectionTitle.text(title)
    sectionContent.text(message)
    secctionDate.text(displayDay)
    $section.css('background-color', background)
}

const setUpcomingMessage = ($section, upcomings) => {
    upcomings.sort((a, b) => {
        return dayjs(a.targetdate).isAfter(dayjs(b.targetdate))
    })
    const $sectionUpcoming = $section.find('.section-upcoming')
    for (let i = 1; i <= 6; i++) {
        const $currentUpcoming = $sectionUpcoming.find('.upcoming-' + i)

        const index = i - 1
        if (upcomings.length > index) {
            const up = upcomings[index]
            const text = `${dayjs(up.targetdate).format('YYYY-MM-DD')} : ${up.message}`
            $currentUpcoming.text(text)
        } else {
            $currentUpcoming.text('')
        }
    }
}

const setTime = (display_time) => {
    $time.text(display_time)
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
                const now = response.now
                const upcoming = response.upcoming

                setTime(now)

                for (let i = 0; i < panels.length; i++) {
                    $currentSection = $sectionOne
                    const panel = panels[i]
                    const message = list.find(s => s.chatid === panel.chatid)
                    const upcomingMessages = upcoming.filter(s => s.chatid === panel.chatid)
                    let text = ''
                    let displayDay = ''
                    if (message) {
                        text = message.message
                        displayDay = `(${dayjs(message.targetDate).format('YYYY-MM-DD')})`
                    }
                    if (i !== 0) {
                        $currentSection = $sectionTwo
                    }
                    setMessageToPanel($currentSection, panel.name, text, displayDay, panel.background)
                    setUpcomingMessage($currentSection, upcomingMessages)
                }
            },
            error: function(xhr) {
        
            }
        })
    }, 1000)

    $sectionOne = $('#section-1')
    $sectionTwo = $('#section-2') 
    $time = $('#time')
});
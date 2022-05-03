const db = window.localStorage

function render() {
    function flag(country) {
	return $.img()
	    .att$('src', "https://world-of-flags-backend.herokuapp.com/images/flags/" + country + ".png")
	    .att$('width', 800)
	    .map$(el => el.classList.add('flag'))
    }

    function editorMode() {
	body.querySelector('main').replaceWith(
	    $.main(
		$.h1("Editor not fully implemented yet"),
		$.tabs({
		    "Number 10": () => $.div($.h1("Indonesian")),
		    "Number 9": () => $.div($.h1("Portuguese")),
		    "Number 8": () => $.div($.h1("Russian")),
		    "Number 7": () => $.div($.h1("Bengali")),
		    "Number 6": () => $.div($.h1("Arabic")),
		    "Number 5": () => $.div($.h1("French")),
		    "Number 4": () => $.div($.h1("Spanish")),
		    "Number 3": () => $.div($.h1("Hindi")),
		    "Number 2": () => $.div($.h1("Mandarin")),
		    "Number 1": () => $.div($.h1("English"))
		}),
		$.span($.button('Save').click$(e=>saveEdits()))
	    ))
	body.querySelector('main').onclick = () =>
	body.querySelectorAll('h1').forEach(el =>
	    el.att$('contenteditable', true)
		.map$(e => e.classList.add('edit')))
	body.querySelector('main').click()
    }
    
    return $.main(
	$.a("Make your own Top 10 list").click$(() => {
	    if (db.getItem('session') != undefined) {
		editorMode()
		return
	    }
	    let email = $.input().att$('type', 'text')
	    let password = $.input().att$('type', 'password')
	    let dialog = $.dialog(
		[$.CANCEL, $.DONE],
		$.span($.h3("Log In")),
		"Log In to enter List Editor",
		$.spacer(),
		"Email:",
		email,
		"Password:",
		password
	    ).on$('done', e => {
		if (email.value === "root" && password.value === "pass") {
		    db.setItem('session', '1')
		    editorMode()
		}
	    })
	    body.insertBefore(dialog, body.querySelector('main'))
	    dialog.toggle$()
	}),
	$.h1("Top 10 languages in the world"),
	$.tabs({
	    "Number 10": () => $.div($.h1("Indonesian"), flag("indonesia")),
            "Number 9": () => $.div($.h1("Portuguese"), flag("portugal")),
            "Number 8": () => $.div($.h1("Russian"), flag("russia")),
            "Number 7": () => $.div($.h1("Bengali"), flag("bangladesh")),
            "Number 6": () => $.div($.h1("Arabic"), flag("saudi-arabia")),
            "Number 5": () => $.div($.h1("French"), flag("france")),
            "Number 4": () => $.div($.h1("Spanish"), flag("spain")),
            "Number 3": () => $.div($.h1("Hindi"), flag("india")),
            "Number 2": () => $.div($.h1("Mandarin"), flag("china")),
	    "Number 1": () => $.div($.h1("English"), flag("united-kingdom"))
	})
    )
}

document.addEventListener("DOMContentLoaded", () => {
    body.appendChild(render())
})

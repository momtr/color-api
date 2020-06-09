let colors;

$(document).ready(async () => {

    /** get colors from web API */
    let colors = await fetch('/api/v1/colors');
    let json = await colors.json();
    console.log(json.data.colors)
    colors = json.data.colors;
    let el = $('#colors');
    for(let col of json.data.colors) {
        el.append(`
            <div id="${col.id}" class="color-card" onclick="copy('${col.rgb}', '${col.id}')">
                <div class="color-show" style="background-color:${col.rgb}"></div>
                <h2>${col.type}</h2>
                <div class="color-code">${col.rgb}</div>
                <div class="theme">#${col.theme}</div>
            </div>
        `)
    }   
    el.append(`
        <div id="add-color" class="color-card" onclick="addColor()">
            <h2>Add Color</h2>
        </div>
    `)
})

function copy(text, id) {
    if(!navigator.clipboard) {
        let textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.top = 0;
        textArea.style.left = 0;
        textArea.style.position = 'fixed';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            document.execCommand('copy');
            copied(id);
        } catch(err) {
            console.log(err);
        }
        return;
    }   
    navigator.clipboard.writeText(text).then(() => copied(id));
}

function copied(id) {
    let el = $(`#${id}`)
    let html = el.html();
    el.html('<div class="copied">copied :)</div>');
    setTimeout(() => el.html(html), 500);
}

function addColor() {
    console.log('add color')
}
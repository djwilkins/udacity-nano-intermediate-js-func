
let store = Immutable.Map({
    user: Immutable.Map({ name: 'Student' }),
    data: '',
    rovers: ['Curiosity', 'Opportunity', 'Spirit'],
    selected: ''
})

// add our markup to the page
const root = document.getElementById('root')

const updateStore = (store, newState) => {
    store = store.set('data', newState.image.latest_photos).set('selected', newState.image.latest_photos[0].rover.name);
    render(root, store);
}

const render = (root, state) => {
    root.innerHTML = App(state)
    roverSelectionHandler();
}

const SelectionBar = (state) => {
    let rovers = state.get('rovers');
    let selected = state.get('selected');
    let parameter = selected !== '' ? '' : 'selected';
    let reducer = (elementString, roverName) => {
        if (roverName === selected) {
            return elementString + `<option selected value="${roverName}">${roverName}</option>`;
        }
        return elementString + `<option value="${roverName}">${roverName}</option>`;
    }
    let options = rovers.reduce(reducer, '');
    return `<select name="rovers" id="rovers" class="roverSelect">
        <option disabled ${parameter} value> -- select rover -- </option>
        ${options}
    </select>`
}

const InfoElements = (infoArray) => {
    return infoArray.map(x => `<li>${x}</li>`).join('');
}

// higher-order function
const RoverInfo = (state) => {
    if (state.get('data') !== '') {
        let roverInfo = state.get('data')[0].rover;
        let photoDate = state.get('data')[0].earth_date;
        let infoArray = [`Rover Name: ${roverInfo.name}`, `Launch Date: ${roverInfo.launch_date}`, `Landing Date: ${roverInfo.landing_date}`, `Last Photo Date: ${photoDate}`, `Status: ${roverInfo.status}`];
        return `
            <ul class="roverInfo">
            ${InfoElements(infoArray)}
            </ul>
        `
    }
    return '<p>(Rover Info will Appear here.)</p>';
}

const RoverImages = (state) => {
    if (state.get('data') !== '') {
        let roverImages = state.get('data');
        let reducer = (elementString, roverImage) => {
            return elementString + `<img src="${roverImage.img_src}">`;
        }
        let imageElements = roverImages.reduce(reducer, '');
        return `
            ${imageElements}
        `
    }
    return '<p>(Rover Images will Appear here.)</p>';
}

const roverSelection = (event) => {
    getLatestImages(event.target.value);
}

const roverSelectionHandler = () => {
    document.querySelector('.roverSelect').addEventListener('change', function(event){
        roverSelection(event);
    });
}

const getLatestImages = (rover) => {
    fetch(`http://localhost:3000/photos?rover=${rover}`)
    .then(res => res.json())
    .then(data => updateStore(store, data))
}

// higher-order function
const App = (state) => {
    return `
        ${SelectionBar(state)}
        ${RoverInfo(state)}
        ${RoverImages(state)}
    `
}

window.addEventListener('load', () => {
    render(root, store);
})

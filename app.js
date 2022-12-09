// variables to store the state of the page
const cities = citiesData;
let selectedItem;

// DOM elements
const cityNavElements = document.getElementById('cities');
const currentTimeElement = document.getElementById('current-time');

// fetch the current city time using world time api
// for reference you can check this url: http://worldtimeapi.org/
const getCityCurrentTime = async (timeZone) => {
    try {
        const response = await fetch(`https://worldtimeapi.org/api/timezone/${timeZone}`);
        const data = await response.json();
        const date = new Date(data.datetime).toLocaleString('en-US', {
            timeZone: timeZone
        });
        return date;
    } catch (e) {
        console.error(e);
        return new Date().toLocaleString();
    }
}

// modifies the css vatiavl
const setSliderProperties = (width, leftOffset) => {
    document.documentElement.style.setProperty('--slide-left-offset', `${leftOffset}px`);
    document.documentElement.style.setProperty('--slide-width', `${width}px`);
};

// removes the last selected item sttyles
const removeSelectedItem = () => {
    const elements = document.querySelectorAll('.list__city--selected');
    elements.forEach((element) => element.classList.remove('list__city--selected'));
};

// sets the selected item and adds the selected style to the dom element
const setSelectedItem = (item) => {
    selectedItem = item;
    item.classList.add('list__city--selected');
};

// resizes the slider width and position when the window is resized
const onWindowResize = () => {
    if (!selectedItem) return;
    setSliderProperties(selectedItem.offsetWidth, selectedItem.offsetLeft);
};

// sets the current timezone in the page
const setCurerntTimeText = (currentTime) => {
    currentTimeElement.innerText = currentTime;
}

// creates and adds the nav elements in the dom
const createNavElements = () => {
    if (!cities.length) return;
    const elements = cities.map((city) => {
        const cityElement = document.createElement('li');
        cityElement.classList.add('list__city');
        cityElement.id = city.section;
        cityElement.innerText = city.label;
        cityElement.addEventListener('click', async () => {
            removeSelectedItem();
            setSliderProperties(cityElement.offsetWidth, cityElement.offsetLeft);
            setSelectedItem(cityElement);
            const date = await getCityCurrentTime(city.time_zone);
            setCurerntTimeText(date);

        });
        cityNavElements.appendChild(cityElement);
        return cityElement
    });
    const firstElement = elements[0];
    setSelectedItem(firstElement);
    setSliderProperties(firstElement.offsetWidth, firstElement.offsetLeft);
};

// loads the default option
const loadDefaultTimezone = async () => {
    if (!cities.length) return;
    const date = await getCityCurrentTime(cities[0].time_zone);
    setCurerntTimeText(date);
}

// inits the navbar and loads the elements
const loadNavElements = async () => {
    createNavElements();
    loadDefaultTimezone();
} 

window.addEventListener('resize', onWindowResize);
loadNavElements();
let cities = citiesData;
let selectedItem;
const cityNavElements = document.getElementById('cities');
const currentTimeElement = document.getElementById('current-time');

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

const setSliderProperties = (width, leftOffset) => {
    document.documentElement.style.setProperty('--slide-left-offset', `${leftOffset}px`);
    document.documentElement.style.setProperty('--slide-width', `${width}px`);
};

const removeSelectedItem = () => {
    const elements = document.querySelectorAll('.list__city--selected');
    elements.forEach((element) => element.classList.remove('list__city--selected'));
};

const setSelectedItem = (item) => {
    selectedItem = item;
    item.classList.add('list__city--selected');
};

const onWindowResize = () => {
    if (!selectedItem) return;
    setSliderProperties(selectedItem.offsetWidth, selectedItem.offsetLeft);
};


const setCurerntTimeText = (currentTime) => {
    currentTimeElement.innerText = currentTime;
}

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

const loadDefaultTimezone = async () => {
    if (!cities.length) return;
    const date = await getCityCurrentTime(cities[0].time_zone);
    setCurerntTimeText(date);
}


window.addEventListener('resize', onWindowResize)

const loadNavElements = async () => {
    createNavElements();
    loadDefaultTimezone();
} 

loadNavElements();
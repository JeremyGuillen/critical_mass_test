const cupertinoTag = document.getElementById('cupertino');
const newYorkTag = document.getElementById('new_york_city');
const londonTag = document.getElementById('london');
const amsterdamTag = document.getElementById('amsterdam');
const tokyoTag = document.getElementById('tokyo');
const hongKongTag = document.getElementById('hong_kong');
const sydneyTag = document.getElementById('sydney');
let selectedItem;


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

const onWindowResize = (e) => {
    if (!selectedItem) return;
    setSliderProperties(selectedItem.offsetWidth, selectedItem.offsetLeft);
};

window.addEventListener('resize', onWindowResize)

cupertinoTag.addEventListener('click', () => {
    removeSelectedItem();
    setSliderProperties(cupertinoTag.offsetWidth, cupertinoTag.offsetLeft);
    setSelectedItem(cupertinoTag);
});
newYorkTag.addEventListener('click', () => {
    removeSelectedItem();
    setSliderProperties(newYorkTag.offsetWidth, newYorkTag.offsetLeft);
    setSelectedItem(newYorkTag);
});
londonTag.addEventListener('click', () => {
    removeSelectedItem();
    setSliderProperties(londonTag.offsetWidth, londonTag.offsetLeft);
    setSelectedItem(londonTag);
});
amsterdamTag.addEventListener('click', () => {
    removeSelectedItem();
    setSliderProperties(amsterdamTag.offsetWidth, amsterdamTag.offsetLeft);
    setSelectedItem(amsterdamTag);
});
tokyoTag.addEventListener('click', () => {
    removeSelectedItem();
    setSliderProperties(tokyoTag.offsetWidth, tokyoTag.offsetLeft);
    setSelectedItem(tokyoTag);

});
hongKongTag.addEventListener('click', () => {
    removeSelectedItem();
    setSliderProperties(hongKongTag.offsetWidth, hongKongTag.offsetLeft);
    setSelectedItem(hongKongTag);
});
sydneyTag.addEventListener('click', () => {
    removeSelectedItem();
    setSliderProperties(sydneyTag.offsetWidth, sydneyTag.offsetLeft);
    setSelectedItem(sydneyTag);
});


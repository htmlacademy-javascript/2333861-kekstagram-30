const Effects = {
  DEFAULT: 'none',
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat'
};

const effectToFilter = {
  [Effects.DEFAULT]: {
    style: 'none',
    unit: '',
  },
  [Effects.CHROME]: {
    style: 'grayscale',
    unit: '',
  },
  [Effects.SEPIA]: {
    style: 'sepia',
    unit: '',
  },
  [Effects.MARVIN]: {
    style: 'invert',
    unit: '%',
  },
  [Effects.PHOBOS]: {
    style: 'blur',
    unit: 'px',
  },
  [Effects.HEAT]: {
    style: 'brightness',
    unit: '',
  },
};

const effectToSliderOptions = {
  [Effects.DEFAULT]: {
    min: 0,
    max: 100,
    step: 1,
  },
  [Effects.CHROME]: {
    min: 0,
    max: 1,
    step: 0.1,
  },
  [Effects.SEPIA]: {
    min: 0,
    max: 1,
    step: 0.1,
  },
  [Effects.MARVIN]: {
    min: 0,
    max: 100,
    step: 1,
  },
  [Effects.PHOBOS]: {
    min: 0,
    max: 3,
    step: 0.1,
  },
  [Effects.HEAT]: {
    min: 1,
    max: 3,
    step: 0.1,
  },
};

const imageEditForm = document.querySelector('.img-upload');
const imageElementFormModal = imageEditForm.querySelector('.img-upload__preview img');
const effectsElement = imageEditForm.querySelector('.effects');
const sliderContainerElement = imageEditForm.querySelector('.img-upload__effect-level');
const sliderElement = imageEditForm.querySelector('.effect-level__slider');
const effectLevelElement = imageEditForm.querySelector('.effect-level__value');

let chosenEffect = Effects.DEFAULT;

const isDefault = () => chosenEffect === Effects.DEFAULT;

const setImageStyle = () => {
  if (isDefault()) {
    imageElementFormModal.style.filter = null;
  }

  const { value } = effectLevelElement;
  const { style, unit } = effectToFilter[chosenEffect];
  imageElementFormModal.style.filter = `${style}(${value}${unit})`;
};


const showSlider = () => {
  sliderContainerElement.classList.remove('hidden');
};


const hideSlider = () => {
  sliderContainerElement.classList.add('hidden');
};


const onSliderUpdate = () => {
  effectLevelElement.value = sliderElement.noUiSlider.get();
  setImageStyle();
};


const createSlider = ({ min, max, step }) => {
  noUiSlider.create(sliderElement, {
    range: { min, max },
    step,
    start: max,
    connect: 'lower',
    format: {
      to: (value) => Number(value),
      from: (value) => Number(value),
    }
  });
  sliderElement.noUiSlider.on('update', onSliderUpdate);
  hideSlider();
};


const updateSlider = ({ min, max, step }) => {
  sliderElement.noUiSlider.updateOptions({
    range: { min, max },
    step,
    start: max,
  });
};


const setSlider = () => {
  if (isDefault()) {
    hideSlider();
  } else {
    updateSlider(effectToSliderOptions[chosenEffect]);
    showSlider();
  }
};


const setEffect = (effect) => {
  chosenEffect = effect;
  setSlider();
  setImageStyle();
};


const reset = () => {
  setEffect(Effects.DEFAULT);
};


const onEffectsChange = (evt) => {
  setEffect(evt.target.value);
};


const init = () => {
  createSlider(effectToSliderOptions[chosenEffect]);
  effectsElement.addEventListener('change', onEffectsChange);
};


export { init, reset };

const MIN_SCALE = 25;
const MAX_SCALE = 100;
const STEP_SCALE = 25;
const imageEditForm = document.querySelector('.img-upload');
const scaleSwitch = imageEditForm.querySelector('.scale__control--value');
const imageElementFormModal = imageEditForm.querySelector('.img-upload__preview img');

const onClickScaleSwitch = (evt) => {
  const str = scaleSwitch.value;
  const currentValue = Number(str.substring(0, str.length - 1));

  if (evt.target.classList.contains('scale__control--smaller')) {
    if (currentValue > MIN_SCALE) {
      scaleSwitch.value = `${currentValue - STEP_SCALE}%`;
      imageElementFormModal.style.transform = `scale(${(currentValue - STEP_SCALE) / 100})`;
    }
  }

  if (evt.target.classList.contains('scale__control--bigger')) {
    if (currentValue < MAX_SCALE) {
      scaleSwitch.value = `${currentValue + STEP_SCALE}%`;
      imageElementFormModal.style.transform = `scale(${(currentValue + STEP_SCALE) / 100})`;
    }
  }
};


export { onClickScaleSwitch };

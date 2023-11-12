const modalElement = document.querySelector('.img-upload');
const scaleValue = modalElement.querySelector('.scale__control--value');
const imageElement = modalElement.querySelector('.img-upload__preview img');

function onClickScale(evt) {
  const str = scaleValue.value;
  const currentValue = Number(str.substring(0, str.length - 1));

  if (evt.target.classList.contains('scale__control--smaller')) {
    if (currentValue > 25) {
      scaleValue.value = `${currentValue - 25}%`;
      imageElement.style.transform = `scale(${(currentValue - 25) / 100})`;
    }
  }

  if (evt.target.classList.contains('scale__control--bigger')) {
    if (currentValue < 100) {
      scaleValue.value = `${currentValue + 25}%`;
      imageElement.style.transform = `scale(${(currentValue + 25) / 100})`;
    }
  }
}

export { onClickScale };

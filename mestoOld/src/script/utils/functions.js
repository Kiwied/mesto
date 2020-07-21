export function renderLoading(isLoading, selector) {
  const submitButton = document.querySelector(selector).querySelector('.form__save');
  if (isLoading === 'loading') {
    submitButton.textContent = 'Загрузка...';
  } else if (isLoading === 'error') {
    submitButton.textContent = 'Ошибка';
  } else {
    submitButton.textContent = submitButton.name;
  }
}

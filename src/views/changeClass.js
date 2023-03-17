// eslint-disable-next-line import/prefer-default-export
export const changeClass = (el, classAdd, classRemove) => {
  if (el.classList.contains(classRemove)) {
    el.classList.remove(classRemove);
  }
  if (!el.classList.contains(classAdd)) {
    el.classList.add(classAdd);
  }
};

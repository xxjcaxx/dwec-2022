document.addEventListener("DOMContentLoaded", () => {
  function component() {
    const element = document.createElement("div");
    element.innerHTML = _.join(["Hello", "webpack"], " ");
    return element;
  }
  document.body.append(component());
});

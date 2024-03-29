const availableVariants = [
  {
    ProductId: "1001",
    storageSize: "64GB",
    color: "Red",
  },
  {
    ProductId: "1002",
    storageSize: "64GB",
    color: "Black",
  },
  {
    ProductId: "1003",
    storageSize: "256GB",
    color: "Red",
  },
  {
    ProductId: "1004",
    storageSize: "128GB",
    color: "Black",
  },
];

let selectedStorageSize = null;
let selectedColor = null;

// For removing the styles of previous element when new color/storage is choosen
let currentSelectedStorageElement = null;
let currentSelectedColorElement = null;

const storageOptionsContainer = document.getElementById("storage-options");
const colorOptionsContainer = document.getElementById("color-options");
const colorOptions = document.getElementsByClassName("color-options");

// Adding event listners on all storage buttons using event delegation method
storageOptionsContainer.addEventListener("click", (e) => {
  const capacity = e.target?.getAttribute("data-storage-capacity");

  if (capacity) {
    selectedStorageSize = capacity;
    selectedColor = null;

    currentSelectedStorageElement?.classList?.replace("btn-dark", "btn-light");
    currentSelectedStorageElement = e.target;

    e.target.classList.replace("btn-light", "btn-dark");
    resetSelectedColor();

    const availableColors = getColorOptionsBasedOnStorageSize();
    enableAvailableColor(availableColors);
  }
});

// Adding event listners on all color options buttons using event delegation method
colorOptionsContainer.addEventListener("click", (e) => {
  const color = e.target?.getAttribute("data-color");

  if (color) {
    resetSelectedColor();
    currentSelectedColorElement = e.target;

    // Setting seletctedColor with current color & styling the selected color using id selector
    selectedColor = color;
    e.target.setAttribute("id", "selectedColor");
  }
});

function getColorOptionsBasedOnStorageSize() {
  const availableColors = [];
  for (const product of availableVariants) {
    if (product.storageSize == selectedStorageSize) {
      availableColors.push(product.color);
    }
  }
  return availableColors;
}

function enableAvailableColor(colors) {
  for (const element of colorOptions) {
    if (colors.includes(element.getAttribute("data-color"))) {
      element.classList.replace("btn-light", "btn-available");
      element.hasAttribute("disabled") && element.removeAttribute("disabled");
    } else {
      element.classList.replace("btn-available", "btn-light");
      element.classList.replace("btn-dark", "btn-light");
      element.setAttribute("disabled", true);
    }
  }
}

function resetSelectedColor() {
  currentSelectedColorElement?.removeAttribute("id");
}

function submitSelection() {
  if (!(selectedStorageSize && selectedColor)) {
    alert("please select storage size and color both");
    return;
  }
  const productId = availableVariants.find( (variant) => variant.color === selectedColor && variant.storageSize === selectedStorageSize)?.ProductId;
  alert(`For your selected combination productID is ${productId}`);
}

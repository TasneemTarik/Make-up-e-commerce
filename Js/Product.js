export class Product {
  constructor({ id, name, price, image, image_link, api_featured_image }) {
    this.id = id;
    this.name = name;
    this.price = parseFloat(price) || 0;

    if (image) {
      this.image = image;
    } else if (image_link && image_link !== "null") {
      this.image = image_link;
    } else if (api_featured_image && api_featured_image !== "null") {
      this.image = api_featured_image.startsWith("http")
        ? api_featured_image
        : "https:" + api_featured_image;
    } else {
      this.image =
        "https://d3t32hsnjxo7q6.cloudfront.net/i/991799d3e70b8856686979f8ff6dcfe0_ra,w158,h184_pa,w158,h184.png";
    }

    this.quantity = parseInt(arguments[0].quantity) || 1;
  }

  getTotal() {
    return this.price * this.quantity;
  }
}

// ========== Static methods ==========

// فلترة بالـ price فقط
Product.filterProducts = function (filterObj, products) {
  let defaultFilter = {
    price: { start: 0, end: Infinity },
  };

  if (JSON.stringify(defaultFilter) === JSON.stringify(filterObj)) {
    return products;
  }

  return products.filter((prod) => {
    let isInRange =
      prod.price >= filterObj.price.start && prod.price <= filterObj.price.end;
    return isInRange;
  });
};

// تجميع filter object من inputs
Product.getFilterObject = function () {
  let filterObj = {};

  // Price
  let priceInputs = document.querySelectorAll(".from-to-price input");
  let start = priceInputs[0]?.value ? parseFloat(priceInputs[0].value) : 0;
  let end = priceInputs[1]?.value ? parseFloat(priceInputs[1].value) : Infinity;

  filterObj.price = { start, end };

  return filterObj;
};

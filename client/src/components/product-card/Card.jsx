import React from "react";
import PropTypes from "prop-types";

const Card = ({ product }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
      <img className="w-full" src={product.imageUrl} alt={product.name} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{product.name}</div>
        <p className="text-gray-700 text-base">${product.price}</p>
        <p className="text-gray-700 text-base">{product.shortDescription}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          Rating: {product.rating} / 5
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {product.totalUsersPurchased} users purchased
        </span>
      </div>
    </div>
  );
};

Card.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    shortDescription: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    totalUsersPurchased: PropTypes.number.isRequired,
  }).isRequired,
};

export default Card;

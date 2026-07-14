

import React, { useEffect, useState, useContext } from "react";
import AppContext from "../../context/AppContext";
import { Link, useParams } from "react-router-dom";

const SearchProduct = () => {




  const { item } = useParams();
  const { products } = useContext(AppContext);

  const [searchdproduct, setSearchProduct] = useState([]);

            //  random 8   product show 
        const  getRendamProduct=()=>{

      const reandomIndex= Math.floor(Math.random() *products.length)
           return  products.slice(reandomIndex, reandomIndex+8)
   }



    
  useEffect(() => {

    const result = products.filter((data) =>
      data?.title?.toLowerCase().includes(item.toLowerCase().trim()) || data?.category?.toLowerCase().includes(item.toLowerCase().trim())
           
    );

    if (result.length === 0) {
      // fallback products
       setSearchProduct(getRendamProduct())
      // (setSearchProduct(products.slice(0, 8)));
    } else {
      setSearchProduct(result);
    }

  }, [item, products]);

  return (
    <>
      <div className="d-flex justify-content-center justify-content-md-around flex-wrap gap-3 p-3">

      

          {searchdproduct.map((product) => (
            <div key={product._id}>
              <div
                className="card bg-dark text-white text-center rounded-4"
                style={{ width: "18rem" }}
              >
                <Link
                  to={`/product/${product._id}`}
                  className="d-flex justify-content-center align-items-center"
                >
                  <img
                    src={product.imgSrc}
                    className="card-img-top rounded-4 m-2"
                    alt=""
                    style={{ width: "230px", height: "210px" }}
                  />
                </Link>

                <div className="card-body">
                  <h5 className="card-title">{product?.title}</h5>

                  <div className="d-flex gap-3 justify-content-center py-3">
                    <button className="btn btn-primary">
                      {product?.price} ₹
                    </button>

                    <button className="btn text-dark bg-warning">
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

     

      </div>
    </>
  );
};

export default SearchProduct;
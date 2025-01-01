import Container from "@/components/shared/Container";
import { Button } from "@/components/ui/button";
import {
  removeFromComparison,
  selectComparisonProducts,
} from "@/redux/features/comparison/comparisonSlice";
import { useAppSelector } from "@/redux/hook";
import { useDispatch } from "react-redux";
import RatingDisplay from "./ComparisonUtils/Rating";
import { Link } from "react-router-dom";

const Comparison = () => {
  const dispatch = useDispatch();

  const products = useAppSelector(selectComparisonProducts);

  return (
    <div>
      <Container>
        {products.length > 0 && (
          <section className="border my-14 overflow-x-scroll">
            <div className="grid md:grid-cols-4 border-b">
              <div className="border-r p-2 md:p-4">
                <h3 className="text-xl font-bold">Product Comparison</h3>
                <p className="text-zinc-700 mt-2">
                  Find and select products to see the differences and
                  similarities between them
                </p>
              </div>
              {products.length &&
                products.map((product) => (
                  <div
                    className="border-r p-2 md:p-4 text-center"
                    key={product.id}
                  >
                    <img src={product.image} />
                    <Button
                      onClick={() => dispatch(removeFromComparison(product))}
                      className=""
                      variant={"link"}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
            </div>

            <div className="grid grid-cols-4 border-l border-b">
              <p className="border-r p-2 md:p-4">Name</p>
              {products.length &&
                products.map((product) => (
                  <Link to={`/products/${product.id}`}>
                    <p
                      key={product.id}
                      className="border-r p-2 md:p-4 font-bold hover:text-primary"
                    >
                      {product.name}
                    </p>
                  </Link>
                ))}
            </div>

            <div className="grid grid-cols-4 border-l border-b">
              <p className="border-r p-2 md:p-4">Price</p>
              {products.length &&
                products.map((product) => (
                  <div
                    key={product.id}
                    className="border-r p-2 md:p-4 font-bold"
                  >
                    <span className="text-primary">৳ {product.price} </span>
                    <span className="text-sm font-medium line-through">
                      ৳ {product.price + product.discount}
                    </span>
                  </div>
                ))}
            </div>

            <div className="grid grid-cols-4 border-l border-b">
              <p className="border-r p-2 md:p-4">Category</p>
              {products.length &&
                products.map((product) => (
                  <p key={product.id} className="border-r p-2 md:p-4">
                    {product.category.name}
                  </p>
                ))}
            </div>

            <div className="grid grid-cols-4 border-l border-b">
              <p className="border-r p-2 md:p-4">Availability</p>
              {products.length &&
                products.map((product) => (
                  <p className="font-semibold border-r p-2 md:p-4">
                    {product.stock > 0 ? "In Stock" : "Out of Stock"}
                  </p>
                ))}
            </div>

            <div className="grid grid-cols-4 border-l border-b">
              <p className="border-r p-2 md:p-4">Rating</p>
              {products.length &&
                products.map((product) => (
                  <div key={product.id} className="border-r p-2 md:p-4">
                    <RatingDisplay product={product} />
                  </div>
                ))}
            </div>

            <div className="grid grid-cols-4 border-l border-b">
              <p className="border-r p-2 md:p-4">Description</p>
              {products.length &&
                products.map((product) => (
                  <p key={product.id} className="border-r p-2 md:p-4">
                    {product.description}
                  </p>
                ))}
            </div>
          </section>
        )}
        {products.length < 1 && (
          <section className="flex justify-center items-center my-24">
            <div className="flex flex-col items-center gap-4 text-center">
              <h1 className="text-2xl font-extrabold text-zinc-500">Sorry!</h1>
              <h3 className="text-lg font-semibold">
                Your Comparison List is Empty. Add Products to Compare.
              </h3>
              <Link to={`/products`}>
                <Button>Add Products</Button>
              </Link>
            </div>
          </section>
        )}
      </Container>
    </div>
  );
};

export default Comparison;

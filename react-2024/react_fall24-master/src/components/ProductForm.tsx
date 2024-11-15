import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from "react";
import { getProductDetail } from "../services/product";
import toast from "react-hot-toast";
import '../styles/authForm.css';

export type Inputs = {
  title: string;
  image: string;
  price: number;
  description: string;
  category: string;
};

type Props = {
  productId?: string;
  onSubmit: SubmitHandler<Inputs>;
};

export function ProductForm({ productId, onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  useEffect(() => {
    if (!productId) return;
    getProductDetail(productId)
      .then(({ data }) => {
        console.log(data)
        reset(data.data);
      })
      .catch(() => toast.error("Error"));
  }, [productId, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        
        <label htmlFor="exampleInputEmail1" className="form-label">
          Title
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          {...register("title", {
            required: "Title is required",
          })}
        />
        {errors?.title && (
          <small className="text-danger">{errors.title.message}</small>
        )}
      </div>

      <div className="mb-3">
        
        <label htmlFor="price" className="form-label">
          price
        </label>
        <input
          type="number"
          className="form-control"
          id="price"
          aria-describedby="emailHelp"
          {...register("price", {
            required: "price is required",
          })}
        />
        {errors?.price && (
          <small className="text-danger">{errors.price.message}</small>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="image" className="form-label">
          Image
        </label>
        <input
          type="text"
          className="form-control"
          id="image"
          accept="image"
          {...register("image", {
            required: "Image is required",
          })}
        />
        {errors?.image && (
          <small className="text-danger">{errors.image.message}</small>
        )}
      </div>

      <div className="mb-3">
        
        <label htmlFor="description" className="form-label">
          description
        </label>
        <input
          type="text"
          className="form-control"
          id="description"
          aria-describedby="emailHelp"
          {...register("description", {
            required: "description is required",
          })}
        />
        {errors?.description && (
          <small className="text-danger">{errors.description.message}</small>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="category" className="form-label">
          Category
        </label>
        <select
          className="form-select"
          aria-label="Default select example"
          {...register("category", {
            required: "Category is required",
          })}
        >
          <option value={"Laptop"}>Laptop</option>
          <option value={"PC"}>PC</option>
          <option value={"Gaming"}>Gaming</option>
        </select>
        {errors?.category && (
          <small className="text-danger">{errors.category.message}</small>
        )}
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}

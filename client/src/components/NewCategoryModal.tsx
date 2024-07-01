import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { createCategoryService } from "@/services/categories.services";
import { ModalNewCategoryProps, ProductFormInput } from "@/interfaces/products";

const schema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
});

export default function NewCategoryModal({ isOpen, onClose, categories, setCategories }: ModalNewCategoryProps) {
  const {
    register: newCategory,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormInput>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<ProductFormInput> = async (data) => {
    const response = await createCategoryService(data);
    console.log(response);
    setCategories([...categories, response]);
    onClose();
  };

  const handleOnClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.target as HTMLElement;
    if (target.id === "modal") {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      id="modal"
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={handleOnClose}
    >
      <div className="relative bg-secondaryDark p-4 rounded-xl w-96 text-white">
      <button onClick={onClose} className="absolute top-2 right-4 text-white close border-[1px] rounded-full hover:bg-primary"/>
        <h1 className="font-semibold text-center text-xl text-white">
          Add New Category
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <div className="flex flex-col">
            <label className="text-white">Name</label>
            <input
              type="text"
              {...newCategory("name")}
              className="border border-white p-2 rounded bg-primaryLight text-primaryDark"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="text-white">Description</label>
            <textarea
              {...newCategory("description")}
              className="border border-white p-2 rounded bg-primaryLight text-primaryDark"
            />
            {errors.description && (
              <p className="text-red-500">{errors.description.message}</p>
            )}
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="px-5 py-2 bg-primaryLight text-black rounded"
            >
              Add Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

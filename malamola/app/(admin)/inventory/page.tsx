import React from "react";

const ManageInventoryPage = () => {
  return (
    <>
      <div>
        <h1 className="mb-10 text-2xl tracking-wide">Manage your Products</h1>

        <div className="card card-bordered bg-neutral bg-opacity-5 p-4 hover:shadow-md">
          <h1 className="card-title">Product Name</h1>
          {/* change to "ID" mapped from db's product list */}
          <div className="card-body">
            <form>
              <input
                required
                name="name"
                placeholder="Name"
                className="input input-bordered mb-3 w-full"
              />
              <textarea
                required
                name="description"
                placeholder="Description"
                className="textarea textarea-bordered mb-3 w-full"
              />
              <input
                required
                name="imageUrl"
                placeholder="Image URL"
                type="url"
                className="input input-bordered mb-3 w-full"
              />
              <input
                required
                name="price"
                placeholder="Price (SGD)"
                type="number"
                className="input input-bordered mb-3 w-full"
              />
              <input
                required
                name="stock"
                placeholder="Stock"
                type="number"
                className="input input-bordered mb-3 w-full"
              />
            </form>

            <button type="submit" className="btn btn-primary btn-block">
              Add Product
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageInventoryPage;

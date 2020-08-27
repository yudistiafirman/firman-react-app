import React, { Component } from "react";
import Axios from "axios";
import Modal from "react-modal";

import "./App.css";

const linkApi = "http://localhost:3000/users";

class Card extends Component {
  state = {
    data: null,
    price: "Rp.",
    stock: "Stock :",
    selectedId: false,
  };

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    Axios.get(linkApi)
      .then((res) => {
        this.setState({ data: res.data });
      })
      .catch((err) => console.log(err));
  };

  addData = () => {
    var product = this.refs.product.value;
    var image = this.refs.image.value;
    var price = this.refs.price.value;
    var stock = this.refs.stock.value;

    if (product && image && price && stock) {
      Axios.post(linkApi, {
        product: product,
        image: image,
        price: price,
        stock: stock,
      })
        .then((res) => {
          console.log(res);
          if (res.status === 201) {
            alert("data sucessfully added");
            this.refs.product.value = "";
            this.refs.image.value = "";
            this.refs.price.value = "";
            this.refs.stock.value = "";
            this.getData();
          }
        })
        .catch((err) => console.log(err));
    } else {
      alert("form still empty");
    }
  };

  onSaveBtnClick = () => {
    var productEdit = this.refs.productEdit.value;
    var imageEdit = this.refs.imageEdit.value;
    var priceEdit = this.refs.priceEdit.value;
    var stockEdit = this.refs.stockEdit.value;

    if (productEdit && imageEdit && priceEdit && stockEdit) {
      Axios.patch(linkApi + "/" + this.state.selectedId, {
        product: productEdit,
        image: imageEdit,
        price: priceEdit,
        stock: stockEdit,
      })
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            alert("edit data success");
            this.setState({ selectedId: null });
            this.refs.product.value = "";
            this.refs.image.value = "";
            this.refs.price.value = "";
            this.refs.stock.value = "";
            this.getData();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("form gak boleh kosong");
    }
  };

  onDeleteData = (id) => {
    Axios.delete(`${linkApi}/${id}`)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          alert("data successfully deleted");
          this.getData();
        }
      })
      .then((err) => {
        console.log(err);
      });
  };

  render() {
    if (this.state.data === null) {
      return (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );
    }

    return (
      <div>
        {/* Card Section */}
        <div className="container my-margin-2 position-relative ">
          <div className="row  ">
            {this.state.data.map((v, i) => {
              if (this.state.selectedId === v.id) {
                return (
                  <div key={v.id} className="position-absolute">
                    <div className="bg-dark "></div>
                    <div className="col-4 my-margin my-index ">
                      <form>
                        <div className="form-group row mt-5">
                          <label
                            htmlFor="image"
                            className="col-3 font-weight-bold"
                          >
                            image :
                          </label>

                          <div className="col-7">
                            <input
                              type="text"
                              className="form-control"
                              ref="imageEdit"
                            />
                          </div>
                        </div>
                        <div className="form-group row">
                          <label
                            htmlFor="product"
                            className="col-3 font-weight-bold"
                          >
                            product :
                          </label>

                          <div className="col-7">
                            <input
                              type="text"
                              className="form-control"
                              ref="productEdit"
                            />
                          </div>
                        </div>
                        <div className="form-group row">
                          <label
                            htmlFor="price"
                            className="col-3 font-weight-bold"
                          >
                            price :
                          </label>

                          <div className="col-7">
                            <input
                              type="text"
                              className="form-control"
                              ref="priceEdit"
                            />
                          </div>
                        </div>
                        <div className="form-group row">
                          <label
                            htmlFor="stock"
                            className="col-3 font-weight-bold"
                          >
                            stock :
                          </label>

                          <div className="col-7">
                            <input
                              type="text"
                              className="form-control"
                              ref="stockEdit"
                            />
                          </div>
                        </div>
                        <button
                          className="btn btn-danger d-block w-50 mb-2  "
                          onClick={this.onSaveBtnClick}
                        >
                          save
                        </button>
                        <button
                          className="btn btn-primary d-block w-50"
                          onClick={() => this.setState({ selectedId: null })}
                        >
                          cancel
                        </button>
                      </form>
                    </div>
                  </div>
                );
              }
              return (
                <div className="col-3 my-margin">
                  <div
                    key={v.id}
                    style={{
                      width: "15rem",
                      height: "10rem",
                    }}
                  >
                    <img
                      src={v.image}
                      alt="prop"
                      className=" card-top-img  h-100 w-100 my-border"
                    />
                    <div className=" container  pb-4 f-my-border">
                      <h5 className="card-title ">{v.product}</h5>
                      <p className="text-black-50 ">
                        {this.state.price}
                        {v.price}
                      </p>
                      <p className="text-black-50">
                        <small>
                          {this.state.stock}
                          {v.stock}
                        </small>
                      </p>
                      <button
                        onClick={() => this.setState({ selectedId: v.id })}
                        className="btn btn-outline-primary d-block w-100 mb-1"
                      >
                        edit data
                      </button>
                      <button
                        className="btn btn-outline-danger d-block w-100"
                        onClick={this.onDeleteData.bind(this, v.id)}
                      >
                        delete data
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {/* end of card section */}

          {/* add Data button */}
          <button
            type="button"
            className="btn btn-outline-primary my-absolute"
            data-toggle="modal"
            data-target="#staticBackdrop"
          >
            Add new Data Here
          </button>
          {/* end of data section */}

          {/* add data form */}
          <div
            className="modal fade"
            id="staticBackdrop"
            data-backdrop="static"
            data-keyboard="false"
            tabIndex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="staticBackdropLabel">
                    Add Data
                  </h5>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="form-group row">
                      <label htmlFor="product" className="col-3">
                        product :
                      </label>

                      <div className="col-7">
                        <input
                          type="text"
                          className="form-control"
                          ref="product"
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label htmlFor="product" className="col-3">
                        image :
                      </label>

                      <div className="col-7">
                        <input
                          type="text"
                          className="form-control"
                          ref="image"
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label htmlFor="price" className="col-3">
                        price :
                      </label>

                      <div className="col-7">
                        <input
                          type="text"
                          className="form-control"
                          ref="price"
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label htmlFor="stock" className="col-3">
                        stock :
                      </label>

                      <div className="col-7">
                        <input
                          type="text"
                          className="form-control"
                          ref="stock"
                        />
                      </div>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <input
                    type="button"
                    className="btn btn-outline-primary"
                    value="Submit"
                    onClick={this.addData}
                  />
                </div>
              </div>
            </div>
            {/* end data form */}
          </div>
        </div>
      </div>
    );
  }
}

export default Card;

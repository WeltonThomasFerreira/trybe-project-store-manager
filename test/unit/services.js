const sinon = require("sinon");
const { expect } = require("chai");
const ProductsModel = require("../../models/productsModel");
// const SalesModel = require("../../models/salesModel");
const ProductsService = require("../../services/productsService");
const { it } = require("mocha");

describe("Testa serviço: ProductsService", () => {
  describe("Testa função: createProduct", () => {
    describe("Testa se o produto é criado com sucesso", () => {
      const product = { name: "Nintendo Switch", quantity: 1 };
      const EXPECT = {
        code: 201,
        message: { id: 1, name: product.name, quantity: product.quantity },
      };

      before(async () => {
        const execute = { insertId: 1 };
        sinon.stub(ProductsModel, "createProduct").resolves(execute);
        sinon.stub(ProductsModel, "searchProductByName").resolves(false);
      });

      after(async () => {
        ProductsModel.createProduct.restore();
        ProductsModel.searchProductByName.restore();
      });

      it("Retorna objeto com code e message válidos", async () => {
        const response = await ProductsService.createProduct(
          product.name,
          product.quantity
        );
        expect(response).to.be.deep.equal(EXPECT);
      });

      // todo: adicionar casos de erro
    });
  });

  describe("Testa a função: getAllProducts", () => {
    describe("Testa se os produtos são listados com sucesso", () => {
      const products = [
        {
          id: 1,
          name: "Nintendo Switch",
          quantity: 63,
        },
      ];
      const EXPECT = {
        code: 200,
        message: products,
      };

      before(async () => {
        sinon.stub(ProductsModel, "getAllProducts").resolves(products);
      });

      after(async () => {
        ProductsModel.getAllProducts.restore();
      });

      it("Retorna objeto com code e message válidos", async () => {
        const response = await ProductsService.getAllProducts();
        expect(response).to.be.deep.equal(EXPECT);
      });
    });
  });

  // describe("Testa a função: getProductById", () => {
  //   describe("Testa se o produto é listado por id com sucesso", () => {});
  // });

  // describe("Testa a função: updateProductById", () => {
  //   describe("Testa se o produto é atualizado com sucesso", () => {});
  // });

  // describe("Testa a função: deleteProductById", () => {
  //   describe("Testa se o produto é deletado com sucesso ", () => {});
  // });
});

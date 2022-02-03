const sinon = require("sinon");
const { expect } = require("chai");

const connection = require("../../models/connection");
const ProductsModel = require("../../models/productsModel");
const { it } = require("mocha");

describe("Testa productsModel", () => {
  describe("Insere um novo produto no banco de dados", () => {
    describe("Produto inserido com sucesso", async () => {
      const product = { name: "Nintendo Switch", quantity: 17 };
      before(async () => {
        const execute = [{ insertId: 1 }];
        sinon.stub(connection, "execute").resolves(execute);
      });

      after(async () => {
        connection.execute.restore();
      });

      it("Retorna um objeto", async () => {
        const response = await ProductsModel.createProduct(
          product.name,
          product.quantity
        );
        expect(response).to.be.an("object");
      });

      it("O objeto contém a propriedade insertId", async () => {
        const response = await ProductsModel.createProduct(
          product.name,
          product.quantity
        );
        expect(response).to.have.a.property("insertId");
      });
    });
  });

  describe("Busca um produto por nome no banco de dados", () => {
    describe("Produto encontrado com sucesso", () => {
      const product = { name: "Nitendo Switch" };
      before(async () => {
        const execute = [[{ name: "Nitendo Switch" }]];
        sinon.stub(connection, "execute").resolves(execute);
      });

      after(async () => {
        connection.execute.restore();
      });

      it("Retorna um objeto com a propriedade nome", async () => {
        const response = await ProductsModel.searchProductByName(product.name);
        expect(response).to.have.property("name").equal(product.name);
      });
    });

    describe("Produto não encontrado", () => {
      const product = { name: "Nitendo Switch" };
      before(async () => {
        const execute = [[]];
        sinon.stub(connection, "execute").resolves(execute);
      });

      after(async () => {
        connection.execute.restore();
      });

      it("Retorna undefined", async () => {
        const response = await ProductsModel.searchProductByName(product.name);
        console.log(await ProductsModel.searchProductByName(product.name));
        expect(response).to.be.undefined;
      });
    });
  });

  describe("Lista todos os produtos do banco de dados", () => {
    describe("Retorna produtos com sucesso", () => {
      before(async () => {
        const products = [
          [
            {
              id: 1,
              name: "Nitendo Switch",
              quantity: 17,
            },
          ],
        ];
        sinon.stub(connection, "execute").resolves(products);
      });

      after(async () => {
        connection.execute.restore();
      });

      it("Retorna um array de objetos", async () => {
        const response = await ProductsModel.getAllProducts();
        expect(response).to.deep.include.members([
          { id: 1, name: "Nitendo Switch", quantity: 17 },
        ]);
      });
    });

    describe("Banco de dados não contém produtos", () => {});
  });
});

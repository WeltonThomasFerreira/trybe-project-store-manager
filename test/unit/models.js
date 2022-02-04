const sinon = require("sinon");
const { expect } = require("chai");

const connection = require("../../models/connection");
const ProductsModel = require("../../models/productsModel");
const SalesModel = require("../../models/salesModel");
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

    describe("Banco de dados não contém produtos", () => {
      before(async () => {
        const execute = [[]];
        sinon.stub(connection, "execute").resolves(execute);
      });

      after(async () => {
        connection.execute.restore();
      });

      it("Retorna um array vazio", async () => {
        const response = await ProductsModel.getAllProducts();
        expect(response).to.be.empty;
      });
    });
  });

  describe("Lista produto por id", () => {
    describe("Produto é retornado com sucesso", () => {
      before(async () => {
        const execute = [[{ id: 1, name: "Playstation", quantity: 18 }]];
        sinon.stub(connection, "execute").resolves(execute);
      });

      after(async () => {
        connection.execute.restore();
      });

      it("Retorna o objeto do produto", async () => {
        const response = await ProductsModel.getProductById(1);
        expect(response)
          .to.be.an("object")
          .to.include({ id: 1, name: "Playstation", quantity: 18 });
      });
    });

    describe("O produto não é encontrado", () => {
      before(async () => {
        const execute = [[]];
        sinon.stub(connection, "execute").resolves(execute);
      });

      after(async () => {
        connection.execute.restore();
      });

      it("Retorna undefined", async () => {
        const response = await ProductsModel.getProductById(1);
        expect(response).to.be.undefined;
      });
    });
  });

  describe("Atualiza produto por id", () => {
    describe("Produto atualizado com sucesso", () => {
      before(async () => {
        const execute = [{ affectedRows: 1 }];
        sinon.stub(connection, "execute").resolves(execute);
      });

      after(async () => {
        connection.execute.restore();
      });

      it("Retorna propriedade affectRows", async () => {
        const response = await ProductsModel.updateProductById(1);
        expect(response).to.be.equal(1);
      });
    });
  });

  describe("Deleta produto por id", () => {
    describe("Produto deletado com sucesso", () => {
      before(async () => {
        const execute = [{ affectedRows: 1 }];
        sinon.stub(connection, "execute").resolves(execute);
      });

      after(async () => {
        connection.execute.restore();
      });

      it("Retorna propriedade affectRows", async () => {
        const response = await ProductsModel.deleteProductById(1);
        expect(response)
          .to.be.an("object")
          .to.have.property("affectedRows")
          .equal(1);
      });
    });
  });
});

describe("Testa salesModel", () => {
  describe("Insere uma nova venda na tabela sales", () => {
    describe("Inserção feita com sucesso", () => {
      before(async () => {
        const execute = [{ insertId: 1 }];
        sinon.stub(connection, "execute").resolves(execute);
      });

      after(async () => {
        connection.execute.restore();
      });

      it("Retorna insertId", async () => {
        const response = await SalesModel.createSale();
        expect(response).to.equal(1);
      });
    });
  });

  describe("Insere uma nova venda na tabela sales_products", () => {
    describe("Inserção feita com sucesso", () => {
      before(async () => {
        const execute = [{ affectedRows: 1 }];
        sinon.stub(connection, "query").resolves(execute);
      });

      after(async () => {
        connection.query.restore();
      });

      it("Retorna affectedRows", async () => {
        const SALE = [[1, 2, 2]];
        const response = await SalesModel.createSalesProducts(SALE);
        expect(response)
          .to.be.an("object")
          .to.have.property("affectedRows")
          .to.equal(1);
      });
    });
  });

  describe("Lista todas as vendas", () => {
    describe("Recupera vendas com sucesso", () => {
      const sale = {
        saleId: 1,
        date: "2022-02-04T06:21:49.000Z",
        product_id: 2,
        quantity: 2,
      };

      before(async () => {
        const execute = [[sale]];
        sinon.stub(connection, "execute").resolves(execute);
      });

      after(async () => {
        connection.execute.restore();
      });

      it("Retorna array de objeto de vendas", async () => {
        const response = await SalesModel.getAllSales();
        expect(response).to.be.an("array").to.include(sale);
      });
    });

    describe("Não existe vendas pra recuperar", () => {
      before(async () => {
        const execute = [];
        sinon.stub(connection, "execute").resolves(execute);
      });

      after(async () => {
        connection.execute.restore();
      });

      it("Retorna undefined", async () => {
        const response = await SalesModel.getAllSales();
        expect(response).to.be.undefined;
      });
    });
  });

  describe("Lista vendas por id", () => {
    describe('Recupera venda com sucesso', () => {
      const sale = { date: '2022-02-04T07:35:13.000Z', product_id: 1, quantity: 2 };
      before(async () => {
        const execute = [[ sale ]]
        sinon.stub(connection, 'execute').resolves(execute);
      })

      after(async()=>{
        connection.execute.restore();
      })

      it('Retorna array com objeto de vendas', async () =>{
        const response = await SalesModel.getSalesById(1);
        expect(response).to.be.an('array').to.contains(sale);
      })
    })
  });

  describe("Atualiza venda por id", () => {
    describe("Venda atualizado com sucesso", () => {
      before(async () => {
        const execute = [{ affectedRows: 1 }];
        sinon.stub(connection, "query").resolves(execute);
      });

      after(async () => {
        connection.query.restore();
      });

      it("Retorna um objeto com a propriedade affectRows", async () => {
        const sales = [ { product_id: 1, quantity: 2 } ]
        const response = await SalesModel.updateSaleById(1, sales);
        expect(response).to.be.an('object').to.have.property('affectedRows').to.equal(1);
      });
    });
  });
});

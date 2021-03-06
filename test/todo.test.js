import chai from "chai";
import chaiHttp from "chai-http";
import app from "../server.js";

chai.use(chaiHttp);
const expect = chai.expect;
let id;



describe("TODO", () => {

  describe("TODO", () => {
      it("should return 201 - create todo", (done) => {
        chai
          .request(app)
          .post("/todo")
          .send({
            title: "First todo",
            description: "This is my first todo",
            priority:'LOW'
          })
          .end((error, response) => {
            // expect(error).to.be.null;
            expect(response).to.have.status(201);
            id = response.body._id;
            done();
          });
      });
      it("should not create a todo", (done) => {
        chai
          .request(app)
          .post("/todo")

          .send({
            title: "",
            description: "",
            priority:"LOW"
          })
          .end((error, response) => {
            // expect(error).to.be.null;
            expect(response).to.have.status(400);
            done();
          });
      });
    });
    //   describe("GETONE /todo/:id", () => {
    //   it("should get one todo by Id", (done) => {
    //     chai
    //       .request(app)
    //       .get(`/todo/${id}`)
    //       .end((error, response) => {
    //         console.log(error)
    //         expect(response).to.have.status(200);
    //       });
    //       done();
    //   });
    //   it("should not get one todo by Id", (done) => {
    //     chai
    //       .request(app)
    //       .get(`/todo/1`)
    //       .end((error, response) => {
    //         console.log(error)
    //         expect(response).to.have.status(200);
    //       });
    //       done();
    //   });

    // });


    describe("UPDATE /todo/:id", () => {
      it("should update and return 200", (done) => {
        chai
          .request(app)
          .patch(`/todo/${id}`)
          .send({
            title: "updated todo",
            description: "This is the updated todo",
          })
          .end((error, response) => {
            expect(response).to.have.status(200);
          });
          done();
      });
      it("should not upddate update ", (done) => {
        chai
          .request(app)
          .patch(`/todo/${id}`)
          .send({
            title: "",
            description: "",
          })
          .end((error, response) => {
            expect(response).to.have.status(400);
          });
          done();
      });
    });


    describe("DELETE /todo/:id", () => {
      it("should return 200", (done) => {
        chai
          .request(app)
          .delete(`/todo/${id}`)
          .end((error, response) => {
            expect(response).to.have.status(200);
          });
          done();
      });
    });

});
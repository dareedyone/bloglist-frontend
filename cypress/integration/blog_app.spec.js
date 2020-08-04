describe("Blog app", function () {
	beforeEach(function () {
		cy.request("POST", "http://localhost:3001/api/testing/reset");
		cy.request("POST", "http://localhost:3001/api/users", {
			username: "strayen",
			password: "test1234",
		});

		// .then((res) => {
		//     localStorage.setItem("loggedUser", JSON.stringify(res.body));

		// });
		cy.visit("http://localhost:3000");
	});

	it("Login form is shown", function () {
		cy.contains("Log in to app");
		cy.contains("username");
		cy.contains("password");
		cy.contains("login");
	});

	describe("Login", function () {
		it("succeeds with correct credentials", function () {
			cy.get("input[name='username']").type("strayen");
			cy.get("input[name='password']").type("test1234");
			cy.contains("login").click();
			cy.contains("logged in");
		});

		it("fails with wrong credentials", function () {
			cy.get("input[name='username']").type("strayen");
			cy.get("input[name='password']").type("wrong");
			cy.contains("login").click();
			cy.get(".message")
				.should("contain", "Wrong username or password !")
				.and("have.css", "color", "rgb(255, 0, 0)");
		});
	});
});

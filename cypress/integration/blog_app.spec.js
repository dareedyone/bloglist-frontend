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

	describe.only("When looged in", function () {
		beforeEach(function () {
			cy.get("input[name='username']").type("strayen");
			cy.get("input[name='password']").type("test1234");
			cy.contains("login").click();
		});

		it("A blog can be created", function () {
			cy.contains("new note").click();
			cy.get("input[name='title']").type("A cypress title");
			cy.get("input[name='author']").type("Tester Man");
			cy.get("input[name='url']").type("example.com");
			cy.contains("create").click();
			cy.contains("A new blog - A cypress title by Tester Man added !");
		});

		describe.only("When there is a blog", function () {
			beforeEach(function () {
				cy.contains("new note").click();
				cy.get("input[name='title']").type("A cypress title");
				cy.get("input[name='author']").type("Tester Man");
				cy.get("input[name='url']").type("example.com");
				cy.contains("create").click();
				cy.contains("A new blog - A cypress title by Tester Man added !");
			});

			it("user can like a blog.", function () {
				cy.contains("A cypress title Tester Man").find("button").click();
				cy.contains("A cypress title Tester Man")
					.parent()
					.find(".like_btn")
					.click();
				cy.contains("A cypress title Tester Man").parent().contains("likes 1");
			});
		});
	});
});

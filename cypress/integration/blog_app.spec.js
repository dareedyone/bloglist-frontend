describe("Blog app", function () {
	beforeEach(function () {
		cy.request("POST", "http://localhost:3001/api/testing/reset");
		cy.request("POST", "http://localhost:3001/api/users", {
			name: "Big Man",
			username: "strayen",
			password: "test1234",
		});

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
			cy.contains("Big Man logged in");
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

	describe("When looged in", function () {
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

		describe("When there is a blog", function () {
			beforeEach(function () {
				cy.contains("new note").click();
				cy.get("input[name='title']").type("A cypress title");
				cy.get("input[name='author']").type("Tester Man");
				cy.get("input[name='url']").type("example.com");
				cy.contains("create").click();
				cy.contains("A new blog - A cypress title by Tester Man added !");

				cy.visit("http://localhost:3000");
			});

			it("user can like a blog.", function () {
				cy.contains("A cypress title Tester Man").find("button").click();
				cy.contains("A cypress title Tester Man")
					.parent()
					.find(".like_btn")
					.click();
				cy.contains("A cypress title Tester Man").parent().contains("likes 1");
			});
			it("a user who created a blog can delete it", function () {
				cy.contains("A cypress title Tester Man").find("button").click();
				cy.contains("A cypress title Tester Man")
					.parent()
					.contains("Delete")
					.click();
				cy.get("html").should("not.contain", "A cypress title Tester Man");
			});

			it(" blogs are ordered according to likes with the blog with the most likes being first", function () {
				cy.request({
					url: "http://localhost:3001/api/blogs",
					method: "POST",
					body: {
						title: "Another cypress title",
						author: "Tester Man",
						url: "example.com",
						likes: 3,
					},
					headers: {
						Authorization: `bearer ${
							JSON.parse(localStorage.getItem("loggedUser")).token
						}`,
					},
				}).then(() => {
					cy.request({
						url: "http://localhost:3001/api/blogs",
						method: "POST",
						body: {
							title: "Last cypress title",
							author: "Tester Man",
							url: "example.com",
							likes: 1,
						},
						headers: {
							Authorization: `bearer ${
								JSON.parse(localStorage.getItem("loggedUser")).token
							}`,
						},
					}).then(() => {
						cy.visit("http://localhost:3000");
						cy.get(".view_btn").then((viewBtn) => {
							for (let i = 0; i < viewBtn.length; i++) {
								cy.wrap(viewBtn[i]).click();
							}
						});
						cy.get(".num_of_like").should(($like) => {
							expect($like.get(0).innerText).to.eq("3");
						});
					});
				});
			});
		});
	});
});

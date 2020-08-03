import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import { prettyDOM } from "@testing-library/dom";
import Blog from "./Blog";

describe("<Blog />", () => {
	// let component;
	// beforeEach(() => {
	// 	const blog = {
	// 		title: "I am a blog title",
	// 		author: "tester",
	// 		url: "example.com",
	// 		likes: 5,
	// 	};
	// 	component = render(<Blog blog={blog} />);
	// });

	test("that the component displaying a blog renders the blog's title and author, but does not render its url or number of likes by default", () => {
		const blog = {
			title: "I am a blog title",
			author: "tester",
			url: "example.com",
			likes: 5,
		};
		const component = render(<Blog blog={blog} />);
		const tilte_author = component.container.querySelector(".title-author");
		const url_likes = component.container.querySelector(".url-likes");
		expect(tilte_author).toBeDefined();
		expect(url_likes).toBe(null);
	});

	test("that blog's url and number of likes are shown when the button controlling the shown details has been clicked", () => {
		const blog = {
			title: "I am a blog title",
			author: "tester",
			url: "example.com",
			likes: 5,
		};
		const component = render(<Blog blog={blog} />);
		const toggleButton = component.getByText("view");
		fireEvent.click(toggleButton);
		const url_likes = component.container.querySelector(".url-likes");
		// console.log(url_likes);
		expect(url_likes).toBeDefined();
	});
	//i test for delete instead of likes since only handleDelete was passed as props
	test("that if the delete button is clicked twice, the event handler the component received as props is called twice.", () => {
		const blog = {
			title: "I am a blog title",
			author: "tester",
			url: "example.com",
			likes: 5,
		};
		const mockHandler = jest.fn();
		const componentWithHandler = render(
			<Blog handleDelete={mockHandler} blog={blog} />
		);
		const toggleButton = componentWithHandler.getByText("view");
		fireEvent.click(toggleButton);
		// componentWithHandler.debug();
		const deleteButton = componentWithHandler.getByText("Delete");
		// console.log(prettyDOM(deleteButton));
		fireEvent.click(deleteButton);
		fireEvent.click(deleteButton);
		// fireEvent.dblClick(deleteButton);
		expect(mockHandler.mock.calls).toHaveLength(2);
	});
});

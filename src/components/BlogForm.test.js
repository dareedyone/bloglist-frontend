import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import BlogForm from "./BlogForm";
import { prettyDOM } from "@testing-library/dom";

describe("<BlogForm />", () => {
	test("that the form calls the event handler it received as props with the right details when a new blog is called", () => {
		const mockHandler = jest.fn();
		const { container } = render(<BlogForm createBlog={mockHandler} />);
		const form = container.querySelector("form");
		const titleInput = container.querySelector("[name=title]");
		const authorInput = container.querySelector("[name=author]");
		const urlInput = container.querySelector("[name=url]");
		fireEvent.change(titleInput, { target: { value: "I am a title" } });
		fireEvent.change(authorInput, { target: { value: "I am an author" } });
		fireEvent.change(urlInput, { target: { value: "I am a url" } });
		fireEvent.submit(form);

		expect(mockHandler.mock.calls).toHaveLength(1);
		expect(mockHandler.mock.calls[0][0].title).toBe("I am a title");
		expect(mockHandler.mock.calls[0][0].author).toBe("I am an author");
		expect(mockHandler.mock.calls[0][0].url).toBe("I am a url");
	});
});

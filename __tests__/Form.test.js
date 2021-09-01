import { render, screen } from "@testing-library/react";

import Form from "../components/Form";

import { useStore, initialState } from "../store";

import { Provider } from "react-redux";

import { useState } from "react";

const TestForm = ({ inputFields, defaultStore = initialState }) => {
	const store = useStore(defaultStore);
	const [value, setValue] = useState("item1");

	return (
		<Provider store={store}>
			<Form
				title="Form"
				inputFields={inputFields}
				submitButton={{ text: "Submit", handler: () => {} }}
				link={{ text: "Link", href: "/link" }}
				dropDown={{
					value: value,
					setValue: setValue,
					options: ["item1", "item2", "item3"],
				}}
			/>
		</Provider>
	);
};

describe("Form tests", () => {
	describe("Rendering", () => {
		it("should render a heading with text `Form`", () => {
			render(<TestForm />);
			const heading = screen.getByRole("heading", { name: "Form" });
			expect(heading).toBeInTheDocument();
		});

		it("should render dropdown with 3 options", () => {
			render(<TestForm />);
			const dropdown = screen.getByTestId("form-dropdown");
			expect(dropdown.children.length).toBe(3);
		});

		it("should be able to render a text field", () => {
			render(
				<TestForm inputFields={[{ title: "Field", type: "text" }]} />
			);
			const textField = screen.getByRole("textbox", {
				placeholder: "Field",
			});
			expect(textField).toBeInTheDocument();
		});

		it("should have a submit button with text `Submit`", () => {
			render(<TestForm />);
			const submit = screen.getByRole("button", { name: "Submit" });
			expect(submit).toBeInTheDocument();
		});

		it("should not show input error when form input is valid", () => {
			render(<TestForm />);
			const inputError = screen.queryByTestId("input-error");
			expect(inputError).not.toBeInTheDocument();
		});

		it("should show input error when form input is invalid", () => {
			render(
				<TestForm
					defaultStore={{
						...initialState,
						auth: { ...initialState.auth, inputError: "Invalid" },
					}}
				/>
			);
			const inputError = screen.getByTestId("input-error");
			expect(inputError).toBeInTheDocument();
		});

		it("should have a link with href `link`", () => {
			render(<TestForm />);
			const link = screen.getByRole("link").href.split("/");
			const href = link[link.length - 1];
			expect(href).toBe("link");
		});
	});
});
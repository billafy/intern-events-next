import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { Provider } from "react-redux";
import { useStore, initialState } from "../store";
import Form from "../components/Form";
import { delay } from "../utils/utils";

const TestForm = ({
	inputFields,
	defaultStore = initialState,
	handler = () => {},
}) => {
	const store = useStore(defaultStore);
	const [value, setValue] = useState("item1");

	return (
		<Provider store={store}>
			<Form
				title="Form"
				inputFields={inputFields}
				submitButton={{ text: "Submit", handler: handler }}
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
			const dropdown = screen.getByTestId("form-selector");
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

		it("should be able to render a dropdown field", () => {
			render(
				<TestForm
					inputFields={[
						{
							title: "Dropdown",
							type: "select",
							options: ["1", "2", "3"],
						},
					]}
				/>
			);
			const dropdownField = screen.getByTestId("form-input-dropdown");
			expect(dropdownField).toBeInTheDocument();
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

		it("should clear the input error after 3 seconds", async () => {
			render(
				<TestForm
					defaultStore={{
						...initialState,
						auth: { ...initialState.auth, inputError: "Invalid" },
					}}
				/>
			);
			await delay(3000);
			const inputError = screen.queryByTestId("input-error");
			expect(inputError).not.toBeInTheDocument();
		});
	});

	describe("User events", () => {
		it("should update input fields", () => {
			render(
				<TestForm inputFields={[{ title: "Test", type: "text" }]} />
			);
			const inputField = screen.getByRole("textbox", {
				placeholder: "Test",
			});
			userEvent.type(inputField, "oye");
			expect(inputField.value).toBe("oye");
		});

		it("should call the handler when clicked the submit button", () => {
			let called = false;
			const handler = () => {
				called = true;
			};
			render(<TestForm handler={handler} />);
			const submit = screen.getByRole("button", { name: "Submit" });
			userEvent.click(submit);
			expect(called).toBeTruthy();
		});
	});
});

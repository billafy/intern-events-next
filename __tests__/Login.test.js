import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { Provider } from "react-redux";
import { useStore, initialState } from "../store";
import Login from "../pages/auth/login";

import {loginFields} from '../utils/inputFields'

const TestLogin = ({ defaultStore = initialState }) => {
	const store = useStore(defaultStore);

	return (
		<Provider store={store}>
			<Login />
		</Provider>
	);
};

describe("Login tests", () => {
	describe("Rendering", () => {
		it("should have the heading `LOGIN`", () => {
			render(<TestLogin />);
			const heading = screen.getByRole("heading");
			expect(heading.textContent).toBe("LOGIN");
		});

		describe('should have all the login input fields', () => {
			beforeEach(() => {
				render(<TestLogin />);
			})
			for(const field of loginFields) {
				it(`should contain the ${field.title} field`, () => {
					const testField = screen.getByTestId(`${field.name}-field`)
					expect(testField).toBeInTheDocument()
				})
			}
		})
	});
});

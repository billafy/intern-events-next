import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Link from "next/link";
import Head from "next/head";

import { defaultInputs } from "../utils/inputFields";

import _ from "../styles/Form.module.scss";

const Form = ({ title, inputFields, submitButton, link, dropDown }) => {
	const dispatch = useDispatch();
	const { accountInput, inputError, isLoggedIn } = useSelector(
		(state) => state.auth
	);

	const updateInput = (name, value) => {
		const newAccountInput = accountInput;
		newAccountInput[name] = value;
		dispatch({
			type: "UPDATE_INPUT",
			payload: { accountInput: newAccountInput },
		});
	};

	useEffect(() => {
		dispatch({
			type: "UPDATE_INPUT",
			payload: { accountInput: defaultInputs },
		});
	}, [isLoggedIn]);

	useEffect(() => {
		if (!inputError) return;
		setTimeout(() => {
			dispatch({ type: "INPUT_ERROR", payload: { inputError: "" } });
		}, 3000);
	}, [inputError]);

	return (
		<div className={_.formContainer}>
			<Head>
				<title>InternEvents - {title}</title>
			</Head>
			<form className={_.form}>
				<h2>{title}</h2>
				{dropDown && (
					<div className={`${_.dropDown} ${_.field}`}>
						<select
							value={dropDown.value}
							onChange={({ target: { value } }) =>
								dropDown.setValue(value)
							}
							data-testid="form-selector"
						>
							{dropDown.options.map((option) => (
								<option key={option}>{option}</option>
							))}
						</select>
					</div>
				)}
				{inputFields &&
					inputFields.map((field) => {
						return (
							<div className={_.field} key={field.title}>
								<label
									htmlFor={field.name}
									className={_.labelImage}
								>
									<img src={field.image} />
								</label>
								{field.type === "select" ? (
									<select
										value={accountInput[field.name]}
										onChange={({ target: { value } }) =>
											updateInput(field.name, value)
										}
										id={field.name}
										data-testid="form-input-dropdown"
									>
										{field.options.map((option) => (
											<option key={option} value={option}>
												{option}
											</option>
										))}
									</select>
								) : (
									<input
										type={field.type}
										placeholder={field.title}
										required={field.required}
										value={accountInput[field.name]}
										onChange={({ target: { value } }) =>
											updateInput(field.name, value)
										}
										id={field.name}
									/>
								)}
							</div>
						);
					})}
				{inputError && (
					<p className={_.inputError} data-testid="input-error">
						{inputError}
					</p>
				)}
				{submitButton && (
					<div className={_.submit}>
						<input
							type="button"
							value={submitButton.text}
							onClick={(event) => submitButton.handler(event)}
						/>
					</div>
				)}
				{link && (
					<div className={_.link}>
						<Link href={link.href}>{link.text}</Link>
					</div>
				)}
			</form>
		</div>
	);
};

export default Form;

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";

import Form from "../../components/Form";

import {
    studentFields,
    collegeFields,
    companyFields,
} from "../../utils/inputFields";
import urls from "../../utils/urls";
import { reqPost } from "../../utils/customRequests";

const accountTypes = {
    Student: { title: "Student", fields: studentFields },
    College: { title: "College", fields: collegeFields },
    Company: { title: "Company", fields: companyFields },
};

const Info = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { accountInput } = useSelector((state) => state.auth);
    const [accountType, setAccountType] = useState("Student");

    const createAccount = async (url, body) => {
        const {
            signupEmail,
            signupPassword,
            signupConfirmPassword,
            contactNumber,
        } = accountInput;
        const res = await reqPost(url, {
            ...body,
            email: signupEmail,
            password: signupPassword,
            contactNumber,
        });
        if (res.success) {
            dispatch({ type: "LOGIN", payload: { account: res.body.account } });
            router.replace("/");
        } else {
            if (res.body.errorType === "AccountError")
                router.replace("/auth/signup");
            dispatch({
                type: "INPUT_ERROR",
                payload: { inputError: res.body.error },
            });
        }
        dispatch({ type: "STOP_LOAD" });
    };

    const createStudentAccount = async (event) => {
        event.preventDefault();
        dispatch({ type: "LOAD" });
        const {
            firstName,
            lastName,
            dateOfBirth,
            gender,
            college,
            course,
            yearOfStudying,
        } = accountInput;
        if (
            !firstName ||
            !lastName ||
            !dateOfBirth ||
            !gender ||
            !college ||
            !course ||
            !yearOfStudying
        ) {
            dispatch({
                type: "INPUT_ERROR",
                payload: { inputError: "Fill all the fields" },
            });
            return;
        }
        if (yearOfStudying < 1 || yearOfStudying > 4) {
            dispatch({
                type: "INPUT_ERROR",
                payload: {
                    inputError: "Year of studying should be between 1 and 4",
                },
            });
            return;
        }
        createAccount(urls.createStudentAccount, {
            firstName,
            lastName,
            dateOfBirth,
            gender,
            college,
            course,
            yearOfStudying,
        });
    };

    const createCollegeAccount = (event) => {
        event.preventDefault();
        dispatch({ type: "LOAD" });
        const { collegeName, collegeAddress, university } = accountInput;
        if (!collegeName || !collegeAddress || !university) {
            dispatch({
                type: "INPUT_ERROR",
                payload: { inputError: "Fill all the fields" },
            });
            return;
        }
        createAccount(urls.createCollegeAccount, {
            name: collegeName,
            address: collegeAddress,
            university,
        });
    };

    const createCompanyAccount = (event) => {
        event.preventDefault();
        dispatch({ type: "LOAD" });
        const { companyName, companyAddress } = accountInput;
        if (!companyName || !companyAddress) {
            dispatch({
                type: "INPUT_ERROR",
                payload: { inputError: "Fill all the fields" },
            });
            return;
        }
        createAccount(urls.createCompanyAccount, {
            name: companyName,
            address: companyAddress,
        });
    };

    return (
        <Form
            dropDown={{
                value: accountType,
                setValue: setAccountType,
                options: ["Student", "College", "Company"],
            }}
            title={`${accountType} Information`}
            inputFields={accountTypes[accountType].fields}
            submitButton={{
                text: "CONFIRM",
                handler:
                    accountType === "Student"
                        ? createStudentAccount
                        : accountType === "College"
                        ? createCollegeAccount
                        : createCompanyAccount,
            }}
            link={{ text: "Go Back", href: "/auth/signup" }}
        />
    );
};

export default Info;
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import _ from "../../styles/internships/CreateInternship.module.scss";
import { internshipCategories } from "../../utils/inputFields";
import { reqPost } from "../../utils/customRequests";
import urls from "../../utils/urls";

const CreateInternship = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const {
        auth: { isLoggedIn, account },
        internships: { internshipInput, inputError },
    } = useSelector((state) => state);

    const createInternship = async (event) => {
        event.preventDefault();
        if (
            !internshipInput.title ||
            !internshipInput.description ||
            !internshipInput.category ||
            !internshipInput.applicationEnd ||
            !internshipInput.numberOfPositions ||
            !internshipInput.duration ||
            !internshipInput.stipend
        )
            return dispatch({
                type: "INPUT_ERROR",
                payload: { error: "Fill all the fields" },
            });
        const data = await reqPost(urls.createInternship + account._id, {
            internshipInput,
        });
        if (data.success) return router.replace("/");
        dispatch({ type: "INPUT_ERROR", payload: { error: data.body.error } });
    };

    const updateInput = ({ target: { name, value } }) => {
        dispatch({ type: "UPDATE_INPUT", payload: { name, value } });
    };

    useEffect(() => {
        dispatch({ type: "FLUSH_INPUT" });
        if (!isLoggedIn || account.accountType !== "company")
            router.replace("/");
    }, []);

    return (
        <div className={_.createInternship}>
            <h1>Create Internship</h1>
            <form>
                <div>
                    <label>Internship Title</label>
                    <input
                        type="text"
                        value={internshipInput.title}
                        name="title"
                        onChange={updateInput}
                    />
                </div>
                <div>
                    <label>Description</label>
                    <textarea
                        value={internshipInput.description}
                        name="description"
                        onChange={updateInput}
                    />
                </div>
                <div>
                    <label>Stipend (per month in ₹)</label>
                    <input
                        type="number"
                        value={internshipInput.stipend}
                        name="stipend"
                        onChange={updateInput}
                    />
                </div>
                <div>
                    <label>Duration (months)</label>
                    <input
                        type="number"
                        value={internshipInput.duration}
                        name="duration"
                        onChange={updateInput}
                    />
                </div>
                <div>
                    <label>Number of Positions</label>
                    <input
                        type="number"
                        value={internshipInput.numberOfPositions}
                        name="numberOfPositions"
                        onChange={updateInput}
                    />
                </div>
                <section>
                    <label>Category</label>
                    <select
                        value={internshipInput.category}
                        onChange={updateInput}
                        name="category"
                    >
                        {internshipCategories.map((category) => (
                            <option key={category}>{category}</option>
                        ))}
                    </select>
                </section>
                <section>
                    <label>Application Deadline</label>
                    <input
                        type="date"
                        value={internshipInput.applicationEnd}
                        name="applicationEnd"
                        onChange={updateInput}
                    />
                </section>
                {inputError && <p className={_.inputError}>{inputError}</p>}
                <input
                    type="submit"
                    value="Create"
                    onClick={createInternship}
                />
            </form>
        </div>
    );
};

export default CreateInternship;

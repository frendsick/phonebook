import axios from "axios";
const PERSON_API = "/persons";

const getAll = () => axios.get(PERSON_API).then((response) => response.data);
const create = (person) => axios.post(PERSON_API, person).then((response) => response.data);
const remove = (personId) => axios.delete(`${PERSON_API}/${personId}`);
const update = (personId, person) =>
    axios.put(`${PERSON_API}/${personId}`, person).then((response) => response.data);

const exportedFunctions = { getAll, create, remove, update };
export default exportedFunctions;

import Person from "./Person";

const Persons = ({ personList, nameFilter, deletePersonFunction }) =>
    personList
        .filter((person) => person.name.toLowerCase().includes(nameFilter.toLowerCase()))
        .map((person) => (
            <Person key={person._id} person={person} deletePersonFunction={deletePersonFunction} />
        ));

export default Persons;

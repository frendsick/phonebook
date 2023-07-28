const Person = ({ person, deletePersonFunction }) => {
    const { name, number } = person;

    return (
        <div>
            {name} {number}
            &nbsp;
            <button onClick={() => deletePersonFunction(person)}>delete</button>
        </div>
    );
};

export default Person;

import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from "axios";
import phonebookService from "./services/phonebook";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas", number: 55 }]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [notificationMessage, setNotificationMessage] = useState();
  const [notificationType, setNotificationType] = useState();

  useEffect(() => {
    axios;
    phonebookService
      .getAll()
      .then((initialPersons) => {
        setPersons(initialPersons);
      })
      .catch((error) => console.error("Error fetching persons:", error));
    setNotificationType("error");
    setTimeout(() => setNotificationMessage(null), 5000);
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const existingPerson = persons.find((person) => person.name === newName);

    if (existingPerson) {
      if (
        window.confirm(
          `${newName} is already in the phonebook, replace the old number with the new one?`
        )
      ) {
        const updatedPerson = { ...existingPerson, number: newNumber };

        phonebookService
          .update(updatedPerson.id, updatedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((p) =>
                p.id !== updatedPerson.id ? p : returnedPerson
              )
            );
            setNotificationMessage(`Updated ${returnedPerson.name}'s number`);
            setNotificationType("success");
            setTimeout(() => setNotificationMessage(null), 5000);
          })
          .catch(() => {
            setNotificationMessage(
              `Error: Information for '${existingPerson.name}' has already been removed from the server.`
            );
            setNotificationType("error");
            setPersons(persons.filter((p) => p.id !== existingPerson.id));
            setTimeout(() => setNotificationMessage(null), 5000);
          });
      }
    } else {
      const newPerson = { name: newName, number: newNumber };

      phonebookService
        .create(newPerson)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNewName("");
          setNewNumber("");
          setNotificationMessage(`Added ${returnedPerson.name}`);
          setNotificationType("success");
          setTimeout(() => setNotificationMessage(null), 5000);
        })
        .catch((error) => {
          setNotificationMessage(`Error adding ${newName}: ${error.response.data.error}`);
          setNotificationType("error");
          setTimeout(() => setNotificationMessage(null), 5000);
          console.log(error.response.data.error);
        });
    }
  };

  const deletePerson = (id) => {
    const person = persons.find((p) => p.id === id);
    if (window.confirm(`Delete ${person.name}?`)) {
      phonebookService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== id));
        })
        .catch(() => {
          setNotificationMessage(
            `Error: Could not delete '${person.name}'. It may have already been removed from the server.`
          );
          setNotificationType("error");
          setPersons(persons.filter((p) => p.id !== id));
          setTimeout(() => setNotificationMessage(null), 5000);
        });
    }
  };

  const handlePersonChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().startsWith(search.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} type={notificationType} />
      <Filter search={search} handleSearchChange={handleSearchChange} />
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handlePersonChange={handlePersonChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} deletePerson={deletePerson} />
    </div>
  );
};
export default App;

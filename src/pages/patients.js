import { useState, useEffect, useContext } from "react";
import PCard from "../components/PatientCard";
import { useSnackbar } from "react-simple-snackbar";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export const PATIENTS = [
  {
    id: 1,
    full_name: "Zainab Abdul Kareem",
    birth_date: "29/3/1994",
    gender: "Female",
    phone: "+0771000000",
  },
];
const options = {
  position: "bottom-right",
  style: {
    backgroundColor: "midnightblue",
    border: "2px solid lightgreen",
    color: "lightblue",
    fontSize: "20px",
    textAlign: "center",
  },
  closeStyle: {
    color: "lightcoral",
    fontSize: "16px",
  },
};
const Patients = (props) => {
  const [patients, setPatients] = useState(PATIENTS);
  const [filteredPatients, setFilteredPatients] = useState(PATIENTS);
  const [open, close] = useSnackbar(options);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState(new Date());
  const [gender, setGender] = useState("m");
  const [searchValue, setSearchValue] = useState("");
  const authContext = useContext(AuthContext);
  const { user, isAuth } = authContext;
  const navigate = useNavigate();

  const addNew = () => {
    if (!fullName || !phone || !birthDate || !gender) {
      // alert('Please fill all the info')
      open("Please fill all the info");
      return;
    }
    let pTemp = !patients ? [] : patients;
    pTemp.push({
      id: 4,
      full_name: fullName,
      birth_date: birthDate,
      gender: gender,
      phone: phone,
    });

    setPatients([...pTemp]);
    setFilteredPatients([...pTemp]);
    reset();
  };

  const changeFullName = (e) => {
    let v = e.target.value;
    console.log(v);
    setFullName(v);
  };

  const changePhone = (e) => {
    setPhone(e.target.value);
  };
  const changeBD = (e) => {
    console.log("date", e.target.value);
    setBirthDate(e.target.value);
  };

  const genderOnChange = (e) => {
    setGender(e.target.value);
  };
  const submit = (e) => {
    e.preventDefault();
    addNew();
  };

  const reset = () => {
    setFullName("");
    setBirthDate(Date.now());
    setGender("m");
    setPhone("");
  };

  const onSearchChange = (e) => {
    setSearchValue(e.target.value);

    let search = e.target.value;

    if (!search) {
      setFilteredPatients(patients);
      return;
    }

    let results = patients.filter((item) => {
      return (
        item.full_name.toLowerCase().includes(search.toLowerCase()) ||
        item.phone.includes(search)
      );
    });

    setFilteredPatients(results);
  };
  const deleteRow = (id) => {
    let temp = patients;
    let index = temp.findIndex((item) => {
      return item.id === id;
    });

    temp.splice(index, 1);

    setPatients([...temp]);
    setFilteredPatients([...temp]);
  };
  useEffect(() => {
    // const isAuth = localStorage.getItem('userData')
    // console.log('user data in p ',isAuth)
  }, []);

  const PatientById = (id) => {
    console.log(id);
    navigate(`/patients/${id}`);
  };

  return (
    <div className="pt-40">
      <form onSubmit={submit} className="pt-10 pb-10 pr-80">
        <div className="flex relative">
          <input
            value={fullName}
            onChange={changeFullName}
            type="text"
            placeholder="Full Name"
            class="block mr-6 ml-6 text-sm text-gray-900 border  rounded-lg bg-blue-100 focus:ring-blue-500 focus:border-blue-500 dark:bg-blue-100  dark:placeholder-gray-400 dark:text-blue-700 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
          <input
            value={phone}
            onChange={changePhone}
            type="text"
            placeholder="Phone"
            class="block   mr-6 ml-6 text-sm text-gray-900 border  rounded-lg bg-blue-100 focus:ring-blue-500 focus:border-blue-500 dark:bg-blue-100  dark:placeholder-gray-400 dark:text-blue-700 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
          <input
            value={birthDate}
            onChange={changeBD}
            type="date"
            placeholder="Birth Date"
            class="block   mr-6 ml-6 text-sm text-gray-900 border  rounded-lg bg-blue-100 focus:ring-blue-500 focus:border-blue-500 dark:bg-blue-100  dark:placeholder-gray-400 dark:text-blue-700 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
          <select
            class="block  p-4 pl-10 text-sm text-gray-900 border  rounded-lg bg-blue-100 focus:ring-blue-500 focus:border-blue-500 dark:bg-blue-100  dark:placeholder-gray-400 dark:text-blue-700 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          >
            <option value="Male">Male</option>
            <option value="Female" selected>
              Female
            </option>
          </select>
          <button
            type="submit"
            class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </div>
      </form>

      <form className="pt-10 pb-10">
        <label
          for="search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-blue-700"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              class="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            value={searchValue}
            onChange={onSearchChange}
            type="search"
            id="search"
            class="block w-full p-4 pl-10 text-sm text-gray-900 border  rounded-lg bg-blue-100 focus:ring-blue-500 focus:border-blue-500 dark:bg-blue-100  dark:placeholder-gray-400 dark:text-blue-700 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search"
            required
          />
          <button
            type="submit"
            class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </form>

      {
        <div class="flex flex-col">
          <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div class="overflow-hidden">
                <table class="min-w-full">
                  <thead class="bg-white border-b">
                    <tr>
                      <th
                        scope="col"
                        class="text-sm font-medium text-blue-500 hover:text-blue-800 px-6 py-4 text-left"
                      >
                        ID
                      </th>
                      <th
                        scope="col"
                        class="text-sm font-medium text-blue-500 hover:text-blue-800 px-6 py-4 text-left"
                      >
                        Full Name
                      </th>
                      <th
                        scope="col"
                        class="text-sm font-medium text-blue-500 hover:text-blue-800 px-6 py-4 text-left"
                      >
                        Birth Date
                      </th>
                      <th
                        scope="col"
                        class="text-sm font-medium text-blue-500 hover:text-blue-800 px-6 py-4 text-left"
                      >
                        Phone
                      </th>
                      <th
                        scope="col"
                        class="text-sm font-medium text-blue-500 hover:text-blue-800 px-6 py-4 text-left"
                      >
                        Gender
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPatients &&
                      filteredPatients.map((item, index) => {
                        return (
                          <tr class="bg-white border-b transition duration-300 ease-in-out hover:bg-blue-100">
                            <td
                              onClick={() => {
                                PatientById(item.id);
                              }}
                              className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                            >
                              {item.id}
                            </td>
                            <td
                              onClick={() => {
                                PatientById(item.id);
                              }}
                              className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                            >
                              {item.full_name}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              {item.birth_date}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              {item.phone}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              {item.gender}
                            </td>
                            <td className="text-sm text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                              <button
                                className="text-red-600 p-1"
                                onClick={() => deleteRow(item.id)}
                              >
                                DELETE
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default Patients;

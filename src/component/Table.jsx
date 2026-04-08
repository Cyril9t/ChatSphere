import { useState } from "react";

const students = [
    { name: "John Doe", age: 16, grade: "A" },
    { name: "Jane Smith", age: 15, grade: "B" },
    { name: "Michael Johnson", age: 17, grade: "A" },
    { name: "Emily Davis", age: 16, grade: "C" },
    { name: "Daniel Brown", age: 15, grade: "B" },
    { name: "Sophia Wilson", age: 16, grade: "A" },
    { name: "James Taylor", age: 17, grade: "B" },
    { name: "Olivia Anderson", age: 15, grade: "A" },
    { name: "Liam Thomas", age: 16, grade: "C" },
    { name: "Ava Martinez", age: 17, grade: "B" }
];

export function Table() {
    const [search, setSearch] = useState("");
    const [tableData, setTableData] = useState(students)


    const handleSearch = (e) => {
        setSearch(e.target.value)
        const searchedData = students.filter(data => data.name.toLowerCase().includes(search.toLowerCase()));
        setTableData(searchedData);
    }




    return (
        <>

            <h1>
                Students Data
            </h1>

            <div >
                <input type="text"
                    placeholder="Search for Students"
                    className="input"
                    value={search}
                    onChange={handleSearch}
                />


            </div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Grade</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((datas) => {
                        return (

                            <tr key={crypto.randomUUID()}>
                                <td>{datas.name}</td>
                                <td>{datas.age}</td>
                                <td>{datas.grade}</td>

                            </tr>
                        )
                    })}
                </tbody>
            </table>


        </>
    )
}
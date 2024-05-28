import React, { useState, useEffect } from "react";

export interface School {
  id: number;
  name: string;
  type: string;
  product: string;
  county: string;
  registrationDate: Date;
  contactInformation: string;
  balance: Balance;
}

export interface Balance {
  invoicesCreated: number;
  collectionsMade: number;
}

export default function Schools() {
  const [schools, setSchools] = useState<School[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/schools")
      .then((res) => res.json())
      .then((data) => setSchools(data));
  }, []);

  return (
    <div>
      <h2>Schools</h2>
      <div>
        <div className="overflow-x-auto">
          <table className="table table-xs">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Type</th>
                <th>Product</th>
                <th>County</th>
                <th>Registration Date</th>
                <th>Contact Information</th>
                <th>Invoices Created</th>
                <th>Collections Made</th>
              </tr>
            </thead>
            <tbody>
              {schools.map((school, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{school.name}</td>
                  <td>{school.type}</td>
                  <td>{school.product}</td>
                  <td>{school.county}</td>
                  <td>{school.name}</td>
                  <td>{school.contactInformation}</td>
                  <td>{school.balance.invoicesCreated}</td>
                  <td>{school.balance.collectionsMade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

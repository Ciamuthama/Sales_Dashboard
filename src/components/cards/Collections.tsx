import React, { useEffect, useState } from "react";
import { School } from "./schools";

export interface Collection {
  id: number;
  schoolId: number;
  invoiceId: number;
  collectionNumber: string;
  date: string;
  status: Status;
  amount: number;
}

export enum Status {
  Bounced = "bounced",
  Valid = "valid",
}

export default function Collections() {
  const [collection, setCollection] = useState<Collection[]>([]);
  const [schools, setSchools] = useState<School[]>([]);

  const getCollection = () => {
    fetch(`http://localhost:8080/collections`)
      .then((res) => res.json())
      .then((data) => setCollection(data));
  };

  useEffect(() => {
    fetch("http://localhost:8080/schools")
      .then((res) => res.json())
      .then((data) => setSchools(data));
  }, []);

  useEffect(() => {
    getCollection();
  }, []);

  return (
    <div>
      <table className="table table-md overflow-scroll w-[80vw]">
        <thead className="border-b-2 border-gray-200 bg-gray-100">
          <tr>
            <th>School Name</th>
            <th>Product</th>
            <th>Collection Number </th>
            <th>Amount</th>
            <th>Status</th>
            <th>Collection Date</th>
          </tr>
        </thead>
        <tbody>
          {collection.map((collect, index) => (
            <tr key={index}>
             <td>{schools.find((school) => school.id === collect.schoolId)?.name}</td>
             <td>{schools.find((school) => school.id === collect.schoolId)?.product}</td>
              <td>{collect.collectionNumber}</td>
              <td>{collect.amount.toLocaleString()}</td>
              <td>{collect.status}</td>
              <td>{collect.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

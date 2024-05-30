import React, { useEffect, useState } from "react";
import { School } from "./schools";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { FaRegCircleXmark } from "react-icons/fa6";
import { TextInput } from "flowbite-react";

export interface Collection {
  id: number;
  schoolId: number;
  invoiceId: number;
  collectionNumber: string;
  date: string;
  status: Status;
  amount: number;
}

// eslint-disable-next-line react-refresh/only-export-components
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

  const handleStatusChange = (id: number, status: Status) => {
    const updatedCollection = collection.map((collect) =>
      collect.id === id
        ? {
            ...collect,
            status: status === Status.Valid ? Status.Bounced : Status.Valid,
          }
        : collect
    );
    setCollection(updatedCollection);
   
    fetch(`http://localhost:8080/collections/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...updatedCollection.find((collect) => collect.id === id),
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };

  return (
    <div className="mt-10">
      <div className="flex justify-center mb-10">
        <TextInput type="search" placeholder="Search" className="w-1/2" />
      </div>
      <table className="table overflow-scroll w-[80vw] leading-[0px]">
        <thead className="border-b-2 border-gray-200 bg-gray-100">
          <tr className="text-black text-[14px]">
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
            <tr
              key={index}
              className="even:bg-gray-200 even:mb-5"
            >
              <td>
                {schools.find((school) => school.id === collect.id)?.name}
              </td>
              <td>
                {
                  schools.find((school) => school.id === collect.id)
                    ?.product
                }
              </td>
              <td>{collect.collectionNumber}</td>
              <td>{collect.amount.toLocaleString()}</td>
              <td className="text-center cursor-pointer">
                {collect.status === "valid" ? (
                  <IoIosCheckmarkCircle
                    color="green"
                    size={20}
                    onClick={() => handleStatusChange(collect.id, Status.Valid)}
                  />
                ) : (
                  <FaRegCircleXmark
                    color="red"
                    size={20}
                    onClick={() =>
                      handleStatusChange(collect.id, Status.Bounced)
                    }
                  />
                )}
              </td>
              <td>{collect.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

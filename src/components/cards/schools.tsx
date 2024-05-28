import React, { useState, useEffect } from "react";
import Invoices from "./Invoices";
import { TextInput } from "flowbite-react";
import { IoIosSearch } from "react-icons/io";

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

interface Invoices {
  id: number;
  schoolId: number;
  invoiceNumber: string;
  creationDate: Date;
  dueDate: Date;
  amount: number;
  paidAmount: number;
  balance: number;
  status: string;
}

export default function Schools() {
  const [schools, setSchools] = useState<School[]>([]);
  const [selectedSchool, setSelectedSchool] = useState<Invoices | null>(null);

  useEffect(() => {
    fetch("http://localhost:8080/schools")
      .then((res) => res.json())
      .then((data) => setSchools(data));
  }, []);

  const getInvoice = (school: School) => {
    fetch(`http://localhost:8080/invoices/${school.id}`)
      .then((res) => res.json())
      .then((data) => setSelectedSchool(data));
  };

  const handleSchoolSelection = (school: School) => {
    getInvoice(school);
    const modal = document.getElementById("my_modal_5");
    if (modal) {
      (modal as HTMLDialogElement).showModal();
    }
  };

  return (
    <div>
      <h2>Schools</h2>
      <div>
        <div>
          <TextInput type="search" placeholder="Search" rightIcon={IoIosSearch} className="w-1/2"/>
        </div>
        <div className="overflow-x-auto border-gray-300/50 border-[1px] rounded-xl mt-5 shadow-gray-200 shadow-sm">
          <table className="table table-md">
            <thead className="text-base border-b-2 border-gray-200">
              <tr>
                <th></th>
                <th >Name</th>
                <th>Type</th>
                <th>Product</th>
                <th>County</th>
                <th>Registration Date</th>
                <th>Contact Information</th>
                <th>Invoices Created</th>
                <th>Collections Made</th>
              </tr>
            </thead>
            <tbody className="text-justify p-2">
              {schools.map((school, index) => (
                <tr className="text-base" key={index} onClick={() => handleSchoolSelection(school)}>
                  <th className="text-base">{index + 1}</th>
                  <td className="text-base">{school.name}</td>
                  <td className="text-base">{school.type}</td>
                  <td className="text-base">{school.product}</td>
                  <td className="text-base">{school.county}</td>
                  <td className="text-base">{school.registrationDate}</td>
                  <td className="text-base">{school.contactInformation}</td>
                  <td className="text-base">{school.balance.invoicesCreated}</td>
                  <td className="text-base">{school.balance.collectionsMade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {selectedSchool && (
        <>
        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <Invoices selectedSchool={selectedSchool}  schools={schools}/>
        </dialog>
        </>
      )}
    </div>
  );
}

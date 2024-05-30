import { useState, useEffect } from "react";
import Invoices from "./Invoices";
import { TextInput } from "flowbite-react";
import { IoIosSearch } from "react-icons/io";
import { Collection } from "./Collections";
import InvoiceModal from "../modal/InviocesModal";
import SchoolModal from "./newSchool";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment

export interface School {
  id: number;
  name: string;
  type: string;
  product: string;
  county: string;
  registrationDate: Date;
  contactInformation: string;
  balance: string;
}



export interface Invoices {
  id: number;
  schoolId: number;
  invoiceNumber: string;
  creationDate: Date;
  dueDate: Date;
  amount: number;
  paidAmount: number;
  balance: number;
  status: string;
  daysUntilDue: number;
}

export default function Schools() {
  const [schools, setSchools] = useState<School[]>([]);
  const [selectedSchool, setSelectedSchool] = useState<Invoices | null>(null);
  const [collection, setCollection] = useState<Collection[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("https://zeraki-api.onrender.com/schools")
      .then((res) => res.json())
      .then((data) => setSchools(data));
  }, []);

  const getInvoice = (school: School) => {
    fetch(`https://zeraki-api.onrender.com/invoices/${school.id}`).then((res) => {
      if (res.status === 200) {
        return res.json().then((data) => setSelectedSchool(data));
      } else if (res.status === 404) {
        const modal = document.getElementById("my_modal_2");
        if (modal) {
          (modal as HTMLDialogElement).showModal();
        }
      }
    });
  };
  const getCollection = () => {
    fetch(`https://zeraki-api.onrender.com/collections`)
      .then((res) => res.json())
      .then((data) => setCollection(data));
  };
  useEffect(() => {
    getCollection();
  }, []);

  const handleSchoolSelection = (school: School) => {
    getInvoice(school);
    const modal = document.getElementById("my_modal_5");
    if (modal) {
      (modal as HTMLDialogElement).showModal();
    }
  };

  const filteredSchools = schools.filter(
    (school) =>
      school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      school.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      school.product.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mt-5">
      <h2 className="text-center font-bold">Schools DataBase</h2>
      <div>
        <section className="flex justify-between mx-2">
          <div className="flex justify-center">
            <TextInput
              type="search"
              placeholder="Search"
              rightIcon={IoIosSearch}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <button
              className="btn bg-[#0b1429] text-white hover:bg-[#22345b]"
              onClick={() => {
                const modal = document.getElementById("my_modal_2");
                if (modal instanceof HTMLDialogElement) {
                  modal.showModal();
                }
              }}
            >
              Create New School
            </button>
            <dialog id="my_modal_2" className="modal">
              <SchoolModal />
            </dialog>
          </div>
        </section>

        <div className="overflow-x-auto border-gray-300/50 border-[1px] rounded-xl mt-5 shadow-gray-200 shadow-sm">
          <table className="table table-md ">
            <thead className="text-[14px] border-b-2 border-gray-200 bg-gray-100">
              <tr>
                <th></th>
                <th>Name</th>
                <th>Type</th>
                <th>Product</th>
                <th>County</th>
                <th>Registration Date</th>
                <th>Contact Information</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody className="text-justify p-2">
              {filteredSchools.map((school, index) => (
                <tr
                  className="text-[14px]"
                  key={index}
                  onClick={() => handleSchoolSelection(school)}
                >
                  <th className="text-[14px]">{index + 1}</th>
                  <td className="text-[14px]">{school.name}</td>
                  <td className="text-[14px]">{school.type}</td>
                  <td className="text-[14px]">{school.product}</td>
                  <td className="text-[14px]">{school.county}</td>
                  <td className="text-[14px]">{school.registrationDate}</td>
                  <td className="text-[14px]">{school.contactInformation}</td>
                  <td className="text-[14px]">
                    {school.balance}
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {selectedSchool && (
        <>
          <dialog
            id="my_modal_5"
            className="modal modal-bottom sm:modal-middle place-content-center"
          >
            <Invoices
              selectedSchool={selectedSchool}
              schools={schools}
              collection={collection}
            />
          </dialog>
        </>
      )}

      <dialog id="my_modal_2" className="modal">
        <InvoiceModal  />
      </dialog>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { Tabs } from "flowbite-react";
import Analytics from "../charts/singup_pie/Analytics";
import AnalyticsBars from "../charts/sign_ups_bar/barChart";
import { Invoices, School } from "./schools";
import { Collection } from "./Collections";
import { BsOpencollective } from "react-icons/bs";
import { SiOpencollective } from "react-icons/si";
import { Link } from "react-router-dom";
import Timetable from "../charts/singup_pie/Timetable";
import Finances from "../charts/singup_pie/Finances";
import CollectionModal from "../modal/collectionModal";
import { MdEditNote } from "react-icons/md";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment


export default function TopCards() {
  const [invoice, setInvoice] = useState<Invoices[]>([]);
  const [schools, setSchools] = useState<School[]>([]);
  const [collection,setCollection] = useState<Collection[]>([])
  const [selectedCollection,setSelectedCollection] = useState<Invoices[]>([])

  const getInvoice = () => {
    fetch(`http://localhost:8080/invoices`)
      .then((res) => res.json())
      .then((data) =>
        setInvoice(
          data.sort(
            (a, b) =>
              new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
          )
        )
      );
  };

  useEffect(() => {
    fetch("http://localhost:8080/schools")
      .then((res) => res.json())
      .then((data) => setSchools(data));
  }, []);

  const getOneInvoice =(collection:Collection)=>{
    fetch(`http://localhost:8080/collections/${collection.id}`)
    .then((res) => res.json())
    .then((data) => setSelectedCollection(data));
  }
 

  const getCollection=()=>{
    fetch(`http://localhost:8080/collections`)
    .then((res)=>res.json())
    .then((data)=>setCollection(data))
  }
  useEffect(() => {
    getInvoice();
    getCollection()
  }, []);


  const handleInvoiceSelection = (invoice: Invoices) => {
    getOneInvoice(invoice);
    const modal = document.getElementById("my_modal_5");
    if (modal) {
      (modal as HTMLDialogElement).showModal();
    }
  };

  return (
    <>
      <div className="mx-10 my-10 grid grid-cols-2 gap-x-5 gap-y-10">
        <section className="flex flex-col gap-3">
          <Link to={"/collection"}><div className=" h-[150px] rounded-[16px] border-gray-200 border-[1px] p-6 flex flex-col place-content-center">
          <SiOpencollective  size={50} />
            <p>  {(collection.filter(item => item.status == "valid").length/100)*100}% collection made </p>
            <p>
            {collection.filter(item => item.status == "valid").length}
            </p>
          </div></Link>
          <div className=" h-[150px] rounded-[16px] border-gray-200 border-[1px] p-6 flex flex-col place-content-center">
            <BsOpencollective size={50}/>
            <p>{collection.filter(item => item.status == "bounced").length} bounced Cheques</p>
            <p>{(collection.filter(item => item.status == "bounced").length/100)*100}% of the total collection bounced</p>
          </div>
        </section>

        <div className="flex">
          <Tabs
            aria-label="Tabs with underline"
            style="underline"
            className="w-[25vw] "
          >
            <Tabs.Item active title="Zeraki Analytics">
              <div className=" bg-slate-100 rounded-[10px]">
                <Analytics />
              </div>
            </Tabs.Item>
            <Tabs.Item title="Zeraki Finance">
              <div className=" bg-slate-100 rounded-[10px]">
                <Finances />
              </div>
            </Tabs.Item>
            <Tabs.Item title="Zeraki Timetable">
              <div className=" bg-slate-100 rounded-[10px]">
                <Timetable />
              </div>
            </Tabs.Item>
          </Tabs>
        </div>

        <div>
          <div className="flex flex-row gap-2">
            <div className=" bg-slate-100 rounded-[10px] p-4 flex flex-col place-content-center w-full">
              <p>Zeraki Analytics</p>
              <AnalyticsBars />
            </div>
          </div>

          <section className="rounded-[16px]  p-6 flex flex-col gap-3">
            <p>Invoices</p>
            <table className="table table-lg overflow-scroll w-[80vw]">
              <thead className="border-b-2 border-gray-200 bg-gray-100">
                <tr>
                  <th>School Name</th>
                  <th>Invoice Number</th>
                  <th>Due Date</th>
                  <th>Amount</th>
                  <th>Balance</th>
                </tr>
              </thead>
              <tbody>
                {invoice.map((invoice) => (
                  <tr key={invoice.id}>
                    <td>
                      {
                        schools.find(
                          (school: School) => school.id === invoice.schoolId
                        )?.name
                      }
                    </td>
                    <td>{invoice.invoiceNumber}</td>
                    <td>{invoice.dueDate}</td>
                    <td>KES {(invoice.amount.toLocaleString())}</td>
                    <td>KES {((invoice.amount)-(invoice.paidAmount)).toLocaleString()}</td>
                    <td onClick={()=>handleInvoiceSelection(invoice)}><MdEditNote size={30}/></td>
                  </tr>
                ))}
              </tbody>
            </table>
            {selectedCollection && (
        <>
        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle place-content-center">
        <CollectionModal selectedCollection={selectedCollection}  schools={schools}/>
        </dialog>
        </>
      )}
          </section>
        </div>
      </div>
    </>
  );
}

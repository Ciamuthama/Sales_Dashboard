import { useEffect, useState } from "react";
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
import { MdEditNote } from "react-icons/md";
import InvoicesComponent from "./Invoices";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment


export default function TopCards() {
  const [invoice, setInvoice] = useState<Invoices[]>([]);
  const [schools, setSchools] = useState<School[]>([]);
  const [collection,setCollection] = useState<Collection[]>([])
  const [selectedSchool, setSelectedSchool] = useState<Invoices | null>(null);

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

 
 

  const getCollection=()=>{
    fetch(`http://localhost:8080/collections`)
    .then((res)=>res.json())
    .then((data)=>setCollection(data))
  }
  useEffect(() => {
    getInvoice();
    getCollection()
  }, []);


  const getSelectedInvoice = (invoice: Invoices) => {
    fetch(`http://localhost:8080/invoices/${invoice.id}`)
      .then((res) => res.json())
      .then((data) => setSelectedSchool(data));
  };

  const handleSchoolSelection = (invoice: Invoices) => {
    getSelectedInvoice(invoice);
    const modal = document.getElementById("my_modal_5");
    if (modal) {
      (modal as HTMLDialogElement).showModal();
    }
  };

  return (
    <>
      <div className="mx-10 my-10 grid grid-cols-2 items-bottom gap-x-5 gap-y-10">
        <section className="flex flex-col gap-3">
          <Link to={"/collection"}><div className=" h-[150px] rounded-[16px] border-gray-200 border-[1px] p-6 flex flex-col place-content-center">
          <SiOpencollective  size={50} />
            <p className="font-bold text-base">  {Math.floor((collection.filter(item => item.status == "valid").length/100) *100)}% collection made </p>
            <p className="font-bold text-base">
            {collection.filter(item => item.status == "valid").length} total collection made
            </p>
          </div></Link>
          <div className=" h-[150px] rounded-[16px] border-gray-200 border-[1px] p-6 flex flex-col place-content-center">
            <BsOpencollective size={50}/>
            <p className="font-bold text-base">{collection.filter(item => item.status == "bounced").length} bounced Cheques</p>
            <p className="font-bold text-base">{Math.floor((collection.filter(item => item.status == "bounced").length/100)*100)}% of the total collection bounced</p>
          </div>
        </section>

        <div className="flex -mt-8">
          <Tabs
            aria-label="Tabs with underline"
            style="underline"
            className="flex font-bold"
          >
            <Tabs.Item active title="Zeraki Analytics" >
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
            <div className=" bg-slate-100 rounded-[10px] p-4 flex flex-col place-content-center w-[80vw]">
              <p className="text-center font-bold">Distribution Graphs</p>
              <AnalyticsBars />
            </div>
          </div>

          <section className="rounded-[16px]  p-6 flex flex-col gap-3 w-[80vw]">
            <p className="text-center text-base font-bold">Invoices</p>
            <table className="table table-sm overflow-x-auto w-[80vw] table-pin-rows table-pin-cols">
              <thead className="border-b-2 border-gray-200 bg-gray-100">
                <tr className="text-center">
                  <th>Invoice Number</th>
                  <th>Amount</th>
                  <th>Paid Amount</th>
                  <th>Balances</th>
                  <th>Product type</th>
                  <th>Due Date</th>
                  <th>Creation Date</th>
                  <th>Collection Status</th>
                  <th>Days Until Due</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {invoice.map((invoice) => (
                  <tr key={invoice.id} className="text-center">
                    <td className="text-center">{invoice.invoiceNumber}</td>
                    <td className="text-center">{invoice.amount}</td>
                    <td className="text-center">{invoice.paidAmount}</td>
                    <td className="text-justify">KES {((invoice.amount)-(invoice.paidAmount)).toLocaleString()}</td>
                    <td className="text-justify">{schools.find((school:School)=> school.id === invoice.id)?.product}</td>
                    <td>{invoice.dueDate}</td>
                    <td>{invoice.creationDate}</td>
                    <td className="capitalize">
                      {
                        collection.find(
                          (collect: Collection) => collect.id === invoice.id
                        )?.status
                      }
                    </td>
                    <td className="text-center">{invoice.daysUntilDue}</td>
                    <td onClick={()=>handleSchoolSelection(invoice)}><MdEditNote size={30}/></td>
                  </tr>
                ))}
              </tbody>
            </table>
            {selectedSchool && (
        <>
        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle place-content-center">
        <InvoicesComponent selectedSchool={selectedSchool} schools={schools} collection={collection}/>
        </dialog>
        </>
      )}
          </section>
        </div>
      </div>
    </>
  );
}

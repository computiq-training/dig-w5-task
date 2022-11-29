import { useState } from "react";
//Add history table as component
const HistoryTable = (props)=>{
   return(<>
   <div class="flex flex-col">
    <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
      <div class="overflow-hidden">
        <table class="min-w-full">
          <thead class="bg-white border-b">
            <tr>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                #
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Date
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Report
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Prescription
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Delete History
              </th>
            </tr>
          </thead>
          <tbody>
            {props.history.map(h=>{ return(<tr class="bg-gray-100 border-b">
               <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1</td>
               <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                 {h.date}
               </td>
               <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                 {h.report} 
               </td>
               <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {h.prescription.map(p=><p>{p}</p>)}
               </td>

               <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
               <button onClick={()=>props.deleteRow(h._id)} type="button" class="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out">Danger</button>
               </td>
             </tr>)

            })}


          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>

   </>)

}
export default HistoryTable;
import React from 'react'

const SubsTableItem = ({ email,mongoId,deleteEmail,date }) => {
  const emailDate=new Date(date);
  return (
    <tr className="bg-white border-b text-left hover:bg-gray-50">
  {/* Email */}
  <th
    scope="row"
    className="px-3 sm:px-6 py-3 font-medium text-gray-900 break-all"
  >
    {email || "No Email"}
  </th>

  {/* Date (hide on mobile) */}
  <td className="hidden sm:table-cell px-6 py-3 text-sm text-gray-600">
    {emailDate.toDateString()}
  </td>

  {/* Action */}
  <td
    className="px-3 sm:px-6 py-3 text-center text-red-600 font-bold cursor-pointer select-none active:scale-90 transition"
    onClick={() => deleteEmail(mongoId)}
  >
    ✕
  </td>
</tr>

  )
}

export default SubsTableItem

import { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FiCopy, FiTrash2, FiSearch } from "react-icons/fi";
import ContactList from "../../ContactList";

export default function ReciverList({
  data,
  filteredData,
  selectedRows,
  activeTab,
  searchQuery,
  onSearchChange,
  onSelectionChange,
  onView,
  onDelete,
  onBulkDelete,
  onCopyEmail,
  goBack,
}) {
  const selectAll =
    selectedRows.length === filteredData.length && filteredData.length > 0;
  const [addMore, setAddMore] = useState(false);

  const handleSelectAll = () => {
    if (selectAll) {
      onSelectionChange([], []);
    } else {
      const allIds = filteredData.map((row) => row.id);
      onSelectionChange(allIds, filteredData);
    }
  };

  const handleSelectRow = (id) => {
    let newSelectedIds;

    if (selectedRows.includes(id)) {
      newSelectedIds = selectedRows.filter((rowId) => rowId !== id);
    } else {
      newSelectedIds = [...selectedRows, id];
    }

    const selectedData = data.filter((row) => newSelectedIds.includes(row.id));
    onSelectionChange(newSelectedIds, selectedData);
  };

  const handleCopyEmail = (email) => {
    navigator.clipboard.writeText(email);
    if (onCopyEmail) onCopyEmail(email);
  };

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const handleBulkDelete = () => {
    if (selectedRows.length > 0 && onBulkDelete) {
      onBulkDelete(selectedRows);
    }
  };

  return (
    <div className="w-full rounded-lg relative">
      <div
        className="text-gray-500 flex items-center gap-2 border px-2 py-1 rounded-lg hover:cursor-pointer border-gray-300 absolute top-5 left-5"
        onClick={() => goBack((prev) => !prev)}
      >
        <FaArrowLeftLong />
        <span>Back</span>
      </div>
      {addMore ? (
        <>
          <ContactList />
        </>
      ) : (
        <>
          <div className="flex items-center justify-center mt-5">
            <div className="flex items-center gap-2">
              <p className="text-2xl">List of all email added</p>
              <button
                onClick={() => setAddMore(true)}
                className="px-2 py-1 rounded bg-[#645CE8] text-white hover:cursor-pointer"
              >
                Add more
              </button>
            </div>
          </div>
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">
                    Selected ({selectedRows.length.toString().padStart(2, "0")})
                  </span>
                  {selectedRows.length > 0 && (
                    <button
                      onClick={handleBulkDelete}
                      className="p-1 text-red-500 hover:text-red-700 rounded transition-colors hover:cursor-pointer"
                      title="Delete selected items"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              <form onSubmit={handleSearch} className="flex items-center">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search by name"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="pl-4 pr-10 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-white bg-blue-500 rounded hover:bg-blue-600 transition-colors hover:cursor-pointer"
                  >
                    <FiSearch className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="relative overflow-x-auto">
            <table className="w-full border-collapse table-fixed">
              <thead>
                <tr>
                  <th className="w-12 p-4 text-left">
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={handleSelectAll}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 hover:cursor-pointer"
                    />
                  </th>
                  <th className="w-1/6 p-4 text-left text-sm font-medium text-gray-700">
                    Designation
                  </th>
                  <th className="w-1/4 p-4 text-left text-sm font-medium text-gray-700">
                    Company Details
                  </th>
                  <th className="w-1/4 p-4 text-left text-sm font-medium text-gray-700">
                    Email
                  </th>
                  <th className="w-1/6 p-4 text-left text-sm font-medium text-gray-700">
                    Read mail
                  </th>
                  <th className="w-1/6 p-4 text-left text-sm font-medium text-gray-700">
                    Action
                  </th>
                </tr>
              </thead>
            </table>
            <div className="max-h-96 overflow-y-auto">
              <table className="w-full border-collapse table-fixed">
                <tbody>
                  {filteredData.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-gray-500">
                        {searchQuery
                          ? "No results found for your search."
                          : "No data available."}
                      </td>
                    </tr>
                  ) : (
                    filteredData.map((row, index) => (
                      <tr
                        key={row.id}
                        className={`border-b border-gray-100 hover:bg-gray-50`}
                      >
                        <td className="w-12 p-4">
                          <input
                            type="checkbox"
                            checked={selectedRows.includes(row.id)}
                            onChange={() => handleSelectRow(row.id)}
                            className="w-4 h-4 text-[#586685] border-[#586685] rounded focus:ring-[#586685] hover:cursor-pointer"
                          />
                        </td>
                        <td className="w-1/6 p-4 text-sm text-[#586685]">
                          {row.name}
                        </td>
                        <td className="w-1/4 p-4 text-sm text-[#586685]">
                          {row.designation}
                        </td>
                        <td className="w-1/4 p-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleCopyEmail(row.email)}
                              className="p-1 text-gray-400 hover:text-gray-600 transition-colors hover:cursor-pointer"
                              title="Copy email"
                            >
                              <FiCopy className="w-4 h-4" />
                            </button>
                            <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded">
                              {row.email}
                            </span>
                          </div>
                        </td>
                        <td className="w-1/6 p-4">
                          <button
                            onClick={() => onView && onView(row.id)}
                            className="text-[#473ED7] hover:text-[#473ED7] text-sm font-medium hover:underline hover:cursor-pointer"
                          >
                            View
                          </button>
                        </td>
                        <td className="w-1/6 p-4">
                          <button
                            onClick={() => onDelete && onDelete(row.id)}
                            className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors hover:cursor-pointer"
                            title="Delete"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

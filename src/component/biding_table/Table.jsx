import React from 'react';

// Example props: bids = [{ name: 'Alice', price: 120, timestamp: '2026-03-17 10:30 AM' }]
const BidHistoryTable = ({ bids }) => {
  return (
    <div className="overflow-x-auto mt-6">
      <table className="table w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Bidder Name</th>
            <th>Bid Price</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {bids && bids.length > 0 ? (
            bids.map((bid, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{bid.name}</td>
                <td>${bid.price.toFixed(2)}</td>
                <td>{bid.timestamp}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center text-gray-500">
                No bids yet
              </td>
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr>
            <th>#</th>
            <th>Bidder Name</th>
            <th>Bid Price</th>
            <th>Timestamp</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default BidHistoryTable;
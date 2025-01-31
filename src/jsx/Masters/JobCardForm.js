import React, { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";

const JobCardForm = () => {
  const [machines, setMachines] = useState([
    { Id: 1, Name: "Double Side Planner" },
    { Id: 2, Name: "Cross Cut 1" },
  ]);
  const [rows, setRows] = useState([{ id: 1, machine: "", quantity: "", rejection: "", allocatedTime: "", time: "", name: "" }]);

  const handleAddRow = () => {
    setRows([...rows, { id: rows.length + 1, machine: "", quantity: "", rejection: "", allocatedTime: "", time: "", name: "" }]);
  };

  const handleDeleteRow = (index) => {
    const newRows = rows.filter((_, i) => i !== index);
    setRows(newRows);
  };

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const newRows = [...rows];
    newRows[index][name] = value;
    setRows(newRows);
  };

  return (
    <div className="border border-gray-300 w-full text-sm">
      {/* Header Row */}
      <Row className="g-0">
        <Col xs={10} className="border-end border-bottom">
          <div className="text-center py-1">
            <span className="text-green-600 fw-bold">AARA DESIGN</span>
          </div>
        </Col>
        <Col xs={2} className="border-bottom p-0">
          <Row className="g-0">
            <Col className="text-center py-1 border-end text-green-600 fw-bold">INSPECTION DATE</Col>
            <Col className="text-center py-1">12/25/2024</Col>
          </Row>
        </Col>
      </Row>

      {/* Second Row */}
      <Row className="g-0">
        <Col xs={5} className="border-end border-bottom py-1 px-2">
          <span className="text-green-600 fw-bold">WOOD MACHINE CENTRE</span>
        </Col>
        <Col xs={5} className="border-end border-bottom py-1 px-2">
          <span className="text-green-600 fw-bold">JOB CARD NUMBER</span>
          <span className="ms-2">1925 / W1</span>
        </Col>
        <Col xs={2} className="border-bottom p-0">
          <Row className="g-0">
            <Col className="text-center py-1 border-end text-green-600 fw-bold">ORDER QTY</Col>
            <Col className="text-center py-1">45</Col>
          </Row>
        </Col>
      </Row>

      {/* Container Number Row */}
      <Row className="g-0">
        <Col xs={4} className="border-end border-bottom py-1 px-2">
          <span className="fw-bold">CONTAINER NUMBER</span>
        </Col>
        <Col xs={8} className="border-bottom py-1 px-2">
          <span>N336</span>
        </Col>
      </Row>

      {/* Product Code and Item Row */}
      <Row className="g-0">
        <Col xs={2} className="border-end border-bottom py-1 px-2">
          <div className="text-green-600 fw-bold">PRODUCT</div>
          <div className="text-green-600 fw-bold">CODE</div>
        </Col>
        <Col xs={2} className="border-end border-bottom py-1 px-2">
          <span>611513</span>
        </Col>
        <Col xs={2} className="border-end border-bottom py-1 px-2">
          <span className="text-green-600 fw-bold">ITEM</span>
        </Col>
        <Col xs={6} className="border-bottom py-1 px-2">
          <span>VALENCIA LIGHT WIDE MULTI CHEST OF DRAWERS</span>
        </Col>
      </Row>

      {/* Batch Code Row */}
      <Row className="g-0">
        <Col xs={12} className="border-bottom py-1 px-2">
          <span className="text-green-600 fw-bold">BATCH CODE</span>
        </Col>
      </Row>

      {/* Component Row */}
      <Row className="g-0">
        <Col xs={4} className="border-end border-bottom py-1 px-2">
          <span className="text-green-600 fw-bold">COMPONENT</span>
        </Col>
        <Col xs={4} className="border-end border-bottom py-1 px-2">
          <span>BACK FRAME</span>
        </Col>
        <Col xs={2} className="border-end border-bottom py-1 px-2">
          <span className="text-green-600 fw-bold">COMPONENT QUANTITY</span>
        </Col>
        <Col xs={2} className="border-bottom py-1 px-2">
          <span>90</span>
        </Col>
      </Row>

      {/* Wood Issue Size Row */}
      <Row className="g-0">
        <Col xs={4} className="border-end border-bottom py-1 px-2">
          <span className="text-green-600 fw-bold">WOOD ISSUE SIZE (inch)</span>
        </Col>
        <Col xs={2} className="border-end border-bottom text-center py-1">30</Col>
        <Col xs={2} className="border-end border-bottom text-center py-1">4</Col>
        <Col xs={2} className="border-end border-bottom text-center py-1">15</Col>
        <Col xs={2} className="border-bottom text-center py-1">CFT</Col>
      </Row>

      {/* Final Dimension Row */}
      <Row className="g-0">
        <Col xs={4} className="border-end py-1 px-2">
          <span className="text-green-600 fw-bold">Final Dimension (mm)</span>
        </Col>
        <Col xs={2} className="border-end text-center py-1">645</Col>
        <Col xs={2} className="border-end text-center py-1">40</Col>
        <Col xs={4} className=" border-bottom text-center py-1">25</Col>
      </Row>

      <div className="mt-2 text-sm">
        <span className="text-green-600 font-bold">COMPONENT DRAWING: </span>
        <div className="border border-gray-300 p-2 mt-1">#VALUE!</div>
      </div>

      <div className="mt-4 border-t-2 border-green-500 pt-2">
        <p className="text-green-600 font-bold">Machine Details</p>
        <div style={{ overflowX: 'auto', overflowY: 'auto', maxHeight: '300px' }}>
          <table className="w-full border-collapse border border-green-500 mt-2">
            <thead>
              <tr>
                <th className="border border-green-500 p-2">MACHINE NUMBER</th>
                <th className="border border-green-500 p-2">DATE</th>
                <th className="border border-green-500 p-2">MACHINE</th>
                <th className="border border-green-500 p-2">PROCESS</th>
                <th className="border border-green-500 p-2">QUANTITY</th>
                <th className="border border-green-500 p-2">REJECTION</th>
                <th className="border border-green-500 p-2">ALLOCATED TIME (in minutes)</th>
                <th className="border border-green-500 p-2">TIME</th>
                <th className="border border-green-500 p-2">NAME</th>
                <th className="border border-green-500 p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={row.id}>
                  <td className="border border-green-500 p-2">{row.id}</td>
                  <td className="border border-green-500 p-2">
                    <input
                      type="date"
                      className="form-control border border-gray-300 p-1"
                      value={row.date || new Date().toISOString().split('T')[0]}
                      onChange={(e) => handleChange(index, e)}
                      name="date"
                    />
                  </td>
                  <td className="border border-green-500 p-2">
                    <select
                      name="machine"
                      className="form-control border border-gray-300 p-1"
                      value={row.machine}
                      onChange={(e) => handleChange(index, e)}
                    >
                      <option value="">Select Machine</option>
                      {machines.map(machine => (
                        <option key={machine.Id} value={machine.Name}>
                          {machine.Name}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="border border-green-500 p-2">
                    <input
                      name="process"
                      className="form-control border border-gray-300 p-1"
                      value={row.process}
                      onChange={(e) => handleChange(index, e)}
                      placeholder="Enter process"
                    />
                  </td>
                  <td className="border border-green-500 p-2">
                    <input
                      name="quantity"
                      className="form-control border border-gray-300 p-1"
                      value={row.quantity}
                      onChange={(e) => handleChange(index, e)}
                      placeholder="Enter quantity"
                    />
                  </td>
                  <td className="border border-green-500 p-2">
                    <input
                      name="rejection"
                      className="form-control border border-gray-300 p-1"
                      value={row.rejection}
                      onChange={(e) => handleChange(index, e)}
                      placeholder="Enter rejection"
                    />
                  </td>
                  <td className="border border-green-500 p-2">
                    <input
                      name="allocatedTime"
                      className="form-control border border-gray-300 p-1"
                      value={row.allocatedTime}
                      onChange={(e) => handleChange(index, e)}
                      placeholder="Enter allocated time"
                    />
                  </td>
                  <td className="border border-green-500 p-2">
                    <input
                      name="time"
                      className="form-control border border-gray-300 p-1"
                      value={row.time}
                      onChange={(e) => handleChange(index, e)}
                      placeholder="Enter time"
                    />
                  </td>
                  <td className="border border-green-500 p-2">
                    <input
                      name="name"
                      className="form-control border border-gray-300 p-1"
                      value={row.name}
                      onChange={(e) => handleChange(index, e)}
                      placeholder="Enter name"
                    />
                  </td>
                  <td className="border border-green-500 p-2">
                    <Button variant="danger" onClick={() => handleDeleteRow(index)}>Delete</Button>
                  </td>
                </tr>
              ))}
              {/* Add more rows as needed */}
            </tbody>
          </table>
        </div>
        <Button variant="primary" onClick={handleAddRow}>Add Row</Button>
      </div>
      <div className="mt-4">
        <p className="text-green-600 font-bold">NOTES</p>
        <div className="border border-gray-300 p-4">-</div>
      </div>
    </div>
  );
};

export default JobCardForm;

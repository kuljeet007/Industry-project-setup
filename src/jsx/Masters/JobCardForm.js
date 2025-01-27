import React from "react";
import { Row, Col } from "react-bootstrap";

const JobCardForm = () => {
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
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-green-500 p-2">1</td>
              <td className="border border-green-500 p-2">-</td>
              <td className="border border-green-500 p-2">Double Side Planner</td>
              <td className="border border-green-500 p-2">-</td>
              <td className="border border-green-500 p-2">-</td>
              <td className="border border-green-500 p-2">-</td>
              <td className="border border-green-500 p-2">ST</td>
              <td className="border border-green-500 p-2">-</td>
              <td className="border border-green-500 p-2">-</td>
            </tr>
            <tr>
              <td className="border border-green-500 p-2">2</td>
              <td className="border border-green-500 p-2">-</td>
              <td className="border border-green-500 p-2">Cross Cut 1</td>
              <td className="border border-green-500 p-2">-</td>
              <td className="border border-green-500 p-2">-</td>
              <td className="border border-green-500 p-2">-</td>
              <td className="border border-green-500 p-2">ET</td>
              <td className="border border-green-500 p-2">-</td>
              <td className="border border-green-500 p-2">-</td>
            </tr>
            {/* Add more rows as needed */}
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        <p className="text-green-600 font-bold">NOTES</p>
        <div className="border border-gray-300 p-4">-</div>
      </div>
    </div>
  );
};

export default JobCardForm;

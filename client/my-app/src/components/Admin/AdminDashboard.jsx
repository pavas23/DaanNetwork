import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const AdminDashboard = () => {
  return (
    <Container fluid>
      {/* Displays on top */}
      <Row>
        <Col xs={12} md={2}>
          Display 1
        </Col>
        <Col xs={12} md={2}>
          Display 2
        </Col>
        <Col xs={12} md={2}>
          Display 3
        </Col>
        <Col xs={12} md={2}>
          Display 4
        </Col>
        <Col xs={12} md={2}>
          Display 5
        </Col>
      </Row>

      {/* Displays below */}
      <Row>
        <Col xs={12} md={4}>
          Display 6
        </Col>
        <Col xs={12} md={4}>
          Display 7
        </Col>
        <Col xs={12} md={4}>
          Display 8
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;

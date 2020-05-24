import React from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";

import "./Home.css";

export const Home = () => (
	<Container className="home">
		<Row>
			<Col className="text-center">
				<h1>Sleep.IO</h1>
			</Col>
		</Row>
		<Row>
			<Col className="add-sleep text-center">
				<Button href="/#/addsleep" variant="outline-primary">Add Sleep</Button>
			</Col>
		</Row>
	</Container>
);
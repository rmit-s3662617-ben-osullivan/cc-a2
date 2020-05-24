import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";

import "./ViewSleep.css";

export const ViewSleep = (props: any) => {
	const [loading, setLoading] = useState(true);

	const [slept, setSlept] = useState(0)

	const [suburb, setSuburb] = useState("");
	const [averageSuburbSlept, setAverageSuburbSlept] = useState(0);

	const [state, setState] = useState("");
	const [averageStateSlept, setAverageStateSlept] = useState(0);

	const [country, setCountry] = useState("");
	const [averageCountrySlept, setAverageCountrySlept] = useState(0);

	useEffect(() => {
		(async () => {
			console.log(props);

			const statsString = await (await fetch(`https://us-central1-s3662617-cc-a-2.cloudfunctions.net/get-stats-for-id?id=${props.match.params.id}`)).text();
			const stats = JSON.parse(statsString);

			setSlept(stats.slept);

			setSuburb(stats.suburb.name);
			setAverageSuburbSlept(+stats.suburb.averageHoursSlept);

			setState(stats.state.name);
			setAverageStateSlept(+stats.state.averageHoursSlept);

			setCountry(stats.country.name);
			setAverageCountrySlept(+stats.country.averageHoursSlept);

			setLoading(false);
		})();
	});

	return (
		<Container>
			{
				loading ? (
					<Row>
						<Col className="text-center">
							<h1>Loading statistics...</h1>
						</Col>
					</Row>
				) : (
					<>
						<Row>
							<Col className="text-center">
								<h1>Here's some statistics...</h1>
							</Col>
						</Row>
						<hr/>
						<Row className="statistic">
							<Col>
								<h3>You slept for {slept} hours</h3>
							</Col>
						</Row>
						<hr/>
						<Row className="statistic">
							<Col>
								<h4>On average, {suburb} sleeps for {averageSuburbSlept} hours. {slept < averageSuburbSlept ? `You're behind by ${(averageSuburbSlept - slept).toFixed(2)} hours!` : `You're ahead by ${(slept - averageSuburbSlept).toFixed(2)} hours!`}</h4>
							</Col>
						</Row>
						<hr/>
						<Row className="statistic">
							<Col>
								<h5>Here's more, {state} tends to sleep for {averageStateSlept} hours. Compared to them, {slept < averageStateSlept ? `you're behind by ${(averageStateSlept - slept).toFixed(2)} hours!` : `you're ahead by ${(slept - averageStateSlept).toFixed(2)} hours!`}</h5>
							</Col>
						</Row>
						<hr/>
						<Row className="statistic">
							<Col>
								<h6>Let's talk about countries. {country} sleeps for {averageCountrySlept} hours on average. Look at you, {slept < averageCountrySlept ? `falling behind by ${(averageCountrySlept - slept).toFixed(2)} hours!` : `ahead by ${(slept - averageCountrySlept).toFixed(2)} hours!`}</h6>
							</Col>
						</Row>
						<hr/>
						<Row>
							<Col>
								<Button href="/#/">Go back</Button>
							</Col>
						</Row>
					</>
				)
			}
		</Container>
	);
}
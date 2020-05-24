import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import ReactDatetimeClass from "react-datetime";

import "./AddSleep.css";

export const AddSleep = (props: any) => {
	const [suburb, setSuburb] = useState("");
	const [state, setState] = useState("");
	const [country, setCountry] = useState("");

	const [disabled, setDisabled] = useState(false);

	useEffect(() => {
		const google = (window as any).google;

		// Create the autocomplete object, restricting the search predictions to
		// geographical location types.
		const autocomplete = new google.maps.places.Autocomplete(
			document.getElementById('autocomplete'), {types: ['geocode']});

		// Avoid paying for data that you don't need by restricting the set of
		// place fields that are returned to just the address components.
		autocomplete.setFields(['address_component']);

		autocomplete.addListener('place_changed', () => {
			const {address_components} = autocomplete.getPlace();

			address_components.forEach(({long_name, types}: {long_name: string, types: string[]}) => {
				switch (types[0]) {
					case "locality":
						setSuburb(long_name);
						break;
					case "administrative_area_level_1":
						setState(long_name);
						break;
					case "country":
						setCountry(long_name);
						break;
				}
			})
		});
	});

	const handleClick = async (event: any) => {
		event.preventDefault();
		setDisabled(true);

		const body = new URLSearchParams(new FormData(document.querySelector("#add-sleep") as any) as any).toString();

		const response = await fetch(
			"https://us-central1-s3662617-cc-a-2.cloudfunctions.net/add-sleep",
			{
				method: 'post',
				mode: 'cors',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				body
			}
		);

		setDisabled(false);

		if (!response.ok) {
			return alert("There was an error!");
		}

		const id = await response.text();
		props.history.push(`/sleep/${id}`);
	}

	return (
		<Container>
			<Row>
				<Col>
					<h1>Add Sleep</h1>
					<Form id="add-sleep">
						<Form.Group controlId="sleepFrom">
							<Form.Label>
								When did you start sleeping?
							</Form.Label>
							<ReactDatetimeClass dateFormat="YYYY-MM-DD" timeFormat="HH:mm:ss" inputProps={{name: 'sleepFrom'}}/>
						</Form.Group>

						<Form.Group controlId="sleepTo" >
							<Form.Label>
								When did you wake up?
							</Form.Label>
							<ReactDatetimeClass dateFormat="YYYY-MM-DD" timeFormat="HH:mm:ss" inputProps={{name: 'sleepTo'}}/>
						</Form.Group>

						<Form.Group>
							<Form.Label>
								Where did you fall asleep?
							</Form.Label>
							<Form.Control type="text" id="autocomplete"/>
						</Form.Group>

						<input type="hidden" name="suburb" value={suburb}/>
						<input type="hidden" name="state" value={state}/>
						<input type="hidden" name="country" value={country}/>

						<Button variant="primary" disabled={disabled} onClick={handleClick}>Add Sleep</Button>
					</Form>
				</Col>
			</Row>
			<Row>
				<Col className="text-center go-back">
					<Button href="/#/" variant="outline-primary" size="lg">Go back</Button>
				</Col>
			</Row>
		</Container>
	);
};
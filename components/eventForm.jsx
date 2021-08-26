import React from 'react';
import { addEvent } from '../helper/calEvents';

class EventForm extends React.Component {
	state = {
		title: '',
		descrpiton: '',
	};

	handleChange = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	};

	handleSubmit = (event) => {
		event.preventDefault();
		const { title, descrpiton } = this.state;
		if (title != '') addEvent(this.props.date, title, descrpiton);
		this.props.callback();
	};

	handleCancel = (event) => {
		this.props.callback();
	};

	render() {
		return (
			<a className='list-group-item list-group-item-action'>
				<form onSubmit={this.handleSubmit}>
					<div>
						<input
							className='form-control mt-2'
							type='text'
							name='title'
							placeholder='Your Title'
							onChange={this.handleChange}
						/>
					</div>
					<div>
						<input
							className='form-control mt-2'
							type='text'
							name='descrpiton'
							placeholder='Your Description'
							onChange={this.handleChange}
						/>
					</div>
					<button className='btn btn-primary mt-3' type='submit'>
						Save
					</button>
					<button
						className='btn btn-secondary mt-3 mx-2'
						onClick={this.handleCancel}>
						Cancel
					</button>
				</form>
			</a>
		);
	}
}

export default EventForm;

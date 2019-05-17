import React from 'react';
import { Link } from 'react-router-dom';
import { authenticated, logout } from '../../../auth';

const NavbarModal = ({ modalOpen, toggleModal }) => (
	<div className={modalOpen ? 'modal is-active' : 'modal'}>
		<div className="modal-background"></div>
		<div className="modal-content">
			<div className="level">
				<p className="level-item">
					<button onClick={toggleModal} 
						className="button is-large">
						Home
					</button>
				</p>
			</div>
			<div className="level"> 
			{
				authenticated() ?
				<p className="level-item">
					<button onClick={(e) => toggleModal(e, logout)} 
						className="button is-medium">
						Logout
					</button>
				</p> :  
				<>
					<p className="level-item">
						<button onClick={(e) => toggleModal(e, () => {window.location.href = '/#signup'})} 
							className="button is-large"> 
						Signup
						</button>
					</p>
					<p className="level-item">
						<button onClick={(e) => toggleModal(e, () => {window.location.href = '/#login'})} 
							className="button is-large">
						Login
						</button>
					</p>
				</>
			}
			</div>
			<div className="level">
				<div className="level-item">
					<span className="icon is-large has-text-info">
						<i className="fab fa-twitter fa-2x"></i>
					</span>
				</div>
				<div className="level-item">
					<span className="icon is-large has-text-info">
						<i className="fab fa-facebook fa-2x"></i>
					</span>
				</div>
				<div className="level-item">
					<span className="icon is-large has-text-white">
						<i className="fab fa-github fa-2x"></i>
					</span>
				</div>
				<div className="level-item">
					<span className="icon is-large has-text-white">
						<i className="fab fa-instagram fa-2x"></i>
					</span>
				</div>
			</div>
		</div>
		<button onClick={toggleModal} className="modal-close is-large" aria-label="close"></button>
	</div>
)

export default NavbarModal;